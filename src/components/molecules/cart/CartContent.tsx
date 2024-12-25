import Image from "next/image";
import Link from "next/link";
import React from "react";

function CartContent() {
 return <div>CartContent</div>;
}

export default CartContent;

function CartItem() {
 return (
  <li>
   <div>
    <Link href={"/"}>
     <Image
      src={"/images/product-image-name.jpg"}
      alt="product image name"
      width={110}
      height={110}
     />
    </Link>
   </div>
  </li>
 );
}
