import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-6xl font-extrabold text-slate-900">404</h1>
        <h2 className="text-2xl font-bold mt-2 text-slate-600">Page Not Found</h2>
        <p className="text-slate-500 mt-4 mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </div>
  );
}