import React from "react";
import ImageProduct from "../molecules/ImageProduct";
import Button from "../atoms/Button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Input } from "../ui/input";

export default function ProductPage() {
 return (
  <main className=" grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 place-items-center  flex-1">
   <section>
    <ImageProduct />
   </section>

   <section className="py-4 md:py-8 w-4/5 space-y-6">
    <div className="py-4 space-y-4">
     <p className="md:text-xl font-bold text-foreground/50 uppercase">
      sneaker company
     </p>
     <h1 className="text-4xl md:text-5xl text-foreground/80 font-bold">
      Fall Limited Edition Sneakers
     </h1>
    </div>

    <p>
     These low-profile sneakers are your perfect casual wear companion.
     Featuring a durable rubber outer sole, they’ll withstand everything the
     weather can offer.
    </p>

    <div className="py-4 space-y-2 flex items-center justify-between md:flex-col md:items-start">
     <div className="inline-flex items-center gap-2">
      <h2 className="text-2xl md:text-3xl font-semibold">$125.00 </h2>
      <span className="px-3 py-1 bg-foreground/80 md:text-xl rounded-md font-semibold text-white">
       50%
      </span>
     </div>
     <p className="text-foreground/50 font-semibold">
      <s>$250.00</s>
     </p>
    </div>

    <div id="cart" className="flex flex-col md:flex-row items-center gap-4">
     <div className="flex items-center gap-1 basis-1/3">
      <Minus />
      <Input type="number" className="text-center text-lg font-medium" />
      <Plus />
     </div>
     <Button
      variant={"primary"}
      className="flex items-center justify-center gap-4 font-semibold span-2 col-start-3 md:basis-2/3"
     >
      <ShoppingCart />
      Add to Cart
     </Button>
    </div>
   </section>
  </main>
 );
}
