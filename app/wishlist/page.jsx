"use client";

import { Breadcrumb, ProductsList } from "@components";
import { useStateContext } from "@context/StateContext";
import { AiOutlineHeart } from "react-icons/ai";

export default function Page() {
  const { wishlist, removeFromWishlist, clearWishlist } = useStateContext();

  const properties = {
    type: "wishlist",
    heading: "Your wishlist items",
    clearBtnText: "Clear Wishlist",
    noProductFoundIcon: <AiOutlineHeart fontSize={150} />,
    noProductFoundText: "No items found in wishlist",
  }

  return (
    <div className="h-fit w-full">
      <Breadcrumb currentPath={"Wishlist"} />
      <ProductsList
        list={wishlist}
        removeItem={removeFromWishlist}
        clearList={clearWishlist}
        properties={properties}
      />
    </div>
  );
}
