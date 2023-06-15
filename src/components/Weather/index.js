import React, { useEffect, useState } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConnection";

import cloudIcon from "../../assets/icons/cloudIcon.svg";

import "./weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
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

        console.log(url);

        try {
          const response = await axios.get(url);
          console.log(response);
          setWeatherData(response.data);
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
            <img src={cloudIcon} />
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
