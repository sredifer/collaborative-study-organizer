import React from "react";
import "./input-option.css";

function InputOption({ name, onClick, checked}) {
    return(
        <div classname="input-option" onClick={onClick}>
            <span className={"check" + (checked ? "checked" : "")} />
            <span className="name">{name}</span>
        </div>
    );
}

export default InputOption;