"use client";

import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "./chaussures/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

function getRandomProducts(arr: typeof products, n: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function HomePage() {  

  const randomProducts = getRandomProducts(products, 4);

  return (
    <main className="space-y-16">
      {/* Hero */}
      <Hero
        title="Nouvelle Collection Automne"
        subtitle="Élégance, confort et caractère"
        ctaText="Découvrir la collection"
        ctaLink="/chaussures"
        image="/images/hero-automne.jpg"
      />    

      {/* Categories */}
      <section id="discover" className="container mx-auto px-2 lg:px-4 scroll-mt-6 lg:scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-playfair mb-8 text-center">
          Nos catégories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </div>
      </section>

      {/* Grille produits */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Nos produits phares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomProducts.map(p => (
            <ProductCard key={p.slug} prod={p} showDiscount={true}/>
          ))}
        </div>
      </section>
    </main>
  );
}
