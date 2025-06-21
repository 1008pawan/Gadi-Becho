const { Schema, model } = require('../connection');

const requestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: "vendors", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" },
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  reqNumber: { type: String, unique: true, required: true },
  vehicleLocation: { type: String, required: true },
  vehicleDescription: { type: String, required: true }, 
  amount: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model("requests", requestSchema);