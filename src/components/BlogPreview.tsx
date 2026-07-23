import Image from "next/image";
import Link from "next/link";
import { posts } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export function BlogPreview() {
  return (
    <section className="section bg-white">
      <div className="wrap">
        <SectionHeading
          eyebrow="News & Articles"
          title="Our Latest Blog Posts"
          text="Practical wellness reads — immunity, skincare, and smarter supplement choices."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="group bg-bg border border-line overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_rgba(12,35,64,0.3)]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-crimson">
                  {post.tag} · {post.date}
                </p>
                <h3 className="font-display text-xl text-navy mt-2 group-hover:text-crimson transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-navy-soft leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex text-sm font-semibold text-navy">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
