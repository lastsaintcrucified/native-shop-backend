const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const imageUpload = require("../middleware/image-upload");

router.get("/",productController.getProduct);
router.get("/:id",productController.getProductById);
router.get("/get/count",productController.getCount);
router.get("/get/featured/:count",productController.getFeatured);
router.get("/get/featured",productController.getFeatured);
router.post("/",imageUpload.single("image"),productController.createProduct);
router.put("/:id",productController.updateProduct);
router.put("/gallery-images/:id",imageUpload.array("images"),productController.updateGallery);
router.delete("/:id",productController.deleteProduct);

module.exports = router;