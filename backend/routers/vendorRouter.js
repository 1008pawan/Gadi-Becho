const express = require("express");
const jwt = require("jsonwebtoken");
const Model = require("../models/vendorModel");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get("/getall", (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.post("/add", (req, res) => {
  const vendor = new Model(req.body);

  vendor.save()
    .then((result) => {
      res.status(201).json({
        message: "Vendor created successfully",
        vendor: result,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }
      res.status(500).json({ error: err.message });
    });
});


router.put("/update/:id", (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
  Model.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.get("/getbycity/:city", (req, res) => {
  Model.find({ location: req.params.city })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


router.get("/stats", auth, async (req, res) => {
  const vendorId = req.user._id;
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendorId = decoded._id;

    // Get all requests for this vendor
    const RequestModel = require("../models/requestModel");
    const requests = await RequestModel.find({ vendorId }).populate(
      "userId",
      "name email"
    );
    console.log("Vendor ID:", vendorId);
    console.log("Found requests:", requests);

    const stats = {
      totalRequests: requests.length,
      pendingRequests: requests.filter((req) => req.status === "pending")
        .length,
      completedRequests: requests.filter(
        (req) => req.status === "completed" || req.status === "approved"
      ).length,
      totalEarnings: requests
        .filter(
          (req) => req.status === "completed" || req.status === "approved"
        )
        .reduce((total, req) => total + (req.amount || 0), 0),
    };

    res.json(stats);
  } catch (error) {
    console.error("Error in stats route:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.get("/recent-requests", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendorId = decoded._id;

    // Get the 10 most recent requests for this vendor
    const requests = await require("../models/requestModel")
      .find({ vendorId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId", "name email");

    // Format the requests
    const formattedRequests = requests.map((req) => ({
      _id: req._id,
      userName: req.fullName || req.userId?.name || "Unknown",
      userEmail: req.userId?.email || "Unknown",
      contactNumber: req.contactNumber,
      vehicleLocation: req.vehicleLocation,
      vehicleDescription: req.vehicleDescription,
      status: req.status,
      amount: req.amount,
      createdAt: req.createdAt,
    }));

    res.json({ requests: formattedRequests });
  } catch (error) {
    console.error("Error in recent-requests route:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});


router.post("/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Model.findOne({ email });

    if (!vendor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { _id, name } = vendor;
    const payload = { _id, name, email };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" }, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Token generation failed" });
      }
      res.status(200).json({ vendortoken: token });
    });
  } catch (err) {
    console.error("Error in authenticate route:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Create Razorpay order
router.post("/payment/create-order", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendorId = decoded._id;

    const { requestId, amount } = req.body;

    if (!requestId || !amount) {
      return res
        .status(400)
        .json({ message: "Request ID and amount are required" });
    }

    const options = {
      amount: amount * 100, // Amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${requestId}`,
      notes: {
        requestId: requestId,
        vendorId: vendorId,
      },
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    console.error("Error creating payment order:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    res
      .status(500)
      .json({ message: "Error creating payment order", error: error.message });
  }
});

// Verify Razorpay payment
router.post("/payment/verify", async (req, res) => {
  try {
    const { paymentId, orderId, signature, requestId, amount } = req.body;

    console.log("Payment verification request:", {
      paymentId,
      orderId,
      requestId,
      amount,
    });

    // Check if environment variables are set
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("RAZORPAY_KEY_SECRET not set in environment variables");
      return res.status(500).json({ message: "Payment configuration error" });
    }

    // Verify the payment signature
    const text = orderId + "|" + paymentId;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    console.log("Signature comparison:", {
      generated: generatedSignature,
      received: signature,
      matches: generatedSignature === signature,
    });

    if (generatedSignature !== signature) {
      console.log("Signature verification failed");
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Get the request from the database
    const RequestModel = require("../models/requestModel");
    const request = await RequestModel.findById(requestId);

    if (!request) {
      console.log("Request not found:", requestId);
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Original request status:", request.status);

    // Update the request with payment information
    request.status = "completed";
    request.paymentCompleted = true;
    request.amount = amount;
    request.paymentId = paymentId;
    request.paymentDate = new Date();

    console.log("Updated request data:", {
      status: request.status,
      paymentCompleted: request.paymentCompleted,
      amount: request.amount,
      paymentId: request.paymentId,
      paymentDate: request.paymentDate,
    });

    await request.save();

    console.log("Request saved successfully");

    res.json({ message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ message: "Error verifying payment", error: error.message });
  }
});

// Test endpoint to manually update request status
router.put("/test-update-status/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    console.log("Test update request:", { requestId, status });

    const RequestModel = require("../models/requestModel");
    const request = await RequestModel.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Original status:", request.status);
    request.status = status;
    await request.save();
    console.log("Updated status:", request.status);

    res.json({ message: "Status updated successfully", request });
  } catch (error) {
    console.error("Error updating status:", error);
    res
      .status(500)
      .json({ message: "Error updating status", error: error.message });
  }
});

module.exports = router;
