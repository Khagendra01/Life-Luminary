import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

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
                    <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
        />
        </>
    );
};

export default Summary;
