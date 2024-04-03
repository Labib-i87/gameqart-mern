const HttpError = require("../models/http-error");
const Product = require("../models/product");

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;

  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not find a product.",
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      "Could not find a product with provided ID.",
      404
    );
    return next(error);
  }

  res.json({ product: product });
};

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
