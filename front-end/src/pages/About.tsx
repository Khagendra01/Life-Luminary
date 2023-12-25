import logo from '../assets/logo.png';

const About = () => {
    // Function body goes here

    return (
        <>
            <div className='bg-gray-900 text-white py-12 px-12 md:px-24 lg:px-32 xl:px-48 2xl:px-64'>
                <div className='m-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'>
                    <img src={logo} alt="Logo" className='m-4 w-32 h-32 md:w-48 md:h-48' />
                    <div>
                        <h1 className='m-4 text-4xl font-semibold'>About Us</h1>
                        <p className='m-4 text-lg'>Life Luminary is about more than just documenting your routine - it's about capturing those moments that make life worth living. It's about the small victories, the acts of kindness, the unexpected joys. Watering a plant, tidying your room, offering your bus seat to an elder, or donating to a cause close to your heart. These are the highlights of our days, and Life Luminary is here to help you recognize and appreciate them.</p>
                        <p className='m-4 text-lg'>But what if you don't have a highlight to share? That's okay. Life Luminary understands. Just by being here, living and breathing, you've made a difference. Each day you're alive is a day worth celebrating, and Life Luminary will make sure you remember that.</p>
                        <p className='m-4 text-lg'>Our goal is simple: to inspire a ripple of positivity, one day at a time. We believe in the power of small actions to make the world a better place, and we've designed Life Luminary to facilitate that belief.</p>
                        <p className='m-4 text-lg'>But Life Luminary is more than just a daily journal. It's a tool for reflection and growth. You can track your weekly, monthly, or yearly activities, analyze patterns, and identify areas for improvement. And when you're ready, you can generate a PDF of your entries, share your journey with others, and inspire them to join you in making the world a better place.</p>
                        <p className='m-4 text-lg'>Life Luminary is more than just an app. It's a movement. It's a commitment to conscious living and active kindness. And it's an invitation for you to join us in making a difference, one entry each day.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
