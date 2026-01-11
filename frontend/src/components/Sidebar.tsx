"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, PlusCircle, Settings, Store } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Products', href: '/dashboard/products', icon: ShoppingBag },
    { name: 'Add Product', href: '/dashboard/products/add', icon: PlusCircle },
    { name: 'Shop Settings', href: '/dashboard/profile', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-slate-800">
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <Store className="w-6 h-6 text-blue-500 mr-2" />
        <span className="text-xl font-bold text-white tracking-wide">SellerHub</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        © 2024 E-Shop Seller Center
      </div>
    </aside>
  );
}