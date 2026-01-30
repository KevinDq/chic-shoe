"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import Image from "next/image";

export default function CheckoutPage() {
  const { items } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const totalPrice = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? sum + product.price * item.qty : sum;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ici tu pourrais envoyer la commande à ton backend
    console.log("Commande passée", { name, email, address, items });
    alert("Commande envoyée !");
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl mb-6 text-center">Votre commande</h1>
      <div className="flex justify-center gap-12">        
        <div className="grow relative">    
          <table className="w-full text-center border-collapse">   
            <thead>
              <tr className="border-b border-gray-400">
                <th className="w-12"></th>
                <th scope="col">Modèle</th>
                <th scope="col">Pointure</th>
                <th scope="col">Quantité</th>
                <th scope="col">Prix</th>
              </tr>
            </thead>
            {items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            
            if (!product) return null;
            return (                            
              <tbody key={`${item.productId}-${item.size}`}>
                <tr>
                  <th scope="row" className="w-16">
                    <div className="h-12 w-12 mx-auto overflow-hidden flex items-center justify-center">
                      <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="object-contain"/>
                    </div></th>
                  <td>{product.name}</td>
                  <td>{item.size}</td>
                  <td>{item.qty}</td>
                  <td>{product.price * item.qty} €</td>
                </tr>
              </tbody>        
            );
          })}
          </table>
          <div className="absolute border-t border-gray-400 w-full bottom-0 right-0 text-right font-semibold text-lg">Total : {totalPrice} €</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">

          <h2 className="text-xl font-semibold text-center">
            Informations de livraison
          </h2>

          {/* Nom */}
          <div>
            <label className="block mb-1 font-medium">
              Nom complet
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jean Dupont"
              className="w-full border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jean@email.com"
              className="w-full border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block mb-1 font-medium">
              Téléphone
            </label>
            <input
              type="tel"
              required
              placeholder="06 12 34 56 78"
              className="w-full border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
            />
          </div>

          {/* Adresse */}
          <div>
            <label className="block mb-1 font-medium">
              Adresse
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="12 rue de la Paix"
              className="w-full border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
            />
          </div>

          {/* Code postal + Ville */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">
                Code postal
              </label>
              <input
                type="text"
                required
                placeholder="75001"
                className="w-full border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">
                Ville
              </label>
              <input
                type="text"
                required
                placeholder="Paris"
                className="w-full border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              />
            </div>
          </div>     

        </form>

      </div>
      <div className="flex justify-center mt-4">
          <button
          type="submit"
          className="bg-[#B8860B] text-white px-6 py-3 hover:opacity-90"
        >
          Valider votre commande
        </button> 
      </div>
               
    </div>
  );
}

