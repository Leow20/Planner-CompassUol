import "./plannerForm.css";
import React, { useState } from "react";

import plusIcon from "../../assets/icons/Shape2.svg";
import minusIcon from "../../assets/icons/Shape.svg";

const PlannerForm = () => {
  const [task, setTask] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Tarefa:", task);
    console.log("Dia:", day);
    console.log("Horário:", time);
  };

  const handleDeleteAll = () => {
    console.log("Excluir todas as tarefas");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-planner">
        <div className="input-group">
          <input
            className="input-title"
            type="text"
            id="task"
            value={task}
            onChange={handleTaskChange}
            placeholder="Task or Issue"
          />
        </div>

        <div className="input-group">
          <select
            className="select-day"
            id="day"
            value={day}
            onChange={handleDayChange}
            placeholder="Select a Day"
          >
            <option value="">Select a Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <div className="input-group">
          <input
            className="select-time"
            placeholder="Select a time"
            type="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
          />
        </div>
        <div className="submit-buttons">
          <button className="button-add" type="submit">
            <img className="icon" src={plusIcon} /> Add to Calendar
          </button>
          <button className="button-delelte-all" onClick={handleDeleteAll}>
            <img className="icon" src={minusIcon} /> Delete All
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlannerForm;
