import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "../components/NavBar/NavBar";
import { UserProvider } from "./context/UserContext";



export const metadata: Metadata = {
  title: "Novella",
  description: "For those who explore",
  manifest:"/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
      </head>
      <body >
        <Providers>
          <UserProvider>
            <NavBar />
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
