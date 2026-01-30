"use client";

import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

type HeroProps = {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
};

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  image = "/images/hero.jpg",
}: HeroProps) {
  return (
    <section
      className="relative h-[70vh] flex items-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative container mx-auto px-6 max-w-2xl text-white text-center">
        <span className="inline-block mb-4 bg-[#B8860B] text-white text-sm px-3 py-1 rounded">
          Nouvelle saison
        </span>

        <h1 className="text-4xl md:text-6xl font-playfair mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-2xl mb-8 opacity-90">
            {subtitle}
          </p>
        )}

        <Link
          href={ctaLink}
          className="inline-block bg-[#B8860B] px-8 py-4 rounded-md text-lg font-semibold hover:opacity-90 transition"
        >
          {ctaText}
        </Link>
      </div>
      {/* Scroll indicator */}
        <a
          href="#discover"
          aria-label="Voir les catégories"
          className="absolute left-[50%] -translate-x-[50%] bg-white border rounded-full -bottom-8 animate-bounce hover:opacity-80 transition p-2"
        >          
          <FaChevronDown size={30}/>
        </a>
    </section>
  );
}
