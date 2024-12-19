"use client";
import { addToCart } from "@/app/actions";
import Button from "@/components/atoms/Button";
import { Input } from "@/components/ui/input";
import { getUser } from "@/lib/lucia";
import { Product } from "@prisma/client";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

interface AddToCartProps {
 product: Product;
 user: Awaited<ReturnType<typeof getUser>>;
}

function AddToCart(props: AddToCartProps) {
 const { product, user } = props;
 const cartProductWithId = addToCart.bind(null, product, user);
 const [cartQuantity, setCartQuantity] = useState<number>(0);
 return (
  <form
   action={async (formdata) => {
    cartProductWithId(formdata);
   }}
   className="flex flex-col md:flex-row items-center gap-4"
  >
   <div className="flex items-center gap-1 basis-1/3">
    <Minus
     onClick={() => {
      if (cartQuantity && cartQuantity > 0) {
       setCartQuantity((prev) => prev - 1);
      }
     }}
    />
    <Input
     name="cartQuantity"
     type="number"
     value={cartQuantity ?? ""}
     required
     className="text-center text-lg font-medium"
     max={product.in_stock ?? 100}
     onChange={() => setCartQuantity((prev) => prev)}
    />
    <Plus onClick={() => setCartQuantity((prev) => prev + 1)} />
   </div>
   <Button
    onClick={() => {
     if (!user) {
      redirect("/signin");
     }
    }}
    variant={"primary"}
    className="flex items-center justify-center gap-4 font-semibold span-2 col-start-3 md:basis-2/3"
   >
    <ShoppingCart />
    Add to Cart
   </Button>
  </form>
 );
}

export default AddToCart;
