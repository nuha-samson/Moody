import express from "express";

import {
  signup,
  login,
  logout,
  getMe,
} from "../controllers/authController.js";

import protect from "./middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;