import React from "react";
import ImageProduct from "../molecules/ImageProduct";
import Button from "../atoms/Button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Input } from "../ui/input";

export default function ProductPage() {
 return (
  <main className=" grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center  border border-green-800 flex-1">
   <section>
    <ImageProduct />
   </section>

   <section className="py-8 w-4/5 space-y-6 border border-red-500">
    <div className="py-4 space-y-4">
     <p className="text-xl font-bold text-foreground/50 uppercase">
      sneaker company
     </p>
     <h1 className="text-5xl text-foreground/80 font-bold">
      Fall Limited Edition Sneakers
     </h1>
    </div>

    <p>
     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo sequi vitae
     corporis nam reiciendis id totam quas nostrum nulla, obcaecati et iste
     veritatis ducimus officiis, ut facilis expedita rem perferendis.
    </p>

    <div className="py-4 space-y-2">
     <div className="inline-flex items-center gap-2">
      <h2 className="text-3xl font-semibold">$125.00 </h2>
      <span className="px-3 py-1 bg-foreground/80 text-xl rounded-md font-semibold text-white">
       50%
      </span>
     </div>
     <p className="text-foreground/50 font-semibold">
      <s>$250.00</s>
     </p>
    </div>

    <div id="cart" className="flex items-center gap-4">
     <div className="flex items-center gap-1 basis-1/3">
      <Minus />
      <Input type="number" className="" />
      <Plus />
     </div>
     <Button
      variant={"primary"}
      className="flex items-center justify-center gap-4 font-semibold span-2 col-start-3 basis-2/3"
     >
      <ShoppingCart />
      Add to Cart
     </Button>
    </div>
   </section>
  </main>
 );
}
