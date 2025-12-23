import Booking from "../models/Booking.js";

export async function createBooking(req, res) {
  try {
    const booking = await Booking.create({
      barber: req.user.userId,
      ...req.body,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getBookings(req, res) {
  try {
    const bookings = await Booking.find({
      barber: req.user.userId,
    }).sort({ date: 1, time: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
