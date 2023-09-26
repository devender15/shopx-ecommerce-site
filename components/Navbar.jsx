"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useStateContext } from "@context/StateContext";
import {
  Counter,
  NavButton,
  Sidebar,
  RenderCartBody,
  RenderMobileNavigation,
  Searchbox,
  Account,
} from "@components";

import { useSession } from "next-auth/react";

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

  const {
    totalQuantities,
    wishlist,
    cart,
    totalPrice,
    removeFromCart,
    handleOpenSidebar,
    sidebarValue,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useStateContext();

  useEffect(() => {
    (() => {
      // hiding the body scrollbar
      document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    })();
  }, [isSidebarOpen]);

  // Sidebar body mapper
  const SIDEBAR_BODY = {
    cart: (
      <RenderCartBody
        items={cart}
        totalPrice={totalPrice}
        removeFromCart={removeFromCart}
      />
    ),

    mobileNavigation: (
      <RenderMobileNavigation
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    ),
  };

  return (
    <nav className="w-full bg-white z-[10] sticky top-0 py-6 sm:px-10 md:px-16 px-4 flex items-center justify-between">
      <Link href="/" className="font-extrabold sm:text-2xl md:text-3xl text-xl">
        ShoppiZone
      </Link>

      <div className="sm:block hidden">
        <ul className="flex items-center justify-center gap-x-4 font-semibold">
          {NAV_ROUTES.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="text-mainGray hover:text-blue-600 transition-colors duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="flex items-center justify-center gap-x-4">
          <li className="md:block hidden cursor-pointer">
            <NavButton
              title={<AiOutlineSearch fontSize={25} title="Search" />}
              body={<Searchbox />}
            />
          </li>
          <li className="md:block hidden cursor-pointer">
            <NavButton
              title={
                session?.user ? (
                  <div className="rounded-full">
                    <Image
                      src={session.user.image}
                      alt="user"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <AiOutlineUser fontSize={25} title="Profile" />
                )
              }
              body={<Account session={session} />}
            />
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
          <li className="sm:hidden block">
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
