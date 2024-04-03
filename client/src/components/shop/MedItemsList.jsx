import { useContext, useState, useEffect } from "react";
import MedItem from "./MedItem";
import { CartContext } from "../../context/CartContext";
import SearchBar from "./SearchBar";
import SortButtons from "./SortButtons";
import axios from "axios";

function MedItemsList(props) {
  const { currentShop, isSorted, sortByDate, sortByPrice } = props;
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [favProducts, setFavProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("favouriteProducts")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favouriteProducts", JSON.stringify(favProducts));
  }, [favProducts]);

  useEffect(() => {
    fetchProducts();
  }, [currentShop, isSorted]);

  useEffect(() => {
    setDisplayedProducts(products);
    isSorted.isSorted === "" && sortByFavourites();
  }, [products]);

  useEffect(() => {
    isSorted.isSorted === "" && sortByFavourites();
  }, [favProducts]);

  async function fetchProducts() {
    try {
      const response = await axios.get("/api/products", {
        params: {
          currentShop: currentShop,
          sortBy: isSorted.criteria,
          order: isSorted.isSorted,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function sortByFavourites() {
    if (products.length > 0 && favProducts.length > 0) {
      // const favProductIds = favProducts.map((fav) => fav._id);
      const favProductsInList = products.filter((product) =>
        favProducts.includes(product._id)
      );
      const sortedProducts = [
        ...favProductsInList,
        ...products.filter((product) => !favProducts.includes(product._id)),
      ];
      setDisplayedProducts(sortedProducts);
      console.log(displayedProducts)

    }
  }

  function toggleIsFavourite(product) {
    const isFavourite = favProducts.length > 0 && favProducts.includes(product._id);
    if (isFavourite) {
      const updatedFavProducts = favProducts.filter(
        (favProduct) => favProduct !== product._id
      );
      setFavProducts(updatedFavProducts);
    } else {
      setFavProducts([...favProducts, product._id]);
    }
  }

  function searchProducts(searchInput) {
    if (searchInput.length > 1) {
      const searchLowerCase = searchInput.toLowerCase();

      const startsWithItems = products.filter((item) => {
        return item.name.toLowerCase().startsWith(searchLowerCase);
      });

      const containsItems = products.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchLowerCase) &&
          !startsWithItems.includes(item)
        );
      });

      const filteredItems = [...startsWithItems, ...containsItems];

      setDisplayedProducts(filteredItems);
    } else {
      setDisplayedProducts(products);
    }
  }

  return (
    <div className="shop-items">
      <SearchBar items={products} searchProducts={searchProducts} />
      <SortButtons sortByDate={sortByDate} sortByPrice={sortByPrice} />

      {displayedProducts?.length > 0 ? (
        <ul className="med-list">
          {displayedProducts.map((item) => {
            return (
              <MedItem
                key={item?._id}
                item={item}
                addToCart={() => {
                  addToCart(item);
                }}
                isFavourite={
                  favProducts.length > 0 && favProducts.includes(item?._id)
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
