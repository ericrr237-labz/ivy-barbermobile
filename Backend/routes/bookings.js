import express from "express";

import auth from "../middleware/auth.js";
import {
  createBooking,
  getBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", auth, createBooking);
router.get("/", auth, getBookings);

export default router;
