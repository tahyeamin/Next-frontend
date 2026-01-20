"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  User, 
  Package, 
  LogOut, 
  Store 
} from "lucide-react";

// মেনু আইটেমগুলোর লিস্ট
const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Products", href: "/dashboard/products", icon: Package },
  { name: "Add Product", href: "/dashboard/products/add", icon: PlusCircle },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname(); // ✅ ভেরিয়েবলের নাম 'pathname' হতে হবে
  const router = useRouter();

  // লগআউট ফাংশন
  const handleLogout = () => {
    // ১. টোকেন ডিলিট করা
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    // ২. লগইন পেজে পাঠানো
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0 z-30">
      
      {/* ১. লোগো / ব্র্যান্ড এরিয়া */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-xl">
           <div className="p-2 bg-blue-100 rounded-lg">
             <Store className="w-6 h-6" />
           </div>
           <span>SellerPanel</span>
        </div>
      </div>

      {/* ২. মেনু আইটেম */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">Menu</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            // বর্তমান পেজ কি না চেক করা
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ৩. লগআউট বাটন (নিচে) */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 w-full rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

    </aside>
  );
}