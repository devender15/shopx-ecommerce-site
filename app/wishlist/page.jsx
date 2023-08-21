"use client";

import { Breadcrumb } from "@components";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { useStateContext } from "@context/StateContext";
import { useState, useEffect } from "react";
import { urlFor } from "@lib/client";

export default function Page() {
  const { wishlist } = useStateContext();
  const [images, setImages] = useState([]);

  const getImageUrl = (product) => {
    if (product?.image) {
      const imageUrls = product?.image.map((image) =>
        urlFor(image?.asset?._ref).url()
      );
      return imageUrls[0];
    }
  };

  return (
    <div className="min-h-screen w-full">
      <Breadcrumb currentPath={"Wishlist"} />
      <section className="h-full w-[80%] mx-auto px-6 py-20 flex flex-col items-start gap-y-6">
        <h2 className="font-semibold text-xl">Your wishlist items</h2>

        <div className="w-full flex flex-col border">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                    <tr>
                      <th scope="col" className=" px-6 py-4">
                        IMAGE
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        PRODUCT NAME
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        UNIT PRICE
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        ADD TO CART
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist?.map((item) => (
                      <tr key={item._id} className="font-semibold">
                        <td className="whitespace-nowrap  px-6 py-4 font-medium flex justify-center">
                          <Image
                            src={getImageUrl(item)}
                            width={100}
                            height={100}
                            alt="product"
                          />
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          {item?.name}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          ₹ {item?.price.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4 flex justify-center">
                          <button className="uppercase block bg-[#a749ff] text-white rounded-[50px] py-[10px] px-[15px] hover:bg-[#333] transition-colors duration-500 ease-in-out">
                            Buy Now
                          </button>
                        </td>
                        <td>
                          <button>
                            <RxCross2 fontSize={20} title="Remove" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
            <button className="uppercase bg-[#f2f2f2] text-[#363f4d] rounded-[50px] px-6 py-4">Continue Shopping</button>
        </div>
      </section>
    </div>
  );
}
