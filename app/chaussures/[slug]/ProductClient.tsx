"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import Image from "next/image";

type Props = {
  product: Product;
};

export default function ProductClient({ product }: Props) {
  const { addItem } = useCart();
  const [size, setSize] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-6">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={product.images[0]} // Assure-toi que product.image contient l'URL
            alt={product.name}
            fill
            className="object-cover"
            priority // Optionnel : pour charger l'image du produit plus vite
          />
        </div>
      </div>

      <div className="col-span-12 md:col-span-6">
        <h1 className="text-3xl font-playfair mb-2 uppercase tracking-wider">
          {product.name}
        </h1>

        <p className="text-xl mb-4">€ {product.price}</p>

        <p className="text-sm text-gray-500 mb-4">
          ⭐ {product.rating} ({product.reviews} avis)
        </p>

        <div className="mb-6">
          <p className="mb-2 font-medium">Sélectionnez votre pointure</p>
          <div className="flex gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`border px-4 py-2
                  ${size === s
                    ? "border-[#B8860B]"
                    : "hover:border-[#B8860B]"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {!size && (
         <p className="text-sm text-red-500 mt-2">
            Veuillez sélectionner une pointure
         </p>
        )}


        <button
          disabled={!size }          
          onClick={() => size && addItem(product.id, size)}
          className="hover:bg-[#B8860B] transition duration-300 border hover:text-white px-6 py-3 disabled:opacity-50 cursor-pointer"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
