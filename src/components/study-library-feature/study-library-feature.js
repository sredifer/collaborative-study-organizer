import { useState } from "react";
import "./searchBar.css"

function SearchBar({placeholder, data}){
    
    const [filteredData, setFilteredData] = useState([]);

    const handleUserEntry = (event) => {
        const searchWord = event.target.value
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        
        if (searchWord === "") {
            setFilteredData([])
        }
        else {
            setFilteredData(newFilter);
        }
    };

    return(
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder ={placeholder} onChange={handleUserEntry}/>
                <div className="searchIcon"></div>
            </div>
            {filteredData.length != 0 && (
            <div className="dataResult">
                {filteredData.map((value, key) => {
                    return (
                    <a className="dataItem" href={value.link} target="_blank">
                        <p>{value.title}</p>
                    </a>
                    );
                })}
            </div>
            )}
        </div>
    )
}

export default SearchBar





// import { useState } from "react";
// import { Data } from "./resources"

// function SearchBar(){
//     return(
//         <div className="search">
//             <div className="searchInputs"></div>
//             <div className="dataResult"></div>
//         </div>
//     )
// }

// export default SearchBar




// function SearchableLibrary() {
//     const [query, setQuery] = useState("");

//     console.log(query)
//     return(
//         <div className="app">
//             <input type="text" placeholder="Search..." className="search" onChange={e=> setQuery(e.target.value)} />
//             <ul className = "list">
//                 {Data.map((user) => (
//                     <li classname="listItem">{user.first_name}</li>
//                 ))}
//             </ul>

//         </div>
//     );
// }

// export default SearchableLibrary









// function SearchableLibrary () {
//     const [items, setItems] = useState([])
//     const inputRef = userRef()

//     function onSubmit(e){
//         e.preventDefault()

//         const value = inputRef.current.value
//         if(value === "") {
//             return
//         }
//         setItems(prev => {
//             return[...prev, value]
//         })
//         inputRef.current.value = ""
//     }
//     return (
//     <>
//       Search:
//       <input type="search" />
//       {/* fixme might not need to add elements */}
//       <br />
//       <br />
//       <form onSubmit = {onSubmit}>
//         New Item:  
//         <input ref={inputRef} type="text"/>
//         <button type="submit">Add</button>
//       </form>
//       <h3>Items:</h3>
//       {/*output items to screen*/}
//       {items.map(item => (
//         <div>{item}</div>
//       ))}
//     </>
//    )
// }

// export default SearchableLibrary