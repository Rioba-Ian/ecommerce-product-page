import React from "react";
import Lighbox from "./lightbox/Lighbox";

export default function ImageProduct({ images }: { images: string[] }) {
 console.log(images, "images");

 return (
  <>
   <Lighbox images={images} />
  </>
 );
}
