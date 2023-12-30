
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import './styles/calendar.css';

const DailyNote = () => {

    const [content, setContent] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('public'); // new state for visibility

    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate();

    return (
        <>
            <div className='flex flex-col justify-between items-center bg-gray-900 py-12 px-4 md:px-12 lg:px-24 xl:px-32 2xl:px-48 mt-5'>
                <div className='flex flex-col items-center text-left space-y-4 calendar-box mb-4'>
                    <h1 className='text-4xl font-semibold text-black'> {month} </h1>
                    <h1 className='text-4xl font-semibold text-black'><FaRegCalendarAlt /></h1>
                    <h1 className='text-3xl font-semibold text-black'>{day}</h1>
                </div>
                <textarea className='w-full h-full bg-gray-200 rounded-md px-4 py-2 mb-4' placeholder='Share your amazing story of the day...'></textarea>
                <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className='mb-4 bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>
                    <option value="public">Public</option>
                    <option value="anonymous">Anonymous</option>
                </select>
                <div className='flex justify-center items-center space-x-4'>
                    <button className='bg-primary text-white px-4 py-2 rounded-md hover:bg-gradient-to-r from-purple-500 to-blue-700'>Submit</button>
                </div>
            </div>
        </>
    );
}

export default DailyNote;