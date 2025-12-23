import express from "express";
import auth from "../middleware/auth.js";
import {
  getProfile,
  upsertProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

// protect all profile routes
router.use(auth);

router.get("/", getProfile);
router.post("/", upsertProfile);

export default router;
