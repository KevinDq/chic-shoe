"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import Image from "next/image";
import { FaRegTrashAlt, FaShoppingCart } from "react-icons/fa";


export default function PanierPage() {
  const { items, removeItem, updateQty } = useCart();

  const totalPrice = items.reduce((sum, item) => {
            const product = products.find(p => p.id === item.productId);
            return product ? sum + product.price * item.qty : sum;
          }, 0);

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-playfair mb-4">Panier</h1>
        <p className="mb-6">Votre panier est vide.</p>
        <Link
          href="/chaussures"
          className="text-[#B8860B] underline"
        >
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div>       
      <h1 className="flex items-center gap-4 text-3xl font-playfair mb-6"><FaShoppingCart className="text-4xl text-[#B8860B]"/>Votre panier</h1>        
      <div className="space-y-6">
        {items.map((item) => {
          const product = products.find(
            (p) => p.id === item.productId
          );

          if (!product) return null;

          // juste après avoir trouvé `product` pour chaque item
          const itemTotal = product.price * item.qty;
          
          return (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex items-center justify-between border p-4 bg-white"
            >
              {/* Infos produit */}
              <div className="flex gap-2 items-center">
                <Image
                          src={product.images[0]} // première image
                          alt={product.name}
                          width={100}
                          height={60}
                          className="object-cover"
                        />
                <h2 className="font-semibold">{product.name}</h2>
                
                
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Taille : {item.size}
                </p>
              </div>

              {/* Ajustement quantités */}
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.productId, item.size, item.qty - 1)} disabled={item.qty <= 1}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.productId, item.size, item.qty + 1)}>+</button>
              </div>    
              <div>
                <p className="text-sm">
                  {product.price} € × {item.qty} = {itemTotal} €
                </p>
              </div>        

              {/* Actions */}
              <button
                onClick={() =>
                  removeItem(item.productId, item.size)
                }
                className="text-base text-gray-500 cursor-pointer hover:text-black"
              >
                <FaRegTrashAlt />
              </button>
            </div>
          );
        })}
      </div>   

      <div className="mt-6 text-right font-semibold text-lg">
        Total : {totalPrice} €
      </div>   

      {/* CTA */}
      <div className="mt-8 flex justify-end">
        <Link
          href="/checkout"
          className="hover:bg-[#B8860B] transition duration-300 border hover:text-white px-6 py-3 cursor-pointer"
        >
          Finaliser vos achats
        </Link>
      </div>
    </div>
  );
}
