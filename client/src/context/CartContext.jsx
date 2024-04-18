import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem("cartProducts")) || []
  );

  function addToCart(productToAdd) {
    const isProductInCart = cartProducts.find(
      (cartProduct) => cartProduct._id === productToAdd._id
    );

    if (isProductInCart) {
      const updatedCartProducts = cartProducts.map((cartProduct) =>
        cartProduct._id === productToAdd._id
          ? // ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            {
              ...cartProduct,
              product: cartProduct._id,
              quantity: +cartProduct.quantity + 1,
            }
          : cartProduct
      );
      setCartProducts(updatedCartProducts);
    } else {
      setCartProducts([
        ...cartProducts,
        { ...productToAdd, product: productToAdd._id, quantity: 1 },
      ]);
    }
  }

  function removeFromCart(productToRemove) {
    const isProductInCart = cartProducts.find(
      (cartProduct) => cartProduct.product === productToRemove.product
    );

    if (isProductInCart) {
      const updatedCartProducts = cartProducts.filter(
        (cartProduct) => cartProduct.product !== productToRemove.product
      );
      setCartProducts(updatedCartProducts);
    }
  }

  function setQuantity(productToUpdate, newQuantity) {
    const isProductInCart = cartProducts.find(
      (cartProduct) => cartProduct.product === productToUpdate.product
    );

    if (isProductInCart && newQuantity >= 0 && newQuantity < 100) {
      const updatedCartProducts = cartProducts.map((cartProduct) =>
        cartProduct.product === productToUpdate.product
          ? { ...cartProduct, quantity: newQuantity }
          : cartProduct
      );
      setCartProducts(updatedCartProducts);
    }

    if (newQuantity === 0) removeFromCart(productToUpdate);
  }

  function clearCart() {
    setCartProducts([]);
  }

  const [validCoupons, setValidCoupons] = useState([]);

  async function fetchCoupons() {
    try {
      const response = await axios.get("/api/coupons", {
        params: {
          userToFind: "admin",
        },
      });
      setValidCoupons(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  function checkCoupon(coupon) {
    const couponExists = validCoupons.some(
      (validCoupon) => validCoupon.name === coupon
    );
    return couponExists ? "" : "Invalid coupon code";
  }

  function getCartTotal(coupon = null) {
    let total = cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    if (checkCoupon(coupon) === "") {
      const couponObject = validCoupons.find(
        (validCoupon) => validCoupon.name === coupon
      );
      if (couponObject) {
        const discountPercentage = couponObject.discount;
        const discountAmount = (total * discountPercentage) / 100;
        total -= discountAmount;
      }
    }
    return total;
  }

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        setQuantity,
        checkCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
