import React from "react";

export default function SortButtons(props) {
    
  return (
    <div className="sort-buttons">
      <button onClick={props.sortByDate}>Sort by date</button>
      <button onClick={props.sortByPrice}>Sort by price</button>
    </div>
  );
}
