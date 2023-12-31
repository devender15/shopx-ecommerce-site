import { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useStateContext } from "@context/StateContext";
import { PRODUCT_SIZES, PRODUCT_COLORS } from "@constants";

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function AddToCart({ productData }) {
  // context
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } =
    useStateContext();

  const { data: session } = useSession();

  // states
  const [itemDetails, setItemDetails] = useState({
    color: "bg-blue-500",
    size: "M",
    quantity: 1,
  });
  const [alreadyInWishlist, setAlreadyInWishlist] = useState(false);
  const colors = {
    "bg-blue-500": "bg-blue-500",
    "bg-green-500": "bg-green-500",
    "bg-red-500": "bg-red-500",
  };

  // useEffects
  useEffect(() => {
    const checkForWishlist = (product) => {
      const prod = wishlist.find((item) => item._id === product._id);
      if (prod) {
        setAlreadyInWishlist(true);
      }
      return;
    };
    checkForWishlist(productData);
  }, [productData]);

  // functions
  const incrementQty = () => {
    setItemDetails((prev) => {
      let qty = prev.quantity;
      qty += 1;

      return { ...prev, quantity: qty };
    });
  };

  const decrementQty = () => {
    setItemDetails((prev) => {
      let qty = prev.quantity;
      qty -= 1;

      // preventing from qty becoming a negative number
      if (qty < 0) qty = 0;

      return { ...prev, quantity: qty };
    });
  };

  const selectColor = (color) => {
    setItemDetails((prev) => {
      let newColor = prev.color;
      newColor = color;

      return { ...prev, color: newColor };
    });
  };

  const selectSize = (size) => {
    setItemDetails((prev) => {
      let newSize = prev.size;
      newSize = size;

      return { ...prev, size: newSize };
    });
  };

  const handleAddToWishlist = () => {
    if(!session) return signIn("google");
    addToWishlist(productData);
    setAlreadyInWishlist(true);
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(productData);
    setAlreadyInWishlist(false);
  };

  return (
    <>
      <div className="flex flex-col gap-x-0 gap-y-4 md:flex-row items-start md:gap-x-8 md:gap-y-0">
        <div className="flex flex-col gap-y-4">
          <h3 className="font-semibold">Color</h3>
          <div className="flex items-center gap-x-2">
            {PRODUCT_COLORS.map((color) => (
              <div
                key={color.id}
                className={`w-5 h-5 rounded-full ${
                  colors[color.name]
                } cursor-pointer hover:ring-2 ring-black transition-all duration-300 ${
                  itemDetails.color === color.name ? "ring-2" : "ring-0"
                }`}
                onClick={() => selectColor(color.name)}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h3 className="font-semibold">Size</h3>
          <div className="flex items-center gap-x-2">
            {PRODUCT_SIZES.map((size) => (
              <div
                key={size.id}
                onClick={() => selectSize(size.name)}
                className={`px-1 py-2 text-center  font-medium text-sm cursor-pointer hover:bg-purple-600 hover:text-white transition-colors duration-300 w-7 ${
                  itemDetails.size === size.name
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {size.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-14 mt-4">
        <div className="h-full flex items-center gap-x-3">
          <div className="h-full border p-2 flex items-center gap-x-4 text-gray-500 select-none">
            <BiMinus
              fontSize={15}
              className="cursor-pointer"
              onClick={decrementQty}
            />
            <span>{itemDetails.quantity}</span>
            <BsPlus
              fontSize={15}
              className="cursor-pointer"
              onClick={incrementQty}
            />
          </div>

          <div className="h-full">
            <button
              onClick={() => {
                if (!session) signIn("google");
                else addToCart(productData, itemDetails);
              }}
              className="h-full main-animated-btn overflow-hidden uppercase border bg-gray-800 hover:text-white transition-all duration-500 text-sm lg:text-base"
            >
              <span className="h-full flex items-center uppercase font-bold  text-white px-8 py-3">
                Add To Cart
              </span>
            </button>
          </div>

          {alreadyInWishlist ? (
            <button className="ml-4" onClick={handleRemoveFromWishlist}>
              <AiFillHeart
                fontSize={20}
                color="red"
                title="Remove from wishlist"
              />
            </button>
          ) : (
            <button className="ml-4" onClick={handleAddToWishlist}>
              <AiOutlineHeart fontSize={20} title="Add to wishlist" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
