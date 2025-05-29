const Accommodation = require("../models/Accommodation");

exports.createAccommodation = async (req, res) => {
  try {
    const newAcc = await Accommodation.create({
      ...req.body,
      host: req.user.username,
      host_id: req.user.id,
    });
    res.status(201).json(newAcc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAccommodations = async (req, res) => {
  try {
    const listings = await Accommodation.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.json(accommodation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHostAccommodations = async (req, res) => {
  try {
    console.log('User making request:', req.user);
    const listings = await Accommodation.find({ host_id: req.user.id });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAccommodation = async (req, res) => {
  try {
    const updated = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: 'Accommodation not found' });
  }
};

exports.deleteAccommodation = async (req, res) => {
  try {
    await Accommodation.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};
