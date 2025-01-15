import { cartWithProducts } from "@/utils";
import { Prisma } from "@prisma/client";

export type TCartWithProductsIncludes = Prisma.CartItemGetPayload<
 typeof cartWithProducts
>;

// export type TCartItemWithProducts = Prisma.;
