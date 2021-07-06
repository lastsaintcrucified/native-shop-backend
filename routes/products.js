const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/",productController.getProduct);
router.post("/",productController.createProduct);

module.exports = router;