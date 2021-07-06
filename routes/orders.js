const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.get("/",orderController.getOrder);
router.post("/",orderController.createOrder);

module.exports = router;