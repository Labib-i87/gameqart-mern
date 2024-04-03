const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  type: { type: String, required: true },
  imageUrl: { type: String, required: true },
  orderIds: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    default: [],
    required: true,
  },
  cartId: { type: mongoose.Types.ObjectId, ref: "Cart" },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
