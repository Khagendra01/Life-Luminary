import Navbar from './Navbar';
import Footer from './Footer';
import { useState } from 'react';

import { register } from "../api/authApi.js"
import { useNavigate } from 'react-router-dom';

import { RegisterInfo } from "../models/authModel";

const Register = () => {

    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({ firstName: "", lastName: "", emailAddress: "", password: "", confirmPassword: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleRegisterInfoChange = (name: keyof RegisterInfo, value: string) => {
        setRegisterInfo({ ...registerInfo, [name]: value });
    }

    const handleSubmit = async() => {
        if (registerInfo.password !== registerInfo.confirmPassword) {
            setErrorMessage("Passwords do not match!");
        } else {
            setErrorMessage("");
            await register(registerInfo)
            .then(() => {
                navigate("/login", {state: "Thank you for signing up. Please sign in"})
            })
            .catch((error) => {
              alert(`Sorry ${error.message}`);
            });

        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-cover bg-center z-50 flex items-center justify-center mt-16">
                <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-lg font-medium">First Name</label>
                            <input type="text" id="firstName" name="firstName" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={registerInfo.firstName} onChange={(e) => handleRegisterInfoChange(e.target.name as keyof RegisterInfo, e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-lg font-medium">Last Name</label>
                            <input type="text" id="lastName" name="lastName" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={registerInfo.lastName} onChange={(e) => handleRegisterInfoChange(e.target.name as keyof RegisterInfo, e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-lg font-medium">Email</label>
                            <input type="email" id="emailAddress" name="emailAddress" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={registerInfo.emailAddress} onChange={(e) => handleRegisterInfoChange(e.target.name as keyof RegisterInfo, e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-lg font-medium">Password</label>
                            <input type="password" id="password" name="password" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={registerInfo.password} onChange={(e) => handleRegisterInfoChange(e.target.name as keyof RegisterInfo, e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-lg font-medium">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={registerInfo.confirmPassword} onChange={(e) => handleRegisterInfoChange(e.target.name as keyof RegisterInfo, e.target.value)} />
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <button className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md">Sign Up</button>
                        <p className="mt-4 text-center">Already a user? <a href="/login" className="text-blue-500 hover:underline">Log In</a></p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;