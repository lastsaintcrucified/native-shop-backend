const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.get("/",orderController.getOrder);
router.get("/:id",orderController.getOrderById);
router.get("/get/totalsales",orderController.getTotalSale);
router.post("/",orderController.createOrder);
router.put("/:id",orderController.updateOrder);
router.delete("/:id",orderController.deleteOrder);

module.exports = router;