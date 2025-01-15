"use client";
import Image from "next/image";
import React, { startTransition, useOptimistic } from "react";
import {
 Drawer,
 DrawerClose,
 DrawerContent,
 DrawerDescription,
 DrawerFooter,
 DrawerHeader,
 DrawerTitle,
 DrawerTrigger,
} from "../../ui/drawer";
import { Button } from "../../ui/button";
import { TCartWithProductsIncludes } from "../../../../global-types";
import { formatPrice } from "@/utils";
import {
 decreaseProductQuantityInCart,
 increaseProductQuantityInCart,
} from "@/app/actions";
import { CartItem } from "./CartContent";
import Link from "next/link";
import { useDisclosure } from "@/hooks/use-disclosure";

interface CartStatusIconProps {
 cartItems: TCartWithProductsIncludes[];
}

function CartStatusIcon({ cartItems }: CartStatusIconProps) {
 const [optimisticCartItems, setOptimisticCartItems] = useOptimistic(cartItems);
 const count = optimisticCartItems.length;
 const { isOpen, onToggle } = useDisclosure();

 const totalPrice = optimisticCartItems.reduce(
  (acc, item) => acc + Number(item.quantity) * Number(item.product.price),
  0
 );

 const handleIncreaseQuantity = (itemId: string) => {
  startTransition(async () => {
   setOptimisticCartItems((prev) =>
    prev.map((item) =>
     item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    )
   );
   const updatedItem = await increaseProductQuantityInCart(itemId);

   if ("errors" in updatedItem) {
    return;
   }

   setOptimisticCartItems((prev) =>
    prev.map((item) =>
     item.id === updatedItem.id
      ? { ...item, quantity: updatedItem.quantity }
      : item
    )
   );
  });
 };

 const handleDecreaseQuantity = (itemId: string) => {
  startTransition(async () => {
   setOptimisticCartItems((prev) =>
    prev.map((item) =>
     item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    )
   );

   const updatedItem = await decreaseProductQuantityInCart(itemId);

   if ("errors" in updatedItem) {
    return;
   }

   setOptimisticCartItems((prev) =>
    prev.map((item) =>
     item.id === updatedItem.id
      ? { ...item, quantity: updatedItem.quantity }
      : item
    )
   );
  });
 };

 return (
  <div className="flex relative">
   <Drawer direction="right" open={isOpen}>
    <DrawerTrigger asChild>
     <div className="cursor-pointer" onClick={onToggle}>
      <Image
       src="/images/icon-cart.svg"
       alt="cart icon logo"
       width={24}
       height={24}
      />
      {count > 0 && (
       <p className="absolute bg-primaryEcommerce text-white px-2 py-0.5 text-sm rounded-md  -top-3 left-4 font-bold">
        {count}
       </p>
      )}
     </div>
    </DrawerTrigger>
    <DrawerContent className="  left-auto  right-4 top-2 bottom-2 fixed z-50  outline-none w-[30%] flex  bg-transparent border-none mt-0 ">
     <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
      <DrawerHeader>
       <DrawerTitle>Your cart items</DrawerTitle>
       <DrawerDescription>
        Update your cart and proceed to checkout.
       </DrawerDescription>
      </DrawerHeader>
      <div>
       <ul>
        {optimisticCartItems.map((item, index) => (
         <CartItem
          key={index}
          item={item}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
         />
        ))}
       </ul>
      </div>
      <DrawerFooter>
       Total:{formatPrice(totalPrice)}
       <Button
        asChild
        className="bg-primaryEcommerce hover:bg-secondaryEcommerce hover:text-foreground"
       >
        <Link href={"/checkout"} onClick={onToggle}>
         Proceed to Checkout
        </Link>
       </Button>
       <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
       </DrawerClose>
      </DrawerFooter>
     </div>
    </DrawerContent>
   </Drawer>
  </div>
 );
}

export default CartStatusIcon;
