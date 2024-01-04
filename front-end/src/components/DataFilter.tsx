import React, { useState } from "react";
import { format, isWithinInterval } from "date-fns";
import { FeedPosts } from "../models/postModel";

interface DataProps {
  data: FeedPosts[] | null;
}

interface DataItem {
  dateTime: string;
  content: string;
}

const DataFilter: React.FC<DataProps> = ({ data }) => {
  const [filter, setFilter] = useState<string>("all");

  const filterData = (): DataItem[] => {
    const now = new Date();
    if (data != null) {
      switch (filter) {
        case "week":
          return data.filter((item) =>
            isWithinInterval(getDateForm(item.dateTime), {
              start: now,
              end: new Date(now).setDate(now.getDate() + 7),
            })
          );
        case "month":
          return data.filter((item) =>
            isWithinInterval(getDateForm(item.dateTime), {
              start: now,
              end: new Date(now).setMonth(now.getMonth() + 1),
            })
          );
        case "year":
          return data.filter((item) =>
            isWithinInterval(getDateForm(item.dateTime), {
              start: now,
              end: new Date(now).setFullYear(now.getFullYear() + 1),
            })
          );
        default:
          return data;
      }
    } else {
      const retDate: DataItem[] = [
        { dateTime: "none", content: "Data not available" },
      ];
      return retDate;
    }
  };

  const getDateForm = (date: string) => {
    const parts = date.split("-");

    const dateObject = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );
    return dateObject;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <select
      className="form-select block w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="week">This Week</option>
      <option value="month">This Month</option>
      <option value="year">This Year</option>
    </select>
    <div className="grid grid-cols-2 divide-x divide-gray-200">
      {filterData().map((item, index) => (
        <div
          key={index}
          className={`p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <p className="text-gray-600">
            {format(new Date(item.dateTime), "yyyy-MM-dd")}
          </p>
          <p className="text-gray-900">{item.content}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default DataFilter;
