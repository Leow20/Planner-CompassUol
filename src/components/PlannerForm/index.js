import "./plannerForm.css";
import React, { useState } from "react";

import { toast } from "react-toastify";

import plusIcon from "../../assets/icons/Shape2.svg";
import minusIcon from "../../assets/icons/Shape.svg";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConnection";
import Modal from "../Modal";

const PlannerForm = ({ date }) => {
  const [task, setTask] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Confirm = "Confirm";

  const storedData = localStorage.getItem("@detailUser");
  const userData = JSON.parse(storedData);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("Tarefa:", task);
    console.log("Dia:", day);
    console.log("Horário:", time);
    console.log("email ", userData.email);

    try {
      if (task == "" || time == "") {
        toast.warn("Preencha todos os campos");
        return new Error();
      }

      if (day !== "") {
        await addDoc(collection(db, "tarefas"), {
          task,
          day,
          time,
          email: userData.email,
        });
      } else {
        await addDoc(collection(db, "tarefas"), {
          task,
          day: date,
          time,
          email: userData.email,
        });
      }

      //  setTask("");
      //  setTime("");
      toast.success("Tarefa Cadastrada com Sucesso!");
    } catch (error) {
      toast.warn("Erro ao Cadastrar Tarefa");
      console.log(error);
    }
  }

  const handleDeleteAll = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="form-container">
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        Confirm={Confirm}
        date={date}
      />
      <form className="form-planner">
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
          <button onClick={handleSubmit} className="button-add" type="submit">
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
