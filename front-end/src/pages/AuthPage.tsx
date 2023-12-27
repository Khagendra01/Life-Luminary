
import Register from '../components/Register';
import Login from '../components/Login';

const AuthPage = () => {
    return (
        <div className="flex justify-between">
            <div className="w-1/2">
                <Register />
            </div>
            <div className="w-1/2">
                <Login />
            </div>
        </div>
    );
};

export default AuthPage;