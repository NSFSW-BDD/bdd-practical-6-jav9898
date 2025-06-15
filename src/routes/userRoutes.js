const express = require("express");
const userController = require("../controllers/userController");
const jwtMiddleware= require("../middlewares/jwtMiddleware");

const router = express.Router();


router.get("/", jwtMiddleware.verifyToken,jwtMiddleware.verifyAdminRole,userController.getAllUsers);

router.get("/:userid", userController.getUserByUserid);

router.post("/", userController.createUser);

router.put("/:userid", userController.updateUser);

router.delete("/:userid", userController.deleteUser);

router.post('/login', userController.loginUser,jwtMiddleware.generateToken,jwtMiddleware.sendToken);

module.exports = router;