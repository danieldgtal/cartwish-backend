const mongoose = require("mongoose");
const path = require("path");

// Ensure .env is loaded when this file is required directly (safe no-op if already loaded)
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Prefer MONGO_URI (matches backend/.env). Fall back to localhost for convenience in dev.
const mongoUri = process.env.MONGO_URI || process.env.DATABASE || "mongodb://localhost:27017/cartwish";

if (!process.env.MONGO_URI && !process.env.DATABASE) {
    console.warn("Warning: MONGO_URI / DATABASE not set — using fallback mongodb://localhost:27017/cartwish");
}

// connect to db
mongoose
    .connect(mongoUri, {})
    .then(() => console.log("DB Connected..."))
    .catch((err) => console.log(`DB Connection Error : ${err}`));
