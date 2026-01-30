import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductClient from "./ProductClient";
import ProductCard from "../ProductCard";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find(
    (p) => p.slug === slug
  );

  if (!product) {
    notFound();
  }

  // 🔁 Produits similaires
  const similarProducts = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Fiche produit */}
      <ProductClient product={product} />

      {/* Produits similaires */}
      {similarProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-playfair mb-6">
            Produits similaires
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} prod={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

