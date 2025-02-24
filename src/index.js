console.log("Starting index.js");
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("index.js is running");

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);

