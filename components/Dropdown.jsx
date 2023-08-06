import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function Dropdown({ title, list, handleSortBy }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-white flex items-center gap-x-2 text-black font-semibold mr-12 p-4 rounded focus:outline-none"
      >
        {title}
        {isOpen ? (
          <BsChevronUp className="inline-block ml-2" />
        ) : (
          <BsChevronDown className="inline-block ml-2" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-xl z-10"
          >
            <ul className="py-2">
              {list.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleSortBy(item.value);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
