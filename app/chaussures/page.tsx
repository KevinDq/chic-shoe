"use client";

import Filters from "./Filters";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FiChevronsLeft } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";

const PRODUCTS_PER_PAGE = 6;

export default function CataloguePage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.toLowerCase() || "";
  const color = searchParams.get("color");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category");
  const allColors = Array.from(new Set(products.flatMap(p => p.color)));

  /* 1️⃣ FILTRER */
  let filtered = products;

  if (query) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.color.some(c => c.includes(query))
    );
  }

  if (color) {
    filtered = filtered.filter(p => p.color.includes(color));
  }
  if (category) filtered = filtered.filter(p => p.category === category); 

  /* 2️⃣ TRIER */
  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }
  if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  /* 3️⃣ PAGINER */
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const paginated = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  /* helper pour garder les params */
  const makeUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    return `/chaussures?${params.toString()}`;
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-end">
        <Filters colors={allColors} categories={["sandales","baskets","talons"]} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map(p => (
          <ProductCard key={p.slug} prod={p} />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">

          {/* ⏮️ Première page */}
          {page > 1 && (
            <Link href={makeUrl(1)} aria-label="Première page">              
                <FiChevronsLeft
                size={25}
                className="hover:text-[#B8860B] transition-colors"
              />       
            </Link>
          )}

          {/* ◀️ Page précédente */}
          {page > 1 && (
            <Link href={makeUrl(page - 1)} aria-label="Page précédente">
              <FaChevronLeft
                size={25}
                className="hover:text-[#B8860B] transition-colors"
              />
            </Link>
          )}

          {/* Page courante */}
          <span className="rounded-full border px-4 py-2 bg-[#B8860B] text-white">
            {page}
          </span>

          {/* ▶️ Page suivante */}
          {page < totalPages && (
            <Link href={makeUrl(page + 1)} aria-label="Page suivante">
              <FaChevronRight
                size={25}
                className="hover:text-[#B8860B] transition-colors"
              />
            </Link>
          )}

          {/* ⏭️ Dernière page */}
          {page < totalPages && (
            <Link href={makeUrl(totalPages)} aria-label="Dernière page">
              <FiChevronsRight
                size={25}
                className="hover:text-[#B8860B] transition-colors"
              />   
            </Link>
          )}

        </div>
      )}

    </div>
  );
}
