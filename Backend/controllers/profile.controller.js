import Profile from "../models/Profile.js";

export async function getProfile(req, res) {
  try {
    const profile = await Profile.findOne({ user: req.user.userId });
    res.json(profile || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function upsertProfile(req, res) {
  const { name, shopName, avatarUrl } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name required" });
  }

  try {
    await Profile.findOneAndUpdate(
      { user: req.user.userId },
      {
        $set: { name, shopName, avatarUrl },
        $setOnInsert: { user: req.user.userId, role: "barber" },
      },
      { new: true, upsert: true }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
