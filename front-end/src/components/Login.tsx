import Footer from './Footer';
import Navbar from './Navbar';

const Login = () => {

    

    return (
        <>
        <Navbar />
        <div className="bg-cover bg-center z-50 flex items-center justify-center mt-16">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-lg font-medium">Email</label>
                        <input type="email" id="email" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-lg font-medium">Password</label>
                        <input type="password" id="password" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md">Log In</button>
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Login;