const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({
      success: true,
      message: "Missing username or password or email or confirm password.",
    });
  } else {
    try {
      const user = await User.findOne({ username });
      if (user) {
        res.status(401).json({
          success: false,
          message: "Username already used",
        });
      } else {
        const mail = await User.findOne({ email });

        if (mail) {
          res.status(401).json({
            success: false,
            message: "Email already used",
          });
        } else {
          // const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            username,
            email,
            password,
          });
          await newUser.save();

          return res.json({
            success: true,
            message: "Register successfully.",
            newUser,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password.",
    });
  }
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Incorrect username or password.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login success",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const SetAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: avatarImage,
    });

    return res.status(200).json({
      success: true,
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const AllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "-password",
      "-isAvatarImageSet",
    ]);

    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const Logout = async (req, res) => {};

module.exports = { Register, Login, SetAvatar, AllUsers, Logout };
