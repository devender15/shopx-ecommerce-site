import { MdRemoveShoppingCart } from "react-icons/md";

export default function NoProductFound() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-10">
      <MdRemoveShoppingCart fontSize={100} />

      <span className="text-red-700 text-2xl font-semibold">
        No Product Found!
      </span>
    </div>
  );
}
