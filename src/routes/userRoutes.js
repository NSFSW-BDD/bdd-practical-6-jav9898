const express = require("express");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");

const router = express.Router();


router.get("/", jwtMiddleware.verifyToken,jwtMiddleware.verifyAdmin,userController.getAllUsers);

router.get("/:userid", userController.getUserByUserid);

router.post("/", userController.createUser);

router.put("/:userid", userController.updateUser);

router.delete("/:userid", userController.deleteUser);

router.post('/login', userController.loginUser, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);



module.exports = router;