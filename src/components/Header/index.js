import React, { useState, useEffect } from "react";

import LogoutIcon from "../../assets/icons/arrow-right-north 1.svg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConnection";
import Weather from "../../components/Weather";

import darkLogo from "../../assets/img/DarkLogoCompass.png";

import moment from "moment";

import "./header.css";

const Header = () => {
  const [horaAtual, setHoraAtual] = useState("");
  const [dataAtual, setDataAtual] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => {
      const agora = moment();
      const horaFormatada = agora.format("HH:mm");
      const dataFormatada = agora.format("MMMM Do, YYYY");
      setHoraAtual(horaFormatada);
      setDataAtual(dataFormatada);
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header>
      <div className="box-container">
        <h5 className="title-container">Weekly Planner</h5>
        <p className="subtitle-container">
          Use this planner to organize your daily issues.
        </p>
      </div>

      <div className="time-container">
        <span className="time-content">{horaAtual}</span>
        <span className="date-content">{dataAtual}</span>
      </div>

      <div className="weather">
        <Weather />
      </div>

      <div className="dark-logo">
        <a href="https://compass.uol/en/home/">
          <img src={darkLogo} />
        </a>
      </div>

      <div className="logout">
        <img src={LogoutIcon} onClick={handleLogout} />
        <span>Logout</span>
      </div>
    </header>
  );
};

export default Header;
