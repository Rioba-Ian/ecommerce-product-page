import React from "react";
import ImageProduct from "../molecules/ImageProduct";
import { prisma } from "@/lib/prisma";
import AddToCart from "./product/AddToCart";
import { getUser } from "@/lib/lucia";

export default async function ProductPage() {
 const productsData = await prisma.product.findMany();
 const user = await getUser();

 const percentageDiscount =
  (productsData[0]?.oldPrice - productsData[0]?.price) /
  productsData[0]?.oldPrice;

 return (
  <main className="py-4 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 place-items-center  flex-1">
   <section>
    <ImageProduct images={productsData[0].image || []} />
   </section>

   <section className="py-4 md:py-8 w-4/5 space-y-6">
    <div className="py-4 space-y-4">
     <p className="md:text-xl font-bold text-foreground/50 uppercase">
      sneaker company
     </p>
     <h1 className="text-4xl md:text-5xl text-foreground/80 font-bold">
      {productsData[0]?.name ?? "Fall Limited Edition Sneakers"}
     </h1>
    </div>

    <p>
     {productsData[0]?.description ??
      `
     These low-profile sneakers are your perfect casual wear companion.
     Featuring a durable rubber outer sole, they’ll withstand everything the
     weather can offer.
     `}
    </p>

    <div className="py-4 space-y-2 flex items-center justify-between md:flex-col md:items-start">
     <div className="inline-flex items-center gap-2">
      <h2 className="text-2xl md:text-3xl font-semibold">
       {Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
       }).format(productsData[0]?.price ?? 125)}
      </h2>
      <span className="px-3 py-1 bg-foreground/80 md:text-xl rounded-md font-semibold text-white">
       {Intl.NumberFormat("en-US", {
        style: "percent",
        maximumFractionDigits: 0,
       }).format(percentageDiscount)}
      </span>
     </div>
     <p className="text-foreground/50 font-semibold">
      <s>
       {Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
       }).format(productsData[0]?.oldPrice ?? 250)}
      </s>
     </p>
    </div>

    <div id="cart" className="flex flex-col md:flex-row items-center gap-4">
     <AddToCart product={productsData[0]} user={user} />
    </div>
   </section>
  </main>
 );
}
