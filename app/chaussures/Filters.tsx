"use client";

import { useSearchParams, useRouter } from "next/navigation";

interface FiltersProps {
  colors: string[];
  categories: string[];
}

export default function Filters({ colors, categories }: FiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);

    // remise à la première page
    params.set("page", "1");

    router.push(`/chaussures?${params.toString()}`);
  };

  // fonction utilitaire pour capitaliser
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="flex gap-2 flex-wrap">
      {/* Filtre couleurs */}
      <select
        value={searchParams.get("color") || ""}
        onChange={(e) => handleFilterChange("color", e.target.value)}
        className="border px-2 py-1 rounded text-xs"
      >
        <option value="">Toutes les couleurs</option>
        {colors.map(c => (
          <option key={c} value={c}>{capitalize(c)}</option>
        ))}
      </select>

      {/* Filtre catégories */}
      <select
        value={searchParams.get("category") || ""}
        onChange={(e) => handleFilterChange("category", e.target.value)}
        className="border px-2 py-1 rounded text-xs"
      >
        <option value="">Toutes les catégories</option>
        {categories.map(c => (
          <option key={c} value={c}>{capitalize(c)}</option>
        ))}
      </select>

      {/* Tri */}
      <select
        value={searchParams.get("sort") || ""}
        onChange={(e) => handleFilterChange("sort", e.target.value)}
        className="border px-2 py-1 rounded text-xs"
      >
        <option value="">Tri par défaut</option>
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
      </select>
    </div>
  );
}
