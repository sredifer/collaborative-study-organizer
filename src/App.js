import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom"; // Import routing components
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Calendar from "./components/calendar/Calendar";
import SearchBar from "./components/study-library-feature/study-library-feature";
import resourcesData from "./components/Study-library-resources-data.json";
import SearchBox from "./components/tag-search-bar";
import optionArray from "./components/constants/options";
import TodoList from "./components/todo-list/TodoList";
import Timer from "./components/timer/Timer"; // Timer component
import Settings from "./components/timer/Settings"; // Settings component
import SettingsContext from "./components/timer/SettingsContext"; // Settings context
import FriendCollaboration from "./components/friend-collab/FriendCollab";
import FileUpload from "./components/file-upload/FileUpload";
import DateSearchBar from "./components/search-by-date/search-by-date";
import './App.css';

function App() {
  // Global tasks state for checklist items persisted in localStorage
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("todoTasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Authentication state and other settings
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [totalPomodoros, setTotalPomodoros] = useState(4);
  const [options, setOptions] = useState(optionArray);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Callbacks to manage tasks
  const addTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Derive calendar events from tasks with a due date
  const taskEvents = tasks
    .filter(task => task.dueDate)
    .map(task => {
      const eventTitle = task.completed
        ? `✔ Due: ${task.taskName}`
        : `Due: ${task.taskName}`;
      let start = task.dueTime
        ? `${task.dueDate}T${task.dueTime}:00`
        : task.dueDate;

      let end = start; // Ensure end time is within the same day

      // Adjust end time if it is too late at night
      if (task.dueTime && parseInt(task.dueTime.split(':')[0]) >= 23) {
        end = `${task.dueDate}T23:59:00`; // Keep the event within the same date
      }

      return {
        id: task.id.toString(),
        title: eventTitle,
        start,
        end,
        allDay: !task.dueTime,
        backgroundColor: task.color || "#E28FA5",
        extendedProps: {
          isChecklist: true,
          startTime: task.dueTime || "",
          endTime: task.endTime || "",
          color: task.color || "#E28FA5",
          goals: task.goals ? task.goals.split("\n") : [],
          completed: task.completed
        }
      };
    });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set authentication state to true after successful login
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setIsAuthenticated(false); // Update authentication state
  };

  // Use useEffect to manage redirection after login by checking token expiration
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const expirationTime = payload.exp * 1000;
          if (Date.now() >= expirationTime) {
            handleLogout();
          }
        } catch (error) {
          console.error("Invalid token format", error);
          handleLogout();
        }
      }
    };
    checkTokenExpiration();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        workMinutes,
        breakMinutes,
        totalPomodoros,
        setWorkMinutes,
        setBreakMinutes,
        setTotalPomodoros,
      }}
    >
      <Router>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<Signup onSignupSuccess={() => {}} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <div>
            <center>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/calendar">Calendar</Link>
                  </li>
                  <li>
                    <Link to="/todo-list">To-Do</Link>
                  </li>
                  <li>
                    <Link to="/friend-collaboration">Friends!</Link>
                  </li>
                  <li>
                    <Link to="/file-upload">Upload Notes</Link>
                  </li>
                  <li>
                    <Link to="/search">Search</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </nav>
            </center>

            <Routes>
              {/* Route for the Calendar page */}
              <Route
                path="/calendar"
                element={
                  <>
                    <center>
                      <div className="logo">
                        <img src="/images/calendar-page-logo.png" width="600" height="108" alt="Calendar Logo" />
                      </div>
                    </center>
                    <Calendar events={taskEvents} updateTask={updateTask} deleteTask={deleteTask} />
                    <br />
                  </>
                }
              />

              {/* Route for the Todo List page */}
              <Route
                path="/todo-list"
                element={
                  <>
                    <center>
                      <div className="logo">
                        <img src="/images/todo-page-logo.png" width="600" height="112" alt="Todo Logo" />
                      </div>
                    </center>
                    <TodoList
                      tasks={tasks}
                      addTask={addTask}
                      updateTask={updateTask}
                      deleteTask={deleteTask}
                      toggleTaskCompletion={toggleTaskCompletion}
                    />
                  </>
                }
              />

              {/* Route for the Search page */}
              <Route
                path="/search"
                element={
                  <>
                    <center>
                      <div className="logo">
                        <img src="/images/search-page-logo.png" width="600" height="112" alt="Search Logo" />
                      </div>
                    </center>
                    <SearchBar placeholder="Search for a study resource" data={resourcesData} />
                    <br />
                    <SearchBox options={options} onChange={newOptions => setOptions(newOptions)} />
                    <br />
                    <DateSearchBar />
                  </>
                }
              />

              {/* Route for the Timer/Home page */}
              <Route
                path="/"
                element={
                  <>
                    <center>
                      <div className="logo">
                        <img src="/images/timer-page-logo.png" width="545" height="185" alt="Timer Logo" />
                      </div>
                    </center>
                    {showSettings ? (
                      <Settings setShowSettings={setShowSettings} />
                    ) : (
                      <Timer setShowSettings={setShowSettings} showSettings={showSettings} />
                    )}
                  </>
                }
              />

              {/* Route for the Friend Collaboration page */}
              <Route
                path="/friend-collaboration"
                element={
                  <>
                    <center>
                      <div className="logo">
                        <img src="/images/friends-page-logo.png" width="513" height="189" alt="Friends Logo" />
                      </div>
                    </center>
                    <FriendCollaboration />
                  </>
                }
              />

              {/* Route for the File Upload page */}
              <Route path="/file-upload" element={<FileUpload />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )}
      </Router>
    </SettingsContext.Provider>
  );
}

export default App;
