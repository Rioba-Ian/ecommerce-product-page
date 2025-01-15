"use server";

import { getUser } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { TCartItemWithProducts } from "../../global-types";
import { stripe } from "@/lib/stripe";

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

export const decreaseProductQuantityInCart = async (cartItemId: string) => {
 console.log("decreaseProductQuantityInCart", cartItemId);

 if (!cartItemId) {
  return {
   errors: "Missing required data.",
  };
 }

 const cartItem = await prisma.cartItem.findUnique({
  where: { id: cartItemId },
 });

 if (cartItem?.quantity === 1) {
  return prisma.cartItem.delete({
   where: { id: cartItemId },
  });
 }

 return prisma.cartItem.update({
  where: { id: cartItemId },
  data: {
   quantity: {
    decrement: 1,
   },
  },
 });
};

export async function createCheckoutSession(cartItems: TCartItemWithProducts) {
 console.log(JSON.stringify(cartItems, null, 2), "cartItems>>>>>");
 console.log(cartItems.cartItems, "cartItems>>>>>");
 console.log(Object.keys(cartItems.cartItems), "cartItems>>>>>");

 const lineItems = cartItems.cartItems.map((item) => ({
  price_data: {
   currency: "usd",
   product_data: {
    name: item.product.name,
    description: item.product.description || "",
    images: item.product.image,
   },
   unit_amount: item.product.price * 100,
  },
  quantity: item.quantity,
 }));

 console.log(lineItems, "lineItems");

 const session = await stripe.checkout.sessions.create({
  line_items: lineItems,
  mode: "payment",
  success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
 });

 return session;
}
