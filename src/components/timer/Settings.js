import React, { useContext, useState } from "react";
import Slider from "./Slider";
import SettingsContext from "./SettingsContext";

export default function Settings({setShowSettings}) {
  const { workMinutes, breakMinutes, totalPomodoros, setWorkMinutes, setBreakMinutes, setTotalPomodoros} = useContext(SettingsContext);
  
    return (
      <div>
        <button 
          onClick={() => setShowSettings(false)}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          ✖
        </button>
        <center>
        <div style={{ marginBottom: '40px' }}>
            <div style={{ marginBottom: '10px' }}>Study time (in minutes): {workMinutes}</div>
            <Slider value={workMinutes} onChange={setWorkMinutes} />
        </div>

        <div style={{ marginBottom: '40px' }}>
            <div style={{ marginBottom: '10px' }}>Break time (in minutes): {breakMinutes}</div>
            <Slider value={breakMinutes} onChange={setBreakMinutes} />
        </div>
        </center>
        <center>
        <label style={{marginBottom: '40px'}}> Number of pomodoro cycles:
        <input name="pomodoros" style={{marginTop: '10px', width:'40px'}} type="number"
            value={totalPomodoros} 
            onChange={(e) => setTotalPomodoros(Number(e.target.value))}/>
        </label>
        </center>

      </div>
      
    );
};

