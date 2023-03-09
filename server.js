// sets up using env variables
require("dotenv").config();

// get express
const express = require("express");

// lets our front end and back end communicate without moaning
const cors = require("cors");

// get our instance of express into app
const app = express();

// middleware (bridge between servers)
app.use(cors());

// import our data
const data = require("./data/weather.json");

// what port is our server going to be on
const PORT = process.env.PORT || 8080;

// home route
app.get("/", (request, response) => {
  response.json("This is the home route. The root if you will. Good day.");
});

// weather endpoint
app.get("/weather", (request, response) => {
  // destucturing our properties from request.query
  const { lat, lon, searchQuery } = request.query;

  // using .find(), check which city has a matching searchQuery
  const cityMatch = data.find((city) => city.city_name.toLowerCase() === searchQuery.toLowerCase());

  // create a Forecast object for each date in the cityMatch data
  const forecasts = [];
  cityMatch.data.forEach((day) => {
    forecasts.push({ date: day.datetime, description: day.weather.description });
  });

  response.json(forecasts);
});

// start the server
app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`));
