import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const buttonVariants = cva("", {
 variants: {
  variant: {
   primary: "text-foreground/80 px-12 py-4 bg-primaryEcommerce rounded-md",
   default: "grid place-items-center bg-white text-dark px-8 py-2 my-2.5",
  },
 },
 defaultVariants: {
  variant: "default",
 },
});

interface Props
 extends HTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
 asChild?: boolean;
}

export default function Button(props: Props) {
 const { className, children, variant, asChild = false, ...rest } = props;

 if (asChild) return <>{children}</>;

 return (
  <button className={cn(buttonVariants({ variant }), className)} {...rest}>
   {children}
  </button>
 );
}
