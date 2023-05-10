const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/User");

//Register
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;

  //check if the user exist
  const userExist = await User.findOne({ email });
  if (userExist) throw new Error("User already exists");
  try {
    const user = await User.create({ email, firstname, lastname, password });
    res.status(200).json(user);
  } catch (error) {
    res.json(`Error : ${error}`);
  }
});

module.exports = { registerUser };
