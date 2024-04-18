import UserInfo from "./UserInfo";

import { useContext, useState } from "react";
import React from "react";
import Orders from "./Orders";
import Coupons from "./Coupons";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function Account() {
  const { isLoggedIn } = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState("tab_0");

  const tabs = [
    { id: "tab_0", name: "User Info" },
    { id: "tab_1", name: "Orders" },
    { id: "tab_2", name: "Coupons" },
  ];

  function toggleCurrentTab(id) {
    setCurrentTab(id);
  }

  function tabsSwitcher() {
    switch (currentTab) {
      case "tab_1":
        return <Orders />;
      case "tab_2":
        return <Coupons />;
      default:
        return <UserInfo />;
    }
  }

  return isLoggedIn ? (
    <div className="account">
      <ul className="account-tabs">
        {tabs.map((tab) => {
          return (
            <li
              key={tab.id}
              className={`account-tab ${currentTab === tab.id ? "active" : ""}`}
              onClick={() => toggleCurrentTab(tab.id)}
            >
              {tab.name}
            </li>
          );
        })}
      </ul>
      {tabsSwitcher()}
    </div>
  ) : (
    <div>
      <h2><Link to="/login">Log in</Link> first</h2>
      
    </div>
  );
}
