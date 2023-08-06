"use client";

import Link from "next/link";
import { useState } from "react";
import { useStateContext } from "@context/StateContext";
import { Counter, NavButton } from "@components";

import { NAV_ROUTES } from "@constants";

// react-icons
import {
  AiOutlineShopping,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { IoIosCall } from "react-icons/io";
import { GrMail } from "react-icons/gr";

function Sidebar({ showSidebar, toggleSidebar }) {
  const { totalQuantities } = useStateContext();

  return (
    <div
      id="sidebar"
      className={`sm:hidden fixed z-30 right-0 top-0 h-screen w-96 overflow-y-auto bg-white transform ${
        showSidebar ? "transition-transform duration-1000" : "translate-x-full"
      } md:translate-x-0 transition-transform ease-out duration-1000`}
    >
      <div className="flex items-center">
        <div className="flex justify-center h-14 w-14 bg-mainGray">
          <button onClick={toggleSidebar}>
            <GrClose
              fontSize={20}
              color="white"
              className="hover:rotate-180 text-white"
            />
          </button>
        </div>
        <div className="w-full">
          <form
            className="w-full flex items-center bg-gray-200"
            onSubmit={() => {}}
          >
            <input
              type="search"
              className="h-full w-full basis-[85%] p-4 text-black border-none outline-none bg-gray-200"
              placeholder="Search..."
            />
            <button type="submit">
              <AiOutlineSearch
                fontSize={20}
                color="gray"
                title="Search"
                className="basis-[15%] cursor-pointer"
              />
            </button>
          </form>
        </div>
      </div>

      <div className="pl-16 py-8">
        <ul className="flex flex-col gap-y-4">
          {NAV_ROUTES.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="uppercase font-bold transition-colors duration-300 hover:text-blue-600"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="pl-16 mt-24 flex flex-col gap-y-2 text-sm font-semibold">
        <div className="flex items-center gap-x-2">
          <IoIosCall />
          <span>(1245) 2456 012</span>
        </div>
        <div className="flex items-center gap-x-2">
          <GrMail />
          <span>
            <a
              href="mailto:info@yourdomain.com"
              className="hover:text-blue-600"
            >
              info@yourdomain.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { totalQuantities, wishlist } = useStateContext();

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <nav className="w-full bg-white z-[11] sticky top-0 py-6 sm:px-10 md:px-16 px-4 flex items-center justify-between">
      <Link href="/" className="font-extrabold sm:text-2xl md:text-3xl text-xl">
        ShopX
      </Link>

      <div className="sm:block hidden">
        <ul className="flex items-center justify-center gap-x-4 font-semibold">
          {NAV_ROUTES.map((item) => (
            <li key={item.id}>
              {item.isDropdown ? (
                <NavButton
                  title={item.name}
                  listItems={item.categories}
                />
              ) : (
                <Link
                  href={item.path}
                  className="text-mainGray hover:text-blue-600 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="flex items-center justify-center gap-x-4">
          <li className="md:block hidden cursor-pointer">
            <AiOutlineSearch fontSize={25} title="Search" />
          </li>
          <li className="md:block hidden cursor-pointer">
            <AiOutlineUser fontSize={25} title="Profile" />
          </li>
          <li className="cursor-pointer relative">
            <AiOutlineHeart fontSize={25} title="Wishlist" />
            <Counter value={wishlist.length} />
          </li>
          <li className="cursor-pointer relative">
            <AiOutlineShopping fontSize={25} title="Shopping Bag" />
            <Counter value={totalQuantities} />
          </li>
          <li
            className="cursor-pointer sm:hidden block"
            onClick={handleToggleSidebar}
          >
            <GiHamburgerMenu fontSize={25} title="Menu" />
          </li>
        </ul>
        {showSidebar && (
          <Sidebar
            showSidebar={showSidebar}
            toggleSidebar={handleToggleSidebar}
          />
        )}
      </div>
    </nav>
  );
}
