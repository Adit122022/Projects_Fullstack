import { create } from 'zustand';

interface CartState {
  quantity: number;
  unitPrice: number;
  gstRate: number;
  setQuantity: (qty: number) => void;
  getTotals: () => {
    baseAmount: number;
    gstAmount: number;
    totalAmount: number;
  };
}

export const useCartStore = create<CartState>((set, get) => ({
  quantity: 5, // Default B2B quantity starts at 5
  unitPrice: 12000, // ₹12,000 INR
  gstRate: 0.18, // 18% GST
  setQuantity: (qty: number) => set({ quantity: Math.max(1, qty) }),
  getTotals: () => {
    const { quantity, unitPrice, gstRate } = get();
    const baseAmount = quantity * unitPrice;
    const gstAmount = baseAmount * gstRate;
    const totalAmount = baseAmount + gstAmount;
    return { baseAmount, gstAmount, totalAmount };
  },
}));
