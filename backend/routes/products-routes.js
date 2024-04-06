const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products-controller");

//get all products
router.get("/", productsController.getProducts);

// get a product
router.get("/:pid", productsController.getProductById);

// ADMIN Authorized

// create new product
router.post("/", productsController.createProduct);
// update a product
router.patch("/:pid", productsController.updateProduct);
// delete a product
router.delete("/:pid", productsController.deleteProduct);

module.exports = router;
