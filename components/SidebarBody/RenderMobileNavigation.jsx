import { GrClose } from "react-icons/gr";
import { IoIosCall } from "react-icons/io";
import { GrMail } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";
import { NAV_ROUTES } from "@constants";
import Link from "next/link";

export default function RenderMobileNavigation({ toggleSidebar }) {
  return (
    <div>
      <div className="flex items-center flex-row-reverse">
        <div className="flex justify-center h-14 w-14 bg-gray-500">
          <button onClick={toggleSidebar}>
            <GrClose
              fontSize={20}
              color="white"
              className="hover:rotate-180 text-white"
            />
          </button>
        </div>
        <div className="w-full">
          <form
            className="w-full flex items-center bg-gray-200"
            onSubmit={() => {}}
          >
            <input
              type="search"
              className="h-full w-full basis-[85%] p-4 text-black border-none outline-none bg-gray-200"
              placeholder="Search..."
            />
            <button type="submit">
              <AiOutlineSearch
                fontSize={20}
                color="gray"
                title="Search"
                className="basis-[15%] cursor-pointer"
              />
            </button>
          </form>
        </div>
      </div>

      <div className="pl-4 py-8">
        <ul className="flex flex-col gap-y-4">
          {NAV_ROUTES.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                onClick={() => {
                  toggleSidebar();
                  return false;
                }}
                className="uppercase font-bold transition-colors duration-300 hover:text-blue-600"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="pl-4 mt-24 flex flex-col gap-y-2 text-sm font-semibold">
        <div className="flex items-center gap-x-2">
          <IoIosCall />
          <span>(1245) 2456 012</span>
        </div>
        <div className="flex items-center gap-x-2">
          <GrMail />
          <span>
            <a
              href="mailto:info@yourdomain.com"
              className="hover:text-blue-600"
            >
              info@yourdomain.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
