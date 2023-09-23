import { useState } from "react";
import { motion } from "framer-motion";

export default function NavButton({ title, body }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-mainGray flex items-center gap-x-1d hover:text-blue-600 transition-colors duration-300"
      >
        {title}
      </button>
      <div>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-fit min-h-80 absolute top-14 right-0 bg-white p-2 shadow-md z-10"
          >
           {body}
          </motion.div>
        )}
      </div>
    </div>
  );
}
