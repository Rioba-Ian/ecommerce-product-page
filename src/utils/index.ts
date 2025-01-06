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

export const formatPrice = (price: number) => {
 return new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  trailingZeroDisplay: "auto",
 }).format(price);
};
