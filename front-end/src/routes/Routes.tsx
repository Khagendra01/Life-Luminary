import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react";

import About from "../pages/About";
import Home from "../pages/Home";
import ContactUs from "../pages/ContactUs";
import Feed from "../pages/Feed";
import BedTime from "../pages/BedTime";
import Register from "../components/Register";
import Login from "../components/Login";
import Activity from "../pages/Activity";
import { AuthContext } from "../App";

interface RequireAuthProps {
  children: ReactNode;
}

function RequireAuth({ children }: RequireAuthProps): JSX.Element {
  const { user, isLoading } = useContext(AuthContext) || {};

  if (isLoading) {
    return <div>Loading...</div>; // or your loading component
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

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
        <Route path="/activity" element={<RequireAuth>{<Activity />}</RequireAuth>} />
        <Route path="/bedtime" element={<RequireAuth>{<BedTime />}</RequireAuth>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteConfig;