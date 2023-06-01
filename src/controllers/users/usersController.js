const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../middlewares/generateToken");
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

//Fetch all users
const fetchUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//login user
const loginUserController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const userFound = await User.findOne({ email });

  //chech if user's password match
  if (userFound && (await userFound?.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

//user profile
const userProfileController = expressAsyncHandler(async (req, res) => {
  try {
    const profile = await User.findById(req?.user?._id).populate([
      "expenses",
      "incomes",
    ]);

    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});

//update user profile
const updateUserProfileController = expressAsyncHandler(async (req, res) => {
  try {
    const profile = await User.findByIdAndUpdate(
      req?.user?._id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
      },
      { new: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  registerUser,
  fetchUsers,
  loginUserController,
  userProfileController,
  updateUserProfileController,
};
