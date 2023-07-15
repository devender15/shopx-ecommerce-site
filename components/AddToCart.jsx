import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

export default function AddToCart() {
  return (
    <div className="h-full flex items-center gap-x-3">
      <div className="h-full border p-2 flex items-center gap-x-4 text-gray-500">
        <BiMinus fontSize={15} className="cursor-pointer" />
        <span>1</span>
        <BsPlus fontSize={15} className="cursor-pointer" />
      </div>

      <div className="h-full">
        <button className="h-full uppercase font-bold bg-gray-800 text-white px-8 py-3">Add To Cart</button>
      </div>
    </div>
  );
}
