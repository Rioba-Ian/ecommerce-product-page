import React from "react";
import ImageProduct from "../molecules/ImageProduct";

export default function ProductPage() {
 return (
  <main className=" grid grid-cols-1 md:grid-cols-2 gap-8  border border-green-800 flex-1">
   <section>
    <ImageProduct />
   </section>

   <section className="py-8 w-4/5  border border-red-500">
    <p className="text-xl font-bold text-foreground/50 uppercase">
     sneaker company
    </p>
    <h1 className="text-5xl text-foreground/80 font-bold">
     Fall Limited Edition Sneakers
    </h1>
    <p>
     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo sequi vitae
     corporis nam reiciendis id totam quas nostrum nulla, obcaecati et iste
     veritatis ducimus officiis, ut facilis expedita rem perferendis.
    </p>

    <h2>$125.00</h2>
   </section>
  </main>
 );
}
