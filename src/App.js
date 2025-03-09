import React from "react";
import Calendar from "./components/calendar/Calendar";
import SearchBar from "./components/study-library-feature/study-library-feature";
import resourcesData from "./components/Study-library-resources-data.json" 
import SearchBox from "./components/tag-search-bar";
import optionArray from "./components/constants/options";


function App() {
  const [options, setOptions] = React.useState(optionArray);

  return (
    <div>
      <h1>Collaborative Study Organizer</h1>
      <Calendar />
      <br />
      <br />
      <SearchBar placeholder="Search for a study resource" data={resourcesData}/>
      <br />
      <SearchBox options={options} onChange={newOptions => setOptions(newOptions)}/>

    </div>
  );
}

export default App;
