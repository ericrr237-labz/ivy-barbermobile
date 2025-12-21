import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    barber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["revenue", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Record", recordSchema);
