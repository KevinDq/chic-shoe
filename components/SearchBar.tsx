"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) params.set("q", value);
      else params.delete("q");

      params.set("page", "1");
      router.push(`/chaussures?${params.toString()}`);
    }, 300);
  };

  return (
    <div className="relative order-3 md:order-none mt-2">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        placeholder="    Rechercher une paire..."
        className="w-86 border border-gray-300 px-4 py-2"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

