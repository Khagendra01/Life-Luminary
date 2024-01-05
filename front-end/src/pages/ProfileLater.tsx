
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChangeEvent, useContext, useState } from 'react';
import { AuthContext } from '../App';

const Profile = () => {

  const { user } = useContext(AuthContext) || {};

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Implement logic to save the edited bio
    // For example, you can send a request to update the bio on the server
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset the bio to its original value
  };

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };


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
          {user.firstName}  {user.lastName}
        </h2>
        <p className="text-gray-600 text-center mb-4">{user.userName}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700 font-semibold">Email:</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="mt-6">
  <p className="text-gray-700 font-semibold">Bio:</p>
  {isEditing ? (
    <div className="mt-2">
      <textarea
        value={bio}
        onChange={handleBioChange}
        className="text-gray-600 border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Write your bio here..."
      />
      <div className="mt-2">
        <button onClick={handleSaveClick} className="btn-primary mr-2">
          Save
        </button>
        <button onClick={handleCancelClick} className="btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className="mt-2">
      <p className="text-gray-600">{bio}</p>
      <button onClick={handleEditClick} className="btn-bg-primary mt-2">
        Edit
      </button>
    </div>
  )}
</div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default Profile;
