import React from "react";
import InputOption from "./input-option/input-option";
import "./index.css";

function InputSearch({options, onChange, onDelete}){
    const [filterText, setFilterText] = React.useState("");

    const[showOptions, setShowOptions] = React.useState(false);
    const container = React.useRef();

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleClickOutside(e){
        if (container.current.contains(e.target)) return;
        setShowOptions(false);
    }

    function handleCheck(name) {
        onChange(
            options.map(option => {
                if (option.name !== name) return option;
                return{...option, selected: !option.selected};
            })
        );
    }

    function getFilteredOptions() {
        return options.filter(option => {
            const textEmpty = filterText.length === 0;
            const optionName = option.name.toUpperCase();
            const foundText = optionName.includes(filterText.toUpperCase());

            return textEmpty || foundText;
        });
    }

    function handleKeys(e) {
        if (e.key === "Enter") {
            handleCheck(getFilteredOptions()[0].name);
        } else if (e.key === "Backspace" && filterText.trim() === "") {
            console.log(e.key);
            onDelete();
        }
    }

    return (
        <div className="input-container" ref={container}>
            <input
            type = "text"
            placeholder="add tags"
            onFocus={() => setShowOptions(true)}
            value = {filterText}
            onChange={e => setFilterText(e.target.value)}
            onKeyUp={handleKeys}
            />
            {showOptions && (
                <div className = "options">
                    {getFilteredOptions().map((option, index) => (
                        <InputOption name={option.name} key={option.name} 
                        checked={option.selected} onClick={() => handleCheck(option.name)}
                        />
                    )
                )
            }
            </div>
            )}
        </div>
    );
}

export default InputSearch;
