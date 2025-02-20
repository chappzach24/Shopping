import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Auth User & get token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development" ? true : false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
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
  res.send("register User");
});

// @desc    Logout user / clear cookie
// @route   POST /api/users
// @access  Private
const LogoutUser = asyncHandler(async (req, res) => {
  res.send("Logout User");
});

// @desc    get user profile
// @route   Get /api/users/profile
// @access  private
const getUserprofile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc    update user profile
// @route   put /api/users/profile
// @access  private
const updateUserprofile = asyncHandler(async (req, res) => {
  res.send("update user profile");
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
