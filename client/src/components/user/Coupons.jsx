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
    <div className="coupons">
      <h2>Coupons for You</h2>
      <div className="coupons-list">
        <ul>
          <li className="coupon" onClick={() => copy("Spring40")}>
            <p>
              <span>Spring40 </span>- 40% discount for new collection
            </p>

            {copiedCoupon === "Spring40" ? (
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="img"
              />
            ) : (
              <FontAwesomeIcon
                icon={faClipboard}
                className="img"
              />
            )}
          </li>
          <li className="coupon" onClick={() => copy("Family20")}>
            <p>
              <span>Family20 </span>- 20% discount for family items
            </p>
            {copiedCoupon === "Family20" ? (
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="img"
              />
            ) : (
              <FontAwesomeIcon
                icon={faClipboard}
                className="img"
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
