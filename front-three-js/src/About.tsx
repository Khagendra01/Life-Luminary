import React from "react";

const About = () => {
    // Function body goes here

    return (
        <>
            <div className='bg-gray-900 text-white py-12 px-12 md:px-24 lg:px-32 xl:px-48 2xl:px-64'>
                <div className='m-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'>
                    <img src="" alt="Logo" className='m-4 w-32 h-32 md:w-48 md:h-48' />
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


            {/* History Section */}
            <div className='mt-20 bg-gray-800 text-white py-12 px-12 md:px-24 lg:px-32 xl:px-48 2xl:px-64'>
                <h2 className='m-4 text-3xl font-semibold'>Our History</h2>
                <p className='m-4 text-lg'>Life Luminary was born out of a simple belief: the everyday moments and small acts of kindness in our lives often carry the most significance. We recognized that people wanted to capture these moments and reflect on them, not just document routines. We saw an opportunity to create a tool that not only helps individuals acknowledge these moments but also promotes a ripple of positivity. By facilitating reflection and growth, we've empowered our users to analyze their activities, identify areas for improvement, and share their journeys with others.</p>
            </div>

            {/* Mission Section */}
            <div className='mt-5 bg-gray-700 text-white py-12 px-12 md:px-24 lg:px-32 xl:px-48 2xl:px-64'>
                <h2 className='m-4 text-3xl font-semibold'>Our Mission</h2>
                <p className='m-4 text-lg'>Our mission at Life Luminary is to inspire positivity, one day at a time. We believe in the power of small actions to make the world a better place. We aim to help our users recognize and appreciate the little victories, acts of kindness, and unexpected joys in their lives. We are committed to supporting conscious living and active kindness, encouraging everyone to make a difference, one entry each day. We also strive to be more than just a daily journal by providing a tool for reflection, growth, and sharing.</p>
            </div>

            {/* Vision Section */}
            <div className='mt-5 bg-gray-600 text-white py-12 px-12 md:px-24 lg:px-32 xl:px-48 2xl:px-64'>
                <h2 className='m-4 text-3xl font-semibold'>Our Vision</h2>
                <p className='m-4 text-lg'>Our vision for Life Luminary is to be more than just an app - we aspire to be a movement, a commitment to conscious living, and active kindness. We envision a world where every individual appreciates the value of their daily actions and experiences, recognizing their potential to inspire positivity and make the world a better place. We aim to facilitate this belief through our platform, encouraging our users to share their journeys and inspiring others to join in the movement of making a difference.</p>
            </div>

            <div className='mt-5 bg-gray-700 text-white py-12 px-12 md:px-24 lg:px-32 xl:px-48 2xl:px-64'>
                <h2 className='m-4 text-3xl font-semibold'>Join the Movement</h2>
                <p className='m-4 text-lg'>Want to help us by donating?</p>
                <button className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Donate Now
                </button>
            </div>


        </>
    );
};

export default About;
