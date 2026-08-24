import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    mood: {
      type: String,
      required: [true, "Mood is required"],
      enum: {
        values: [
          "happy",
          "sad",
          "angry",
          "anxious",
          "calm",
          "excited",
          "neutral",
        ],
        message: "Invalid mood",
      },
    },

    note: {
      type: String,
      trim: true,
      maxlength: [1000, "Note cannot exceed 1000 characters"],
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

moodSchema.index({ user: 1, date: -1 });

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;