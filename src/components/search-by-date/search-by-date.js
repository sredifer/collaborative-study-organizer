// import { StrictMode } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import { createRoot } from "react-dom/client";
// import React, { useState } from "react";
// import DatePicker from "react-datepicker"

// // import App from "./App";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// function DateSearchBar({}) {
// //   const [date, setDate] = useState(new Date());
// //   const [startDate, setStartDate] = useState();
// //   const [endDate, setEndDate] = useState();
//   const handleChange = (range) => {
//     const [startDate, endDate] = range;
//     setStartDate(startDate);
//     setEndDate(endDate);
//   };
// }

// export default DateSearchBar;


// root.render(
//   <StrictMode>
//     {/* <App /> */}
//   </StrictMode>
// );



// import React from "react";
// import {useState} from "react";
// import DatePicker from "react-datepicker";
// import "./search-by-date.css"

// // import "react-datepicker/dist/react-datepicker.css"


// function DateSearchBar(){

//     const [selectedDate, setSelectedDate] = useState(null);

//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//     };

//     return (
//         <div className="date-search-box">
//             <h1>Hello Date Picker</h1>


//             <DatePicker
//             selected = {selectedDate}
//             onChange = {handleDateChange}
//             // dateFormat = "MM/DD/YYYY"
//             />

//         </div>
//     )
// }


// export default DateSearchBar;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./search-by-date.css"
// import "react-datepicker/dist/react-datepicker.css";

const articles = [
  {
    "author": "Chinua Achebe",
    "country": "Nigeria",
    "imageLink": "images/things-fall-apart.jpg",
    "language": "English",
    "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
    "pages": 209,
    "title": "Things Fall Apart",
    "year": 2024,
    "date": "02/14/2025"
  },
  {
    "author": "Hans Christian Andersen",
    "country": "Denmark",
    "imageLink": "images/fairy-tales.jpg",
    "language": "Danish",
    "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
    "pages": 784,
    "title": "Fairy tales",
    "year": 2025,
    "date": "08/25/2025"
  },
  // Add more articles if needed
];

function DateSearchBar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // Filter articles based on full date match
        const selectedDateStr = date ? date.toLocaleDateString() : null;
        
        // Filter articles where the 'date' field matches the selected date
        const filtered = articles.filter(article => {
            const articleDate = new Date(article.date).toLocaleDateString();
            return articleDate === selectedDateStr;
        });
        
        setFilteredArticles(filtered);
    };

    return (
        <div className="date-search-box">
            <h1>Hello Date Picker</h1>
            
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy" // Use full date format
            />
            
            <div>
                <h2>Articles Published on {selectedDate ? selectedDate.toLocaleDateString() : 'Select a Date'}</h2>
                <ul>
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article, index) => (
                            <li key={index}>
                                <h3>{article.title}</h3>
                                <p>Author: {article.author}</p>
                                <p>Country: {article.country}</p>
                                <p>Published on: {article.date}</p>
                                <p>Title: {article.title}</p>
                                <a href={article.link} target="_blank" rel="noopener noreferrer">More Info</a>
                            </li>
                        ))
                    ) : (
                        <p>No articles found for the selected date.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default DateSearchBar;
