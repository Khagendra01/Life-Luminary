

import Navbar from './Navbar';
import Footer from './Footer';
import { useState } from 'react';

const Register = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e:any) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
        } else {
            setErrorMessage("");
            // Submit the form
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
                        <label htmlFor="name" className="block text-lg font-medium">Name</label>
                        <input type="text" id="name" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-lg font-medium">Email</label>
                        <input type="email" id="email" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-lg font-medium">Password</label>
                        <input type="password" id="password" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-lg font-medium">Confirm Password</label>
                        <input type="password" id="confirmPassword" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={confirmPassword} onChange={handleConfirmPasswordChange} />
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