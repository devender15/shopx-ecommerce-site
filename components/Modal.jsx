"use client";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { motion as m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PRODUCT_PREVIEW_VARIANTS } from "@animation";
import { AddToCart } from "@components";
import { urlFor } from "@lib/client";
import { TailSpin } from "react-loader-spinner";


export default function Modal({ isOpen, onClose, productData }) {
  const [isClosing, setIsClosing] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const getImageUrl = () => {
      if (productData?.image) {
        const images = productData?.image.map((image) =>
          urlFor(image?.asset?._ref).url()
        );
        setProductImages(images);
        setMainImage(images[0]);
      }
    };
    getImageUrl();
  }, [productData]);

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
                  {mainImage ? (
                    <div className="h-96 mx-auto w-full">
                      <Image
                        src={mainImage}
                        alt="product"
                        width={300}
                        height={400}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[400px] flex items-center justify-center">
                      <TailSpin color="#000" height={50} width={50} />
                    </div>
                  )}
                </div>

                <div className="w-full mt-5 overflow-x-auto flex items-center gap-x-4 hidescroll">
                  {productImages?.map((image, index) => (
                    <div className="h-16 w-16">
                      <Image
                        src={image}
                        key={index}
                        width={85}
                        height={85}
                        alt="more"
                        onClick={() => handleImageChange(image)}
                        className="cursor-pointer h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="basis-[65%] px-4 h-full flex flex-col gap-y-4">
              <h1 className="text-2xl font-semibold">{productData?.name}</h1>
              <p className="text-xl text-red-500 font-semibold">
                ₹ {productData?.price.toLocaleString()}
              </p>
              <p className="text-base font-medium">
                {productData?.description}
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
