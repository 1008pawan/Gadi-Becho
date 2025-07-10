const { model, Schema } = require('../connection');

const OTPSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

// Automatically delete expired OTPs
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = model("OTP", OTPSchema);