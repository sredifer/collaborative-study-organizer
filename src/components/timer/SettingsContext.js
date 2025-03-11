import React from 'react';

const SettingsContext = React.createContext({
  workMinutes: 25,
  breakMinutes: 5,
  totalPomodoros: 4,
  setWorkMinutes: () => {},
  setBreakMinutes: () => {},
  setTotalPomodoros: () => {}
});

export default SettingsContext;