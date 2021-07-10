const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/",userController.getUser);
router.get("/:id",userController.getUserById);
router.get("/get/count",userController.getCount);
router.post("/signup",userController.createUser);
router.post("/login",userController.loginUser);
router.delete("/:id",userController.deleteUser);

module.exports = router;