
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import bed from '../assets/bed.jpg';

const BedTime = () => {

  const [story, setStory] = useState<string>("Life Luminary is about more than just documenting your routine - it's about capturing those moments that make life worth living. It's about the small victories, the acts of kindness, the unexpected joys. Watering a plant, tidying your room, offering your bus seat to an elder, or donating to a cause close to your heart. These are the highlights of our days, and Life Luminary is here to help you recognize and appreciate them. But what if you don't have a highlight to share? That's okay. Life Luminary understands. Just by being here, living and breathing, you've made a difference. Each day you're alive is a day worth celebrating, and Life Luminary will make sure you remember that. Our goal is simple: to inspire a ripple of positivity, one day at a time. We believe in the power of small actions to make the world a better place, and we've designed Life Luminary to facilitate that belief. But Life Luminary is more than just a daily journal. It's a tool for reflection and growth. You can track your weekly, monthly, or yearly activities, analyze patterns, and identify areas for improvement. And when you're ready, you can generate a PDF of your entries, share your journey with others, and inspire them to join you in making the world a better place. Life Luminary is more than just an app. It's a movement. It's a commitment to conscious living and active kindness. And it's an invitation for you to join us in making a difference, one entry each day.");

  const [audio] = useState(new Audio('/assets/bg.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
        <img className="h-full md:h-48 w-full md:w-48 object-cover" src={bed} alt="Bedtime story" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Bedtime Story</div>
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
    <Footer />
    </>
  );
};

export default BedTime;