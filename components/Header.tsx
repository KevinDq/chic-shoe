"use client";

import { useCart } from "@/context/CartContext";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaShoppingCart, FaUser, FaSearch} from "react-icons/fa";


export default function Header() {
  const { totalQty } = useCart();  
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) params.set("q", value);
      else params.delete("q");

      params.set("page", "1");
      router.push(`/chaussures?${params.toString()}`);
    }, 300);
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo"  
            width={120}   
            height={40}                   
          />
        </Link>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="    Rechercher une paire..."
            className="w-80 border border-gray-300 px-4 py-2"            
            onChange={(e) => handleSearch(e.target.value)}
            
          />
        </div>       

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link href="/panier" className="relative hover:text-[#B8860B] transition-colors">
            <FaShoppingCart className="text-xl"/>
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#B8860B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>

          {/* Compte */}
          <button className="flex items-center gap-1 opacity-50 cursor-not-allowed">
            <FaUser />            
          </button>
        </div>
      </div>
    </header>
  );
}
