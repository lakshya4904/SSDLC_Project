import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "../components/NavBar/NavBar";
import { UserProvider } from "./context/UserContext";



export const metadata: Metadata = {
  title: "Novella",
  description: "For those who explore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        <script src="http://localhost:8097"></script>
      </head>
      <body>
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
