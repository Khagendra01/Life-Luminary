import React, { useState } from 'react';

const Home = () => {
    const [content, setContent] = useState('');

    return (
        <>
            {/* generate banner for the home page with banner content, banner image */}
            <div className='banner'>
                <div className='banner-content'>
                    <h1 className='text-4xl font-semibold text-white'>Banner Content</h1>
                    <p className='text-white text-lg mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                    <button className='bg-primary text-white px-4 py-2 rounded-md mt-4'>Get Started</button>
                </div>
            </div>
        </>
    );
}

export default Home;
