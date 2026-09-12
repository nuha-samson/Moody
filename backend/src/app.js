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

const allowedOrigin = ["https://vercel.app", "http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


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