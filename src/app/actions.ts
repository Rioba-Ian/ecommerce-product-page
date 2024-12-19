"use server";

import { getUser } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

export async function addToCart(
 product: Product,
 user: Awaited<ReturnType<typeof getUser>>,
 formData: FormData
) {
 const cartQuantity = formData.get("cartQuantity")?.toString();
 console.log(cartQuantity, product, user);

 if (!cartQuantity || !user) {
  return {
   errors: "Missing required data.",
  };
 }

 //  create a cart item: productId, quantity,
 const result = await prisma.$transaction(async (tx) => {
  const cart = await tx.cart.upsert({
   where: { userId: user.id },
   create: { userId: user.id },
   update: {},
  });

  const cartItem = await tx.cartItem.create({
   data: {
    productId: product.id,
    quantity: parseInt(cartQuantity),
    cartId: cart.id,
   },
  });
 });
}
