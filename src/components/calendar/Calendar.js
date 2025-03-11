import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

const Calendar = () => {
  // State for study sessions
  const [events, setEvents] = useState([
    { id: "1", title: "Math Study Group", date: "2024-02-24" },
    { id: "2", title: "History Discussion", date: "2024-02-26" }
  ]);

  // Helper function to format time (e.g., "14:30" -> "2:30 PM")
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

  // When a date cell is clicked, open the new event modal with the date pre-filled.
  const handleDateClick = (info) => {
    const clickedDate = info.date;
    // Extract the date portion in ISO format (YYYY-MM-DD)
    const isoDateStr = clickedDate.toISOString().split("T")[0];
    let startTime = "";
    // If the click is on a time slot (not an all-day cell), extract the time.
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
  

  // Handle form submission for new events.
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let eventDate = formData.date;
    if (formData.startTime) {
      eventDate = `${formData.date}T${formData.startTime}:00`;
    }
    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      date: eventDate,
      backgroundColor: formData.color,
      extendedProps: {
        endTime: formData.endTime,
        color: formData.color,
        goals: formData.goals.split("\n").filter((g) => g.trim() !== "")
      }
    };
    setEvents([...events, newEvent]);
    setModalVisible(false);
  };

  // When an event is clicked, open the view modal (read-only) with its info.
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const dateObj = event.start;

    // Store the date in ISO format (YYYY-MM-DD) for proper input handling.
    const isoDateStr = dateObj.toISOString().split("T")[0];

    // Format the time in local format for display.
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
      startTime: timeStr,
      endTime: endTime,
      color: event.extendedProps.color || "#3788d8",
      goals: goals
    });
    setViewModalVisible(true);
  };

  // From the view modal, if the user clicks "Edit", prefill the edit modal with the same data.
  const handleViewToEdit = () => {
    setEditFormData({ ...viewFormData });
    setViewModalVisible(false);
    setEditModalVisible(true);
  };

  // Submit changes from the edit modal.
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    let eventDate = editFormData.date;
    if (editFormData.startTime) {
      eventDate = `${editFormData.date}T${editFormData.startTime}:00`;
    }
    const updatedEvent = {
      id: editFormData.id,
      title: editFormData.title,
      date: eventDate,
      backgroundColor: editFormData.color,
      extendedProps: {
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

  // Delete an event (from view or edit modal).
  const handleDeleteEvent = () => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      setEvents(events.filter((ev) => ev.id !== editFormData.id));
      setEditModalVisible(false);
      setViewModalVisible(false);
    }
  };

  return (
    <div className="calendar-container">
      <h2>Click on a day to create your study session!</h2>
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
          <div className="modal">
            {/* Top right close button */}
            <button className="close-button" onClick={() => setModalVisible(false)}>✖</button>
            <h3>Schedule a New Study Session</h3>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Session Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>Date:</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>Start Time:</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                />
              </div>
              <div>
                <label>End Time:</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Color:</label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Goals (one per line):</label>
                <textarea
                  value={formData.goals}
                  onChange={(e) =>
                    setFormData({ ...formData, goals: e.target.value })
                  }
                  placeholder="e.g., Finish problem 2 for homework 1"
                />
              </div>
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
      )}

      {/* View Event Modal */}
      {viewModalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Top right close button */}
            <button className="close-button" onClick={() => setViewModalVisible(false)}>✖</button>
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
            <div>
              <strong>Start Time:</strong> {formatTime(viewFormData.startTime)}
            </div>
            <div>
              <strong>End Time:</strong> {formatTime(viewFormData.endTime)}
            </div>
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
            <div>
              <strong>Goals:</strong>
              {viewFormData.goals ? (
                <ul className="goals-list">
                  {viewFormData.goals.split("\n").map((goal, idx) => (
                    <li key={idx}>{goal}</li>
                  ))}
                </ul>
              ) : (
                <span>None</span>
              )}
            </div>

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
          <div className="modal">
            {/* Top right close button */}
            <button className="close-button" onClick={() => setEditModalVisible(false)}>✖</button>
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
