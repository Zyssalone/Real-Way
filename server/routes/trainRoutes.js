const express = require('express');
const { getAllTrains } = require('../controllers/trainController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, getAllTrains);

module.exports = router;