import Link from "next/link";
import { products } from "@/lib/content";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";

export function ProductsSection() {
  return (
    <section className="section bg-bg">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Most Demanding"
            title="Best Selling Products"
            text="Pharmacist-curated vitamins, relief, and daily wellness — ready to order."
          />
          <Link href="/shop" className="btn btn-dark shrink-0 self-start md:self-auto">
            View All Products
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
