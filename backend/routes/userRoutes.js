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
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.post("/logout", LogoutUser);
router.post("/auth", authUser);
router
  .route("/profile")
  .get(protect, getUserprofile)
  .put(protect, updateUserprofile);
router.route("/:id").get(protect, admin, getUserbyID).delete(protect, admin, deleteUsers).put(protect, admin, updateUser);

export default router;
