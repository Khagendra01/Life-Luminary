
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"

const Summary = () => {
    const data = [
       { date: new Date('2022-01-01'), activity: 'User logged in' }
    ];

    return (
        <>
           <Navbar />

           <Calendar 
               tileContent={({ date, view }) => {
                   // Search for events on this date
                   const events = data.filter(event => event.date.toDateString() === date.toDateString());

                   // Return a list of events
                   return (
                       <ul>
                           {events.map((event, index) => (
                               <li key={index}>
                                   {event.activity}
                               </li>
                           ))}
                       </ul>
                   );
               }}
           />

           <Footer />
        </>
    );
};

export default Summary;