const express = require('express');
const {
  createReservation,
  getReservationsByUser,
  getReservationsByHost,
  deleteReservation,
} = require('../controllers/reservationController');
const protect = require('../middleware/auth');

const router = express.Router();
router.post('/', protect, createReservation);
router.get('/user', protect, getReservationsByUser);
router.get('/host', protect, getReservationsByHost);
router.delete('/:id', protect, deleteReservation);

module.exports = router;
