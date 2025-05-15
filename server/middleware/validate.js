exports.validateBooking = (req, res, next) => {
  if (!req.body.seatNumber) {
    return res.status(400).json({ error: "Seat number required" });
  }
  next();
};