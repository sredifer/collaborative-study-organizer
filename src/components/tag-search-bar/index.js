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

// Example of your articles data
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
    "date": "02/14/2025",
    "tag": "Time Management"
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
    "date": "08/25/2025",
    "tag": "Short"
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
                <h3>{article.title}</h3>
                <p>Author: {article.author}</p>
                <p>Country: {article.country}</p>
                <p>Published on: {article.date}</p>
                <p>Tag: {article.tag}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer">More Info</a>
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



