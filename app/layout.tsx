// import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChicShoe, Elegant Footwear",
  description: "Boutique de chaussures pour femme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[#FAFAFA] text-[#111827]">
        <CartProvider>
        {/* Header */}
        <Header />


        {/* Contenu des pages */}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
