const HttpError = require("../models/http-error");
const Product = require("../models/product");

const getProductById = (req, res, next) => {};

const createProduct = async (req, res, next) => {
  const createdProduct = new Product(req.body);

  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError(
      "Creating product failed. Please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ product: createdProduct });
};

exports.getProductById = getProductById;
exports.createProduct = createProduct;
