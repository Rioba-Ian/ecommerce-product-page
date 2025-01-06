import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { TCartWithProductsIncludes } from "../../../../global-types";
import { formatPrice } from "@/utils";

function CartContent() {
 return <div>CartContent</div>;
}

export default CartContent;

interface CartItemProps {
 item: TCartWithProductsIncludes;
 onIncreaseQuantity: (itemId: string) => void;
 onDecreaseQuantity: (itemId: string) => void;
}

export function CartItem({
 item,
 onIncreaseQuantity,
 onDecreaseQuantity,
}: CartItemProps) {
 const quantityLimitReached =
  !!item.product && item.quantity && item.quantity >= item.product.in_stock;

 console.log(formatPrice(item.product.price), "item.product.price");

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
    <p className="text-gray-400">{formatPrice(item.product.price)}</p>
    <div className="flex items-center gap-1.5">
     <Button
      variant="outline"
      size="sm"
      disabled={item.quantity === 1}
      onClick={() => onDecreaseQuantity(item.id)}
     >
      -
     </Button>
     <span>{item.quantity}</span>
     <Button
      variant="outline"
      size="sm"
      disabled={quantityLimitReached || false}
      onClick={() => onIncreaseQuantity(item.id)}
     >
      +
     </Button>
    </div>
   </div>
  </li>
 );
}
