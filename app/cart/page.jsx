"use client";

import { Breadcrumb, ProductsList } from "@components";
import { useStateContext } from "@context/StateContext";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Page() {
  const { cart, removeFromCart, removeQuantity, addToCart, clearCart, totalPrice, } =
    useStateContext();

  const properties = {
    type: "cart",
    heading: "Your cart items",
    clearBtnText: "Clear Shopping Cart",
    noProductFoundIcon: <AiOutlineShoppingCart fontSize={150} />,
    noProductFoundText: "No items found in cart",
    addToCart: addToCart,
    removeQuantity: removeQuantity,
  };

  return (
    <div className="w-full h-fit">
      <Breadcrumb currentPath="Cart" />
      <ProductsList
        list={cart}
        removeItem={removeFromCart}
        clearList={clearCart}
        properties={properties}
      />

      {cart.length > 0 && (
        <section className="mt-4 mb-12 px-4 md:px-0 md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <div className="h-fit rounded-lg px-6 py-8 flex flex-col gap-y-4 border border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold">Estimate Shipping And Tax</h2>

            <p>Enter your destination to get a shipping estimate.</p>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="country">*Country</label>
                <select
                  name="country"
                  id="country"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="state">*State</label>
                <select
                  name="state"
                  id="state"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="zip">*Zip/Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                />
              </div>

              <button className="uppercase inline-block bg-[#a749ff] text-white rounded-[50px] py-[10px] px-[15px] hover:bg-[#333] transition-colors duration-500 ease-in-out">
                Get a Quote
              </button>
            </form>
          </div>

          <div className="h-fit rounded-lg px-6 py-8 flex flex-col gap-y-4 border border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold">Use Coupon Code</h2>
            <form className="space-y-4">
              <label htmlFor="coupon">
                Enter your coupon code if you have one.
              </label>
              <input
                type="text"
                name="coupon"
                id="coupon"
                className="w-full border border-gray-200 rounded-lg px-4 py-2"
              />

              <button className="uppercase inline-block bg-[#a749ff] text-white rounded-[50px] py-[10px] px-[15px] hover:bg-[#333] transition-colors duration-500 ease-in-out">
                Apply Coupon
              </button>
            </form>
          </div>

          <div className="h-fit rounded-lg px-6 py-8 flex flex-col gap-y-4 border border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold">Cart Total</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p>Total products</p>
                <p className="font-semibold">₹ {totalPrice}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl text-[#a749ff] font-semibold">
                  Grand Total
                </p>
                <p className="text-xl text-[#a749ff] font-semibold">₹ 0</p>
              </div>
            </div>

            <button className="mt-2 uppercase inline-block bg-[#a749ff] text-white rounded-[50px] py-[10px] px-[15px] hover:bg-[#333] transition-colors duration-500 ease-in-out">
              Proceed to checkout
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
