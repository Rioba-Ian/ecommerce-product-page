import Image from "next/image";
import React from "react";

export default function ImageProduct({ images }: { images: string[] }) {
 return (
  <div>
   <Image
    src={images[0] || "/images/image-product-1.jpg"}
    alt="product image"
    width={800}
    height={600}
    className="rounded-md"
   />
  </div>
 );
}
