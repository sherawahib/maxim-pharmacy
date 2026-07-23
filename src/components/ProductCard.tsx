import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group bg-white border border-line overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_rgba(12,35,64,0.35)]">
      <div className="relative aspect-square bg-bg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        {product.badge ? (
          <span
            className="absolute left-3 top-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
            style={{ background: "#c8102e" }}
          >
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs uppercase tracking-[0.14em] text-navy-soft">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-xl text-navy">{product.name}</h3>
        <p className="mt-2 text-sm text-navy-soft">{product.rating}/5 ★</p>
        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-line">
          <p className="font-semibold text-navy text-lg">
            ${product.price.toFixed(2)}
          </p>
          <Link href="/shop" className="btn btn-primary !min-h-10 !px-3 !text-xs">
            Add to cart
          </Link>
        </div>
      </div>
    </article>
  );
}
