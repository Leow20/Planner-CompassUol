import React, { useEffect, useRef, useState } from "react";

import Header from "../../components/Header";
import PlannerForm from "../../components/PlannerForm";
import Tabs from "../../components/Tabs";
import { db } from "../../firebaseConnection";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import "./dashboard.css";

const Dashboard = () => {
  const [date, setDate] = useState("Monday");
  const [tasks, setTasks] = useState([]);

  const handleTabClick = (day) => {
    console.log("Aba clicada:", day);
    setDate(day);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("@detailUser");
    const userData = JSON.parse(storedData);
    const suaColecaoRef = collection(db, `${date}`);
    const q = query(suaColecaoRef, orderBy("time"));
    setTasks([]);
    var item = [];

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().email === userData.email) {
            let obej = {
              time: doc.data().time,
              title: doc.data().task,
              id: doc.id,
            };
            item.push(obej);
          }
        });
        setTasks(item);
        console.log(item);
      })
      .catch((error) => {
        console.log("Erro ao baixar os itens:", error);
      });
  }, [date]);

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

  return (
    <div className="dashboard">
      <Header />
      <PlannerForm date={date} />
      <div>
        <Tabs onTabClick={handleTabClick} />
      </div>
      <div className="tasks-area ">
        <div className="box-time">Time</div>

        <div className="tasks-container">
          <ul>
            {tasks.map((post) => {
              return (
                <div className="content-task" key={post.id}>
                  <div style={getDayStyle(date)} className="task-time">
                    {post.time}
                  </div>
                  <article>
                    <div style={getDayStyle(date)} className="color-tag"></div>
                    <button className="delete-task">Delete</button>
                    <p className="title-task">{post.title}</p>
                  </article>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
