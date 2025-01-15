import { prisma } from "./prisma";

export const getCartItems = await prisma.cartItem.findMany({
 include: {
  product: true,
 },
});
