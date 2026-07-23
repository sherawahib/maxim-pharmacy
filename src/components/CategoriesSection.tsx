import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export function CategoriesSection() {
  return (
    <section className="section bg-white">
      <div className="wrap">
        <SectionHeading
          eyebrow="Top Choices"
          title="Our Popular Categories"
          text="Shop curated pharmacy categories for everyday wellness and seasonal care."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative overflow-hidden bg-bg min-h-[280px]"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,35,64,0.92)_0%,rgba(12,35,64,0.25)_55%,rgba(12,35,64,0.1)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">
                  {cat.count}
                </p>
                <h3 className="font-display text-2xl mt-1">{cat.title}</h3>
                <p className="mt-2 text-sm text-white/70 opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {cat.blurb}
                </p>
                <span className="mt-3 inline-flex text-sm font-semibold text-white/90">
                  Shop now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
