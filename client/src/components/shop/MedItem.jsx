import { useState } from "react";

function MedItem(props) {
  const { item: { _id, name, image, price }, addToCart } = props;
    
  return (
    <div className="med-item">
      <img className="med-item-image" src={image} alt={name} />
      <h4 className="med-item-text">{name}</h4>
      <div className="med-item-footer">
      <span className="price">{price.toFixed(2)}</span>
      <button className="med-item-btn" onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
}

export default MedItem;
