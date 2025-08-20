import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
console.log("DB URL:", process.env.DATABASE_URL);

// Kết nối MongoDB
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Route test
app.get("/", (req, res) => {
  res.send("Hello from backend 👋");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
