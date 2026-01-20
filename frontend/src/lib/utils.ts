import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// এই ফাংশনটি CSS ক্লাসগুলোর কনফ্লিক্ট সলভ করে
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}