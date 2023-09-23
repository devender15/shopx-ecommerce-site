"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showProductInfoModal, setShowProductInfoModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarValue, setSidebarValue] = useState("");

  // functions
  const addToCart = (product, otherDetails) => {
    // if otherDetails is undefined, set values of quantity, color and size to default
    if (!otherDetails) {
      otherDetails = {
        quantity: 1,
        color: "Primary",
        size: "M",
      };
    }

    const { quantity, color, size } = otherDetails;

    // checking if the product already exists in the cart
    const checkProductInCart = cart.find((item) => item._id === product._id);

    // updating the total price and cart total quantities
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);

    if (checkProductInCart) {
      const updatedCartItems = [];
      cart.forEach((item) => {
        if (item._id === product._id) {
          item = {
            ...item,
            quantity: item.quantity + quantity,
            size: size,
            color: color,
          };
        }
        updatedCartItems.push(item);
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

  const removeQuantity = (product) => {
    // if the quantity is less than 1, remove the product from the cart
    if (product.quantity < 2) {
      removeFromCart(product);
      return;
    }

    const updatedCartItems = cart.map((item) => {
      if (item._id === product._id) {
        return { ...item, quantity: item.quantity - 1 };
      }
    });

    setCart(updatedCartItems);
    setTotalQuantities((prev) => prev - 1);
    setTotalPrice((prev) => prev - product.price);

    // toast notification
    toast.error("Removed!");
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

  const addToWishlist = (product) => {
    // setWishlist([...wishlist, { ...product }]);
    setWishlist((prev) => {
      // saving the new product only if it doesn't already exist in the wishlist
      const foundProduct = prev.find((item) => item._id === product._id);
      if (!foundProduct) {
        toast.success(`Added to wishlist 💓`);
        return [...prev, { ...product }];
      }
      return [...prev];
    });
  };

  const removeFromWishlist = (product) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== product._id);
    setWishlist(updatedWishlist);

    toast.error("Removed from wishlist!");
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    setTotalQuantities(0);

    toast.success("Cart cleared!");
  }

  const clearWishlist = () => {
    setWishlist([]);

    toast.success("Wishlist cleared!");
  };

  const handleOpenProductInfoModal = (productsArray, productId) => {
    const product = productsArray.find((product) => product._id === productId);
    setSelectedProduct(product);

    setShowProductInfoModal(true);
  };

  const handleOpenSidebar = (sidebarvalue) => {
    setSidebarValue(sidebarvalue);
    setIsSidebarOpen((prev) => !prev);
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
        addToWishlist,
        removeQuantity,
        wishlist,
        removeFromWishlist,
        selectedProduct,
        setSelectedProduct,
        showProductInfoModal,
        setShowProductInfoModal,
        handleOpenProductInfoModal,
        clearWishlist,
        handleOpenSidebar,
        isSidebarOpen,
        sidebarValue,
        setIsSidebarOpen,
        clearCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
