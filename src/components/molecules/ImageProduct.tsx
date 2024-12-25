import React from "react";
import Lighbox from "./lightbox/Lighbox";

export default function ImageProduct({ images }: { images: string[] }) {
 return (
  <>
   <Lighbox images={images} />
  </>
 );
}
