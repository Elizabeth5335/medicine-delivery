import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem("cartProducts")) || []
  );

  function addToCart(product) {
    const isProductInCart = cartProducts.find(
      (cartProduct) => cartProduct._id === product._id
    );

    if (isProductInCart) {
      const updatedCartProducts = cartProducts.map((cartProduct) =>
        cartProduct.id === product.id
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct
      );
      setCartProducts(updatedCartProducts);
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(product) {
    const isProductInCart = cartProducts.find(
      (cartProduct) => cartProduct._id === product._id
    );

    if (isProductInCart) {
      const updatedCartProducts = cartProducts.filter(
        (cartProduct) => cartProduct._id !== product._id
      );
      setCartProducts(updatedCartProducts);
    }
  }

  function setQuantity(product, newQuantity) {
    const isProductInCart = cartProducts.find(
      (cartProduct) => cartProduct._id === product._id
    );

    if (isProductInCart && newQuantity > 0 && newQuantity < 100) {
      const updatedCartProducts = cartProducts.map((cartProduct) =>
        cartProduct._id === product._id
          ? { ...cartProduct, quantity: newQuantity }
          : cartProduct
      );
      setCartProducts(updatedCartProducts);
    }

    if (newQuantity === 0) removeFromCart(product);
  }

  function clearCart() {
    setCartProducts([]);
  }

  const validCoupons = {
    Spring40: 40,
    Family20: 20,
  };

  function checkCoupon(coupon) {
    if (validCoupons.hasOwnProperty(coupon)) {
      return "";
    } else {
      console.warn("Invalid coupon code");
      return "Invalid coupon code";
    }
  }

  function getCartTotal(coupon = null) {
    let total = cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    if (checkCoupon(coupon) === "") {
      const discountPercentage = validCoupons[coupon];
      const discountAmount = (total * discountPercentage) / 100;
      total -= discountAmount;
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
        checkCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
