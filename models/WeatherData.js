const mongoose = require('mongoose');

const WeatherDataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  pm25: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('WeatherData', WeatherDataSchema);

