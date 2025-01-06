"use client";
import {
 decreaseProductQuantityInCart,
 increaseProductQuantityInCart,
} from "@/app/actions";
import React, { startTransition, useOptimistic } from "react";
import { TCartWithProductsIncludes } from "../../../../global-types";
import { CartItem } from "@/components/molecules/cart/CartContent";
import { formatPrice } from "@/utils";

export default function CheckoutItems({
 cartItems,
}: {
 cartItems: TCartWithProductsIncludes[];
}) {
 const [optimisticCartItems, setOptimisticCartItems] = useOptimistic(cartItems);
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
  <div className="col-span-2 flex flex-col border border-indigo-600 items-start gap-8">
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

   <div className="flex items-start justify-center flex-col">
    <p>
     Total Items: {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
    </p>
    <p>Total Value: {formatPrice(totalPrice)}</p>
   </div>
  </div>
 );
}
