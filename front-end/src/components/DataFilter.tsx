import React, { useRef, useState } from "react";
import { FeedPosts } from "../models/postModel";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "./styles/datafilter.css"

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
  const tableRef = useRef(null);

  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: tableRef.current ?? "" });
    doc.save("filteredData.pdf");
  };

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
          <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Download as PDF
        </button>
        </div>

        <button
          onClick={resetFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Reset
        </button>
      </div>

      <table className="excel-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item, index) => (
          <tr key={index} className="excel-row">
            <td>{item.dateTime}</td>
            <td>{item.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default DataFilter;
