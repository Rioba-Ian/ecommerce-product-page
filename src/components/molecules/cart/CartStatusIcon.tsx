import Image from "next/image";
import React from "react";
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

interface CartStatusIconProps {
 cartItems: TCartWithProductsIncludes[];
}

function CartStatusIcon({ cartItems }: CartStatusIconProps) {
 const count = cartItems.length;

 return (
  <div className="flex relative">
   <Drawer direction="right">
    <DrawerTrigger asChild>
     <div className="cursor-pointer">
      <Image
       src="/images/icon-cart.svg"
       alt="cart icon logo"
       width={24}
       height={24}
      />
      <p className="absolute bg-primaryEcommerce text-white px-2 py-0.5 text-sm rounded-md  -top-3 left-4 font-bold">
       {count > 0 ? count : ""}
      </p>
     </div>
    </DrawerTrigger>
    <DrawerContent className="  left-auto  right-4 top-2 bottom-2 fixed z-50  outline-none w-[30%] flex  bg-transparent border-none mt-0 ">
     {/* =====> Edit DrawerContent first child className  */}
     <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
      <DrawerHeader>
       <DrawerTitle>Your cart items</DrawerTitle>
       <DrawerDescription>
        Update your cart and proceed to checkout.
       </DrawerDescription>
      </DrawerHeader>
      <div>
       <ul>
        {cartItems.map((item) => (
         <li key={item.id} className="flex items-center gap-2">
          <div>
           <Image
            src={item.product.image[0] ?? "/images/image-product-1.jpg"}
            alt="product image"
            width={80}
            height={80}
            className="rounded-md border border-primaryEcommerce"
           />
          </div>

          <div>
           <p className="font-medium">{item.product.name}</p>
           <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" disabled={item.quantity === 1}>
             -
            </Button>
            <span>{item.quantity}</span>
            <Button variant="outline" size="sm">
             +
            </Button>
           </div>
          </div>
         </li>
        ))}
       </ul>
      </div>
      <DrawerFooter>
       <Button className="bg-primaryEcommerce hover:bg-secondaryEcommerce hover:text-foreground">
        Proceed to Checkout
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

function CartItem({ item }: { item: TCartWithProductsIncludes }) {
 const quantityLimitReached = !!item.product && item.quantity;
 return (
  <li key={item.id} className="flex items-center gap-2">
   <div>
    <Image
     src={item.product.image[0] ?? "/images/image-product-1.jpg"}
     alt="product image"
     width={80}
     height={80}
     className="rounded-md border border-primaryEcommerce"
    />
   </div>

   <div>
    <p className="font-medium">{item.product.name}</p>
    <div className="flex items-center gap-1.5">
     <Button variant="outline" size="sm" disabled={item.quantity === 1}>
      -
     </Button>
     <span>{item.quantity}</span>
     <Button variant="outline" size="sm" disabled={quantityLimitReached}>
      +
     </Button>
    </div>
   </div>
  </li>
 );
}
