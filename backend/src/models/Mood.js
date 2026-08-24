import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mood: {
      type: String,
      required: true,
      enum: [
        "happy",
        "sad",
        "angry",
        "anxious",
        "calm",
        "excited",
        "neutral",
      ],
    },

    note: {
      type: String,
      trim: true,
      maxlength: 1000,
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

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;