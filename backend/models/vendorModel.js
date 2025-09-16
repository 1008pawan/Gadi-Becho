const { Schema, model } = require("../connection");
const bcrypt = require("bcryptjs");

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    location: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = model("Vendor", vendorSchema);
