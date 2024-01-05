
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import notfound from "../assets/notfound.gif"

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src={notfound}
          alt="404 Illustration"
          className="mb-8 w-48 h-48"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Link not found
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          The page you are looking for might be under construction or has been
          moved or does not exists.
        </p>
        <a
          href="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Go back home
        </a>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
