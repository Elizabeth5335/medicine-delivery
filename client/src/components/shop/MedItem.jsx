import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCheck,
  faHeart as heartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";

export default function MedItem(props) {
  const [cartIcon, setCartIcon] = useState(faCartPlus);

  const {
    item: { _id, name, image, price, added },
    addToCart,
    isFavourite,
    toggleIsFavourite,
  } = props;

  function changeIcon() {
    const timeoutId = setTimeout(() => {
      setCartIcon(faCartPlus);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }

  return (
    <div className="med-item">
      <img className="med-item-image" src={image} alt={name} />
      <h4 className="med-item-text">{name}</h4>
      <div className="med-item-footer">
        <span className="price">{price?.toFixed(2)}</span>
        <div className="icon heart" onClick={toggleIsFavourite}>
          {isFavourite ? (
            <FontAwesomeIcon icon={heartSolid} color="red" />
          ) : (
            <FontAwesomeIcon icon={heartRegular} />
          )}
        </div>
        <div
          className="icon med-item-btn"
          onClick={() => {
            setCartIcon(faCheck);
            changeIcon();
            addToCart();
            
          }}
          // onClick={addToCart}
        >
          <FontAwesomeIcon icon={cartIcon} />
        </div>
      </div>
    </div>
  );
}
