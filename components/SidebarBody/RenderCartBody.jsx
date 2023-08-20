import Image from "next/image";
import TestImage from "/public/assets/images/t3.jpg";
import { ImCross } from "react-icons/im";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { urlFor } from "@lib/client";

export default function RenderCartBody({ items, totalPrice, removeFromCart }) {
  const getImageUrl = (product) => {
    if (product?.image) {
      const imageUrls = product?.image.map((image) =>
        urlFor(image?.asset?._ref).url()
      );
      return imageUrls[0];
    }
  };

  return (
    <div className="w-full h-full p-2">
      <div className="p-2 w-full flex justify-between items-center">
        <h1 className="text-xl font-semibold">Cart</h1>
        <button>
            <ImCross fontSize={15} title="Close" />
        </button>
      </div>
      <hr />
      {items.length > 0 ? (
        <>
          <div className="my-5 max-h-[28rem] overflow-y-auto flex flex-col gap-y-6 w-full px-8">
            {items?.reverse()?.map((item) => (
              <div className="flex items-start gap-x-4" key={item?._id}>
                <div className="border w-24 h-36">
                  <Image
                    src={getImageUrl(item) ?? TestImage}
                    alt="product"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-y-2 text-sm">
                  <h1 className="font-semibold">{item?.name}</h1>
                  <p>
                    Qty: <span>{item?.quantity}</span>
                  </p>
                  <p className="my-1">
                    ₹ <span>{item?.price?.toLocaleString()}</span>
                  </p>
                  <p>
                    Color: <span>{item?.color}</span>
                  </p>
                  <p>
                    Size: <span>{item?.size}</span>
                  </p>
                </div>
                <div>
                  <button onClick={() => removeFromCart(item)}>
                    <ImCross fontSize={10} color="blue" title="Remove" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <hr />

          <div className="w-full py-5 px-4 flex items-center justify-between">
            <p>Total:</p>
            <span>₹ {totalPrice.toLocaleString()}</span>
          </div>

          <div className="flex flex-col gap-y-4 w-full px-4">
            <button className="main-animated-btn hover:text-white border px-6 py-4 font-semibold uppercase border-black">
              View Cart
            </button>
            <button className="main-animated-btn hover:text-white border px-6 py-4 font-semibold uppercase border-black">
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-y-4 justify-center items-center">
          <span>
            <AiOutlineShoppingCart fontSize={40} />
          </span>
          <p className="text-2xl">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}
