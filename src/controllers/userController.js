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
        console.log("Error finding user:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({ message: "User not found" });
          return;
        } else {
          // User found, store password hash and user info for next middleware
          const user = results[0];
          res.locals.hash = user.password; // Store hashed password for comparison
          res.locals.userid = user.userid;
          res.locals.role = user.role;
          res.locals.message = "Login Successful";
          next();
        }
      }
    };

    userModel.findUserByUsername(data, callback);
  },
  
  // Function to check if username or email already exists
  checkUsernameOrEmailExist: (req, res, next) => {
    const data = req.body;
    
    const callback = (error, results, fields) => {
      if (error) {
        console.log("Error checking username or email:", error);
        res.status(500).json(error);
      } else {
        if (results.length > 0) {
          res.status(409).json({ message: "Username or email already exists" });
          return;
        } else {
          // Username and email are available
          next();
        }
      }
    };
    
    // Assuming there's a function in userModel to check username/email existence
    userModel.checkUsernameOrEmail(data, callback);
  },
  
  // Function to register a new user
  register: (req, res, next) => {
    const data = req.body;
    
    // The password is already hashed by bcryptMiddleware.hashPassword
    // res.locals.hash contains the hashed password
    data.password = res.locals.hash;
    
    const callback = (error, results, fields) => {
      if (error) {
        console.log("Error registering user:", error);
        res.status(500).json(error);
      } else {
        // Store user information for token generation
        res.locals.userid = results.insertId;
        res.locals.role = data.role || "user"; // Default role if not specified
        res.locals.message = `User ${data.username} created successfully`;
        next();
      }
    };
    
    userModel.insertUser(data, callback);
  },
};

module.exports = userController;
