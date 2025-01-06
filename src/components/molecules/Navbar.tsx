import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserMenu } from "./UserMenu";
import { MenuIcon, X } from "lucide-react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOutButton from "./SignOutButton";
import { getUser } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import CartStatusIcon from "./cart/CartStatusIcon";

const navLinks = [
 { to: "#", link: "Collections" },
 { to: "#", link: "Men" },
 { to: "#", link: "Women" },
 { to: "#", link: "About" },
 { to: "#", link: "Contact" },
];

export default async function Navbar() {
 const user = await getUser();
 const cartItems = await prisma.cartItem.findMany({
  include: {
   product: true,
  },
 });

 return (
  <header className="py-4 md:py-12 relative">
   <div id="nav-container" className="w-full flex items-center justify-between">
    <nav className="flex items-center gap-16">
     <div className="lg:hidden">
      <input
       type="checkbox"
       name="menu"
       className="hidden peer"
       id="mobile-menu"
      />
      <label htmlFor="mobile-menu" className="lg:hidden cursor-pointer">
       <MenuIcon />
      </label>

      <div className="bg-white absolute -left-6 top-0 w-3/4 z-5 h-screen translate-x-[-100%] peer-checked:translate-x-0 transition-transform duration-300 ease-in-out">
       <div className="p-8">
        <label htmlFor="mobile-menu" className="cursor-pointer">
         <X size={24} />
        </label>
        <ul className="flex flex-col gap-8 py-16">
         {navLinks.map((link) => (
          <li key={link.link}>
           <Link href={"#"} className="text-foreground text-lg font-bold">
            {link.link}
           </Link>
          </li>
         ))}
        </ul>
       </div>
      </div>
     </div>

     <Link href={"/"}>
      <Image
       src="/images/logo.svg"
       alt="sneakers logo"
       width={160}
       height={160}
      />
     </Link>

     <ul className="hidden lg:flex items-center gap-12">
      {navLinks.map((link) => (
       <li key={link.link}>
        <Link href={"#"}>{link.link}</Link>
       </li>
      ))}
     </ul>
    </nav>

    <div id="user-actions" className="flex items-center gap-4 sm:gap-16">
     <CartStatusIcon cartItems={cartItems} />

     <UserMenu>
      <DropdownMenu>
       <DropdownMenuTrigger asChild>
        <UserMenu.Icon imageUrl={user?.picture ?? undefined} />
       </DropdownMenuTrigger>
       <DropdownMenuContent className="bg-primaryEcommerce">
        <DropdownMenuItem>{user && <SignOutButton />}</DropdownMenuItem>
        <DropdownMenuItem>
         {!user && <Link href="/signin">Sign In</Link>}
        </DropdownMenuItem>
       </DropdownMenuContent>
      </DropdownMenu>
     </UserMenu>
    </div>
   </div>

   <hr className="w-full mt-8 font-bold h-2 text-secondary" />
  </header>
 );
}
