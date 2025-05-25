const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accommodation: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation' },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
  guests: Number,
});

module.exports = mongoose.model('Reservation', reservationSchema);
