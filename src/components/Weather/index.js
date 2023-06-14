import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "c656194d523559d390243432e8ab3ebc";
      const city = "London";

      //   https://api.openweathermap.org/data/2.5/weather?q=London&appid=c656194d523559d390243432e8ab3ebc

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.log("Erro ao obter dados do clima:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Condição: {weatherData.weather[0].main}</p>
        </div>
      ) : (
        <p>Carregando dados do clima...</p>
      )}
    </div>
  );
}

export default Weather;
