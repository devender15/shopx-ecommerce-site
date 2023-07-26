import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineClose,
} from "react-icons/ai";

export default function ImageViewer({ images, handleCloseImageViewer }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const disableBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };
    disableBodyScroll();

    return () => (document.body.style.overflow = "unset");
  }, []);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handlePrevImage = () => {
    setSelectedImage((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextImage = () => {
    setSelectedImage((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  return (
    <AnimatePresence>
      {selectedImage !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black  z-50">
          <motion.img
            src={images[selectedImage]}
            alt="Fullscreen Image"
            className="max-h-screen max-w-screen p-4 h-[28rem] w-96"
            initial={{ scale: 0 }}
            animate={{ scale: zoomLevel }}
            exit={{ scale: 0 }}
          />
          <button
            className="absolute top-0 right-0 m-4 font-bold"
            onClick={handleCloseImageViewer}
          >
            <AiOutlineClose fontSize={20} color="white" />
          </button>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 m-4 text-white text-3xl font-bold cursor-pointer"
            onClick={handlePrevImage}
          >
            &lt;
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 m-4 text-white text-3xl font-bold cursor-pointer"
            onClick={handleNextImage}
          >
            &gt;
          </button>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gray-900 p-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`cursor-pointer h-20 w-20 m-1 border-4 border-transparent ${
                  selectedImage === index ? "border-blue-500" : ""
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          <div className="absolute flex items-center gap-x-3 top-4 right-10 mr-6">
            <button className="font-bold" onClick={handleZoomIn}>
              <AiOutlineZoomIn fontSize={20} color="white" />
            </button>
            <button className="font-bold" onClick={handleZoomOut}>
              <AiOutlineZoomOut fontSize={20} color="white" />
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
