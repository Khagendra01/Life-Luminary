import { BrowserRouter, Route, Routes} from "react-router-dom";
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
import Profile from "../pages/profile";


const AllRouteConfig: React.FC = () => {
  const { user, isLoading } = useContext(AuthContext) || {};


  return (
    <>
    {!isLoading && user ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/bedtime" element={<BedTime />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    ) : 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity" element={<Login />} />
        <Route path="/bedtime" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    }
    </>
  );
}

export  { AllRouteConfig };