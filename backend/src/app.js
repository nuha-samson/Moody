import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

const app = express();

// Authorized URLs allowed to communicate with this backend
const allowedOrigins = [
  "https://mood-ie.vercel.app", // Your brand new live Vercel URL
  "http://localhost:5173"        // Keeps your local development working
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, postman, curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
  })
);

// Express 5 compatible route handler for browser preflight safety checks
app.options("*any", (req, res) => {
  res.sendStatus(200);
});

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Moody API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
