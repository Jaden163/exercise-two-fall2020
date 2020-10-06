import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
const weather_key = `3fa26f65abf375ee7374a7f1178b63ba`;

function Home() {
  const history = useHistory();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Seoul");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}`
      )
      .then(function (response) {
        // get request to URL
        setWeatherData(response.data);
      })
      .catch(function (error) {
        // error handle
        console.log(error);
      });
  }, [city]);

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const city = urlParams.get("city");
    if (city) {
      setCity(city);
    }
  }, [history]);

  // derive value and store it as variable
  const {
    // is a object
    cloudiness,
    currentTemp,
    highTemp,
    humidity,
    lowTemp,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    // local vars
    let cloudiness = "";
    let currentTemp = "";
    let highTemp = "";
    let humidity = "";
    let lowTemp = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = `${weatherData.clouds.all}%`;
      currentTemp = `${weatherData.main.temp}`;
      highTemp = `${weatherData.main.temp_max}`;
      humidity = `${weatherData.main.humidity}%`;
      lowTemp = `${weatherData.main.temp_min}`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} km/h`;
    }

    return {
      cloudiness,
      currentTemp,
      highTemp,
      humidity,
      lowTemp,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  return (
    <div>
      <Header />
      <main className="Home">
        <h2>Weather in {city}</h2>
        <div className="WeatherInfo">
          <p>Weather Type: {weatherType} </p>
          <p>Current Temperature: {currentTemp} </p>
          <p>High Temperature: {highTemp} </p>
          <p>Low Temperature: {lowTemp} </p>
          <p>Cloudiness: {cloudiness} </p>
          <p>Humidity {humidity} </p>
          <p>Wind Speed: {windSpeed} </p>
        </div>
      </main>
    </div>
  );
}

export default Home;
