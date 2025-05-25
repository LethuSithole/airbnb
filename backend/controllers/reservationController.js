const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  try {
    const newRes = await Reservation.create({ ...req.body, user: req.user.id });
    res.status(201).json(newRes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReservationsByUser = async (req, res) => {
  const reservations = await Reservation.find({ user: req.user.id }).populate('accommodation');
  res.json(reservations);
};

exports.getReservationsByHost = async (req, res) => {
  const reservations = await Reservation.find({ host: req.user.id }).populate('accommodation');
  res.json(reservations);
};

exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
};
