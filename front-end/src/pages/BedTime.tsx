
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useContext, useEffect, useState } from 'react';
import bed from '../assets/bed.jpg';
import { getMyStory } from '../api/bedTime';
import { AuthContext } from '../App';
import writingPeter from "../assets/writingPeter.gif"

const BedTime = () => {

  const { user } = useContext(AuthContext) || {};

  const [story, setStory] = useState<string | undefined>("");

  const [title, setTitle] = useState<string | undefined>("Title");

  const [loading, setLoading] = useState(true);

  const [audio] = useState(new Audio('/assets/bg.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

const getTheStory = async() => {

  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toISOString().split("T")[0];

  await getMyStory( user?.id, formattedDate)
  .then((res) => {
    setStory(res?.content)
    setTitle(res?.title)
    setLoading(false)
  })
  .catch((error) => {
    alert(`Sorry ${error.message}`);
  });
}


  useEffect(() =>
  {
    setLoading(true)
    getTheStory();
  },[user])


  const playMusic = () => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
      setIsPlaying(true);
     }
    };

    const readStory = () => {
      const utterance = new SpeechSynthesisUtterance(story);
      const voices = window.speechSynthesis.getVoices();
      const femaleVoices = voices.filter(voice => voice.voiceURI.includes('female'));
      if (femaleVoices.length > 0) {
        utterance.voice = femaleVoices[0]; // Change this to select different female voices
      }
      utterance.pitch = 1.2; // Adjust the pitch. Higher values sound more female.
      utterance.rate = 0.7; // Adjust the rate. Lower values sound more like storytelling.
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      } else {
        window.speechSynthesis.speak(utterance);
      }
    };

  return (
    <>
    <Navbar />
    { loading ? <div className="flex flex-col items-center justify-center"> <img
          src={writingPeter}
          alt="404 Illustration"
          className="mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Writing your story!!!
        </h1>
         </div>:
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
        <img className="h-full md:h-48 w-full md:w-48 object-cover" src={bed} alt="Bedtime story" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
          <button onClick={readStory} className="mt-3 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-lg">
            <FontAwesomeIcon icon={faVolumeUp} /> Read Story
          </button>
          <button onClick={playMusic} className="mt-3 ml-2 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-lg">
            <FontAwesomeIcon icon={faVolumeUp} /> Play Music
          </button>
          <p className="mt-2 text-gray-500">{story}</p>
        </div>
      </div>
    </div>
    }
    <Footer />
    </>
  );
};

export default BedTime;