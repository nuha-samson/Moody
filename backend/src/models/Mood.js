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
          "content",
          "neutral",
          "sad",
          "very sad",
          "excited",
          "relaxed",
          "tired",
          "angry",
          "overwhelmed",
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
      required: true,
    },

    day: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

moodSchema.index(
  { user: 1, day: 1 },
  { unique: true }
);

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;