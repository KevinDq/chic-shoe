import { Suspense } from "react";
import CatalogueClient from "./CatalogueClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CatalogueClient />
    </Suspense>
  );
}
