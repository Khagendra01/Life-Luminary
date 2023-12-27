import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "../pages/About";
import Home from "../pages/Home";
import ContactUs from "../pages/ContactUs";
import Feed from "../pages/Feed";
import BedTime from "../pages/BedTime";
import Register from "../components/Register";
import Login from "../components/Login";
import Activity from "../pages/Activity";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/bedtime" element={<BedTime />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteConfig;
