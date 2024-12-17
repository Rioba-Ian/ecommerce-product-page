import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserMenu } from "./UserMenu";

const navLinks = [
 { to: "#", link: "Collections" },
 { to: "#", link: "Men" },
 { to: "#", link: "Women" },
 { to: "#", link: "About" },
 { to: "#", link: "Contact" },
];

export default function Navbar() {
 return (
  <header className="py-4 md:py-12">
   <div id="nav-container" className="w-full flex items-center justify-between">
    <nav className="flex items-center gap-16">
     <Image
      src="/images/logo.svg"
      alt="sneakers logo"
      width={160}
      height={160}
     />

     <ul className="flex items-center gap-12">
      {navLinks.map((link) => (
       <li key={link.link}>
        <Link href={"#"}>{link.link}</Link>
       </li>
      ))}
     </ul>
    </nav>

    <div id="user-actions" className="flex items-center gap-16">
     <Image
      src="/images/icon-cart.svg"
      alt="cart icon logo"
      width={24}
      height={24}
     />

     <UserMenu>
      <UserMenu.Icon />
     </UserMenu>
    </div>
   </div>

   <hr className="w-full mt-8 font-bold h-2 text-secondary" />
  </header>
 );
}
