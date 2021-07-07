const express = require("express");
const router = express.Router();
const catagoryController = require("../controller/catagoryController");

router.get("/",catagoryController.getCatagory);
router.get("/:id",catagoryController.getCatagoryById);
router.post("/",catagoryController.createCatagory);
router.put("/:id",catagoryController.updateCatagory);
router.delete("/:id",catagoryController.deleteCatagory);

module.exports = router;