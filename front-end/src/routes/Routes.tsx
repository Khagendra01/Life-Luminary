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

const PrivateRoute: React.FC<{ path: string, element: React.ReactElement }> = ({ path, element }) => {
  const { user, isLoading } = useContext(AuthContext) || {};

  if (isLoading) {
    return <div>Loading...</div>; // or your loading component
  }

  return user ? <Route path={path} element={element} /> : <Navigate to="/login" />;
};

const RouteConfig: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/activity" element={<Activity />} />
        <PrivateRoute path="/bedtime" element={<BedTime />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteConfig;