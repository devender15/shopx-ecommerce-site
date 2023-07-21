import "@styles/globals.css";

import AuthProvider from "@components/AuthProvider";
import Navbar from "@components/Navbar";
import { Toaster } from "react-hot-toast";
import { StateContext } from "@context/StateContext";

export const metadata = {
  title: "ShopX",
  description: "Buy anything from A to Z",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="icon" href="/favicon.svg" />
    </head>
    <body>
      <AuthProvider>
        <StateContext>
          <Navbar />
          <Toaster position="bottom-left" />
          <main className="app">{children}</main>
        </StateContext>
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
