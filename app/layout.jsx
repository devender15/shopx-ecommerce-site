import "@styles/globals.css";

import AuthProvider from "@components/AuthProvider";
import Navbar from "@components/Navbar";

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
        <Navbar />
        <main className="app">{children}</main>
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
