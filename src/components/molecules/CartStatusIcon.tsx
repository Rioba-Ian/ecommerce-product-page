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
   {count && count > 0 && (
    <p className="absolute text-primaryEcommerce -top-4 left-6 font-bold">
     {count}
    </p>
   )}
  </div>
 );
}

export default CartStatusIcon;
