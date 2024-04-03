const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      title: { type: String, required: true }, // title: title_region_amount
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});
