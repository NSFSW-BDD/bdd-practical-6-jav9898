const userModel = require("../models/userModel");

userController = {
  getAllUsers: (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.log("Error readAllUser:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };

    userModel.getUsers(callback);
  },

  getUserByUserid: (req, res, next) => {
    var userid = req.params.userid;

    data = { userid: userid };

    const callback = (error, results, fields) => {
      if (error) {
        console.log("Error getUserbyid:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };

    userModel.getUserByUserid(data, callback);
  },

  createUser: (req, res, next) => {
    data = req.body;

    const callback = (error, results, fields) => {
      if (error) {
        console.log("Error Create new user:", error);
        res.status(500).json(error);
      } else res.status(201).json(results);
    };

    userModel.insertUser(data, callback);
  },

  updateUser: (req, res, next) => {
    data = req.body;
    userid = req.params.userid;

    data.userid = userid;

    const callback = (error, results, fields) => {
      if (error) {
        console.log("Error Update user:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };

    userModel.updateUser(data, callback);
  },

  deleteUser: (req, res, next) => {
    userid = req.params.userid;

    data = { userid: userid };

    const callback = (error, results, fields) => {
      if (error) {
        console.log("Error Delete user:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };

    userModel.deleteUser(data, callback);
  },

  loginUser: (req, res, next) => {
    data = req.body;

    const callback = (error, results, fields) => {
      if (error) {
        console.log("Error getUserbyid:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({ message: "Email/Password is wrong" });
          return;
        } else {
          //found the user with matching password and email
          res.locals.userid = results[0].userid;
          res.locals.role = results[0].role;
          res.locals.message = "Login Successful";
          next();
        }
      }
    };

    userModel.login(data, callback);
  },
};

module.exports = userController;
