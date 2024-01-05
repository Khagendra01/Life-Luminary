import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../App";

const Profile = () => {
  const { user } = useContext(AuthContext) || {};

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <img
            src="https://placekitten.com/200/200" // Replace with your profile picture URL
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600 text-center mb-4">{user.userName}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-semibold">Email:</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="mt-6"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
