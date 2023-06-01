const express = require("express");
const {
  registerUser,
  fetchUsers,
  loginUserController,
  userProfileController,
  updateUserProfileController,
} = require("../../controllers/users/usersController");
const authMiddleware = require("../../middlewares/authMiddleware");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUserController);
userRoute.get("/profile", authMiddleware, userProfileController);
userRoute.put("/update", authMiddleware, updateUserProfileController);
userRoute.get("/", authMiddleware, fetchUsers);

module.exports = userRoute;
