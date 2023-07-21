"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  // functions
  const addToCart = (product, otherDetails) => {

    const { quantity, color, size } = otherDetails;

    // checking if the product already exists in the cart
    const checkProductInCart = cart.find((item) => item._id === product._id);

    // updating the total price and cart total quantities
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cart.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + Math.abs(item.quantity - quantity), size: size, color: color };
        }
      });

      setCart(updatedCartItems);
    } else {
      product.quantity = quantity;
      product.color = color;
      product.size = size;

      setCart([...cart, { ...product }]);
    }

    // giving a toast notification
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (product) => {
    const foundProduct = cart.find((item) => item._id === product._id);
    const updatedCartItems = cart.filter((item) => item._id !== product._id);

    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prev) => prev - foundProduct.quantity);
    setCart(updatedCartItems);

    // toast notification
    toast.error(`${product.name} removed from cart`);
  };

  return (
    <Context.Provider
      value={{
        cart,
        setCart,
        totalPrice,
        totalQuantities,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);