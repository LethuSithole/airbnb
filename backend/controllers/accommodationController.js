const Accommodation = require('../models/Accommodation');

exports.createAccommodation = async (req, res) => {
  try {
    const newAcc = await Accommodation.create({ ...req.body, host: req.user.id });
    res.status(201).json(newAcc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAccommodations = async (req, res) => {
  const listings = await Accommodation.find();
  res.json(listings);
};

exports.deleteAccommodation = async (req, res) => {
  try {
    await Accommodation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
};
