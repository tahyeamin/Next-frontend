"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // যদি আমরা ড্যাশবোর্ডে থাকি, তবে এই হেডার রেন্ডার হবে না
  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Store className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-900">SellerHub</span>
        </Link>

        {/* লিংকস */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="#" className="hover:text-blue-600">Features</Link>
          <Link href="#" className="hover:text-blue-600">Pricing</Link>
        </div>

        {/* বাটন */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600">Login</Link>
          <Link href="/register" className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition">
            Start Selling
          </Link>
        </div>
      </div>
    </nav>
  );
}