import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../Pages/LogIn";
import Dashboard from "../Pages/Dashboard";
import Register from "../Pages/Register";
import Private from "./Private";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
