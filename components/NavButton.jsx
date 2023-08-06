import { useState } from "react";
import { motion } from "framer-motion";
import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

export default function NavButton({ title, listItems }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-mainGray flex items-center gap-x-1 hover:text-blue-600 transition-colors duration-300"
      >
        {title}
        <span>
          <BsChevronDown fontSize={10} />
        </span>
      </button>
      <div>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-[30rem] min-h-80 absolute top-12 left-0 bg-white p-4 rounded-lg shadow-md z-10 grid grid-cols-3 gap-4"
          >
            <div>
              <h2>Clothing</h2>
              <ul className="mt-2 space-y-3">
                {listItems["Clothing"].map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-blue-600 transition-all duration-500"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Shoes</h2>
              <ul className="mt-2 space-y-3">
                {listItems["Shoes"].map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-blue-600 transition-all duration-500"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Accessories</h2>
              <ul className="mt-2 space-y-3">
                {listItems["Shoes"].map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-blue-600 transition-all duration-500"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-1">
              <div className="h-full flex justify-center items-center">
                <Image
                  src="/assets/images/bag.png"
                  alt="shopping bag"
                  height={200}
                  width={100}
                  className="object-cover"
                />
                </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
