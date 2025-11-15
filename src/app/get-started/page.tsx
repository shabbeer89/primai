import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetStartedForm from "@/components/GetStartedForm";

export default function GetStartedPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
        <GetStartedForm />
      </Suspense>
      <Footer />
    </div>
  );
}
