import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables date clicking
import "./Calendar.css"; // This is for any styling you want to add

const Calendar = () => {
  // State to hold sample study sessions (events)
  const [events, setEvents] = useState([
    { id: "1", title: "Math Study Group", date: "2024-02-24" },
    { id: "2", title: "History Discussion", date: "2024-02-26" }
  ]);

  return (
    <div className="calendar-container">
      <h2>Study Sessions Calendar</h2>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={events} // Pass the events to the calendar
      />
    </div>
  );
};

export default Calendar;