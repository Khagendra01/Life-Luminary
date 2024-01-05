import { useLocation, useNavigate } from 'react-router-dom';
import { LoginInfo } from '../models/authModel';
import Footer from './Footer';
import Navbar from './Navbar';
import { useContext, useState } from 'react';
import { login } from '../api/authApi';
import { AuthContext } from '../App';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";

const Login = () => {

    const [loginInfo, setloginInfo] = useState<LoginInfo>({ userName: "", password: ""});
    const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();
    const text = location.state;

    const { setUser } = useContext(AuthContext) || {};

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleloginInfoChange = (name: keyof LoginInfo, value: string) => {
        setloginInfo({ ...loginInfo, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await login(loginInfo);
            const token = res?.accessToken;
            if (token !== undefined) {
                localStorage.setItem("accessToken", token);
                setUser(res)
                navigate("/"); 
              }
        } catch (error) {
            // Handle the error
            if( error.message === "NotAllowed"){
                setErrorMessage(`Please, verify your email before loggin in!`);
            }else{
            setErrorMessage(`Sorry ${error.message}`);
            }
            setloginInfo({ userName: "", password: ""})
        } finally {
            // Perform any cleanup or additional actions
            setLoading(false); // Stop loading
        }
    };
    

    return (
        <>
        <Navbar />
        <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" />
        <Input label="Password" size="lg" />
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>


        <div className="bg-cover bg-center z-50 flex items-center justify-center mt-16">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                {text && <p className="text-red-500">{text}</p>}
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-lg font-medium">UserName</label>
                        <input type="text" name="userName"  id="userName" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={loginInfo.userName} onChange={(e) => handleloginInfoChange(e.target.name as keyof LoginInfo, e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-lg font-medium">Password</label>
                        <input type="password" name="password" id="password" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={loginInfo.password} onChange={(e) => handleloginInfoChange(e.target.name as keyof LoginInfo, e.target.value)}/>
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md">{loading ? (
                <i className="fa fa-spinner fa-spin w-12" /> // Use a rotating loading icon
              ) : (
                "Log In"
              )}</button>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Login;