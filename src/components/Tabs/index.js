import React, { useState } from "react";
import "./tabs.css";

function Tabs({ onTabClick }) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (day, index) => {
    if (index !== activeTab) {
      setActiveTab(index);
      onTabClick(day);
    }
  };

  return (
    <div className="tabs-container">
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(day, index)}
          className={`tab ${
            index === activeTab ? "active" : ""
          } ${day.toLowerCase()}`}
        >
          {day}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
