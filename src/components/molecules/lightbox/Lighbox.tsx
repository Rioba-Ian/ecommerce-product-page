"use client";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from "@/components/ui/carousel";
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
  if (images.length === 0 && !selectedImage) return;
  const indexOfSelectedImage = images.indexOf(selectedImage);

  console.log(indexOfSelectedImage, "indexOfSelectedImage");
  console.log(images.length, "images.length");

  if (indexOfSelectedImage < 0) {
   // restart the index
   setSelectedImage(images[images.length - 1]);
   return;
  }

  if (direction === "left") {
   scrollLeftRef.current.scrollLeft -= 200;
   setSelectedImage(
    images[indexOfSelectedImage === 0 ? 0 : indexOfSelectedImage - 1]
   );
  } else {
   scrollLeftRef.current.scrollLeft += 200;
   setSelectedImage(
    images[
     indexOfSelectedImage === images.length - 1
      ? images.length - 1
      : indexOfSelectedImage + 1
    ]
   );
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
    <DialogContent onToggle={onToggle} className="max-w-3xl border-none">
     <DialogTitle>
      <VisuallyHidden asChild>Product Image</VisuallyHidden>
     </DialogTitle>
     <div className="flex flex-col">
      <Carousel opts={{ startIndex: images.indexOf(selectedImage) }}>
       <CarouselContent>
        {images?.map((image, index) => (
         <CarouselItem key={index}>
          <article className="flex aspect-square items-center justify-center p-6">
           <Image
            src={image}
            alt="product image"
            width={800}
            height={800}
            className="rounded-md"
           />
          </article>
         </CarouselItem>
        ))}
       </CarouselContent>
       <CarouselPrevious className="text-white" />
       <CarouselNext className="text-white" />
      </Carousel>
      <div className="flex justify-center gap-4">
       {images?.map((image, index) => (
        <Image
         key={index}
         src={image}
         alt="product thumbnail"
         width={80}
         height={80}
         className={`rounded-md cursor-pointer transition-all ${
          selectedImage === image
           ? "border-2 border-primaryEcommerce opacity-50"
           : "hover:opacity-70"
         }`}
         onClick={() => setSelectedImage(image)}
        />
       ))}
      </div>
     </div>
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
