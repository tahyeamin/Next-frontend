import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// কম্পোনেন্ট ইম্পোর্ট
import Header from "@/components/Header"; // আমাদের তৈরি করা সুইচ হেডার
import Footer from "@/components/Footer"; // উপরের ফুটার

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seller Center | Manage Your Business",
  description: "The ultimate platform for e-commerce sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* min-h-screen: পুরো স্ক্রিন দখল করবে
         flex-col: উপর থেকে নিচে সাজাবে
         bg-slate-50: হালকা গ্রে ব্যাকগ্রাউন্ড 
      */}
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        
        {/* 1. Header (Dynamic: Public or Dashboard) */}
        <Header />

        {/* 2. Main Content (The Pages) */}
        {/* flex-1: ফুটারকে ধাক্কা দিয়ে নিচে নামিয়ে রাখবে */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* 3. Footer (Always at bottom) */}
        <Footer />
        
      </body>
    </html>
  );
}