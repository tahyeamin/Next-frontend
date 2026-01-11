"use client";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Globe, BarChart3, Users } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <PublicNavbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -z-10 opacity-60 mix-blend-multiply filter animate-blob" />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-purple-100/50 rounded-full blur-3xl -z-10 opacity-60 mix-blend-multiply filter animate-blob animation-delay-2000" />

        <motion.div 
          className="max-w-7xl mx-auto px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New Seller Tools Available
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]"
          >
            Scale your business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              without limits.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform for modern sellers. Manage inventory, track real-time analytics, and receive payments globally with enterprise-grade security.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/20"
            >
              Start Selling Free
            </Link>
            <Link 
              href="#" 
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              View Demo
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Sellers", value: "10k+" },
            { label: "Products Sold", value: "2M+" },
            { label: "Countries Served", value: "25+" },
            { label: "Uptime Guarantee", value: "99.9%" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to grow</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Powerful features built to help you manage your store efficiently and increase sales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${feature.color} bg-opacity-10`}>
                  <feature.icon className={`w-6 h-6 ${feature.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
           {/* Background Decoration */}
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/30 via-transparent to-transparent" />
           
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to launch your business?</h2>
             <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join thousands of successful entrepreneurs who are building the future of e-commerce with SellerHub.</p>
             <Link 
              href="/register" 
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30"
            >
              Get Started Now
            </Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Features Data
const features = [
  {
    title: "Real-time Analytics",
    desc: "Track sales, visits, and revenue in real-time with our advanced dashboard.",
    icon: BarChart3,
    color: "bg-blue-500",
    textColor: "text-blue-600"
  },
  {
    title: "Global Payments",
    desc: "Accept payments from anywhere in the world with automated currency conversion.",
    icon: Globe,
    color: "bg-purple-500",
    textColor: "text-purple-600"
  },
  {
    title: "Secure & Reliable",
    desc: "Enterprise-grade security ensuring your data and transactions are always safe.",
    icon: ShieldCheck,
    color: "bg-emerald-500",
    textColor: "text-emerald-600"
  },
  {
    title: "Fast Setup",
    desc: "Launch your store in minutes with our intuitive drag-and-drop builder.",
    icon: Zap,
    color: "bg-amber-500",
    textColor: "text-amber-600"
  },
  {
    title: "Marketing Tools",
    desc: "Built-in SEO and marketing tools to help you reach more customers.",
    icon: TrendingUp,
    color: "bg-rose-500",
    textColor: "text-rose-600"
  },
  {
    title: "24/7 Support",
    desc: "Our dedicated support team is available round the clock to help you succeed.",
    icon: Users,
    color: "bg-cyan-500",
    textColor: "text-cyan-600"
  }
];