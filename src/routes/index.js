import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../Pages/LogIn";
import Dashboard from "../Pages/Dashboard";
import Register from "../Pages/Register";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
