const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/",productController.getProduct);
router.get("/:id",productController.getProductById);
router.get("/get/count",productController.getCount);
router.get("/get/featured/:count",productController.getFeatured);
router.get("/get/featured",productController.getFeatured);
router.post("/",productController.createProduct);
router.put("/:id",productController.updateProduct);
router.delete("/:id",productController.deleteProduct);

module.exports = router;