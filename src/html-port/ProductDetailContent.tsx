"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/html-port/CartProvider";
import { ProductCard } from "@/html-port/ProductsAdvanced";
import { SiteHeader } from "@/html-port/SiteHeader";
import {
  getProductDetail,
  getRelatedProducts,
  type ShopProduct,
} from "@/html-port/shop-catalog";

type Tab = "overview" | "usage" | "ingredients" | "warnings";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;
  return (
    <span className="mx-pdp__stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <i key={i} className="fa-solid fa-star" />;
        if (i === full && half) return <i key={i} className="fa-solid fa-star-half-stroke" />;
        return <i key={i} className="fa-regular fa-star" />;
      })}
    </span>
  );
}

export function ProductDetailContent({ productId }: { productId: string }) {
  const router = useRouter();
  const product = getProductDetail(productId);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("overview");
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "";
  }, [productId]);

  const related = useMemo(
    () => (product ? getRelatedProducts(product, 4) : []),
    [product]
  );

  const gallery = useMemo(() => {
    if (!product) return [];
    // Primary + subtle alternate crops via same asset + category lifestyle placeholders
    return [product.image, product.image, product.image];
  }, [product]);

  if (!product) {
    return (
      <div className="home_banner_outer float-left w-100 main-box position-relative">
        <SiteHeader />
        <div className="padding-rl float-left w-100">
          <section className="float-left w-100 padding-top padding-bottom">
            <div className="main-container">
              <div className="mx-cart__empty">
                <span className="mx-cart__empty-icon" aria-hidden="true">
                  <i className="fa-solid fa-box-open" />
                </span>
                <h2>Product not found</h2>
                <p>This item may have moved. Browse the full pharmacy catalog.</p>
                <Link href="/shop" className="mx-cart__primary">
                  Back to shop
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const savePct =
    product.was && product.was > product.price
      ? Math.round(((product.was - product.price) / product.was) * 100)
      : 0;

  const onAdd = () => {
    if (!product.inStock) return;
    addItem(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const onBuyNow = () => {
    if (!product.inStock) return;
    addItem(product.id, qty);
    router.push("/checkout");
  };

  return (
    <div className="home_banner_outer float-left w-100 main-box position-relative">
      <SiteHeader />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-pdp">
          <div className="main-container">
            <nav className="mx-pdp__crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/shop">Shop</Link>
              <span>/</span>
              <Link href={`/shop?category=${product.categoryId}`}>{product.category}</Link>
              <span>/</span>
              <span aria-current="page">{product.name}</span>
            </nav>

            <div className="mx-pdp__hero">
              <div className="mx-pdp__gallery">
                <div className="mx-pdp__thumbs" role="tablist" aria-label="Product images">
                  {gallery.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      role="tab"
                      aria-selected={activeImage === i}
                      className={`mx-pdp__thumb ${activeImage === i ? "is-active" : ""}`}
                      onClick={() => setActiveImage(i)}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>

                <div className="mx-pdp__stage">
                  {product.badge ? (
                    <span
                      className={`mx-product-card__badge mx-product-card__badge--${product.badgeTone} mx-pdp__badge`}
                    >
                      {product.badge}
                    </span>
                  ) : null}
                  {!product.inStock ? (
                    <span className="mx-pdp__oos">Out of stock</span>
                  ) : null}
                  <img
                    key={`${product.id}-${activeImage}`}
                    src={gallery[activeImage] || product.image}
                    alt={product.name}
                    className="mx-pdp__main-img"
                  />
                </div>
              </div>

              <div className="mx-pdp__info">
                <p className="mx-pdp__eyebrow">
                  <Link href={`/shop?category=${product.categoryId}`}>{product.category}</Link>
                  <span>·</span>
                  <em>SKU {product.sku}</em>
                </p>

                <h1>{product.name}</h1>
                <p className="mx-pdp__blurb">{product.shortBlurb}</p>

                <div className="mx-pdp__rating">
                  <Stars rating={product.rating} />
                  <strong>{product.rating.toFixed(1)}</strong>
                  <span>({product.reviews} reviews)</span>
                </div>

                <div className="mx-pdp__price-row">
                  <strong>${product.price.toFixed(2)}</strong>
                  {product.was ? <s>${product.was.toFixed(2)}</s> : null}
                  {savePct > 0 ? <span className="mx-pdp__save">Save {savePct}%</span> : null}
                </div>

                <ul className="mx-pdp__meta">
                  <li>
                    <i className="fa-solid fa-flask" /> {product.form}
                  </li>
                  <li>
                    <i className="fa-solid fa-box" /> {product.size}
                  </li>
                  <li>
                    <i className={`fa-solid ${product.inStock ? "fa-circle-check" : "fa-circle-xmark"}`} />{" "}
                    {product.inStock ? "In stock · ships today" : "Currently unavailable"}
                  </li>
                </ul>

                <ul className="mx-pdp__highlights">
                  {(product.highlights ?? []).map((h) => (
                    <li key={h}>
                      <i className="fa-solid fa-check" /> {h}
                    </li>
                  ))}
                </ul>

                <div className="mx-pdp__buy">
                  <div className="mx-pdp__qty" aria-label="Quantity">
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      <i className="fa-solid fa-minus" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={qty}
                      onChange={(e) =>
                        setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))
                      }
                    />
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                    >
                      <i className="fa-solid fa-plus" />
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`mx-pdp__add ${added ? "is-added" : ""}`}
                    onClick={onAdd}
                    disabled={!product.inStock}
                  >
                    {added ? (
                      <>
                        <i className="fa-solid fa-check" /> Added to cart
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-bag-shopping" /> Add to cart
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="mx-pdp__buy-now"
                    onClick={onBuyNow}
                    disabled={!product.inStock}
                  >
                    Buy now
                  </button>
                </div>

                <div className="mx-pdp__trust">
                  <span>
                    <i className="fa-solid fa-truck-fast" /> Free ship $50+
                  </span>
                  <span>
                    <i className="fa-solid fa-shield-halved" /> Secure checkout
                  </span>
                  <span>
                    <i className="fa-solid fa-user-doctor" /> Pharmacist support
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-pdp__tabs-wrap">
              <div className="mx-pdp__tabs" role="tablist">
                {(
                  [
                    ["overview", "Overview"],
                    ["usage", "How to use"],
                    ["ingredients", "Ingredients"],
                    ["warnings", "Warnings"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    className={tab === id ? "is-active" : ""}
                    onClick={() => setTab(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mx-pdp__tab-panel" role="tabpanel">
                {tab === "overview" ? (
                  <>
                    <h2>About {product.name}</h2>
                    <p>{product.description}</p>
                  </>
                ) : null}
                {tab === "usage" ? (
                  <>
                    <h2>How to use</h2>
                    <ol>
                      {(product.howToUse ?? []).map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </>
                ) : null}
                {tab === "ingredients" ? (
                  <>
                    <h2>Ingredients</h2>
                    <p>{product.ingredients}</p>
                  </>
                ) : null}
                {tab === "warnings" ? (
                  <>
                    <h2>Safety & warnings</h2>
                    <p>{product.warnings}</p>
                  </>
                ) : null}
              </div>
            </div>

            {related.length > 0 ? (
              <div className="mx-pdp__related">
                <div className="heading-title-con text-center">
                  <span className="special-text d-inline-block">You may also like</span>
                  <h2 className="mb-0">Related products</h2>
                </div>
                <div className="mx-products__grid mx-pdp__related-grid">
                  {related.map((item, i) => (
                    <ProductCard key={item.id} product={item as ShopProduct} index={i} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <div className="mx-pdp__mobile-bar">
        <div>
          <strong>${product.price.toFixed(2)}</strong>
          <span>{product.inStock ? "In stock" : "Unavailable"}</span>
        </div>
        <button type="button" onClick={onAdd} disabled={!product.inStock}>
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
