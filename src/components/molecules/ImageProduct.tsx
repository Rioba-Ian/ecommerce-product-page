import Image from "next/image";
import React from "react";

export default function ImageProduct() {
 return (
  <div>
   <Image
    src={"/images/image-product-1.jpg"}
    alt="product image"
    width={800}
    height={600}
    className="rounded-md"
   />
  </div>
 );
}
