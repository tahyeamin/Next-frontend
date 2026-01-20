import Link from "next/link";
import { ArrowRight, BarChart3, Globe, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
          Grow your business with <br /> <span className="text-blue-600">SellerHub</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          The all-in-one platform to manage inventory, track orders, and reach global customers.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition flex items-center gap-2">
            Start Selling <ArrowRight className="w-5 h-5"/>
          </Link>
          <Link href="/login" className="px-8 py-4 bg-white text-slate-700 border border-slate-300 rounded-full font-bold hover:bg-slate-50 transition">
            Login
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <FeatureCard icon={BarChart3} title="Analytics" desc="Track your sales performance in real-time." />
        <FeatureCard icon={Globe} title="Global Reach" desc="Sell to customers from anywhere in the world." />
        <FeatureCard icon={ShieldCheck} title="Secure" desc="Bank-grade security for your payments." />
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center">
      <Icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-500">{desc}</p>
    </div>
  );
}