import { LampDemo } from "@/components/lampDemo";
import Navbar from "@/components/navbar";

export default function Home() {
  
  return (
    <div className="relative flex-col w-full flex items-center justify-center">
      <Navbar />
   <LampDemo/>
   </div>
  );
}
