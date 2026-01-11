// src/types/index.ts

export interface Seller {
  id: string;
  fullName: string;
  email: string;
  shopName?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Decimal in backend, number in frontend
  stock: number;
  imageUrl?: string;
  sellerId: string;
}

export interface Wallet {
  id: string;
  balance: number;
}