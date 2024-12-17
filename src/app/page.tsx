import Navbar from "@/components/molecules/Navbar";
import ProductPage from "@/components/organisms/ProductPage";

export default function Home() {
 return (
  <div
   className="max-w-7xl w-[90%] mx-auto flex flex-col min-h-screen"
   id="app-container"
  >
   <Navbar />

   <ProductPage />
  </div>
 );
}
