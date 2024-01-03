import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MostRatedCard from "../components/MostRatedCard";
import './styles/activity.css'
import { FeedPosts } from '../models/postModel';
import { getMyPost } from '../api/activity';
import { AuthContext } from '../App';


const Activity: React.FC = () => {
    
    const { user } = useContext(AuthContext) || {};

    const getPost = async () => {

        await getMyPost( user?.id )
          .then((res) => {
            setData(res);
          })
          .catch(() => {
            console.log("Error fetching Posts");
          });
      };

      useEffect(() => {
        getPost();
      }, []);


      const [data, setData] = useState<FeedPosts[] | null>([]);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

    return (
        <>
            <Navbar />
            <div className="flex justify-centers">
            <Calendar 
    className="bg-gray-200 text-gray-700 rounded-lg p-8 m-4 shadow-lg border-2 border-gray-300 font-sans hover:shadow-xl transition-all duration-200"
    onClickDay={(value: Date) => {
        const dateString = value.toISOString().split('T')[0];
        const event = data?.find(event => event.dateTime.split('T')[0] === dateString);
        if (event) {
            setSelectedDate(event.dateTime);
            setSelectedActivity(event.content);
        } else {
            setSelectedDate(null);
            setSelectedActivity(null);
        }
    }}
    tileClassName={({ date }) => {
        const dateString = date.toISOString().split('T')[0];
        const events = data?.filter(event => event.dateTime.split('T')[0] === dateString) || [];
        return events.length > 0 ? 'activity-day' : null;
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

export default Activity;