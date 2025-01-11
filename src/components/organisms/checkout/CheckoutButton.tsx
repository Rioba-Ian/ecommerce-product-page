import { Button } from "@/components/ui/button";
import { stripePreorderLink } from "@/lib/stripe";
import Link from "next/link";
import React from "react";

export default function CheckoutButton() {
 return (
  <Button className="bg-primaryEcommerce w-1/2 mx-auto" asChild>
   <Link href={stripePreorderLink}>Checkout</Link>
  </Button>
 );
}
