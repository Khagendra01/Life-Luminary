import React from 'react';

interface MostRatedCardProps {
  date: string;
  activity: string;
}

const MostRatedCard: React.FC<MostRatedCardProps> = ({ date, activity }) => {
  // Convert the input string to a Date object
  const dateObject = new Date(date);

  // Check if the date is valid before proceeding
  if (isNaN(dateObject.getTime())) {
    console.error('Invalid date format');
    return null; // or handle the error in your preferred way
  }

  // Format the date
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  const dayName = dateObject.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="p-8 m-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-xl shadow-2xl text-center">
      <h2 className="text-3xl font-extrabold mb-4">{formattedDate}</h2>
      <h3 className="text-2xl mb-6">{dayName}</h3>
      <p className="text-xl font-semibold">{activity}</p>
    </div>
  );
}

export default MostRatedCard;
