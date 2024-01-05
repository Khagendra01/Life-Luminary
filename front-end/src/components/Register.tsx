import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

import { register } from "../api/authApi.js";
import { useNavigate } from "react-router-dom";

import { RegisterInfo } from "../models/authModel";

import signImg from "../assets//signup.svg"

import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";


const Register = () => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [fieldErrors, setFieldErrors] = useState<RegisterInfo>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailValidator = (email: string) => {
    if (!email) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Incorrect email format";
    }
    return "";
  };

  const passwordValidator = (password: string) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must have a minimum 8 characters";
    }
    return "";
  };

  const confirmPasswordValidator = (
    confirmPassword: string,
    password: string
  ) => {
    if (!confirmPassword) {
      return "Confirm password is required";
    } else if (confirmPassword.length < 8) {
      return "Confirm password must have a minimum 8 characters";
    } else if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  useEffect(() => {
    setFieldErrors({
      ...fieldErrors,
      email: emailValidator(registerInfo.email),
      password: passwordValidator(registerInfo.password),
      confirmPassword: confirmPasswordValidator(
        registerInfo.confirmPassword,
        registerInfo.password
      ),
    });
  }, [registerInfo]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegisterInfoChange = (
    name: keyof RegisterInfo,
    value: string
  ) => {
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleSubmit = async () => {
    const allErrors = Object.values(fieldErrors);

    // Check if there are any error messages
    if (allErrors.some((error) => error !== "")) {
      // Join all error messages into a single string
      const errorMessage = allErrors.join(" ");
      setErrorMessage(errorMessage);
    } else if (registerInfo.password !== registerInfo.confirmPassword) {
      setErrorMessage("Passwords do not match!");
    } else {
      setLoading(true);
      setErrorMessage("");
      await register(registerInfo)
        .then(() => {
          navigate("/login", {
            state:
              "Email confirmation is sent, Please verify your email before logging in!",
          });
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          setRegisterInfo({
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setErrorMessage(`Sorry ${error.message}`);
          setLoading(false); // Stop loading
        });
    }
  };

  return (
    <>
      <Navbar />
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">     
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
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" mt-4
          type="text"
          name="firstName"
          placeholder="First Name"
          value={registerInfo.firstName}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="text"
          name="lastName"
          placeholder="First Name"
          value={registerInfo.lastName}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="text"
          name="email"
          placeholder="Email"
          value={registerInfo.email}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="text"
          name="userName"
          placeholder="Username"
          value={registerInfo.userName}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          name="password"
          placeholder="Password"
          value={registerInfo.password}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
        />
         <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={registerInfo.confirmPassword}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-gradient-to-r from-primary to-secondary hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={handleSubmit}
          >
            {loading ? (
                <i className="fa fa-spinner fa-spin w-12" /> // Use a rotating loading icon
              ) : (
                "Sign Up"
              )}
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already a user?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/login"
          >
            Log In
          </a>
        </div>
      </div>
      <div className="md:w-1/3 max-w-sm">
        <img
          src={signImg}
          alt="Sample image"
        />
      </div>
    </section>

      <Footer />
    </>
  );
};

export default Register;
