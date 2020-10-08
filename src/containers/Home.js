import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

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
        <h2>
          Weather in <span>{city}</span>
        </h2>
        <div className="WeatherInfo">
          <div className="WeatherInfo_Basic">
            <div className="WeatherInfo_Image">
              <WeatherImage weatherType={weatherType} />
            </div>
            <p className="WeatherInfo_Type"> {weatherType} </p>
            <h3 className="WeatherInfo_Label">Current Temperature:</h3>
            <p className="WeatherInfo_Temp"> {currentTemp} </p>
          </div>

          <div className="WeatherInfo_Advanced">
            <div className="WeatherInfo_Extra_column">
              <h3 className="WeatherInfo_Label">High Temperature:</h3>
              <p>{highTemp}</p>
              <h3 className="WeatherInfo_Label">Low Temperature:</h3>
              <p>{lowTemp} </p>
            </div>
            <div className="WeatherInfo_Extra_column">
              <h3 className="WeatherInfo_Label">Cloudiness: </h3>
              <p>{cloudiness} </p>
              <h3 className="WeatherInfo_Label">Humidity </h3>
              <p>{humidity}</p>
              <h3 className="WeatherInfo_Label">Wind Speed: </h3>
              <p>{windSpeed}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
