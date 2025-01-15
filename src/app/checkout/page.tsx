import CheckoutButton from "@/components/organisms/checkout/CheckoutButton";
import CheckoutItems from "@/components/organisms/checkout/CheckoutItems";
import { getCartItems } from "@/lib/query";
import React from "react";

const CheckoutPage = async () => {
 const cartItems = getCartItems;

 return (
  <main>
   <h2 className="text-2xl font-medium">Checkout Page</h2>

   <div id="checkout-main-page" className="w-full py-4 px-4 md:py-8">
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
     <CheckoutItems cartItems={cartItems} />
     <CheckoutButton cartItems={cartItems} />
    </section>
   </div>
  </main>
 );
};

export default CheckoutPage;
