const User = require("../../model/User");

//Register

const registerUser = async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;

  try {
    //check if the user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.json("User Exist");
    }
    const user = await User.create({ email, firstname, lastname, password });
    res.status(200).json(user);
  } catch (error) {
    res.json(`Error : ${error}`);
  }
}; 

module.exports = { registerUser };
