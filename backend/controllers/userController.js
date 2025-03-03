import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth User & get token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users
// @access  Private
const LogoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out!" });
});

// @desc    get user profile
// @route   Get /api/users/profile
// @access  private
const getUserprofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    update user profile
// @route   put /api/users/profile
// @access  private
const updateUserprofile = asyncHandler(async (req, res) => {
const user = await User.findById(req.user._id);

if (user) {
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
} else {
  res.status(404);
  throw new Error("User not found");
}
});

// @desc    get users
// @route   get /api/users/
// @access  private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc    get user by id
// @route   get /api/users/:id
// @access  private/Admin
const getUserbyID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc    delete user
// @route   delete /api/users/:id
// @access  private/admin
const deleteUsers = asyncHandler(async (req, res) => {
  res.send("delete users");
});

// @desc    update user
// @route   put /api/users/:id
// @access  private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  LogoutUser,
  getUserprofile,
  updateUserprofile,
  getUsers,
  getUserbyID,
  deleteUsers,
  updateUser,
};
