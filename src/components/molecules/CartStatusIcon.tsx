import Image from "next/image";
import React from "react";

function CartStatusIcon({ count }: { count: number }) {
 return (
  <div className="flex relative">
   <Image
    src="/images/icon-cart.svg"
    alt="cart icon logo"
    width={24}
    height={24}
   />
   <p className="absolute bg-primaryEcommerce text-white px-2 py-0.5 text-sm rounded-md  -top-3 left-4 font-bold">
    {count > 0 ? count : ""}
   </p>
  </div>
 );
}

export default CartStatusIcon;
