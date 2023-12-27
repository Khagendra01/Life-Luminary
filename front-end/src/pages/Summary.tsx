import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MostRatedCard from "../components/MostRatedCard";

interface Event {
  date: Date;
  activity: string;
}

const Summary: React.FC = () => {
    const data: Event[] = [
       { date: new Date('2023-12-01'), activity: 'User logged in' },
       { date: new Date('2023-12-15'), activity: 'User logged in' }
    ];

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

    return (
        <>
            <Navbar />
            <div className="flex justify-center">
            <Calendar 
             className="bg-gray-200 text-gray-700 rounded-lg p-8 m-4 shadow-lg border-2 border-gray-300 font-sans hover:shadow-xl transition-all duration-200"
                onClickDay={(value: Date) => {
                    const dateString = value.toISOString().split('T')[0];
                    const event = data.find(event => event.date.toISOString().split('T')[0] === dateString);
                    if (event) {
                        setSelectedDate(event.date);
                        setSelectedActivity(event.activity);
                    } else {
                        setSelectedDate(null);
                        setSelectedActivity(null);
                    }
                }}
                tileContent={({ date, view }) => {
                    const dateString = date.toISOString().split('T')[0];
                    const events = data.filter(event => event.date.toISOString().split('T')[0] === dateString);
                    if (events.length > 0) {
                        return <div style={{ color: 'green' }}>entry</div>;
                    }
                    return null;
                }}
            />
            </div>
            {selectedDate && selectedActivity && (
                <MostRatedCard date={selectedDate} activity={selectedActivity} />
            )}

            <Footer />
        </>
    );
};

export default Summary;