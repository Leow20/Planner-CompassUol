import React, { useEffect, useState } from "react";

import Header from "../../components/Header";
import PlannerForm from "../../components/PlannerForm";
import Tabs from "../../components/Tabs";
import { db } from "../../firebaseConnection";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import "./dashboard.css";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const Dashboard = () => {
  const [date, setDate] = useState("Monday");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tasksTemp, setTasksTemp] = useState([]);

  const storedData = localStorage.getItem("@detailUser");
  const userData = JSON.parse(storedData);

  const myCollection = collection(db, "tarefas");

  const moment = require("moment");

  function handleTabClick(day) {
    setDate(day);
  }

  useEffect(() => {
    const q = query(
      myCollection,
      orderBy("time"),
      where("email", "==", `${userData.email}`),
      where("day", "==", `${date}`)
    );

    onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => {
        setLoading(true);
        list.push({
          id: doc.id,
          time: doc.data().time,
          title: doc.data().task,
          email: doc.data().email,
          day: doc.data().day,
        });
      });
      setTasksTemp(list);
      setLoading(false);
    });
  }, [date]);

  useEffect(() => {
    if (tasksTemp.length > 0) {
      if (tasksTemp[0].day === date) {
        setTasks(tasksTemp);
        console.log(tasks);
      }
    } else {
      setTasks([]);
      console.log(tasks);
    }
  }, [tasksTemp]);

  const itemsRepetidos = tasks.filter(
    (task, index) => tasks.findIndex((t) => t.time === task.time) !== index
  );

  const getDayStyle = (day) => {
    let style = {};

    switch (day) {
      case "Sunday":
        style.backgroundColor = "rgba(255, 0, 36, 0.5)";
        break;
      case "Monday":
        style.backgroundColor = "#ff0024";
        break;
      case "Tuesday":
        style.backgroundColor = "#ff8000";
        break;
      case "Wednesday":
        style.backgroundColor = "#ffce00";
        break;
      case "Thursday":
        style.backgroundColor = "rgba(255, 0, 36, 0.7)";
        break;
      case "Friday":
        style.backgroundColor = "rgba(255, 128, 0, 0.7)";
        break;
      case "Saturday":
        style.backgroundColor = "rgba(255, 206, 0, 0.7)";
        break;
      default:
        style.backgroundColor = "gray";
    }

    return style;
  };

  async function deleteTask(id) {
    const docRef = doc(db, "tarefas", id);

    await deleteDoc(docRef)
      .then(() => {
        toast.success("Tarefa deletada com sucesso!");
      })
      .catch(() => {
        toast.warn("Erro ao deletar tarefa!");
      });
  }

  return (
    <div className="dashboard">
      {loading && (
        <div>
          <sann className="loading-title">We are loading your tasks.</sann>
          <FaSpinner className="loading-icon-dashboard" />
        </div>
      )}
      <div className="tasks-container">
        {date == "#" && <span className="no-tasks">Select a day.</span>}
        {tasks.length === 0 && !loading && date != "#" && (
          <span className="no-tasks">
            You don't have any tasks on this day. :(
          </span>
        )}
        <Header />
        <PlannerForm date={date} />
        <div>
          <Tabs onTabClick={handleTabClick} date={date} />
        </div>
        <div className="box-time">Time</div>
        <div className="tasks-area">
          {loading && (
            <ul>
              {tasks.map((post, index) => {
                const isRepetido = itemsRepetidos.some(
                  (task) => task.time === post.time
                );
                const taskTimeStyle = isRepetido
                  ? { backgroundColor: "gray", color: "white" }
                  : getDayStyle(date);
                const taskClassName = isRepetido
                  ? "repeat-task"
                  : "content-task";
                var taskDisp = isRepetido
                  ? "repeat-task-disp"
                  : "container-tasks";
                const previousTime = index > 0 ? tasks[index - 1].time : null;
                const nextTime =
                  index < tasks.length - 1 ? tasks[index + 1].time : null;
                const isLastRepeatedTask =
                  post.time !== nextTime && post.time === previousTime;

                if (isLastRepeatedTask) {
                  taskDisp = "lasted-repeat";
                }

                return (
                  <div className={taskDisp} key={post.id}>
                    <div className={taskClassName}>
                      {previousTime !== post.time && (
                        <div style={taskTimeStyle} className="task-time">
                          {isRepetido && <div className="ball"></div>}
                          {moment(post.time, "HH:mm").format("HH[h]mm[m]")}
                        </div>
                      )}
                      <article>
                        {isRepetido && <div className="line"></div>}
                        <div style={taskTimeStyle} className="color-tag"></div>
                        <button
                          className="delete-task"
                          onClick={() => deleteTask(post.id, date)}
                        >
                          Delete
                        </button>
                        <p className="title-task">{post.title}</p>
                      </article>
                    </div>
                  </div>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
