import React, { useEffect, useState } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConnection";

import "./weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [cidade, setCidade] = useState("");

  async function buscarUserInfos() {
    const storedData = localStorage.getItem("@detailUser");

    const userData = JSON.parse(storedData);

    const userRef = collection(db, "users");
    await getDocs(userRef)
      .then((snapshot) => {
        let list = [];

        snapshot.forEach((doc) => {
          if (userData.email === doc.data().email) {
            list.push({
              id: doc.id,
              email: doc.data().email,
              country: doc.data().country,
              city: doc.data().city,
            });
          }
        });

        setUserInfo(list);
        setCidade(list[0].city);
      })
      .catch((error) => {
        console.log("Erro ao acessar o db");
      });
  }

  useEffect(() => {
    buscarUserInfos();

    const fetchWeatherData = async () => {
      if (userInfo && userInfo.length > 0) {
        const apiKey = "c656194d523559d390243432e8ab3ebc";

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}`;

        try {
          const response = await axios.get(url);

          setWeatherData(response.data);

          setIcon(
            `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
          );
        } catch (error) {
          console.log("Erro ao obter dados do clima:", error);
        }
      }
    };

    fetchWeatherData();
  }, [cidade]);

  return (
    <div>
      {weatherData ? (
        <div>
          <p className="city-name">
            {weatherData.name} - {userInfo[0].country}
          </p>
          <div className="content-temp">
            <img className="img-clima" src={icon} alt="icone do clima" />
            <p className="temp">
              {Math.round(weatherData.main.temp - 273.15)}°
            </p>
          </div>
        </div>
      ) : (
        <p>Carregando dados do clima...</p>
      )}
    </div>
  );
}

export default Weather;
