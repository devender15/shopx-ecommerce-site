"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { client } from "@lib/client";

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
  const { data: session } = useSession();

  // useEffects
  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlist/${session?.user?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        const sanityResponse = await client.fetch(
          `*[_id in ${JSON.stringify(data[0].wishlist)}]`
        );

        setWishlist(sanityResponse);
      } catch (error) {
        console.log(error);
        setWishlist([]);
      }
    };

    const fetchUserCart = async () => {
      try {
        const response = await fetch(`/api/cart/${session?.user?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        // getting the product details from the ids in the data
        const sanityResponse = await client.fetch(
          `*[_id in ${JSON.stringify(data[0].cart)}]`
        );
        setCart(sanityResponse);
      } catch (error) {
        console.log(error);
        setCart([]);
      }
    };

    if (session?.user?.id) {
      fetchUserWishlist();
      fetchUserCart();
    }
  }, [session?.user?.id]);

  // functions

  const updateUserWishlist = async (list) => {
    // create a wishlist array with only the product ids
    const wishlistIds = [];
    for (let i = 0; i < list.length; i++) {
      wishlistIds.push(wishlist[i]?._id);
    }

    try {
      await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          wishlist: wishlistIds,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserCart = async (list) => {
    // create a cart array with only the product ids
    const cartIds = [];
    for (let i = 0; i < list.length; i++) {
      cartIds.push(cart[i]?._id);
    }

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          cart: cartIds,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

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

      // updating the user's cart in the database
      updateUserCart(updatedCartItems);
    } else {
      product.quantity = quantity;
      product.color = color;
      product.size = size;

      setCart([...cart, { ...product }]);

      // updating the user's cart in the database
      updateUserCart([...cart, { ...product }]);
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

    // updating the user's cart in the database
    updateUserCart(updatedCartItems);

    // toast notification
    toast.error("Removed!");
  };

  const removeFromCart = (product) => {
    const foundProduct = cart.find((item) => item._id === product._id);
    const updatedCartItems = cart.filter((item) => item._id !== product._id);

    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prev) => prev - foundProduct.quantity);
    setCart(updatedCartItems);

    // updating the user's cart in the database
    updateUserCart(updatedCartItems);

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

        // updating the user's wishlist in the database
        updateUserWishlist([...prev, { ...product }]);

        return [...prev, { ...product }];
      }
      return [...prev];
    });
  };

  const removeFromWishlist = (product) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== product._id);

    // updating the user's wishlist in the database
    updateUserWishlist(updatedWishlist);

    setWishlist(updatedWishlist);

    toast.error("Removed from wishlist!");
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    setTotalQuantities(0);

    // updating the user's cart in the database
    updateUserCart([]);

    toast.success("Cart cleared!");
  };

  const clearWishlist = () => {
    setWishlist([]);

    // updating the user's wishlist in the database
    updateUserWishlist([]);

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
