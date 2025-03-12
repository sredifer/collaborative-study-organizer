import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import "../../styles/Modal.css";

const Calendar = () => {
  // State for study sessions
  const [events, setEvents] = useState([
    { id: "1", title: "Math Study Group", date: "2024-02-24" },
    { id: "2", title: "History Discussion", date: "2024-02-26" }
  ]);

  // Helper function to format time (eg., 14:30 -> 2:30 PM)
  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    const [hourStr, minuteStr] = timeStr.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minute} ${ampm}`;
  };

  // State for creating a new event
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    color: "#3788d8",
    goals: ""
  });

  // State for viewing an event's details
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewFormData, setViewFormData] = useState({
    id: "",
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    color: "#3788d8",
    goals: ""
  });

  // State for editing an event (separate from viewing)
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    color: "#3788d8",
    goals: ""
  });

  // When a date cell is clicked, open the new event modal with the date pre-filled
  const handleDateClick = (info) => {
    const clickedDate = info.date;
    // Extract the date portion
    const isoDateStr = clickedDate.toISOString().split("T")[0];
    let startTime = "";
    // If the click is on a time slot (not an all-day cell), extract the time
    if (!info.allDay) {
      startTime = clickedDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }
    setFormData({
      title: "",
      date: isoDateStr,
      startTime: startTime,
      endTime: "",
      color: "#3788d8",
      goals: ""
    });
    setModalVisible(true);
  };
  

  // Handle form submission for new events
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Validate times: if both are provided, ensure the end time is after the start time
    if (formData.startTime && formData.endTime) {
      const start = new Date(`1970-01-01T${formData.startTime}:00`);
      const end = new Date(`1970-01-01T${formData.endTime}:00`);
      if (end <= start) {
        alert("End time must be after start time.");
        return;
      }
    }
  
    // Build the start and end datetime strings
    const startDateTime = formData.startTime
      ? `${formData.date}T${formData.startTime}:00`
      : formData.date;
    const endDateTime = formData.endTime
      ? `${formData.date}T${formData.endTime}:00`
      : null; // if no end time, we leave it as null
  
    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      start: startDateTime, 
      end: endDateTime,    
      backgroundColor: formData.color,
      extendedProps: {
        startTime: formData.startTime, 
        endTime: formData.endTime,
        color: formData.color,
        goals: formData.goals.split("\n").filter((g) => g.trim() !== "")
      }
    };
  
    setEvents([...events, newEvent]);
    setModalVisible(false);
  };  
  

  // When an event is clicked, open the view modal (read-only) with its info
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const dateObj = event.start;

    // Store the date in ISO format (YYYY-MM-DD) for proper input handling
    const isoDateStr = dateObj.toISOString().split("T")[0];

    // Format the time in local format for display
    const timeStr = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const endTime = event.extendedProps.endTime || "";
    const goals = event.extendedProps.goals ? event.extendedProps.goals.join("\n") : "";

    setViewFormData({
      id: event.id,
      title: event.title,
      date: isoDateStr,
      startTime: event.extendedProps.startTime, 
      endTime: event.extendedProps.endTime || "",
      color: event.extendedProps.color || "#3788d8",
      goals: event.extendedProps.goals ? event.extendedProps.goals.join("\n") : ""
    });
    
    setViewModalVisible(true);
  };

  // From the view modal, if the user clicks "Edit", prefill the edit modal with the same data
  const handleViewToEdit = () => {
    setEditFormData({ ...viewFormData });
    setViewModalVisible(false);
    setEditModalVisible(true);
  };

  // Submit changes from the edit modal
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
  
    // Validate times: if both are provided, ensure the end time is after the start time
    if (editFormData.startTime && editFormData.endTime) {
      const start = new Date(`1970-01-01T${editFormData.startTime}:00`);
      const end = new Date(`1970-01-01T${editFormData.endTime}:00`);
      if (end <= start) {
        alert("End time must be after start time.");
        return;
      }
    }
  
    // Build the start and end datetime strings
    const startDateTime = editFormData.startTime
      ? `${editFormData.date}T${editFormData.startTime}:00`
      : editFormData.date;
    const endDateTime = editFormData.endTime
      ? `${editFormData.date}T${editFormData.endTime}:00`
      : null;
  
    const updatedEvent = {
      id: editFormData.id,
      title: editFormData.title,
      start: startDateTime,
      end: endDateTime,
      backgroundColor: editFormData.color,
      extendedProps: {
        startTime: editFormData.startTime,
        endTime: editFormData.endTime,
        color: editFormData.color,
        goals: editFormData.goals.split("\n").filter((g) => g.trim() !== "")
      }
    };
  
    setEvents(
      events.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
    setEditModalVisible(false);
  };
  
  
  

  // Delete an event (from view or edit modal)
  const handleDeleteEvent = () => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      setEvents(events.filter((ev) => ev.id !== editFormData.id));
      setEditModalVisible(false);
      setViewModalVisible(false);
    }
  };

  return (
    <div className="calendar-container">
      <h2>Study Sessions Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      {/* New Event Modal */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Top right close button */}
            <button className="close-button" onClick={() => setModalVisible(false)}>×</button>
            <div className="modal-form">
              <h3>Schedule a New Study Session</h3>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Session Title:
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Date:
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Start Time:
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                  />
                </label>
                <label>
                  End Time:
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                  />
                </label>
                <label>
                  Color:
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  />
                </label>
                <label>
                  Goals (one per line):
                  <textarea
                    value={formData.goals}
                    onChange={(e) =>
                      setFormData({ ...formData, goals: e.target.value })
                    }
                    placeholder="e.g., Finish problem 2 for homework 1"
                  />
                </label>
                <hr className="modal-divider" />
                <div className="modal-buttons">
                  <button type="button" onClick={() => setModalVisible(false)} className="neutral-button">
                    Cancel
                  </button>
                  <button type="submit" className="primary-button">Save Session</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* View Event Modal */}
      {viewModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Top right close button */}
            <button className="close-button" onClick={() => setViewModalVisible(false)}>×</button>
            <h3>Session Details</h3>
            <div>
              <strong>Title:</strong> {viewFormData.title}
            </div>
            <div>
              <strong>Date:</strong>{" "}
              {new Date(viewFormData.date + "T00:00:00").toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            {viewFormData.startTime && (
              <div>
                <strong>Start Time:</strong> {formatTime(viewFormData.startTime)}
              </div>
            )}
            {viewFormData.endTime && (
              <div>
                <strong>End Time:</strong> {formatTime(viewFormData.endTime)}
              </div>
            )}
            <div>
              <strong>Color:</strong>{" "}
              <span
                className="color-swatch"
                style={{
                  backgroundColor: viewFormData.color,
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  marginLeft: '5px',
                  verticalAlign: 'baseline'
                }}
              ></span>
            </div>
            {viewFormData.goals &&
            viewFormData.goals.split("\n").filter(goal => goal.trim() !== "").length > 0 && (
              <div>
                <strong>Goals:</strong>
                <ul className="goals-list">
                  {viewFormData.goals
                    .split("\n")
                    .filter(goal => goal.trim() !== "")
                    .map((goal, idx) => (
                      <li key={idx}>{goal}</li>
                    ))}
                </ul>
              </div>
            )}


            <hr className="modal-divider" />
            <div className="modal-buttons modal-buttons-view">
              <div className="left-buttons">
                <button onClick={handleDeleteEvent} className="delete-button">Delete Session</button>
              </div>
              <div className="right-buttons">
                <button onClick={() => setViewModalVisible(false)} className="neutral-button">Cancel</button>
                <button onClick={handleViewToEdit} className="primary-button">Edit</button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Top right close button */}
            <button className="close-button" onClick={() => setEditModalVisible(false)}>×</button>
            <h3>Edit Study Session</h3>
            <form onSubmit={handleEditFormSubmit}>
              <div>
                <label>Session Title:</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>Date:</label>
                <input
                  type="date"
                  value={editFormData.date}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>Start Time:</label>
                <input
                  type="time"
                  value={editFormData.startTime}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, startTime: e.target.value })
                  }
                />
              </div>
              <div>
                <label>End Time:</label>
                <input
                  type="time"
                  value={editFormData.endTime}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, endTime: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Color:</label>
                <input
                  type="color"
                  value={editFormData.color}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, color: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Goals (one per line):</label>
                <textarea
                  value={editFormData.goals}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, goals: e.target.value })
                  }
                  placeholder="e.g., Finish problem 2 for homework 1"
                />
              </div>
              <hr className="modal-divider" />
              <div className="modal-buttons modal-buttons-edit">
                <div className="left-buttons">
                  <button type="button" onClick={handleDeleteEvent} className="delete-button">
                    Delete Session
                  </button>
                </div>
                <div className="right-buttons">
                  <button type="button" className="neutral-button" onClick={() => setEditModalVisible(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="primary-button">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
