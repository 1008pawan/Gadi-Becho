require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const rateLimit = require("express-rate-limit");

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit to 5 requests per windowMs
  message: "Too many OTP requests, please try again later.",
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Stored in .env
    pass: process.env.EMAIL_PASS, // Stored in .env
  },
});

// Generate a random OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 1. Send OTP API
router.post("/request-otp", otpLimiter, async (req, res) => {
  const { to: email } = req.body;

  try {
    // Check if the email is registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const otpCode = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    // Store OTP in the database
    await OTP.create({ email, code: otpCode, expiresAt: otpExpiry });

    // Send email with server-generated content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request - Your OTP",
      html: `
            <p style="font-size: 16px; font-weight: 600;">Dear User,</p>
            <p style="font-size: 16px; font-weight: 600;" >You have requested to reset your password. Here is your One-Time Password (OTP):</p>
            <h1 style="font-size: 32px; font-weight: bold;">${otpCode}</h1>
            <p>This OTP will expire in 10 minutes for security purposes.<br>
            Please do not share this OTP with anyone.</p>
            <p>If you did not request this password reset, please ignore this email.</p>
            <p>Best regards,<br>
            Your App Team</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
});

// 2. Verify OTP API
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Validate request
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
        code: "MISSING_FIELDS",
      });
    }

    // Find the OTP record
    const otpRecord = await OTP.findOne({ email, code: otp });
    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP. Please check and try again",
        code: "INVALID_OTP",
      });
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new one",
        code: "EXPIRED_OTP",
      });
    }

    // OTP is valid, proceed to allow password reset
    res.json({
      message: "OTP verified successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      message: "Server error while verifying OTP",
      code: "SERVER_ERROR",
      error: error.message,
    });
  }
});

// 3. Reset Password API
router.put("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Validate input
    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and new password are required",
        code: "MISSING_FIELDS",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
        code: "INVALID_PASSWORD",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Delete all OTPs for this email
    await OTP.deleteMany({ email });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
});

module.exports = router;
