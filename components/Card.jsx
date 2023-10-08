"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { motion as m } from "framer-motion";
import { urlFor } from "@lib/client";
import Link from "next/link";
import { Badge } from "@components";
import { useStateContext } from "@context/StateContext";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Card({
  handleOpenProductInfoModal,
  product,
  productsArray,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const {
    addToWishlist,
    wishlist,
    removeFromWishlist,
    addToCart,
    handleOpenSidebar,
  } = useStateContext();
  const { data: session } = useSession();

  // getting main image url from urlFor function
  useEffect(() => {
    const convertImageUrl = () => {
      if (product?.image) {
        const imageUrl = urlFor(product?.image[0]?.asset?._ref).url();
        setImageUrl(imageUrl);
      }
    };
    convertImageUrl();
  }, [product]);

  const checkIfExists = (product) => {
    const checkProductInWishlist = wishlist.find(
      (item) => item?._id === product?._id
    );

    if (checkProductInWishlist) {
      return true;
    } else {
      return false;
    }
  };

  const handleBuyNow = (product) => {
    if (!session) return signIn("google");

    addToCart(product);
    handleOpenSidebar("cart");
  };

  return (
    <m.div
      layout
      className="p-2 w-fit overflow-hidden flex flex-col justify-center items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-[#f6f6f6] relative flex flex-col justify-center items-center p-12 cursor-pointer">
        <div className="absolute flex flex-col gap-y-2 right-4 top-4">
          {product?.discount && (
            <Badge text={`${product?.discount}%`} type="discount" />
          )}

          {product?.isNew && <Badge text="New" type="new" />}
        </div>

        <Link href={`/product/${product?.slug.current}`}>
          <div className="w-full h-auto md:h-60 md:w-52 ">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="product"
                width={200}
                height={500}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </Link>

        <div className="absolute w-full bottom-0 overflow-hidden">
          <div className="flex items-center w-full gap-x-[1px]">
            <m.button
              className={`p-4 h-14 basis-[10%] hover:bg-black transition-colors duration-300 ${
                checkIfExists(product) ? "bg-black" : "bg-[#a749ff]"
              }`}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, type: "tween" }}
              onClick={() => {
                if (!session) return signIn("google");
                else {
                  checkIfExists(product)
                    ? removeFromWishlist(product)
                    : addToWishlist(product);
                }
              }}
            >
              <AiOutlineHeart fontSize={20} color="#fff" />
            </m.button>
            <m.button
              className="p-3 h-14 bg-[#a749ff] text-white basis-[80%] hover:bg-black transition-colors duration-300 font-semibold"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, type: "tween", delay: 0.1 }}
              onClick={() => handleBuyNow(product)}
            >
              <span>Buy Now</span>
            </m.button>
            <m.button
              className="p-4 h-14 bg-[#a749ff] basis-[10%] hover:bg-black transition-colors duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, type: "tween", delay: 0.2 }}
              onClick={() =>
                handleOpenProductInfoModal(productsArray, product?._id)
              }
            >
              <AiOutlineEye fontSize={20} color="#fff" />
            </m.button>
          </div>
        </div>
      </div>

      <div className="pt-6 text-center flex flex-col items-center justify-center gap-y-1">
        <p className="text-gray-700 text-lg font-semibold">{product?.name}</p>
        <p className="font-semibold text-black text-lg">
          ₹ {product?.price.toLocaleString()}
        </p>
      </div>
    </m.div>
  );
}
