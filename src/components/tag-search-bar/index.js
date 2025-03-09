import React from "react";
import TagBar from "./tag-bar";
import InputSearch from "./input-search"

import "./index.css"

function SearchBox({options, onChange}) {
    function getSelectedOptions() {
        return options.filter(option => option.selected).map(option => option.name);
    }

    function handleInputDelete() {
        const lastTag = getSelectedOptions()[getSelectedOptions.length - 1];
        onChange(options.filter(options => option.name !== lastTag.name));
    }

    function handleTagDelete(name) {
        onChange(
            options.map(option =>
                option.name === name ? { ...option, selected: false } : option
            )
        );
    }

    function handleAllTagDelete()
    {
        onChange(options.map(option => ({...option, selected: false})))
    }

    return (
        <div className="search-box">
            {getSelectedOptions().length !== 0 && (
                <TagBar tags={getSelectedOptions()} onDelete={handleTagDelete} onDeleteAll={handleAllTagDelete}
                />
            )}
            <hr />
            <InputSearch options={options} onChange={newOptions => onChange(newOptions)} onDelete ={handleInputDelete} />
        </div>
);
}

export default SearchBox;
