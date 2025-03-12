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
import './App.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [totalPomodoros, setTotalPomodoros] = useState(4);

  const [options, setOptions] = React.useState(optionArray);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);  // Set authentication state to true after successful login
  };

  // Use useEffect to manage redirection after login
  useEffect(() => {
    if (isAuthenticated) {
      // After successful login, navigate to the home page if redirected to login
    }
  }, [isAuthenticated]);



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
                <Link to="/">Home</Link> {/* Link to the home page (Timer) */}
              </li>
              <li>
                <Link to="/calendar">Calendar</Link> {/* Link to the calendar page */}
              </li>
              <li>
                <Link to="/friend-collaboration">Friends!</Link> {/* Link to the friend collaboration page */}
              </li>
              <li>
                <Link to="/file-upload">Upload Notes</Link> {/* Link to the file upload page */}
              </li>
            </ul>
          </nav>
          </center>


          <Routes>
            {/* Route for the calendar + search Bar page) */}
            <Route
              path="/calendar"
              element={
                <>
                  <center>
                  <div class="logo">
                    <img src="/images/calendar-page-logo.png" width="600" height="108"></img>
                  </div>
                  </center>
                  <Calendar />
                  <br />
                  <SearchBar placeholder="Search for a study resource" data={resourcesData} />
                  <br />
                  <SearchBox options={options} onChange={newOptions => setOptions(newOptions)}/>
                </>
              }
            />
           
            {/* Route for the timer/home page */}
            <Route
              path="/"
              element={
                <>
                  <center>
                  <div class="logo">
                    <img src="/images/timer-page-logo.png" width="545" height="185"></img>
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
                <div class="logo">
                  <img src="/images/friends-page-logo.png" width="513" height="189"></img>
                </div>
                </center>
              <FriendCollaboration /> {/* Add the FriendCollaboration component */}
              </>
              } 
            />
            {/* New Route for File Upload Page */}
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