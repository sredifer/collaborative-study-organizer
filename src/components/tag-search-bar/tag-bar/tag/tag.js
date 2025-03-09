import React from "react";
import "./tag.css";

function Tag({ name, onClose, inverted}) {
    return(
        <div className={"tag" + (inverted ? "inverted" : "")}>
            {name}
            <span className="close-button" onClick={() => onClose(name)}>
                <span className="close-icon" />
            </span>
        </div>
    );
}

export default Tag;