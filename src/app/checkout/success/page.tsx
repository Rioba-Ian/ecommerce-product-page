import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
 return (
  <main className="flex-1 flex flex-col items-center justify-center space-y-4 border border-gray-200 ">
   <h3 className="text-2xl font-medium">Success</h3>
   <p>Thank you for your purchase!</p>
   <Button asChild className="bg-primaryEcommerce mx-auto">
    <Link className="" href={"/"}>
     Go back Home
    </Link>
   </Button>
  </main>
 );
}
