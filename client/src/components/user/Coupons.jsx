import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

import { faClipboard } from "@fortawesome/free-regular-svg-icons";

export default function Coupons() {
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  function copy(text) {
    navigator.clipboard.writeText(text);
    setCopiedCoupon(text);
    const timeoutId = setTimeout(() => {
      setCopiedCoupon(null);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }

  return (
    <div>
      <h2>Coupons for You</h2>
      <div className="coupons-list">
        <ul>
          <li onClick={() => copy("Spring40")}>
            <span>Spring40 - 40% discount for new collection</span>
            {copiedCoupon === "Spring40" ? (
              <FontAwesomeIcon
                icon={faClipboardCheck}
                color="green"
                style={{ marginLeft: "5px" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faClipboard}
                style={{ marginLeft: "5px" }}
              />
            )}
          </li>
          <li onClick={() => copy("Family20")}>
            <span>Family20 - 20% discount for child clothes</span>
            {copiedCoupon === "Family20" ? (
              <FontAwesomeIcon
                icon={faClipboardCheck}
                color="green"
                style={{ marginLeft: "5px" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faClipboard}
                style={{ marginLeft: "5px" }}
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
