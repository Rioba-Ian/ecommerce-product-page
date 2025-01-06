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

export const formatPercentageDiscount = (
 newPrice: number,
 oldPrice: number
) => {
 const percentDiscount = (oldPrice - newPrice) / oldPrice;
 return formatPercent(percentDiscount);
};

export const formatPercent = (value: number) => {
 return new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 0,
 }).format(value);
};
