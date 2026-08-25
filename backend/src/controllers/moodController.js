import Mood from "../models/Mood.js";

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

    const newMood = await Mood.create({
      user: req.user._id,
      mood,
      note,
      date,
    });

    res.status(201).json({
      success: true,
      data: newMood,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMood = async (req, res, next) => {
  try {
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