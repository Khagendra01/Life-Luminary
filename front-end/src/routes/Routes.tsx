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
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ScrollToTop from "./ScrollToTop";


const AllRouteConfig: React.FC = () => {
  const { user, isLoading } = useContext(AuthContext) || {};


  return (
    <>
    {!isLoading && user ? (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/register" element={<Profile />} />
        <Route path="/login" element={<Profile />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/bedtime" element={<BedTime />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    ) : 
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity" element={<Login />} />
        <Route path="/bedtime" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    }
    </>
  );
}

export  { AllRouteConfig };