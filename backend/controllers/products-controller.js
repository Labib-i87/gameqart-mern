const HttpError = require("../models/http-error");
const Product = require("../models/product");

const getProducts = async (req, res, next) => {
  let products;

  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not fetch products.",
      500
    );
    return next(error);
  }

  if (!products) {
    const error = new HttpError("Could not find any product.", 404);
    return next(error);
  }

  res.json({ products: products });
};

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

const updateProduct = async (req, res, next) => {
  const productId = req.params.pid;

  const { imageUrl, price, stock } = req.body;

  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not find the product.",
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

  product.imageUrl = imageUrl;
  product.price = price;
  product.stock = stock;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      "Something Went Wrong. Could not update product",
      500
    );
    return next(error);
  }

  res.json({ updated_product: product });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;

  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not find the product.",
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

  try {
    await product.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not delete the product.",
      500
    );
    return next(error);
  }

  res.json({ message: "product deleted" });
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
