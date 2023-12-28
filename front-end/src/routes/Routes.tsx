import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

import About from "../pages/About";
import Home from "../pages/Home";
import ContactUs from "../pages/ContactUs";
import Feed from "../pages/Feed";
import BedTime from "../pages/BedTime";
import Register from "../components/Register";
import Login from "../components/Login";
import Activity from "../pages/Activity";
import { AuthContext } from "../App";

const RouteConfig = () => {
  const { user } = useContext(AuthContext) || {};

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity" element={user ? <Activity /> : <Navigate to="/login" />} />
        <Route path="/bedtime" element={user ? <BedTime /> : <Navigate to="/login" />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteConfig;