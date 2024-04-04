import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

export default function SortButtons(props) {
  const buttonsIcon = (criteria) => {
    if (criteria === props.isSorted.criteria)
      switch (props.isSorted.isSorted) {
        case "asc":
          return faArrowUpWideShort;
        case "desc":
          return faArrowDownWideShort;
        default:
          return null;
      }
    else return null;
  };
  return (
    <div className="sort-buttons">
      <button onClick={props.sortByDate}>
        Sort by Date
        {buttonsIcon("added") && (
          <FontAwesomeIcon icon={buttonsIcon("added")} />
        )}
      </button>
      <button onClick={props.sortByPrice}>
        Sort by Price
        {buttonsIcon("price") && (
          <FontAwesomeIcon icon={buttonsIcon("price")} />
        )}
      </button>
    </div>
  );
}
