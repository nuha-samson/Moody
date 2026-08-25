import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    //await connectDB();

    app.listen(PORT, () => {
      console.log(`Moody API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Moody API:", error.message);
    process.exit(1);
  }
};

startServer();

