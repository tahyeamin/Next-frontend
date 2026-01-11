"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Globe, ShieldCheck, Zap, Store } from "lucide-react";

// অ্যানিমেশন ভেরিয়েন্ট (Framer Motion)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  return (
    // পুরো পেজের ব্যাকগ্রাউন্ডে একটি হালকা গ্র্যাডিয়েন্ট থাকবে
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden">

      {/* --- HERO SECTION (Colorful & Dynamic) --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        
        {/* Background Abstract Blobs (কালারফুল শেপস) */}
        <div className="absolute top-20 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-40 right-0 translate-x-1/2 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />

        <motion.div 
          className="max-w-5xl mx-auto text-center relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-sm font-semibold mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4" fill="currentColor" />
            <span>New: AI-Powered Analytics Dashboard</span>
          </motion.div>

          {/* Main Headline with Gradient Text */}
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
          >
            Supercharge your <br className="hidden md:block" /> e-commerce business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              with colorful insights.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform for modern sellers. Manage inventory, track real-time sales, and expand globally with enterprise-grade tools designed for growth.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/register" 
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-blue-500/30"
            >
              Start Selling Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#" 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-full font-bold text-lg hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              View Demo Store
            </Link>
          </motion.div>

        </motion.div>

        {/* Dashboard Mockup Preview (Optional: যদি কোনো ইমেজ থাকে এখানে দিতে পারেন) */}
        {/* <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-20 max-w-6xl mx-auto rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden glass">
           <img src="/dashboard-preview.png" alt="App Screenshot" className="w-full" />
        </motion.div> */}
      </section>


      {/* --- TRUSTED BY SECTION --- */}
      <section className="py-12 border-y border-slate-100/50 bg-white/50 backdrop-blur-sm">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by over 10,000+ sellers globally</p>
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
          {/* ডামি লোগো - এগুলো আপনার ক্লায়েন্টদের লোগো দিয়ে রিপ্লেস করবেন */}
          <h3 className="text-2xl font-bold text-slate-400 hover:text-blue-600">Shopify</h3>
          <h3 className="text-2xl font-bold text-slate-400 hover:text-purple-600">WooCommerce</h3>
          <h3 className="text-2xl font-bold text-slate-400 hover:text-pink-600">BigCommerce</h3>
          <h3 className="text-2xl font-bold text-slate-400 hover:text-teal-600">Magneto</h3>
        </div>
      </section>


      {/* --- FEATURES SECTION (Colorful Cards) --- */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
              Everything you need to <span className="text-blue-600">dominate</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Powerful features built with modern technology to help you manage your store efficiently and increase sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 - Blue Theme */}
            <FeatureCard 
              icon={BarChart3}
              title="Real-time Analytics"
              desc="Track sales, visits, and revenue in real-time with our beautiful, easy-to-read dashboard charts."
              colorTheme="blue"
            />
            {/* Feature 2 - Purple Theme */}
            <FeatureCard 
              icon={Globe}
              title="Sell Globally"
              desc="Accept payments from anywhere in the world with automated currency conversion and localized checkout."
              colorTheme="purple"
            />
            {/* Feature 3 - Pink/Rose Theme */}
            <FeatureCard 
              icon={ShieldCheck}
              title="Enterprise Security"
              desc="Sleep easy knowing your data and transactions are protected by bank-level security standards."
              colorTheme="pink"
            />
          </div>
        </div>
      </section>


      {/* --- FINAL CTA SECTION (Colorful Gradient Background) --- */}
      <section className="py-24 px-6 relative z-10">
        {/* Colorful Gradient Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-900/40"
        >
           {/* Decorative patterns inside CTA */}
           <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
           <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
           
           <div className="relative z-10">
             <div className="inline-block bg-white/20 p-4 rounded-2xl mb-8 backdrop-blur-sm">
                <Store className="w-10 h-10 text-white" />
             </div>
             <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
               Ready to launch your <br /> dream business?
             </h2>
             <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto font-medium">
               Join thousands of successful entrepreneurs who are building the future of e-commerce with SellerHub.
             </p>
             <Link 
              href="/register" 
              className="inline-block px-10 py-5 bg-white text-blue-700 rounded-full font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all shadow-xl"
            >
              Create Your Free Account
            </Link>
           </div>
        </motion.div>
      </section>

      {/* Footer তো layout.tsx থেকে আসবেই */}
    </div>
  );
}


// --- Helper Component for Feature Cards ---
// এই অংশটি কার্ডগুলোকে কালারফুল বানাবে
interface FeatureProps { icon: any, title: string, desc: string, colorTheme: 'blue' | 'purple' | 'pink' }

function FeatureCard({ icon: Icon, title, desc, colorTheme }: FeatureProps) {
    
  // কালার থিম অনুযায়ী স্টাইল সেট করা
  const themeStyles = {
    blue: { iconBg: 'bg-blue-100', iconText: 'text-blue-600', hoverBorder: 'hover:border-blue-300', hoverShadow: 'hover:shadow-blue-200/50' },
    purple: { iconBg: 'bg-purple-100', iconText: 'text-purple-600', hoverBorder: 'hover:border-purple-300', hoverShadow: 'hover:shadow-purple-200/50' },
    pink: { iconBg: 'bg-pink-100', iconText: 'text-pink-600', hoverBorder: 'hover:border-pink-300', hoverShadow: 'hover:shadow-pink-200/50' },
  };

  const style = themeStyles[colorTheme];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className={`p-10 rounded-[2rem] bg-white border-2 border-slate-100 shadow-sm transition-all duration-300 group ${style.hoverBorder} ${style.hoverShadow} hover:shadow-2xl`}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${style.iconBg} ${style.iconText} group-hover:scale-110 transition-transform`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-lg">{desc}</p>
    </motion.div>
  );
}