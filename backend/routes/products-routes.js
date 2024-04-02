const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products-controller");

router.get("/:pid", productsController.getProductById);

router.post("/new", productsController.createProduct);

module.exports = router;
