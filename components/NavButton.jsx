import { useState } from "react";
import { motion } from "framer-motion";
import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

export default function NavButton({ title, listItems, imageUrl }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleShowDropDown = () => {
    setIsDropdownOpen(true);
  };

  const handleHideDropDown = () => {
    setTimeout(() => {
        setIsDropdownOpen(false);
    }, 500)
  };

  return (
    <div className="relative">
      <button
        className="text-mainGray flex items-center gap-x-1 hover:text-blue-600 transition-colors duration-300"
        onClick={handleShowDropDown}
        onMouseOver={handleShowDropDown}
        onMouseLeave={handleHideDropDown}
      >
        {title}

        <span>
          <BsChevronDown fontSize={10} />
        </span>
      </button>
      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onMouseOver={handleShowDropDown}
          onMouseLeave={handleHideDropDown}
          className="w-[30rem] min-h-80 absolute top-12 left-0 bg-white p-4 rounded-lg shadow-md z-10 grid grid-cols-3 gap-4"
        >
          <div>
            <h2>Clothing</h2>
            <ul className="mt-2 space-y-3">
              {listItems["Clothing"].map((item) => (
                <li key={item.id}>
                  <Link href="/" className="text-gray-600 hover:text-blue-600 transition-all duration-500">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Shoes</h2>
            <ul className="mt-2 space-y-3">
              {listItems["Shoes"].map((item) => (
                <li key={item.id}>
                  <Link href="/" className="text-gray-600 hover:text-blue-600 transition-all duration-500">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <div className="h-40 w-32">
                <Image src={imageUrl} alt={title} height={20} width={20} className="h-full w-full object-cover" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
