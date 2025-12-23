import Record from "../models/Record.js";

export async function createRecord(req, res) {
  try {
    const record = await Record.create({
      barber: req.user.userId,
      ...req.body,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getRecords(req, res) {
  try {
    const records = await Record.find({
      barber: req.user.userId,
    });

    const revenue = records
      .filter(r => r.type === "revenue")
      .reduce((sum, r) => sum + r.amount, 0);

    const expenses = records
      .filter(r => r.type === "expense")
      .reduce((sum, r) => sum + r.amount, 0);

    res.json({
      records,
      totals: {
        revenue,
        expenses,
        profit: revenue - expenses,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
