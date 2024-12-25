import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export const cartWithProducts = Prisma.validator<Prisma.Cart$CartItemArgs>()({
 include: {
  product: true,
 },
});
