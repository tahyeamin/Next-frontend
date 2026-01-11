"use client";
import Link from "next/link";
import { Store } from "lucide-react";

export default function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
          <Store className="text-blue-600 w-6 h-6" />
          <span>SellerHub</span>
        </Link>

        {/* লিংকস */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            Login
          </Link>
          <Link 
            href="/register" 
            className="px-5 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition"
          >
            Start Selling
          </Link>
        </div>
      </div>
    </nav>
  );
}