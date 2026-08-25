import express from "express";

import {
  getMoods,
  getMoodById,
  createMood,
  updateMood,
  deleteMood,
  deleteAllMoods,
} from "../controllers/moodController.js";

import protect from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getMoods);
router.get("/:id", getMoodById);
router.post("/", createMood);
router.put("/:id", updateMood);
router.delete("/:id", deleteMood);
router.delete("/", deleteAllMoods);

export default router;