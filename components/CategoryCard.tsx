import Link from "next/link";
import Image from "next/image";

type CategoryCardProps = {
  name: string;
  image: string;
  link: string;
};

export default function CategoryCard({ name, image, link }: CategoryCardProps) {
  return (
    <Link
  href={link}
  className="group relative block overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow"
>
  <div className="relative w-full h-48 md:h-60">
    <Image
      src={image}
      alt={name}
      fill
      className="object-cover group-hover:scale-105 transition-transform"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40" />
  </div>

  {/* Texte */}
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-white text-3xl font-semibold drop-shadow-lg">
      {name}
    </span>
  </div>
</Link>

  );
}
