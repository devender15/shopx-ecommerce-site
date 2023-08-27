"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useStateContext } from "@context/StateContext";
import {
  Counter,
  NavButton,
  Sidebar,
  RenderCartBody,
  RenderMobileNavigation,
} from "@components";

import { signIn, signOut, useSession } from "next-auth/react";

import { NAV_ROUTES } from "@constants";

// react-icons
import {
  AiOutlineShopping,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";



export default function Navbar() {
  const { data: session } = useSession();

  const { totalQuantities, wishlist, cart, totalPrice, removeFromCart } =
    useStateContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarValue, setSidebarValue] = useState("");

  useEffect(() => {
    (() => {
      // hiding the body scrollbar
      document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    })();
  }, [isSidebarOpen]);

  const handleOpenSidebar = (sidebarvalue) => {
    setSidebarValue(sidebarvalue);
    setIsSidebarOpen((prev) => !prev);
  };

  // Sidebar body mapper
  const SIDEBAR_BODY = {
    cart: (
      <RenderCartBody
        items={cart}
        totalPrice={totalPrice}
        removeFromCart={removeFromCart}
      />
    ),

    mobileNavigation: <RenderMobileNavigation toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />,
  };

  return (
    <nav className="w-full bg-white z-[10] sticky top-0 py-6 sm:px-10 md:px-16 px-4 flex items-center justify-between">
      <Link href="/" className="font-extrabold sm:text-2xl md:text-3xl text-xl">
        ShopX
      </Link>

      <div className="sm:block hidden">
        <ul className="flex items-center justify-center gap-x-4 font-semibold">
          {NAV_ROUTES.map((item) => (
            <li key={item.id}>
              {item.isDropdown ? (
                <NavButton title={item.name} listItems={item.categories} />
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
            {/* <AiOutlineUser fontSize={25} title="Profile" /> */}
            <div className="dropdown inline-block relative">
              <button>
                <AiOutlineUser fontSize={25} title="Profile" />
              </button>
              <ul className="dropdown-menu w-36 h-fit bg-white border absolute hidden text-black pt-4">
                {session?.user ? (
                  <>
                    <li className="w-full">
                      <button className="w-full hover:font-semibold">
                        My Account
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        onClick={signOut}
                        className="w-full hover:font-semibold"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="w-full text-left">
                    <button
                      type="button"
                      onClick={() => {
                        signIn("google");
                      }}
                      className="w-full p-1 hover:font-semibold"
                    >
                      Sign In
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </li>
          <li className="cursor-pointer relative">
            <Link href="/wishlist">
              <button>
                <AiOutlineHeart fontSize={25} title="Wishlist" />
              </button>
              <Counter value={wishlist.length} />
            </Link>
          </li>
          <li className="relative">
            <button onClick={() => handleOpenSidebar("cart")}>
              <AiOutlineShopping fontSize={25} title="Shopping Bag" />
            </button>
            <Counter value={totalQuantities} />
          </li>
          <li
            className="sm:hidden block"
            // onClick={}
          >
            <button onClick={() => handleOpenSidebar("mobileNavigation")}>
              <GiHamburgerMenu fontSize={25} title="Menu" />
            </button>
          </li>
        </ul>
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        direction="right"
        body={SIDEBAR_BODY[sidebarValue]}
      />
    </nav>
  );
}
