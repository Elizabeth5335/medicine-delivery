import { useContext, useState, useEffect } from "react";
import MedItem from "./MedItem";
import { CartContext } from "../../context/CartContext";
import SearchBar from "./SearchBar";

function MedItemsList(props) {
  const { currentShop, shops } = props;

  const { addToCart } = useContext(CartContext);

  const [favProducts, setFavProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("favouriteProducts")) || [];
  });

  const productsFromShop = shops?.find(
    (shop) => shop?._id === currentShop
  )?.products;

  const [products, setProducts] = useState(productsFromShop);

  const [sortedProducts, setSortedProducts] = useState();

  useEffect(() => {
    sortByFavourites();
  }, [currentShop]);

  useEffect(() => {
    localStorage.setItem("favouriteProducts", JSON.stringify(favProducts));
  }, [favProducts]);

  function sortByFavourites() {
    if (productsFromShop && favProducts.length > 0) {
      const favProductsInList = favProducts.filter((item) =>
        productsFromShop.some((product) => product._id === item._id)
      );

      const newSortedProducts = [
        ...favProductsInList,
        ...productsFromShop.filter(
          (item) =>
            !favProductsInList.some((favItem) => favItem._id === item._id)
        ),
      ];

      setSortedProducts(newSortedProducts);
    } else {
      setSortedProducts(productsFromShop);
    }
  }

  useEffect(() => {
    sortByFavourites();
  }, [favProducts]);

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

  function sortByDate() {
    const newSortedProducts =
      sortedProducts.length > 0
        ? [...sortedProducts].sort((first, second) => {
            return first.added > second.added ? -1 : 1;
          })
        : [...products].sort((first, second) => {
            return first.added > second.added ? -1 : 1;
          });
    setSortedProducts(newSortedProducts);
  }

  function sortByPrice() {
    const newSortedProducts =
      sortedProducts.length > 0
        ? [...sortedProducts].sort((first, second) => {
            return first.price > second.price ? 1 : -1;
          })
        : [...productsFromShop].sort((first, second) => {
            return first.price > second.price ? 1 : -1;
          });
    setSortedProducts(newSortedProducts);
  }

  function searchProducts(searchInput) {
    if (searchInput.length > 1) {
      const searchLowerCase = searchInput.toLowerCase();
      
      const startsWithItems = productsFromShop.filter((item) => {
        return item.name.toLowerCase().startsWith(searchLowerCase);
      });
  
      const containsItems = productsFromShop.filter((item) => {
        return item.name.toLowerCase().includes(searchLowerCase) && !startsWithItems.includes(item);
      });
  
      const filteredItems = [...startsWithItems, ...containsItems];
  
      setSortedProducts(filteredItems);
    } else {
      setSortedProducts(productsFromShop);
    }
  }
  


  return (
    <div className="shop-items">
      <SearchBar items={sortedProducts} searchProducts={searchProducts} />
      <div className="sort-buttons">
        <button onClick={sortByDate}>Sort by date</button>
        <button onClick={sortByPrice}>Sort by price</button>
      </div>
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
