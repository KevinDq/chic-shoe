import { Suspense } from "react";
import CatalogueClient from "./CatalogueClient";

export const metadata = {
  title: "Catalogue chaussures femme | Chicshoe",
  description:
    "Parcourez notre catalogue de chaussures pour femme : baskets, sandales, talons et plus encore.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CatalogueClient />
    </Suspense>
  );
}

