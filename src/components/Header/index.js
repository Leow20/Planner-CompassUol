import React from "react";

import LogoutIcon from "../../assets/icons/arrow-right-north 1.svg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConnection";
import Weather from "../../components/Weather";

import "./header.css";

const Header = () => {
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
      <Weather />

      <div className="logout" onClick={handleLogout}>
        <span>Logout</span>
        <img src={LogoutIcon} />
      </div>
    </header>
  );
};

export default Header;
