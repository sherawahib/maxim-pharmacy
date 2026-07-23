"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CtaAdvanced } from "@/html-port/CtaAdvanced";
import { ProductCard } from "@/html-port/ProductsAdvanced";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";
import {
  SHOP_CATEGORIES,
  countByCategory,
  filterShopProducts,
  resolveCategoryId,
  shopProducts,
  type PriceBand,
  type SortKey,
} from "@/html-port/shop-catalog";

const PRICE_OPTIONS: { id: PriceBand; label: string }[] = [
  { id: "any", label: "Any price" },
  { id: "under25", label: "Under $25" },
  { id: "25to50", label: "$25 – $50" },
  { id: "over50", label: "Over $50" },
];

const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
  { id: "name", label: "Name A–Z" },
];

export function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCategory = resolveCategoryId(searchParams.get("category"));

  const [categoryId, setCategoryId] = useState(urlCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [priceBand, setPriceBand] = useState<PriceBand>("any");
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setCategoryId(urlCategory);
  }, [urlCategory]);

  const setCategory = (id: string) => {
    setCategoryId(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("category");
    else params.set("category", id);
    const qs = params.toString();
    router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  };

  const filtered = useMemo(
    () =>
      filterShopProducts({
        categoryId,
        query,
        sort,
        priceBand,
        onSaleOnly,
        inStockOnly,
      }),
    [categoryId, query, sort, priceBand, onSaleOnly, inStockOnly]
  );

  const activeCategory = SHOP_CATEGORIES.find((c) => c.id === categoryId);
  const hasExtraFilters =
    Boolean(query.trim()) ||
    priceBand !== "any" ||
    onSaleOnly ||
    inStockOnly ||
    sort !== "featured";

  const resetFilters = () => {
    setQuery("");
    setSort("featured");
    setPriceBand("any");
    setOnSaleOnly(false);
    setInStockOnly(false);
    setCategory("all");
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <SubBannerAdvanced
        title="Shop"
        description="One-stop shop for prescription support and OTC medicines — fast, safe, and reliable."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
        image="/assets/images/promotion-banner1.jpg"
      />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-shop">
          <div className="main-container">
            <div className="mx-shop__layout">
              <aside
                className={`mx-shop__sidebar ${filtersOpen ? "is-open" : ""}`}
                aria-label="Shop filters"
              >
                <div className="mx-shop__sidebar-head">
                  <h3>Filters</h3>
                  <button
                    type="button"
                    className="mx-shop__sidebar-close"
                    onClick={() => setFiltersOpen(false)}
                    aria-label="Close filters"
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>

                <form className="mx-shop__search" onSubmit={onSearch}>
                  <label htmlFor="shop-search" className="mx-shop__label">
                    Search catalog
                  </label>
                  <div className="mx-shop__search-field">
                    <i className="fas fa-search" aria-hidden="true" />
                    <input
                      id="shop-search"
                      type="search"
                      placeholder="Medicine, vitamin, skincare…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </form>

                <div className="mx-shop__group">
                  <p className="mx-shop__label">Categories</p>
                  <ul className="mx-shop__cats">
                    {SHOP_CATEGORIES.map((cat) => {
                      const count = countByCategory(cat.id);
                      const active = categoryId === cat.id;
                      return (
                        <li key={cat.id}>
                          <button
                            type="button"
                            className={`mx-shop__cat ${active ? "is-active" : ""}`}
                            onClick={() => {
                              setCategory(cat.id);
                              setFiltersOpen(false);
                            }}
                            aria-pressed={active}
                          >
                            <span className="mx-shop__cat-main">
                              <i className={`fa-solid ${cat.icon}`} aria-hidden="true" />
                              <span>
                                <strong>{cat.label}</strong>
                                <em>{cat.blurb}</em>
                              </span>
                            </span>
                            <span className="mx-shop__cat-count">{count}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mx-shop__group">
                  <p className="mx-shop__label">Price range</p>
                  <div className="mx-shop__price" role="radiogroup" aria-label="Price range">
                    {PRICE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={priceBand === opt.id}
                        className={`mx-shop__price-btn ${priceBand === opt.id ? "is-active" : ""}`}
                        onClick={() => setPriceBand(opt.id)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mx-shop__group">
                  <p className="mx-shop__label">Availability</p>
                  <label className="mx-shop__check">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                    />
                    <span>In stock only</span>
                  </label>
                  <label className="mx-shop__check">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={(e) => setOnSaleOnly(e.target.checked)}
                    />
                    <span>On sale</span>
                  </label>
                </div>

                {(categoryId !== "all" || hasExtraFilters) && (
                  <button type="button" className="mx-shop__reset" onClick={resetFilters}>
                    <i className="fa-solid fa-rotate-left" /> Reset filters
                  </button>
                )}

                <div className="mx-shop__rx">
                  <p className="mx-shop__label">Need a prescription?</p>
                  <p>Transfer your Rx securely online in a few minutes.</p>
                  <Link href="/transfer" className="mx-shop__rx-btn">
                    Transfer Rx
                  </Link>
                </div>
              </aside>

              {filtersOpen ? (
                <button
                  type="button"
                  className="mx-shop__backdrop"
                  aria-label="Close filters"
                  onClick={() => setFiltersOpen(false)}
                />
              ) : null}

              <div className="mx-shop__main">
                <div className="mx-shop__toolbar">
                  <div className="mx-shop__toolbar-left">
                    <button
                      type="button"
                      className="mx-shop__filter-toggle"
                      onClick={() => setFiltersOpen(true)}
                    >
                      <i className="fa-solid fa-sliders" /> Filters
                    </button>
                    <div>
                      <p className="mx-shop__results">
                        Showing <strong>{filtered.length}</strong> of {shopProducts.length}{" "}
                        products
                      </p>
                      <p className="mx-shop__active-cat">
                        {activeCategory?.label ?? "All Products"}
                        {query.trim() ? ` · “${query.trim()}”` : ""}
                      </p>
                    </div>
                  </div>

                  <label className="mx-shop__sort">
                    <span>Sort by</span>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortKey)}
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {filtered.length === 0 ? (
                  <div className="mx-shop__empty">
                    <i className="fa-solid fa-box-open" aria-hidden="true" />
                    <h3>No products found</h3>
                    <p>Try another category, price range, or search term.</p>
                    <button type="button" className="mx-shop__reset" onClick={resetFilters}>
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="mx-shop__grid mx-products__grid">
                    {filtered.map((product, i) => (
                      <ProductCard key={product.id} product={product} index={i} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <CtaAdvanced />
    </>
  );
}
