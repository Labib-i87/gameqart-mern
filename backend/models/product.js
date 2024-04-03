const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  platform: {
    type: String,
    required: true,
    enum: ["playstation", "xbox", "pc", "nintendo"],
  },
  region: { type: String, required: true },
  type: { type: String, required: true, enum: ["game", "card"] },
  price: { type: Schema.Types.Mixed, required: true },
  stock: { type: Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model("Product", productSchema);
