import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import routing components
import Calendar from "./components/calendar/Calendar";
import SearchBar from "./components/study-library-feature/study-library-feature";
import resourcesData from "./components/Study-library-resources-data.json";
import SearchBox from "./components/tag-search-bar";
import optionArray from "./components/constants/options";
import Timer from "./components/timer/Timer"; // Timer component
import Settings from "./components/timer/Settings"; // Settings component
import SettingsContext from "./components/timer/SettingsContext"; // Settings context
import FriendCollaboration from "./components/friend-collab-feature";
import FileUpload from "./components/file-upload/FileUpload";
import './App.css';


function App() {
  const [showSettings, setShowSettings] = useState(true);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [totalPomodoros, setTotalPomodoros] = useState(4);

  const [options, setOptions] = React.useState(optionArray);


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
        <div>
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
                <Link to="/file-upload">File Upload</Link> {/* Link to the file upload page */}
              </li>
            </ul>
          </nav>


          <Routes>
            {/* Route for the calendar + search Bar page) */}
            <Route
              path="/calendar"
              element={
                <>
                  <h1>Calendar</h1>
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
                  <h1>Pomodoro Timer</h1>
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
              element={<FriendCollaboration />} /* Add the FriendCollaboration component */
            />
            {/* New Route for File Upload Page */}
            <Route path="/file-upload" element={<FileUpload />} />
          </Routes>
        </div>
      </Router>
    </SettingsContext.Provider>
  );
}
export default App;