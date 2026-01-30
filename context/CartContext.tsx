"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types/cart";

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, size: number) => void;
  removeItem: (productId: string, size: number) => void;
  updateQty: (productId: string, size: number, qty: number) => void;
  totalQty: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
});  

  // 💾 Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (productId: string, size: number) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === productId && i.size === size
      );

      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { productId, size, qty: 1 }];
    });
  };

  function updateQty(productId: string, size: number, newQty: number) {
  setItems((prev) =>
    prev.map((i) =>
      i.productId === productId && i.size === size ? { ...i, qty: newQty } : i
    )
  );
}


  const removeItem = (productId: string, size: number) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  };

  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, totalQty, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
