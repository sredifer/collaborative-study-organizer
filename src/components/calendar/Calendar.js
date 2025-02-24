import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

const Calendar = () => {
  // Initial sample study sessions
  const [events, setEvents] = useState([
    { id: "1", title: "Math Study Group", date: "2024-02-24" },
    { id: "2", title: "History Discussion", date: "2024-02-26" }
  ]);

  // Function to handle clicks on a date cell
  const handleDateClick = (info) => {
    const title = prompt("Enter a study session name:");
    if (!title) return;

    // Get the base date from the clicked cell
    let dateTime = info.dateStr; // This is in YYYY-MM-DD format

    // Optionally ask for a time in HH:MM format
    const timeInput = prompt("Enter time (HH:MM, optional):");
    if (timeInput) {
      // Combine date and time to form an ISO string
      dateTime = `${info.dateStr}T${timeInput}:00`;
    }

    const newEvent = {
      id: Date.now().toString(),
      title: title,
      date: dateTime  // If time was provided, it's a timed event; otherwise, an all-day event.
    };

    setEvents([...events, newEvent]);
  };

  // Function to handle clicking on an existing event (for editing or deleting)
  const handleEventClick = (clickInfo) => {
    const currentTitle = clickInfo.event.title;
    const newTitle = prompt("Update the session name (leave blank to delete):", currentTitle);
    if (newTitle === null) return; // user canceled
    if (newTitle === "") {
      if (window.confirm(`Are you sure you want to delete "${currentTitle}"?`)) {
        clickInfo.event.remove();
        setEvents(events.filter(event => event.id !== clickInfo.event.id));
      }
    } else {
      clickInfo.event.setProp("title", newTitle);
      setEvents(events.map(event =>
        event.id === clickInfo.event.id ? { ...event, title: newTitle } : event
      ));
    }
  };

  return (
    <div className="calendar-container">
      <h2>Study Sessions Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
