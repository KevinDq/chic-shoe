"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email newsletter :", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-8">
        {/* Liens */}
        <div className="flex items-center lg:items-start flex-col gap-2">
          <h3 className="font-semibold mb-2">Liens</h3>
          <Link href="/chaussures" className="hover:underline">Catalogue</Link>
          <Link href="/a-propos" className="hover:underline">À propos</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/panier" className="hover:underline">Panier</Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Newsletter</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Votre email"
              className="border border-gray-400 p-2 flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#B8860B] text-white px-4 py-2 hover:opacity-90 cursor-pointer"
            >
              {submitted ? "Merci !" : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="text-center text-sm text-gray-500 border-t py-4">
        &copy; {new Date().getFullYear()} Atelier Chaussures. Tous droits réservés.
      </div>
    </footer>
  );
}


