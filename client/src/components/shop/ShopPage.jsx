import { useState, useEffect, useContext } from "react";
import React from "react";
import ShopsList from "./ShopsList.jsx";
import MedItemsList from "./MedItemsList.jsx";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

function ShopPage() {
  const [currentShop, setCurrentShop] = useState("");

  const [shops, setShops] = useState([]);

  function toggleCurrentShop(id) {
    setCurrentShop(id);
  }

  function toggleSort(state) {
    switch (state) {
      case "desc":
        return "";
      case "":
        return "asc";
      case "asc":
        return "desc";
      default:
        return state;
    }
  }

  function reducer(state, action) {
    if (action.type === "sort_by_price" || action.type === "sort_by_date") {
      return {
        criteria: action.type === "sort_by_price" ? "price" : "added",
        isSorted: toggleSort(state.isSorted),
      };
    }
    throw Error("Unknown action.");
  }

  const [isSorted, dispatchSort] = React.useReducer(reducer, {
    criteria: "",
    isSorted: "",
  });

  useEffect(() => {
    axios
      .get("/api/shops")
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {shops.length > 0 ? (
        <>
          <ShopsList
            currentShop={currentShop ? currentShop : shops[0]?._id}
            shops={shops}
            toggleCurrentShop={toggleCurrentShop}
          />
          <MedItemsList
            currentShop={currentShop ? currentShop : shops[0]?._id}
            isSorted={isSorted}
            sortByDate={() => dispatchSort({ type: "sort_by_date" })}
            sortByPrice={() => dispatchSort({ type: "sort_by_price" })}
          />
        </>
      ) : (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#147e1f"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={true}
        />
      )}
    </>
  );
}

export default ShopPage;
