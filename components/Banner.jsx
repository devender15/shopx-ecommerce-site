"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BannerImage from "@public/assets/images/banner-1.png";
import { urlFor } from "@lib/client";
import { motion as m, AnimatePresence } from "framer-motion";

import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

const Banner = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [slides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
  }

  const handlePrevSlide = () => {
    // if we are on the first slide then move to last slide
    if (currentSlide === 0) {
      setCurrentSlide(data.length - 1);
      return;
    }
    setCurrentSlide((prevSlide) => (prevSlide - 1) % data.length);
  }

  return (
    <div className="relative group w-full h-full bg-[#f0e0ff] flex justify-center">
      <div className="w-full sm:px-8 sm:flex-row flex-col lg:px-16 mx-auto flex sm:justify-between justify-around items-center">
        <div className="flex items-center sm:gap-x-6">
          <div onClick={handlePrevSlide}>
            <AiOutlineLeft
              fontSize={40}
              className="cursor-pointer sm:block hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              title="Previous"
              color="gray"
            />
          </div>
          <div className="flex flex-col sm:items-start items-center gap-y-6">
            <m.h2
              initial={{ opacity: 0, y: "20px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 1 }}
              exit={{ opacity: 0 }}
              className="font-semibold text-2xl"
            >
              {data[currentSlide]?.sub_heading}
            </m.h2>
            <m.h1
              initial={{ opacity: 0, y: "80px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.8, delay: 0.5 }}
              className="font-semibold text-[2rem] sm:text-5xl  lg:text-7xl"
            >
              {data[currentSlide]?.heading1}
            </m.h1>
            <m.h1
              initial={{ opacity: 0, y: "80px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.8, delay: 0.5 }}
              className="font-semibold text-[2rem] sm:text-5xl  lg:text-7xl"
            >
              {data[currentSlide]?.heading2}
            </m.h1>
            <m.button
              initial={{ opacity: 0, y: "0" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.8, delay: 0.8 }}
              className="relative overflow-hidden uppercase border border-mainGray hover:text-white transition-all duration-500"
              style={{ padding: "19px 50px 21px" }}
            >
              <span className="absolute inset-0 bg-[#a749ff] transform -translate-x-full transition-transform duration-300 hover:translate-x-0"></span>
              <span className="relative z-10">Shop Now</span>
            </m.button>
          </div>
        </div>

        <div className="flex items-center gap-x-6">
          <m.div
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 1.1, delay: 1 }}
            className="sm:h-[40rem] h-[25rem] w-auto"
          >
            <Image
              src={
                data[currentSlide]?.banner_image?.asset?._ref
                  ? urlFor(data[currentSlide]?.banner_image?.asset?._ref)?.url()
                  : BannerImage
              }
              width={1000}
              height={900}
              className="object-cover w-full h-full"
            />
          </m.div>

          <div onClick={handleNextSlide}>
            <AiOutlineRight
              fontSize={40}
              className="cursor-pointer sm:block hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              title="Next"
              color="gray"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
