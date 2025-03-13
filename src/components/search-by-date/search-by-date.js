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
    "title": "Best Study Tips for College",
    "author": "Illinois Admissions",
    "link": "https://blog.admissions.illinois.edu/best-study-tips-for-college/\n",
    "date": "11/30/2022",
    "tag": "Study Resource"
    },
    {
     "title": "How to Study Effectively: 21 Best Study Tips for Final Exams",
     "author": "Shorelight Team",
     "link": "https://shorelight.com/student-stories/21-best-study-tips-for-final-exams/\n",
     "date": "10/2/2024",
     "tag": "Study Resource"
    },
    {
     "title": "Top 10 Effective Study Tips for College Students",
     "author": "Emily Hannigan-Page",
     "link": "https://www.wgu.edu/blog/top-10-effective-study-tips-college-students2303.html\n",
     "date": "03/14/2023",
     "tag": "Study Resource"
    },
    {
     "title": "8 Time Management Tips for Students",
     "author": "Harvard Summer School: Division of Continuing Education",
     "link": "https://summer.harvard.edu/blog/8-time-management-tips-for-students/\n",
     "date": "11/21/2024",
     "tag": "Time Management"
    },
    {
     "title": "Time Management for Busy College Students",
     "author": "Purdue Global",
     "link": "https://www.purdueglobal.edu/blog/student-life/time-management-busy-college-students/\n",
     "date": "02/05/2024",
     "tag": "Time Management"
    },
    {
     "title": "Time Management Strategies: 8 Tips for Balancing College and Life",
     "author": "Krysten Godfrey Maddocks",
     "link": "https://www.snhu.edu/about-us/newsroom/education/time-management-strategies\n",
     "date": "05/24/2024",
     "tag": "Time Management"
    },
    {
     "title": "How to Be More Productive as a Student",
     "author": "Matt Rowley",
     "link": "https://www.columbiasouthern.edu/blog/blog-articles/2024/february/how-to-be-more-productive-as-a-student/\n",
     "date": "02/14/2024",
     "tag": "Productivity"
    },
    {
     "title": "22 Productivity Tips for College Students",
     "author": "Johnson and Wales University",
     "link": "https://online.jwu.edu/blog/22-productivity-tips-college-students/\n",
     "date": "10/20/2023",
     "tag": "Productivity"
    },
    {
     "title": "How To Study Effectively? 10 Best Study Techniques | USAHS",
     "author": "University of St. Augustine for Health Sciences",
     "link": "https://www.usa.edu/blog/study-techniques/#:~:text=Day%201:%20Learn%20the%20material,one%20week:%20Revisit%20and%20review.\n",
     "date": "01/14/2025",
     "tag": "Effective Learning"
    },
    {
        "title": "Note-taking",
        "author": "Erin Stapleton-Corcoran",
        "link": "https://teaching.uic.edu/cate-teaching-guides/inclusive-equity-minded-teaching-practices/note-taking/\n",
        "date": "10/30/2023",
        "tag": "Effective Learning"
    },
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
            <h1>Date Picker</h1>
            
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
                                {/* <p>Country: {article.country}</p> */}
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
