"use client";

import { useState } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { motion as m } from "framer-motion";

export default function Card({ handleOpenProductInfoModal, product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-2 w-fit overflow-hidden flex flex-col justify-center items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-[#f6f6f6] relative flex flex-col justify-center items-center p-12 cursor-pointer">
        {product?.discount && (
          <div className="absolute top-4 right-4 px-3 py-1 w-fit text-center bg-pink-400 text-white rounded-md text-xs font-semibold">
            <span>{product?.discount}%</span>
          </div>
        )}

        {product?.isNew && (
          <div className="absolute top-12 right-4 px-3 py-1 w-fit text-center bg-purple-500 text-white rounded-md text-xs font-semibold">
            <span>New</span>
          </div>
        )}

        <Image
          src="/assets/images/sample.webp"
          alt="product"
          width={200}
          height={500}
        />

        <div className="absolute w-full bottom-0 overflow-hidden">
          <div className="flex items-center w-full gap-x-[1px]">
            <m.button
              className="p-4 h-14 bg-[#a749ff] basis-[10%] hover:bg-black transition-colors duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, type: "tween" }}
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
              onClick={handleOpenProductInfoModal}
            >
              <AiOutlineEye fontSize={20} color="#fff" />
            </m.button>
          </div>
        </div>
      </div>

      <div className="pt-6 text-center flex flex-col items-center justify-center gap-y-1">
        <p className="text-gray-700 text-lg font-semibold">{product?.name}</p>
        <p className="font-semibold text-black text-lg">₹ {product?.price}</p>
      </div>
    </div>
  );
}
