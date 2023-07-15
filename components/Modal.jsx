"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { motion as m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PRODUCT_PREVIEW_VARIANTS } from "@animation";
import { AddToCart } from "@components";

// temp
const productImages = [
  "/assets/images/t1.jpg",
  "/assets/images/t2.png",
  "/assets/images/t3.jpg",
  "/assets/images/t4.jpg",
  "/assets/images/t5.jpg",
];

export default function Modal({ isOpen, onClose, productData }) {
  const [isClosing, setIsClosing] = useState(false);
  const [mainImage, setMainImage] = useState(productImages[0]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed py-4 top-0 left-0 flex items-center justify-center z-50 h-screen w-screen">
        <div
          className={`fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-50 ${
            isClosing ? "animate-fade-out" : "animate-fade-in"
          }`}
          onClick={handleClose}
        />
        <m.div
          initial="hidden"
          animate="visible"
          variants={PRODUCT_PREVIEW_VARIANTS}
          exit="hidden"
          className="bg-white z-[2] rounded-lg w-[60rem] shadow-lg"
        >
          <div className="w-full flex justify-end border-b-[1px] p-3">
            <button onClick={handleClose}>
              <FiX
                size={25}
                color="gray"
                className="hover:text-black"
                title="Close"
              />
            </button>
          </div>

          <div className="px-4 py-6 w-full h-full flex items-start flex-col md:flex-row gap-x-0 gap-y-4 md:gap-x-4 md:gap-y-0">
            <div className="basis-[35%]">
              <div className="w-full">
                <div className="w-full bg-[#f6f6f6]">
                  <Image
                    src={mainImage}
                    alt="product"
                    width={300}
                    height={400}
                    className="mx-auto"
                  />
                </div>

                <div className="w-full mt-5 overflow-x-auto flex items-center gap-x-4 hidescroll">
                  {productImages.map((image, index) => (
                    <Image
                      src={image}
                      key={index}
                      width={85}
                      height={85}
                      alt="more"
                      onClick={() => handleImageChange(image)}
                      className="cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="basis-[65%] px-4 h-full flex flex-col gap-y-4">
              <h1 className="text-2xl font-semibold">Lorem ipsum dolor</h1>
              <p className="text-xl text-red-500 font-semibold">₹ 10,000</p>
              <p className="text-base font-medium">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
                tempora aliquid optio? Blanditiis et consectetur eaque nam
                error. Pariatur, veritatis placeat consectetur quibusdam sequi
                delectus?
              </p>

              <hr className="my-6" />

              <div className="flex flex-col gap-x-0 gap-y-4 md:flex-row items-start md:gap-x-8 md:gap-y-0">
                <div className="flex flex-col gap-y-4">
                  <h3 className="font-semibold">Color</h3>

                  <div className="flex items-center gap-x-2">
                    <div className="w-5 h-5 rounded-full bg-red-500 cursor-pointer hover:ring-2 ring-black transition-all duration-300"></div>

                    <div className="w-5 h-5 rounded-full bg-blue-500 cursor-pointer hover:ring-2 ring-black transition-all duration-300"></div>

                    <div className="w-5 h-5 rounded-full bg-green-500 cursor-pointer hover:ring-2 ring-black transition-all duration-300"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-4">
                  <h3 className="font-semibold">Size</h3>
                  <div className="flex items-center gap-x-2">
                    <div className="px-1 py-2 text-center bg-gray-200 text-black font-medium text-sm cursor-pointer hover:bg-purple-600 hover:text-white transition-colors duration-300 w-7">
                      S
                    </div>
                    <div className="px-1 py-2 text-center bg-gray-200 text-black font-medium text-sm cursor-pointer hover:bg-purple-600 hover:text-white transition-colors duration-300 w-7">
                      M
                    </div>
                    <div className="px-1 py-2 text-center bg-gray-200 text-black font-medium text-sm cursor-pointer hover:bg-purple-600 hover:text-white transition-colors duration-300 w-7">
                      L
                    </div>
                    <div className="px-1 py-2 text-center bg-gray-200 text-black font-medium text-sm cursor-pointer hover:bg-purple-600 hover:text-white transition-colors duration-300 w-7">
                      XL
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-16 mt-4">
                <AddToCart />
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </AnimatePresence>
  );
}
