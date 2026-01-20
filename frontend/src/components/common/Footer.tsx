import { Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Store className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-slate-900">SellerHub</span>
        </div>
        <p className="text-sm text-slate-500">© 2024 SellerHub Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}