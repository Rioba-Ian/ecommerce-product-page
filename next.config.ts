import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 /* config options here */
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "lh3.googleusercontent.com",
    port: "",
    pathname: "**",
   },
   {
    protocol: "https",
    hostname: "rioba-dev.sirv.com",
    port: "",
    pathname: "**",
   },
  ],
 },
};

export default nextConfig;
