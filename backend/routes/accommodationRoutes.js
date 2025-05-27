const express = require('express');
const {
  createAccommodation,
  getAccommodations,
  getHostAccommodations,
  deleteAccommodation,
  updateAccommodation
} = require('../controllers/accommodationController');
const protect = require('../middleware/auth');

const router = express.Router();
router.post('/', protect, createAccommodation);
router.get('/', getAccommodations);
router.get('/host', protect, getHostAccommodations);
router.put('/:id', protect, updateAccommodation);
router.delete('/:id', protect, deleteAccommodation);

module.exports = router;
