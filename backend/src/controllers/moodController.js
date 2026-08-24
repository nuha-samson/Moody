import Mood from "../models/Mood.js";

export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find()
      .populate("user", "name email")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: moods.length,
      data: moods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch moods",
      error: error.message,
    });
  }
};

export const getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id).populate(
      "user",
      "name email"
    );

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
    res.status(500).json({
      success: false,
      message: "Failed to fetch mood",
      error: error.message,
    });
  }
};

export const createMood = async (req, res) => {
  try {
    const { user, mood, note, date } = req.body;

    if (!user || !mood) {
      return res.status(400).json({
        success: false,
        message: "User and mood are required",
      });
    }

    const newMood = await Mood.create({
      user,
      mood,
      note,
      date,
    });

    res.status(201).json({
      success: true,
      data: newMood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create mood",
      error: error.message,
    });
  }
};

export const updateMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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
    res.status(500).json({
      success: false,
      message: "Failed to update mood",
      error: error.message,
    });
  }
};

export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndDelete(req.params.id);

    if (!mood) {
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
    res.status(500).json({
      success: false,
      message: "Failed to delete mood",
      error: error.message,
    });
  }
};