"use client";

import { createCheckoutSession } from "@/app/actions";
import { Button } from "@/components/ui/button";
import React from "react";
import { TCartItemWithProducts } from "../../../../global-types";
import { useRouter } from "next/navigation";

export default function CheckoutButton(cartItems: TCartItemWithProducts) {
 const router = useRouter();

 const handleCheckout = async () => {
  const session = await createCheckoutSession(cartItems);

  if (session.url) {
   router.push(session.url);
  }
 };

 return (
  <Button
   className="bg-primaryEcommerce w-1/2 mx-auto"
   onClick={handleCheckout}
  >
   Checkout
  </Button>
 );
}
