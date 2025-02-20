import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  LogoutUser,
  getUserprofile,
  updateUserprofile,
  getUsers,
  getUserbyID,
  deleteUsers,
  updateUser,
} from "../controllers/userController.js";

router.route("/").get(getUsers).post(registerUser);
router.post("/logout", LogoutUser);
router.post("/login", authUser);
router.route("/profile").get(getUserprofile).put(updateUserprofile);
router.route("/:id").get(getUserbyID).delete(deleteUsers).put(updateUser);

export default router;
