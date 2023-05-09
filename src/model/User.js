const mongoose = require("mongoose");

//schema for user
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true }
);

//compile schema into model

const User = mongoose.model("User", userSchema);

module.exports = User;
