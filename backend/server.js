import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Moody API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Moody API:", error.message);
    process.exit(1);
  }
};

startServer();