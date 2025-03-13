// import React from "react";
// import TagBar from "./tag-bar";
// import InputSearch from "./input-search"

// import "./index.css"

// function SearchBox({options, onChange}) {
//     function getSelectedOptions() {
//         return options.filter(option => option.selected).map(option => option.name);
//     }

//     function handleInputDelete() {
//         const lastTag = getSelectedOptions()[getSelectedOptions.length - 1];
//         onChange(options.filter(options => option.name !== lastTag.name));
//     }

//     function handleTagDelete(name) {
//         onChange(
//             options.map(option =>
//                 option.name === name ? { ...option, selected: false } : option
//             )
//         );
//     }

//     function handleAllTagDelete()
//     {
//         onChange(options.map(option => ({...option, selected: false})))
//     }

//     return (
//         <div className="search-box">
//             {getSelectedOptions().length !== 0 && (
//                 <TagBar tags={getSelectedOptions()} onDelete={handleTagDelete} onDeleteAll={handleAllTagDelete}
//                 />
//             )}
//             <hr />
//             <InputSearch options={options} onChange={newOptions => onChange(newOptions)} onDelete ={handleInputDelete} />
//         </div>
// );
// }

// export default SearchBox;

// import React from "react";
// import TagBar from "./tag-bar";
// import InputSearch from "./input-search"

// import "./index.css"

// function SearchBox({options, onChange}) {
//     function getSelectedOptions() {
//         return options.filter(option => option.selected).map(option => option.name);
//     }

//     function handleInputDelete() {
//         const lastTag = getSelectedOptions()[getSelectedOptions.length - 1];
//         onChange(options.filter(options => option.name !== lastTag.name));
//     }

//     function handleTagDelete(name) {
//         onChange(
//             options.map(option =>
//                 option.name === name ? { ...option, selected: false } : option
//             )
//         );
//     }

//     function handleAllTagDelete()
//     {
//         onChange(options.map(option => ({...option, selected: false})))
//     }

//     return (
//         <div className="search-box">
//             {getSelectedOptions().length !== 0 && (
//                 <TagBar tags={getSelectedOptions()} onDelete={handleTagDelete} onDeleteAll={handleAllTagDelete}
//                 />
//             )}
//             <hr />
//             <InputSearch options={options} onChange={newOptions => onChange(newOptions)} onDelete ={handleInputDelete} />
//         </div>
// );
// }

// export default SearchBox;

import React, { useState, useEffect } from "react";
import TagBar from "./tag-bar";
import InputSearch from "./input-search";
import "./index.css";

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
    // fixme start here with productivity and find two more articles for the first two 
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
     "link": "https://www.usa.edu/blog/study-techniques/\n",
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

function SearchBox({ options, onChange }) {
  const [filteredArticles, setFilteredArticles] = useState(articles); // State to store filtered articles

  function getSelectedOptions() {
    return options.filter(option => option.selected).map(option => option.name);
  }

  function handleInputDelete() {
    const lastTag = getSelectedOptions()[getSelectedOptions.length - 1];
    onChange(options.filter(option => option.name !== lastTag.name));
  }

  function handleTagDelete(name) {
    onChange(
      options.map(option =>
        option.name === name ? { ...option, selected: false } : option
      )
    );
  }

  function handleAllTagDelete() {
    onChange(options.map(option => ({ ...option, selected: false })));
  }

  // Function to filter articles based on selected tags
  function filterArticlesByTags() {
    const selectedTags = getSelectedOptions();
    if (selectedTags.length === 0) {
      setFilteredArticles(articles); // Show all articles if no tag is selected
    } else {
      const filtered = articles.filter(article =>
        selectedTags.includes(article.tag)
      );
      setFilteredArticles(filtered); // Update state with filtered articles
    }
  }

  // Effect hook to filter articles whenever the selected options change
  useEffect(() => {
    filterArticlesByTags();
  }, [options]); 

  return (
    <div className="search-box">
      {getSelectedOptions().length !== 0 && (
        <TagBar
          tags={getSelectedOptions()}
          onDelete={handleTagDelete}
          onDeleteAll={handleAllTagDelete}
        />
      )}
      <hr />
      <InputSearch
        options={options}
        onChange={newOptions => onChange(newOptions)}
        onDelete={handleInputDelete}
      />

      {/* Display filtered articles */}
      <div className="article-results">
        <h2>Search Results</h2>
        {filteredArticles.length > 0 ? (
          <ul>
            {filteredArticles.map((article, index) => (
              <li key={index}>
                <a className="article-links" href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
                <p>Author: {article.author}</p>
                {/* <p>Country: {article.country}</p> */}
                <p>Published on: {article.date}</p>
                <p>Tag: {article.tag}</p>
                {/* <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a> */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No articles found for the selected tags.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBox;


