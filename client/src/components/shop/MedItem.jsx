import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";

function MedItem(props) {
  const {
    item: { _id, name, image, price },
    addToCart,
    isFavourite,
    toggleIsFavourite
  } = props;

  return (
    <div className="med-item">
      <img className="med-item-image" src={image} alt={name} />
      <h4 className="med-item-text">{name}</h4>
      <div className="med-item-footer">
        <span className="price">{price.toFixed(2)}</span>
        <div onClick={toggleIsFavourite}>
        {isFavourite ? (
          <FontAwesomeIcon icon={heartSolid} color="red" />
        ) : (
          <FontAwesomeIcon icon={heartRegular} />
        )}
        </div>
        <button className="med-item-btn" onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default MedItem;
