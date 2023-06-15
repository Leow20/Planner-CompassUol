import React from "react";

import Header from "../../components/Header";
import PlannerForm from "../../components/PlannerForm";
import Tabs from "../../components/Tabs";

const handleTabClick = (day) => {
  console.log("Aba clicada:", day);
  // Faça o que for necessário com a informação do dia selecionado
};

const Dashboard = () => {
  return (
    <div>
      <Header />
      <PlannerForm />
      <div>
        <Tabs onTabClick={handleTabClick} />
      </div>
    </div>
  );
};

export default Dashboard;
