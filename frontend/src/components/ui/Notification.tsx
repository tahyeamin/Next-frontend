"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Bell } from "lucide-react";

export default function Notification() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // 'orders' চ্যানেল সাবস্ক্রাইব করা
    const channel = pusherClient.subscribe("orders");

    // নতুন ইভেন্ট আসলে এলার্ট দেখাবে
    channel.bind("new-order", (data: any) => {
      setMessage(`New Order Received: ${data.message}`);
      // ৩ সেকেন্ড পর মেসেজ গায়েব হয়ে যাবে
      setTimeout(() => setMessage(null), 5000);
    });

    return () => {
      pusherClient.unsubscribe("orders");
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce z-50">
      <Bell className="text-yellow-400" />
      <div>
        <h4 className="font-bold text-sm">Notification</h4>
        <p className="text-xs">{message}</p>
      </div>
    </div>
  );
}