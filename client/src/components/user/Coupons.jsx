import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

import { faClipboard } from "@fortawesome/free-regular-svg-icons";

export default function Coupons() {
  const [copiedCoupon, setCopiedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const { user } = useContext(UserContext);

  function copy(text) {
    navigator.clipboard.writeText(text);
    setCopiedCoupon(text);
    const timeoutId = setTimeout(() => {
      setCopiedCoupon(null);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }

  async function fetchCoupons() {
    try {
      const response = await axios.get("/api/coupons", {
        params: {
          userToFind: user.email,
        },
      });
      setCoupons(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCoupons();
  }, [user]);

  return (
    <div className="coupons">
      <h2>Coupons for You</h2>
      <div className="coupons-list">
        <ul>
          {coupons?.map((coupon) => {
            return (
              <li
                key={coupon._id}
                className="coupon"
                onClick={() => copy(coupon.name)}
              >
                <p>
                  <span>{coupon.name} </span>
                  {coupon.description}
                </p>

                {copiedCoupon === coupon.name ? (
                  <FontAwesomeIcon icon={faClipboardCheck} className="img" />
                ) : (
                  <FontAwesomeIcon icon={faClipboard} className="img" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
