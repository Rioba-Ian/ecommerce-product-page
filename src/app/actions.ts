"use server";

import { getUser } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
  //  check if the cartItem exists
  const existingCartItem = await prisma.cartItem.findFirst({
   where: {
    productId: product.id,
   },
  });

  if (existingCartItem) {
   return tx.cartItem.update({
    where: { id: existingCartItem.id },
    data: {
     quantity: existingCartItem.quantity + parseInt(cartQuantity),
    },
   });
  }

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

  return { cart, cartItem };
 });

 console.log(result, "result of cart item");

 revalidatePath("/");
}

export const increaseProductQuantityInCart = async (cartItemId: string) => {
 console.log("increaseProductQuantityInCart", cartItemId);

 if (!cartItemId) {
  return {
   errors: "Missing required data.",
  };
 }

 const cartItem = prisma.cartItem.update({
  where: { id: cartItemId },
  data: {
   quantity: {
    increment: 1,
   },
  },
 });

 return cartItem;
};
