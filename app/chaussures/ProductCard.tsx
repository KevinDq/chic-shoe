"use client"; // si tu utilises des hooks dedans, sinon tu peux l'enlever

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

type Props = {
  prod: Product;
  showDiscount?: boolean;
};

export default function ProductCard({ prod, showDiscount }: Props) {
  return (
    <Link href={`/chaussures/${prod.slug}`} className="block border p-4 hover:shadow-lg overflow-hidden">      

      <div className="relative w-full h-48 ">
        {/* Badge -10% */}
        <div className="absolute top-0 left-0 ">
        {showDiscount && (
          <span className="absolute -top-2 -left-11 w-24 bg-red-500 text-white text-center px-2 py-1 text-xs rounded z-1 -rotate-45">
            -10 %
          </span>
        )}
      </div>
        <Image
          src={prod.images[0]} // première image
          alt={prod.name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="mt-2 text-lg font-semibold">{prod.name}</h3>
      <p className="text-gray-600">{prod.price} €</p>
    </Link>
  );
}

