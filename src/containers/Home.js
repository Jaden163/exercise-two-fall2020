import React from "react";

import Header from "../components/Header";

const weather_key = `3fa26f65abf375ee7374a7f1178b63ba`;

function Home() {
  return (
    <div className="Home">
      <Header />
      <main>
        <h2>Weather in Seoul</h2>
        <div className="WeatherInfo">
          <p>Weather Type: Cloudy</p>
          <p>Current Temperature: 100 degrees</p>
          <p>High Temperature: 100 degrees</p>
          <p>Low Temperature: 80 degrees</p>
          <p>Cloudiness: 100</p>
          <p>Humidity 35%</p>
          <p>Wind Speed: 3km/h</p>
        </div>
      </main>
    </div>
  );
}

export default Home;
