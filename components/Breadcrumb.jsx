import Link from "next/link";

export default function Breadcrumb({ currentPath }) {
    return (
        <div className="bg-[#f7f7f7] py-10 w-full flex justify-center">
            <ul className="flex gap-x-2 items-center">
                <li>
                    <Link href="/" className="uppercase font-semibold text-base hover:text-black text-gray-500 transition-colors duration-500">Home</Link>
                </li>
                <li className="uppercase font-semibold text-base text-black transition-colors duration-500">
                    /
                </li>
                <li className="uppercase font-semibold text-base text-black">
                    {currentPath}
                </li>
            </ul>
        </div>
    )
}