// app.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Route for IoT device to send data
app.post('/iot-data', (req, res) => {
  console.log('Received data:', req.body);
  res.status(200).send('Data received');
});

// Route to get weather data
app.get('/weather', async (req, res) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=your_city&appid=${process.env.WEATHER_API_KEY}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

