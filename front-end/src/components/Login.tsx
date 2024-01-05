import { useLocation, useNavigate } from "react-router-dom";
import { LoginInfo } from "../models/authModel";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { login } from "../api/authApi";
import { AuthContext } from "../App";

import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";

import loginimg from "../assets/login.svg"

const Login = () => {
  const [loginInfo, setloginInfo] = useState<LoginInfo>({
    userName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const text = location.state;

  const { setUser } = useContext(AuthContext) || {};

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleloginInfoChange = (name: keyof LoginInfo, value: string) => {
    setloginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await login(loginInfo);
      const token = res?.accessToken;
      if (token !== undefined) {
        localStorage.setItem("accessToken", token);
        setUser(res);
        navigate("/");
      }
    } catch (error) {
      // Handle the error
      if (error.message === "NotAllowed") {
        setErrorMessage(`Please, verify your email before loggin in!`);
      } else {
        setErrorMessage(`Sorry ${error.message}`);
      }
      setloginInfo({ userName: "", password: "" });
    } finally {
      // Perform any cleanup or additional actions
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Navbar />
      
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src={loginimg}
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button
            type="button"
            className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <BiLogoFacebook
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <AiOutlineTwitter
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        {text && <p className="text-red-500">{text}</p>}
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          name="userName"
          placeholder="Email or Username"
          value={loginInfo.userName}
                onChange={(e) =>
                  handleloginInfoChange(
                    e.target.name as keyof LoginInfo,
                    e.target.value
                  )
                }
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          name="password"
          placeholder="Password"
          value={loginInfo.password}
                onChange={(e) =>
                  handleloginInfoChange(
                    e.target.name as keyof LoginInfo,
                    e.target.value
                  )
                }
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="/resetPassword"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-gradient-to-r from-primary to-secondary hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={handleSubmit}
          >
            {loading ? (
                <i className="fa fa-spinner fa-spin w-12" /> // Use a rotating loading icon
              ) : (
                "Log In"
              )}
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/register"
          >
            Register
          </a>
        </div>
      </div>
    </section>

      <Footer />
    </>
  );
};

export default Login;
