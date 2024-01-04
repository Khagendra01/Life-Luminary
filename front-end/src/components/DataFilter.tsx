import React, { useState } from "react";
import { FeedPosts } from "../models/postModel";

interface DataProps {
  data: FeedPosts[] | null;
}

interface DataItem {
  dateTime: string;
  content: string;
}

const months = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = ["All", "2023", "2024", "2025", "2026"]; // Add more years as needed

const DataFilter: React.FC<DataProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");

  const filterByMonth = (month: string) => {
    setSelectedMonth(month);
    if (month !== "All") {
      setFilteredData(
        data.filter(
          (item) =>
            new Date(item.dateTime).getMonth() === months.indexOf(month) - 1
        )
      );
    } else {
      setFilteredData(data);
    }
  };

  const filterByYear = (year: string) => {
    setSelectedYear(year);
    if (year !== "All") {
      setFilteredData(
        data.filter(
          (item) => new Date(item.dateTime).getFullYear() === parseInt(year)
        )
      );
    } else {
      setFilteredData(data);
    }
  };

  const resetFilter = () => {
    setFilteredData(data);
    setSelectedMonth("All");
    setSelectedYear("All");
  };

  return (
    <div className="p-4 bg-gray-200 flex flex-col items-center">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="month" className="text-sm font-bold">
            Month:
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => filterByMonth(e.target.value)}
            className="border p-2 rounded-md"
          >
            {months.map((month, index) => (
              <option key={index}>{month}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="year" className="text-sm font-bold">
            Year:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => filterByYear(e.target.value)}
            className="border p-2 rounded-md"
          >
            {years.map((year, index) => (
              <option key={index}>{year}</option>
            ))}
          </select>
        </div>

        <button
          onClick={resetFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="border p-4 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <p className="font-bold">{item.dateTime}</p>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataFilter;
