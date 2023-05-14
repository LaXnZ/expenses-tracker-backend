const express = require("express");
const {
  registerUser,
  fetchUsers,
  loginUserController
} = require("../../controllers/users/usersController");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUserController);
userRoute.get("/", fetchUsers);

module.exports = userRoute;
