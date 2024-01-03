import { useNavigate } from 'react-router-dom';
import { LoginInfo } from '../models/authModel';
import Footer from './Footer';
import Navbar from './Navbar';
import { useState } from 'react';
import { login } from '../api/authApi';

const Login = () => {

    const [loginInfo, setloginInfo] = useState<LoginInfo>({ userName: "", password: ""});
    //const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleloginInfoChange = (name: keyof LoginInfo, value: string) => {
        setloginInfo({ ...loginInfo, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            const res = await login(loginInfo);
            const token = res?.accessToken;
            if (token !== undefined) {
                localStorage.setItem("accessToken", token);
                navigate("/bedTime"); 
              }
        } catch (error) {
            // Handle the error
            console.error(error);
            setloginInfo({ userName: "", password: ""})
        } finally {
            // Perform any cleanup or additional actions
            // setLoading(false); // Stop loading
        }
    };
    

    return (
        <>
        <Navbar />
        <div className="bg-cover bg-center z-50 flex items-center justify-center mt-16">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-lg font-medium">UserName</label>
                        <input type="text" name="userName"  id="userName" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={loginInfo.userName} onChange={(e) => handleloginInfoChange(e.target.name as keyof LoginInfo, e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-lg font-medium">Password</label>
                        <input type="password" name="password" id="password" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={loginInfo.password} onChange={(e) => handleloginInfoChange(e.target.name as keyof LoginInfo, e.target.value)}/>
                    </div>
                    <button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md">Log In</button>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Login;