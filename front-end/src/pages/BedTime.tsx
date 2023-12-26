
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const BedTime = () => {
  const readStory = () => {
    // Implement your function to read the story
  };

  const playMusic = () => {
    // Implement your function to play background music
  };

  return (
    <>
    <Navbar />
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src="/path-to-your-image.jpg" alt="Bedtime story" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Bedtime Story</div>
          <p className="mt-2 text-gray-500">This is an example of a bedtime story. It's a short story, but it's a good one.</p>
          <button onClick={readStory} className="mt-3 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-lg">
            <FontAwesomeIcon icon={faVolumeUp} /> Read Story
          </button>
          <button onClick={playMusic} className="mt-3 ml-2 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-lg">
            <FontAwesomeIcon icon={faVolumeUp} /> Play Music
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BedTime;