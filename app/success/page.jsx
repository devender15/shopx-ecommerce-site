"use client";

import { useEffect } from "react";
import { useStateContext } from "@context/StateContext";
import { BsFillBagFill } from "react-icons/bs";
import Link from "next/link";
import { runFireworks } from "@lib/utils";

export default function Page() {
  const { clearCart } = useStateContext();

  useEffect(() => {
    clearCart();
    runFireworks();
  }, []);

  return (
    <div className="h-screen w-screen p-2 flex justify-center items-center">
      <div className="flex flex-col h-[70%] gap-y-6 justify-center items-center p-4 rounded-lg shadow-md bg-gray-300">
        <BsFillBagFill className="text-6xl text-green-500" />

        <h2 className="text-lg font-bold text-gray-600">Thank You For Your Order!</h2>
        <p>Check your email inbox for the receipt.</p>

        <p className="font-semibold">
          If you have any questions, please email{" "}
          <a href="mailto:shoppizone@gmail.com" className="font-normal italic">shoppizone@gmail.com</a>
        </p>

        <Link href="/shop" className="main-animated-btn mt-4 hover:text-white hover:border-[#a749ff] border px-6 py-4 font-semibold uppercase border-black">Continue Shopping</Link>
      </div>
    </div>
  );
}
