import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-6 text-gray-600">
        Cette page n’existe pas.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
