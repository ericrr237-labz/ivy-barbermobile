import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import bookingRoutes from "./routes/bookings.js";
import recordRoutes from "./routes/records.js";

console.log("🔥 SERVER.JS LOADED 🔥");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "IVY Barber API running" });
});

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);
app.use("/api/records", recordRoutes);

// Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
