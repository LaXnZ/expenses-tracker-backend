const express = require("express");
const {
  registerUser,
  fetchUsers,
} = require("../../controllers/users/usersController");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.get("/", fetchUsers);

module.exports = userRoute;
