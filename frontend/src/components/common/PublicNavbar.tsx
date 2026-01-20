import Link from "next/link";
import { Store, LogIn, ArrowRight } from "lucide-react";

export default function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:bg-blue-700 transition-colors">
            <Store className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-800">SellerHub</span>
        </Link>

        {/* মেনু */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="#" className="hover:text-blue-600 transition">Features</Link>
          <Link href="#" className="hover:text-blue-600 transition">Pricing</Link>
          <Link href="#" className="hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* বাটনস */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600">
            <LogIn className="w-4 h-4" /> Login
          </Link>
          <Link href="/register" className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-md">
            Start Selling <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}