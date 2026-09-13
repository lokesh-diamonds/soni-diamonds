import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-panel">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.diamond.carat} ${product.diamond.shape} diamond`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-4 top-4 bg-ink/80 px-3 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-gold">
            New
          </span>
        )}
        <span className="absolute right-4 top-4 bg-ink/80 px-3 py-1 text-[0.6rem] uppercase tracking-[0.24em] text-bone-dim">
          {product.diamond.carat.split(/[,(]/)[0].trim()}
        </span>
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 py-4 text-center text-[0.65rem] uppercase tracking-[0.28em] text-bone transition-transform duration-500 group-hover:translate-y-0">
          View Piece
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow">{product.collection}</p>
          <h3 className="mt-1 font-serif text-xl text-bone">{product.name}</h3>
        </div>
        <p className="font-serif text-lg text-gold-gradient whitespace-nowrap">
          {formatPrice(product.price)}
        </p>
      </div>
      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-bone-faint">
        {product.diamond.shape.split("(")[0].trim()} · {product.diamond.colour.split("(")[0].trim()} · {product.diamond.clarity} · {product.setting}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-bone-faint line-clamp-2">
        {product.shortDescription}
      </p>
    </Link>
  );
}
