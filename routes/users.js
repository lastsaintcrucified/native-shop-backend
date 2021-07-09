const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/",userController.getUser);
router.get("/:id",userController.getUserById);
router.post("/signUp",userController.createUser);
router.post("/login",userController.loginUser);

module.exports = router;