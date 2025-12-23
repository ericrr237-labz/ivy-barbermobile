import express from "express";
import auth from "../middleware/auth.js";
import {
  createRecord,
  getRecords,
} from "../controllers/record.controller.js";

const router = express.Router();

router.post("/", auth, createRecord);
router.get("/", auth, getRecords);

export default router;
