import { useContext, useState, useEffect } from "react";
import MedItem from "./MedItem";
import { CartContext } from "../../context/CartContext";

function MedItemsList(props) {
  const { currentShop, shops } = props;

  const { addToCart } = useContext(CartContext);

  const products = shops?.find((shop) => shop?._id === currentShop)?.products;

  const [favProducts, setFavProducts] = useState([]);

  useEffect(() => {
    const favProducts = localStorage.getItem("favouriteProducts");
    if (favProducts) {
      setFavProducts(JSON.parse(favProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favouriteProducts", JSON.stringify(favProducts));
  }, [favProducts]);

  const [sortedProducts, setSortedProducts] = useState([]);

  function sortByFavourites() {
    if (products && favProducts.length > 0) {
      const newSortedProducts = [
        ...favProducts,
        ...products.filter((item) => !favProducts.includes(item)),
      ];
      setSortedProducts(newSortedProducts);
    } else {
      setSortedProducts(products);
    }
  }
  useEffect(() => {
    sortByFavourites();
  }, [products, favProducts]);

  function toggleIsFavourite(product) {
    const isFavourite = favProducts.length > 0 && favProducts.includes(product);
    if (isFavourite) {
      const updatedCartProducts = favProducts.filter(
        (cartProduct) => cartProduct._id !== product._id
      );
      setFavProducts(updatedCartProducts);
    } else {
      setFavProducts([...favProducts, product]);
    }
  }

  return (
    <div className="flex">
      {sortedProducts?.length > 0 ? (
        <ul className="med-list">
          {sortedProducts.map((item) => {
            return (
              <MedItem
                key={item?._id}
                item={item}
                addToCart={() => {
                  addToCart(item);
                }}
                isFavourite={
                  favProducts.length > 0 && favProducts.includes(item)
                }
                toggleIsFavourite={() => {
                  toggleIsFavourite(item);
                }}
              />
            );
          })}
        </ul>
      ) : (
        <h3>There are no products</h3>
      )}
    </div>
  );
}

export default MedItemsList;
