import { signOut, signIn } from "next-auth/react";
import Image from "next/image";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Account({ session }) {
  return (
    <ul className="w-[14rem] space-y-2">
      {session?.user ? (
          <li
            className="p-2 text-lg text-gray-600 w-full flex items-center justify-between hover:shadow-md duration-300 font-semibold"
            onClick={() => signOut()}
          >
            <AiOutlineLogout size={25} title="Logout" />
            <span>Logout</span>
          </li>
      ) : (
        <li
          onClick={() => signIn("google")}
          className="text-lg w-full flex items-center justify-between p-2 hover:shadow-md duration-300 font-semibold"
        >
          <Image
            src="/assets/images/google.png"
            alt="google"
            width={20}
            height={20}
          />
          <span className="text-gray-600">Sign in with Google</span>
        </li>
      )}
    </ul>
  );
}
