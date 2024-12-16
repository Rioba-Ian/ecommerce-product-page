import type { Metadata } from "next";
import "./globals.css";
import { Kumbh_Sans } from "next/font/google";

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
  <html lang="en">
   <body className={`${kumbhSans.className}`}>{children}</body>
  </html>
 );
}
