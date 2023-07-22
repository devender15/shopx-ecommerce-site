import { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

import { useStateContext } from "@context/StateContext";
import { PRODUCT_SIZES, PRODUCT_COLORS } from "@constants";

export default function AddToCart({ productData }) {
  const [itemDetails, setItemDetails] = useState({
    color: "",
    size: "",
    quantity: 0,
  });
  const { addToCart, cart } = useStateContext();

  // useEffects
  useEffect(() => {
    const fetchProductDetails = (product) => {
      const prod = cart.find((item) => item._id === product._id);
      if (prod) {
        setItemDetails({
          color: prod.color,
          size: prod.size,
          quantity: prod.quantity,
        });
      }
      return;
    };
    fetchProductDetails(productData);
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
    setItemDetails(prev => {
      let newColor = prev.color;
      newColor = color;

      return {...prev, color: newColor};
    })
  }

  const selectSize = (size) => {
    setItemDetails(prev => {
      let newSize = prev.size;
      newSize = size;

      return { ...prev, size: newSize };
    })
  }

  return (
    <>
      <div className="flex flex-col gap-x-0 gap-y-4 md:flex-row items-start md:gap-x-8 md:gap-y-0">
        <div className="flex flex-col gap-y-4">
          <h3 className="font-semibold">Color</h3>
          <div className="flex items-center gap-x-2">
            {PRODUCT_COLORS.map(color => (
              <div key={color.id} className={`w-5 h-5 rounded-full ${color.name} cursor-pointer hover:ring-2 ring-black transition-all duration-300 ${itemDetails.color === color.name ? "ring-2" : 'ring-0'}`} onClick={() => selectColor(color.name)}></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h3 className="font-semibold">Size</h3>
          <div className="flex items-center gap-x-2">
            {PRODUCT_SIZES.map(size => (
              <div key={size.id} onClick={() => selectSize(size.name)} className={`px-1 py-2 text-center  font-medium text-sm cursor-pointer hover:bg-purple-600 hover:text-white transition-colors duration-300 w-7 ${itemDetails.size === size.name ? "bg-purple-600 text-white" : "bg-gray-200 text-black"}`}>
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
              onClick={() => addToCart(productData, itemDetails)}
              className="h-full group relative overflow-hidden uppercase border border-mainGray group-hover:text-white transition-all duration-500"
            >
              <span className="absolute inset-0 bg-[#a749ff] transform -translate-x-full transition-transform duration-300 hover:translate-x-0"></span>
              <span className="relative z-10 h-full flex items-center uppercase font-bold bg-gray-800 text-white px-8 py-3">
                Add To Cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
