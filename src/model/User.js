const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

//hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//verify password
userSchema.methods.isPasswordMatch = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

//compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
