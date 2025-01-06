import type { Metadata } from "next";
import "./globals.css";
import { Kumbh_Sans } from "next/font/google";
import Navbar from "@/components/molecules/Navbar";

const kumbhSans = Kumbh_Sans({
 subsets: ["latin"],
 weight: ["400", "700"],
 variable: "--font-kumbh-sans",
});

export const metadata: Metadata = {
 title: "Ecommerce Product Page",
 description: "Frontend Mentor Ecommerce Product Page",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" suppressHydrationWarning>
   <body className={`${kumbhSans.className}`}>
    <div
     className="max-w-7xl w-[90%] mx-auto flex flex-col min-h-screen"
     id="app-container"
    >
     <Navbar />

     {children}
    </div>
   </body>
  </html>
 );
}
