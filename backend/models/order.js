const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  date: { type: Date, required: true },
  products: [{ type: Object, required: true }],
  paymentMethod: {
    type: String,
    required: true,
    enum: ["bkash", "nagad", "rocket"],
  },
  transactionId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "processing", "invalid", "delivered"],
  },
});
