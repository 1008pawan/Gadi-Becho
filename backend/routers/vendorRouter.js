const express = require("express");
const jwt = require("jsonwebtoken");
const Model = require("../models/vendorModel");

require("dotenv").config();

const router = express.Router();

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

router.post('/add', (req, res) => {
    // Get vendorId from token if available
    let vendorId = null;
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            vendorId = decoded._id;
        }
    } catch (e) {
        // ignore if no token
        
    }

    // Add vendorId to request if available
    const requestData = { ...req.body };
    if (vendorId) requestData.vendorId = vendorId;

    new Model(requestData).save()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err)
        console.log(err);
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
  Model.find({ city: req.params.city })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.get("/stats", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendorId = decoded._id;

    // Get all requests for this vendor

    const RequestModel = require("../models/requestModel");
    const requests = await RequestModel.find({ vendorId }).populate('userId', 'name email');
    console.log('Vendor ID:', vendorId);    
    console.log('Found requests:', requests);
    
    const stats = {
      totalRequests: requests.length,
      pendingRequests: requests.filter((req) => req.status === "pending").length,
      completedRequests: requests.filter((req) => req.status === "completed" || req.status === "approved").length,
      totalEarnings: requests
        .filter((req) => req.status === "completed" || req.status === "approved")
        .reduce((total, req) => total + (req.amount || 0), 0)
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
      userName: req.userId?.name || "Unknown",
      userEmail: req.userId?.email || "Unknown",
      vehicleType: req.vehicleType,
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

router.post("/authenticate", (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) {
        const { _id, name, email } = result;
        const payload = { _id, name, email };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "6h" },
          (err, token) => {
            if (err) {
              console.log(err);
              res.status(500).json(err);
            } else {
              res.status(200).json({ vendortoken: token });
            }
          }
        );
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

module.exports = router;
