"use client";

import { useState } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { motion as m } from "framer-motion";

export default function Card() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-2 w-fit overflow-hidden flex flex-col justify-center items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-[#f6f6f6] relative flex justify-center items-center p-12">
        <Image src="/assets/images/sample.webp" width={300} height={500} />

        <m.div
          className="absolute w-full bottom-0 overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          <div className="flex items-center w-full gap-x-[1px]">
            <button className="p-4 h-14 bg-[#a749ff] basis-[10%] hover:bg-black transition-colors duration-300">
              <AiOutlineHeart fontSize={20} color="#fff" />
            </button>
            <button className="p-3 h-14 bg-[#a749ff] text-white basis-[80%] hover:bg-black transition-colors duration-300 font-semibold">
              <span>Buy Now</span>
            </button>
            <button className="p-4 h-14 bg-[#a749ff] basis-[10%] hover:bg-black transition-colors duration-300">
              <AiOutlineEye fontSize={20} color="#fff" />
            </button>
          </div>
        </m.div>
      </div>

      <div className="pt-6 text-center flex flex-col items-center justify-center gap-y-1">
        <p className="text-gray-700 text-lg font-semibold">T-shirt</p>
        <p className="font-semibold text-black text-lg">$35.6</p>
      </div>
    </div>
  );
}
