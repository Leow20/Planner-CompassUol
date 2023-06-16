import React, { useEffect, useRef, useState } from "react";

import Header from "../../components/Header";
import PlannerForm from "../../components/PlannerForm";
import Tabs from "../../components/Tabs";
import { db } from "../../firebaseConnection";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import "./dashboard.css";
import backgorundLogo from "../../assets/img/LogoBackgorund.jpg";
import { toast } from "react-toastify";
import { FaFrown, FaSpinner } from "react-icons/fa";

const Dashboard = () => {
  const [date, setDate] = useState("Monday");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedData = localStorage.getItem("@detailUser");
  const userData = JSON.parse(storedData);
  const suaColecaoRef = collection(db, `${date}`);

  const q = query(
    suaColecaoRef,
    orderBy("time"),
    where("email", "==", `${userData.email}`)
  );

  const handleTabClick = (day) => {
    console.log("Aba clicada:", day);
    setDate(day);
  };

  useEffect(() => {
    setLoading(true);

    let list = [];
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          time: doc.data().time,
          title: doc.data().task,
          email: doc.data().email,
        });
      });

      setLoading(false);
      setTasks(list);
    });
  }, [date]);

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

  async function deleteTask(id, day) {
    const docRef = doc(db, `${day}`, id);
    await deleteDoc(docRef)
      .then(() => {
        setTasks(list);
        toast.success("Tarefa deletada com sucesso!");
      })
      .catch(() => {
        toast.warn("Erro ao deletar tarefa!");
      });

    setLoading(true);

    let list = [];
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          time: doc.data().time,
          title: doc.data().task,
          email: doc.data().email,
        });
      });

      setLoading(false);
    });
    setTasks(list);
  }

  console.log(tasks);

  return (
    <div className="dashboard">
      {loading && (
        <div>
          <sann className="loading-title">We are loading your tasks.</sann>
          <FaSpinner className="loading-icon-dashboard" />
        </div>
      )}
      <div className="tasks-container">
        {tasks.length === 0 && !loading && (
          <span className="no-tasks">
            You don't have any tasks on this day. :(
          </span>
        )}
        <Header />
        <PlannerForm date={date} />
        <div>
          <Tabs onTabClick={handleTabClick} />
        </div>
        <div className="tasks-area Flipped">
          <div className="Flipped-again">
            <div className="box-time">Time</div>

            {!loading && (
              <ul>
                {tasks.map((post, index) => {
                  const isRepetido = itemsRepetidos.some(
                    (task) => task.time === post.time
                  );
                  const taskTimeStyle = isRepetido
                    ? { backgroundColor: "gray" }
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
                            {post.time}
                          </div>
                        )}

                        <article>
                          <div
                            style={taskTimeStyle}
                            className="color-tag"
                          ></div>
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
    </div>
  );
};

export default Dashboard;
