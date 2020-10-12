import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";

const weather_key = `3fa26f65abf375ee7374a7f1178b63ba`;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Home() {
  const history = useHistory();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Seoul");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weather_key}`
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
    city_date,
    city_time,
    cloudiness,
    currentTemp,
    highTemp,
    humidity,
    lowTemp,
    timePercent,
    weatherType,
    windSpeed,
  } = useMemo(() => {
    // local vars
    let city_date = "";
    let city_time = "";
    let cloudiness = "";
    let currentTemp = "";
    let highTemp = "";
    let humidity = "";
    let lowTemp = "";
    let timePercent = "";
    let weatherType = "";
    let windSpeed = "";

    if (weatherData) {
      cloudiness = `${weatherData.clouds.all}%`;
      currentTemp = `${Math.round(weatherData.main.temp)}°F`;
      highTemp = `${Math.round(weatherData.main.temp_max)}°F`;
      humidity = `${weatherData.main.humidity}%`;
      lowTemp = `${Math.round(weatherData.main.temp_min)}°F`;
      weatherType = `${weatherData.weather[0].description}`;
      windSpeed = `${weatherData.wind.speed} m/h`;

      const d = new Date();
      const city_dt = new Date(
        weatherData.dt * 1000 +
          weatherData.timezone * 1000 +
          d.getTimezoneOffset() * 60 * 1000
      );

      const dayOfWeek = city_dt.getDay();
      const month = city_dt.getMonth();
      const calendarDate = city_dt.getDate();
      const year = city_dt.getFullYear();
      let hour = city_dt.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      let minutes = city_dt.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      city_date = `${days[dayOfWeek]}, ${months[month]} ${calendarDate}, ${year}`;
      city_time = `${hour}:${minutes}`;
      timePercent = hour / 24;
    }

    return {
      city_date,
      city_time,
      cloudiness,
      currentTemp,
      highTemp,
      humidity,
      lowTemp,
      timePercent,
      weatherType,
      windSpeed,
    };
  }, [weatherData]);

  return (
    <div>
      <Header />
      <main className="Home">
        <div className="CityInfo">
          <h2>
            <span>{city}</span>
          </h2>
          <h3>{city_time}</h3>
          <h4>{city_date}</h4>
        </div>
        <div
          className="WeatherInfo"
          style={{
            backgroundColor: `rgba(247, 180, 44, ${timePercent})`,
          }}
        >
          <div className="WeatherInfo_Core">
            <p className="WeatherInfo_Type"> {weatherType} </p>
            <div className="WeatherInfo_ImageTemp">
              <div className="WeatherInfo_Image">
                <WeatherImage weatherType={weatherType} />
                <span className="WeatherInfo_Temp"> {currentTemp} </span>
              </div>
            </div>
          </div>

          <div className="WeatherInfo_Extra">
            <div className="WeatherInfo_Split">
              <h3 className="WeatherInfo_Label">High Temperature:</h3>
              <p>{highTemp}</p>
              <h3 className="WeatherInfo_Label">Low Temperature:</h3>
              <p>{lowTemp} </p>
            </div>
            <div className="WeatherInfo_Split">
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
