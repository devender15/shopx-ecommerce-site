"use client";

import { Breadcrumb } from "@components";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { useStateContext } from "@context/StateContext";
import { urlFor } from "@lib/client";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";

export default function Page() {
  const { wishlist, removeFromWishlist, clearWishlist } = useStateContext();

  const getImageUrl = (product) => {
    if (product?.image) {
      const imageUrls = product?.image.map((image) =>
        urlFor(image?.asset?._ref).url()
      );
      return imageUrls[0];
    }
  };

  return (
    <div className="h-fit w-full">
      <Breadcrumb currentPath={"Wishlist"} />
      <section className="h-full w-full md:w-[80%] mx-auto px-6 py-20 flex flex-col items-start gap-y-6">
        {wishlist.length > 0 && (
          <h2 className="font-semibold text-xl">Your wishlist items</h2>
        )}

        {wishlist.length > 0 ? (
          <>
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
                              <div className="w-32 h-36">
                                <Image
                                  src={getImageUrl(item)}
                                  width={200}
                                  height={200}
                                  alt="product"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {item?.name}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              ₹ {item?.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 align-middle text-center">
                                <Link className="w-36 mx-auto block" href={`/product/${item.slug.current}`}>
                                  <button className="uppercase inline-block bg-[#a749ff] text-white rounded-[50px] py-[10px] px-[15px] hover:bg-[#333] transition-colors duration-500 ease-in-out">
                                    Buy Now
                                  </button>
                                </Link>
                            </td>
                            <td>
                              <button onClick={() => removeFromWishlist(item)}>
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
            <div className="w-full flex flex-col items-start justify-start gap-y-4 md:flex-row md:justify-between md:items-center md:gap-y-0">
              <button className="uppercase text-sm font-semibold bg-[#f2f2f2] text-[#363f4d] rounded-[50px] px-6 py-4 hover:text-white hover:bg-[#a749ff] transition-colors duration-200 ease-linear">
                Continue Shopping
              </button>

              <button
                onClick={clearWishlist}
                className="uppercase text-sm font-semibold bg-[#f2f2f2] text-[#363f4d] rounded-[50px] px-6 py-4 hover:text-white hover:bg-[#a749ff] transition-colors duration-200 ease-linear"
              >
                Clear Wishlist
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col gap-y-10 justify-center items-center">
            <AiOutlineHeart fontSize={150} />
            <p className="text-xl font-semibold text-center">
              No items found in wishlist
            </p>
            <button className="px-10 py-3 bg-slate-800 text-white hover:bg-[#a749ff] transition-colors duration-200">
              Add Items
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
