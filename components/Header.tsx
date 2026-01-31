"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Suspense } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const { totalQty } = useCart();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={120} height={40} />
        </Link>

        {/* 🔥 LA CLÉ */}
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>

        <div className="flex items-center gap-6">
          <Link href="/panier" className="relative hover:text-[#B8860B]">
            <FaShoppingCart className="text-xl" />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#B8860B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>

          <button className="flex items-center gap-1 opacity-50 cursor-not-allowed">
            <FaUser />
          </button>
        </div>
      </div>
    </header>
  );
}
