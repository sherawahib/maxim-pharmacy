import Image from "next/image";
import Link from "next/link";
import { promotions } from "@/lib/content";

const promoImages = [
  "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1100&q=80",
];

export function PromotionsSection() {
  return (
    <section className="section bg-white pt-0">
      <div className="wrap grid gap-5 lg:grid-cols-3">
        {promotions.map((promo, i) => (
          <Link
            key={promo.title}
            href={promo.href}
            className="group relative overflow-hidden min-h-[240px] text-white"
          >
            <Image
              src={promoImages[i]}
              alt={promo.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,35,64,0.92)_0%,rgba(12,35,64,0.45)_55%,rgba(12,35,64,0.2)_100%)]" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
              <p
                className="inline-flex w-fit px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
                style={{ background: "#c8102e" }}
              >
                {promo.badge}
              </p>
              <h3 className="mt-3 font-display text-2xl md:text-3xl leading-tight">
                {promo.title}
              </h3>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                Browse All
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
