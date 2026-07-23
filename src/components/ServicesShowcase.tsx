import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export function ServicesShowcase() {
  return (
    <section className="section bg-bg">
      <div className="wrap">
        <SectionHeading
          eyebrow="What we offer"
          title="Our Services"
          text="Professional pharmacy services designed for precision, convenience, and peace of mind."
          align="center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, idx) => (
            <article
              key={s.title}
              className="group bg-white border border-line overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-28px_rgba(12,35,64,0.4)]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:1024px) 50vw, 25vw"
                />
                <span
                  className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center text-xs font-bold text-white"
                  style={{ background: "#c8102e" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-navy-soft leading-relaxed">{s.blurb}</p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex text-sm font-semibold text-crimson hover:text-crimson-dark"
                >
                  Learn more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
