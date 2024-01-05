import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

import { register } from "../api/authApi.js";
import { useNavigate } from "react-router-dom";

import { RegisterInfo } from "../models/authModel";

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
      <div className="bg-cover bg-center z-50 flex items-center justify-center mt-16">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-lg font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registerInfo.firstName}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-lg font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registerInfo.lastName}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-lg font-medium">
                User Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registerInfo.userName}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registerInfo.email}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registerInfo.password}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registerInfo.confirmPassword}
                onChange={(e) =>
                  handleRegisterInfoChange(
                    e.target.name as keyof RegisterInfo,
                    e.target.value
                  )
                }
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md"
            >
              {loading ? (
                <i className="fa fa-spinner fa-spin w-12" /> // Use a rotating loading icon
              ) : (
                "Sign In"
              )}
            </button>
            <p className="mt-4 text-center">
              Already a user?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
