const express = require('express');
const {
  createAccommodation,
  getAccommodations,
  getHostAccommodations,
  deleteAccommodation,
} = require('../controllers/accommodationController');
const protect = require('../middleware/auth');

const router = express.Router();
router.post('/', protect, createAccommodation);
router.get('/', getAccommodations);
router.get('/host', protect, getHostAccommodations);
router.delete('/:id', protect, deleteAccommodation);

module.exports = router;
