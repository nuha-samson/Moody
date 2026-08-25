import mongoose from "mongoose";
import Mood from "../models/Mood.js";

const getDayKey = (date) => {
  return date.toISOString().slice(0, 10);
};

export const getMoods = async (req, res, next) => {
  try {
    const moods = await Mood.find({
      user: req.user._id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: moods.length,
      data: moods,
    });
  } catch (error) {
    next(error);
  }
};

export const getMoodById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    const mood = await Mood.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    res.status(200).json({
      success: true,
      data: mood,
    });
  } catch (error) {
    next(error);
  }
};

export const createMood = async (req, res, next) => {
  try {
    const { mood, note, date } = req.body;

    if (!mood) {
      return res.status(400).json({
        success: false,
        message: "Mood is required",
      });
    }

    const moodDate = date ? new Date(date) : new Date();

    if (Number.isNaN(moodDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    const day = getDayKey(moodDate);

    const existingMood = await Mood.findOne({
      user: req.user._id,
      day,
    });

    if (existingMood) {
      return res.status(409).json({
        success: false,
        message: "You already have a mood entry for this day",
      });
    }

    const newMood = await Mood.create({
      user: req.user._id,
      mood,
      note,
      date: moodDate,
      day,
    });

    res.status(201).json({
      success: true,
      data: newMood,
    });
  } catch (error) {
    // Handles the database unique-index race condition too.
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You already have a mood entry for this day",
      });
    }

    next(error);
  }
};

export const updateMood = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    const { mood, note } = req.body;

    if (!mood) {
      return res.status(400).json({
        success: false,
        message: "Mood is required",
      });
    }

    const updatedMood = await Mood.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        mood,
        note,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMood) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedMood,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMood = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    const deletedMood = await Mood.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedMood) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mood deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAllMoods = async (req, res, next) => {
  try {
    const result = await Mood.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "All moods deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    next(error);
  }
};