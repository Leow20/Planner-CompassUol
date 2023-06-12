import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../Pages/LogIn";
import Dashboard from "../Pages/Dashboard";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
