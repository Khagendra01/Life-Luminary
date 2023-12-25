import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaRegCalendarAlt } from 'react-icons/fa';

import './styles/calendar.css';

const Calendar = () => {
    const localizer = momentLocalizer(moment);

    const today = new Date();
    const month = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate();

    const events = [
        {
            start: moment().toDate(),
            end: moment().add(1, 'days').toDate(),
            title: 'Some title',
        },
        // more events...
    ];

    return (
        <>
        <div className='flex flex-col md:flex-row justify-between items-center bg-gray-900 py-12 px-12 md:px-24 lg:px-32 xl:px-48 2xl:px-64'>
            <div className='flex flex-col items-center text-left space-y-4 calendar-box mr-4'>
                <h1 className='text-4xl font-semibold text-black'> {month} </h1>
                <h1 className='text-4xl font-semibold text-black'><FaRegCalendarAlt /></h1>
                <h1 className='text-3xl font-semibold text-black'>{day}</h1>
            </div>
            <textarea className='flex-grow h-full bg-gray-200 rounded-md px-4 py-2 mr-4' placeholder='Enter your text here...'></textarea>
            <div className='flex items-center space-x-4'>
                <button className='bg-primary text-white px-4 py-2 rounded-md mr-2'>Submit</button>
                <button className='bg-primary text-white px-4 py-2 rounded-md'>Edit</button>
            </div>
        </div>
        <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
        />
    </>
    );
    };
    
    export default Calendar;