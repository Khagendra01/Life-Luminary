import "react-big-calendar/lib/css/react-big-calendar.css";
import { useContext, useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import "./styles/calendar.css";
import { AuthContext } from "../App";
import { postIt } from "../api/postFeed";
import { PostInfo } from "../models/postModel";
import { getDailyPost } from "../api/activity";
import { useNavigate } from "react-router-dom";

import imgBg from "../img/home.jpg"

const DailyNote = () => {
  const { user } = useContext(AuthContext) || {};

  const navigate = useNavigate();

  const [content, setContent] = useState<string | undefined>("");
  const [visibility, setVisibility] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const day = today.getDate();

  const reloadPost = async () => {
    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toISOString().split("T")[0];
    await getDailyPost(user?.id, formattedDate)
      .then((res) => {
        setContent(res?.content);
        if(res?.content != null)
        {
          console.log(res?.content)
          setErrorMessage("Your previous post for today!! Have a nice day :) ")
        }
      })
      .catch((error) => {
        alert(`Sorry ${error.message}`);
      });
  };

  useEffect(() => {
    reloadPost();
  }, [user]);

  const handleSubmit = async () => {
    if (content != "") {
      if (user) {
        const currentDate: Date = new Date();
        const formattedDate: string = currentDate.toISOString().split("T")[0];
        const postRequest: PostInfo = {
          userId: user?.id,
          dateTime: formattedDate,
          content: content,
          isNameHidden: visibility,
        };
        await postIt(postRequest)
          .then(() => {
            alert("posted");
            reloadPost();
            setContent("");
          })
          .catch((error) => {
            alert(`Sorry ${error.message}`);
          });
      } else {
        alert("Please login to your account before creating a post");
        navigate("./login");
      }
    }else{
      setErrorMessage("please enter the input in order to post")
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center py-12 px-4 md:px-12 lg:px-24 xl:px-32 2xl:px-48 mt-5" style={{ backgroundImage: `url(${imgBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex flex-col items-center text-left space-y-4 calendar-box mb-4 bg-primary">
          <h1 className="text-4xl font-semibold text-white"> {month} </h1>
          <h1 className="text-4xl font-semibold text-white">
            <FaRegCalendarAlt />
          </h1>
          <h1 className="text-3xl font-semibold text-white">{day}</h1>
        </div>
        <textarea
          value={ user ? content : ""}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full bg-gray-200 rounded-md px-4 py-2 mb-4"
          placeholder="Share your amazing story of the day..."
          required
        ></textarea>
        <select
          value={visibility ? "true" : "false"}
          onChange={(e) => setVisibility(e.target.value === "true")}
          className="mb-4 bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        >
          <option value="true">Public</option>
          <option value="false">Anonymous</option>
        </select>
        <p className="text-red-500">{ user && errorMessage}</p>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-gradient-to-r from-purple-500 to-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default DailyNote;
