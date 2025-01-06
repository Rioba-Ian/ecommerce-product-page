import CheckoutButton from "@/components/organisms/checkout/CheckoutButton";
import CheckoutItems from "@/components/organisms/checkout/CheckoutItems";
import { prisma } from "@/lib/prisma";
import React from "react";

const CheckoutPage = async () => {
 // diplay all cart items
 // display total items, total price
 //  display form for filling shipping address

 const cartItems = await prisma.cartItem.findMany({
  include: {
   product: true,
  },
 });

 const cart = await prisma.cart.findMany({
  include: {
   CartItem: true,
  },
 });

 console.log(cart, "cart");

 return (
  <main>
   <h2>Checkout Page</h2>

   <div id="checkout-main-page" className="w-full py-4 px-4 md:py-8">
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
     <CheckoutItems cartItems={cartItems} />
     <CheckoutButton />
    </section>
   </div>
  </main>
 );
};

export default CheckoutPage;
