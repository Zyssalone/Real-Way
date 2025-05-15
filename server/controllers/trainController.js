const Train = require('../models/Train');

exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.getAll();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};