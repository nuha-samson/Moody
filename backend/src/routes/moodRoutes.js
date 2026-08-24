import express from "express";

import {
  getMoods,
  getMoodById,
  createMood,
  updateMood,
  deleteMood,
} from "../controllers/moodController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getMoods);
router.get("/:id", getMoodById);
router.post("/", createMood);
router.put("/:id", updateMood);
router.delete("/:id", deleteMood);

export default router;