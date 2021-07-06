const express = require("express");
const router = express.Router();
const catagoryController = require("../controller/catagoryController");

router.get("/",catagoryController.getCatagory);
router.post("/",catagoryController.createCatagory);

module.exports = router;