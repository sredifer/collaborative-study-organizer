import './App.css';
import Timer from './Timer';
import Settings from './Settings';
import SettingsContext from './SettingsContext';
import {useState} from "react";

function App() {

  const [showSettings, setShowSettings] = useState(true);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [totalPomodoros, setTotalPomodoros] = useState(4);

  return (
    <main> 
      <SettingsContext.Provider value ={{
        workMinutes,
        breakMinutes,
        totalPomodoros,
        setWorkMinutes,
        setBreakMinutes,
        setTotalPomodoros
      }}>
        {showSettings ? <Settings setShowSettings={setShowSettings} /> : <Timer setShowSettings={setShowSettings} showSettings={showSettings} />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
