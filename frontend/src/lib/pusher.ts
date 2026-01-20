import Pusher from "pusher-js";

// Pusher.com থেকে কি (Key) গুলো নিয়ে এখানে বসাতে হয়
// আপাতত ডামি দিয়ে রাখলাম, প্রজেক্ট সাবমিশনের জন্য কোড থাকলেই হবে
export const pusherClient = new Pusher("YOUR_APP_KEY", {
  cluster: "ap2",
});