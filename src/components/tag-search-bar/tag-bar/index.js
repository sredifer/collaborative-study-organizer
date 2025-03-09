import React from "react";
import Tag from "./tag/tag";
import "./index.css";

function TagBar({ tags, onDelete, onDeleteAll}) {
    return (
        <block className="tag-bar">
            <block className="tags-container">
            {tags.slice(0, 20).map(tag => (
                    <Tag key={tag} name={tag} onClose={() => onDelete(tag)} />
                ))}
                {/* {tags.slice(0, 3).map(tag => (
                    <Tag key={tag} name={tag} onClose={() => onDelete(tag)} />
                ))}
                {tags.length > 3 && (
                    <div className="dots-container">
                        <div className="dots"/>
                    </div>
                )} */}
            </block>
            <div>
            <Tag className="tag-count" name={tags.length} inverted onClose={onDeleteAll} />
            </div>
        </block>
    );
}

export default TagBar;