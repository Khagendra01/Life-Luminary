import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Summary = () => {

    const events = [
        {
            start: moment().toDate(),
            end: moment().add(1, 'days').toDate(),
            title: 'Some title',
        },
        // more events...
    ];

    const localizer = momentLocalizer(moment);


    return (
        <>
        <Navbar />
                    <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
        />
        <Footer />
        </>
    );
};

export default Summary;
