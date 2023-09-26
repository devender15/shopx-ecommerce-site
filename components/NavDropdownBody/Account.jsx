import { signOut, signIn } from "next-auth/react";

export default function Account({ session }) {
  return (
    <ul className="w-40">
      {session?.user ? (
        <>
          <li className="text-lg hover:text-blue-800 duration-300 font-semibold">
            My account
          </li>
          <li
            className="text-lg hover:text-blue-800 duration-300 font-semibold"
            onClick={() => signOut()}
          >
            Log Out
          </li>
        </>
      ) : (
          <li
            onClick={() => signIn("google")}
            className="text-lg hover:text-blue-800 duration-300 font-semibold"
          >
            Login with Google
          </li>
      )}
    </ul>
  );
}
