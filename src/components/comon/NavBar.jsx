import React, { useState, useEffect } from "react";
import { Cog8ToothIcon, UserIcon, TrashIcon} from "@heroicons/react/24/solid";
import { useNavigate} from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState({
    time: "", // For storing the current time (e.g., 12:29 PM)
    date: "", // For storing the current date (e.g., Sep 02, 2023)
  });


  useEffect(() => {
    // Function to update the time and date
    const updateDateTime = () => {
      const now = new Date(); // Get the current date and time

      // Format the time in 12-hour format with AM/PM
      const hours = now.getHours().toString().padStart(2, "0"); // Get hours and format to 2 digits
      const minutes = now.getMinutes().toString().padStart(2, "0"); // Get minutes and format to 2 digits
      const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
      const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`; // Format time as "hh:mm AM/PM"

      // Array of month names for conversion
      const monthNames = [
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

      // Format the date as "Month dd, yyyy" (e.g., "September 02, 2023")
      const day = now.getDate().toString().padStart(2, "0"); // Get day and format to 2 digits
      const month = monthNames[now.getMonth()]; // Get month name (e.g., "September")
      const year = now.getFullYear(); // Get the full year
      const formattedDate = `${month} ${day}, ${year}`; // Format date as "Month dd, yyyy"

      // Update the state with the formatted time and date
      setCurrentDateTime({
        time: formattedTime,
        date: formattedDate,
      });
    };

    // Set an interval to update the time and date every second (1000ms)
    const interval = setInterval(updateDateTime, 1000);

    // Call the updateDateTime function immediately to set the initial time and date
    updateDateTime();

    // Cleanup: Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="w-90 md:w-full  p-5 flex flex-row items-center justify-between mb-6 md:bg-white">
      {/* User section with an icon and user details */}
      <div className="w-50 flex items-center">
        <UserIcon className="size-5" /> {/* User icon */}
        <div className="leading-4 ml-2">
          <p className="text-[10px] md:text-[15px] font-bold">Mintah Jr</p>{" "}
          {/* User's name */}
          <p className="text-[10px] md:text-[13px] font-medium">Admin</p>{" "}
          {/* User's role */}
        </div>
      </div>

      <div
        className="relative cursor-pointer mr-6 md:mr-0"
        onClick={() => navigate("/recycle")}
      >
        <span className="absolute w-3 md:w-4 bg-red-600 text-white text-[10px] font-medium text-center rounded-full -top-2 -right-0.5">
          0
        </span>
        <TrashIcon className="w-4 md:w-5" />
      </div>
      {/* Section to display dynamic time and date */}
      <div className="flex items-center">
        <div className="w-25 mr-2 border-r-1 md:border-r-2 border-zinc-950">
          {/* Display dynamic time and date */}
          <p className="text-[10px] md:text-[15px] font-bold">
            {currentDateTime.time}
          </p>{" "}
          {/* Time (e.g., 12:29 PM) */}
          <p className="text-[10px] md:text-[13px] font-medium">
            {currentDateTime.date}
          </p>{" "}
          {/* Date (e.g., September 02, 2023) */}
        </div>

        {/* Settings icon */}
        <Cog8ToothIcon className="size-5 md:size-8" />
      </div>
    </div>
  );
};

export default NavBar;
