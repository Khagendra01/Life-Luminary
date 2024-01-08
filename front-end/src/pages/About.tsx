import logo from "../assets/logoM.png";
import typing from "../img/typing.gif";
import comm from "../img//comm.gif";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import writing from "../img/writing.gif"

const About = () => {
  // Function body goes here

  return (
    <>
      <div className="font-sans min-h-screen text-gray-900 bg-gray-100">
        <Navbar />
        <div className="flex flex-col items-center py-12 space-y-8">
          <img src={logo} alt="Logo" className=" h-32 md:h-48" />
          <h1 className="text-4xl font-semibold">About Us</h1>
          <p className="mx-4 text-lg text-center">
            PratiDin is about more than just documenting your routine -
            it's about capturing those moments that make life worth living. It's
            about the small victories, the acts of kindness, the unexpected
            joys. Watering a plant, tidying your room, offering your bus seat to
            an elder, or donating to a cause close to your heart. These are the
            highlights of our days, and PratiDin is here to help you
            recognize and appreciate them. But what if you don't have a
            highlight to share? That's okay. PratiDin understands. Just by
            being here, living and breathing, you've made a difference. Each day
            you're alive is a day worth celebrating, and PratiDin will make
            sure you remember that. Our goal is simple: to inspire a ripple of
            positivity, one day at a time. We believe in the power of small
            actions to make the world a better place, and we've designed PratiDin to facilitate that belief. But PratiDin is more than
            just a daily journal. It's a tool for reflection and growth. You can
            track your weekly, monthly, or yearly activities, analyze patterns,
            and identify areas for improvement. And when you're ready, you can
            generate a PDF of your entries, share your journey with others, and
            inspire them to join you in making the world a better place. PratiDin is more than just an app. It's a movement. It's a
            commitment to conscious living and active kindness. And it's an
            invitation for you to join us in making a difference, one entry each
            day.
          </p>
          {/* Add other paragraphs similarly */}
        </div>

          {/* History Section */}
      <section className='bg-gradient-to-r from-secondary to-primary text-white py-12 px-8 md:px-16 lg:px-24 xl:px-32'>
        <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8'>
          <img src={writing} alt='History' className='w-32 h-32 md:w-48 md:h-48 object-cover rounded-full' />
          <div className='text-center md:text-left'>
            <h2 className='text-3xl font-semibold mb-4'>Our History</h2>
            <p className='text-lg'>
              PratiDin was born out of a simple belief: the everyday moments and small acts of kindness in our lives
              often carry the most significance. We recognized that people wanted to capture these moments and reflect on
              them, not just document routines. We saw an opportunity to create a tool that not only helps individuals
              acknowledge these moments but also promotes a ripple of positivity.
            </p>
            {/* Additional paragraphs go here */}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='bg-gradient-to-r from-primary to-secondary text-white py-12 px-8 md:px-16 lg:px-24 xl:px-32 mt-2'>
        <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8'>
          <div className='text-center md:text-left'>
            <h2 className='text-3xl font-semibold mb-4'>Our Mission</h2>
            <p className='text-lg'>
              Our mission at PratiDin is to inspire positivity, one day at a time. We believe in the power of small
              actions to make the world a better place. We aim to help our users recognize and appreciate the little
              victories, acts of kindness, and unexpected joys in their lives.
            </p>
            {/* Additional paragraphs go here */}
          </div>
          <img src={typing} alt='Mission' className='w-32 h-32 md:w-48 md:h-48 object-cover rounded-full' />
        </div>
      </section>

      {/* Vision Section */}
      <section className='bg-gradient-to-r from-secondary to-primary text-white py-12 px-8 md:px-16 lg:px-24 xl:px-32 mt-2'>
        <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8'>
          <img src={comm} alt='Vision' className='w-32 h-32 md:w-48 md:h-48 object-cover rounded-full' />
          <div className='text-center md:text-left'>
            <h2 className='text-3xl font-semibold mb-4'>Our Vision</h2>
            <p className='text-lg'>
              Our vision for PratiDin is to be more than just an app - we aspire to be a movement, a commitment to
              conscious living, and active kindness. We envision a world where every individual appreciates the value of
              their daily actions and experiences, recognizing their potential to inspire positivity and make the world a
              better place.
            </p>
            {/* Additional paragraphs go here */}
          </div>
        </div>
      </section>
        <div className="mt-5 bg-gray-700 text-white py-12 px-12 md:px-24 lg:px-32 xl:px-48 2xl:px-64">
          <h2 className="m-4 text-3xl font-semibold">Join the Movement</h2>
          <p className="m-4 text-lg">Want to help us by donating?</p>
          <button className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Donate Now
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;
