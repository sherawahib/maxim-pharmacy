"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, shopCategories } from "@/lib/content";

type SortKey = "default" | "price-asc" | "price-desc" | "rating";

export function ShopCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("default");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      const key = activeCategory.toLowerCase();
      list = list.filter(
        (p) =>
          p.category.toLowerCase().includes(key.split(" ")[0]) ||
          key.includes(p.category.toLowerCase())
      );
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, sort, query]);

  return (
    <section className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6">
          <div className="border border-line bg-white p-5">
            <label
              htmlFor="shop-search"
              className="text-xs uppercase tracking-[0.18em] text-navy-soft"
            >
              Search
            </label>
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a product…"
              className="mt-3 w-full min-h-11 border border-line bg-bg px-3 text-sm text-navy focus:outline-none focus:border-blue"
            />
          </div>

          <div className="border border-line bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-navy-soft mb-4">
              Categories
            </p>
            <ul className="space-y-1">
              {["All", ...shopCategories].map((cat) => {
                const active = activeCategory === cat;
                return (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left py-2.5 px-3 text-sm transition-colors cursor-pointer border-l-2 ${
                        active
                          ? "border-crimson text-crimson bg-bg font-semibold"
                          : "border-transparent text-navy hover:text-crimson hover:bg-bg"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border border-line bg-white p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-navy-soft mb-3">
              Need a prescription?
            </p>
            <p className="text-sm text-navy-soft mb-4">
              Transfer your Rx in minutes with our secure online form.
            </p>
            <Link href="/transfer" className="btn btn-dark w-full">
              Transfer Rx
            </Link>
          </div>
        </aside>

        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-sm text-navy-soft">
              Showing{" "}
              <span className="font-semibold text-navy">{filtered.length}</span> of{" "}
              {products.length} results
            </p>
            <label className="text-sm text-navy-soft flex items-center gap-2">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="min-h-11 border border-line bg-white px-3 text-navy cursor-pointer focus:outline-none focus:border-blue"
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="border border-dashed border-line p-12 text-center bg-white">
              <p className="font-display text-3xl text-navy">No products found</p>
              <p className="mt-2 text-navy-soft">Try another search or category.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                className="btn btn-primary mt-6"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
