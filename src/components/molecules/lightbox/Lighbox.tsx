"use client";
import {
 Dialog,
 DialogContent,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { useDisclosure } from "@/hooks/use-disclosure";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface LighboxProps {
 images: string[];
}

function Lighbox({ images }: LighboxProps) {
 const [selectedImage, setSelectedImage] = useState<string | null>(images[0]);
 const { onToggle } = useDisclosure();
 const scrollLeftRef = useRef<HTMLDivElement | null>(null);

 const handleScroll = (direction: "left" | "right") => {
  if (scrollLeftRef.current === null) return;

  if (direction === "left") {
   scrollLeftRef.current.scrollLeft -= 200;
  } else {
   scrollLeftRef.current.scrollLeft += 200;
  }
 };

 const scrollToSelected = (element: HTMLImageElement) => {
  if (!element) return;
  if (scrollLeftRef.current === null) return;

  const container = scrollLeftRef.current;
  const scrollLeft =
   element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;

  container.scrollTo({
   left: scrollLeft,
   behavior: "smooth",
  });
 };

 return (
  <div>
   <Dialog>
    <DialogTrigger>
     <Image
      src={selectedImage ?? "/images/image-product-1.jpg"}
      alt="product image"
      width={800}
      height={800}
      className="rounded-md"
     />
    </DialogTrigger>
    <DialogContent onToggle={onToggle}>
     <DialogTitle>
      <VisuallyHidden asChild>Product Image</VisuallyHidden>
     </DialogTitle>
     <Image
      src={selectedImage ?? "/images/image-product-1.jpg"}
      alt="product image"
      width={1200}
      height={800}
      className="rounded-md"
     />
    </DialogContent>
   </Dialog>

   <section className=" flex items-center mt-4">
    {images.length > 0 && (
     <div onClick={() => handleScroll("left")}>
      <MoveLeft size={24} className="mx-4 cursor-pointer" />
     </div>
    )}
    <div
     ref={scrollLeftRef}
     className="w-4/5 overflow-x-scroll flex items-center gap-4"
    >
     {images?.map((image, index) => (
      <Image
       key={index}
       src={image}
       alt="product image"
       width={80}
       height={100}
       className={`${
        selectedImage === image
         ? "border-4 border-primaryEcommerce rounded-md"
         : "rounded-md cursor-pointer"
       }`}
       onClick={(e) => {
        setSelectedImage(image);
        scrollToSelected(e.target as HTMLImageElement);
       }}
      />
     ))}
    </div>

    {images.length > 0 && (
     <MoveRight
      size={24}
      onClick={() => handleScroll("right")}
      className="mx-4 cursor-pointer"
     />
    )}
   </section>
  </div>
 );
}

export default Lighbox;
