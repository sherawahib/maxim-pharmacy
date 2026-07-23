"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { useCart } from "@/html-port/CartProvider";
import { productHref, shopProducts, type ShopProduct } from "@/html-port/shop-catalog";

export function ProductCard({
  product,
  index,
}: {
  product: ShopProduct;
  index: number;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const href = productHref(product.id);

  const onAdd = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const onWish = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((v) => !v);
  };

  const openProduct = () => {
    router.push(href);
  };

  return (
    <article
      className={`mx-product-card ${!product.inStock ? "is-oos" : ""}`}
      style={{ animationDelay: `${0.04 + index * 0.05}s` }}
      onClick={openProduct}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProduct();
        }
      }}
      role="link"
      tabIndex={0}
    >
      <div className="mx-product-card__media">
        {product.badge ? (
          <span
            className={`mx-product-card__badge mx-product-card__badge--${product.badgeTone}`}
          >
            {product.badge}
          </span>
        ) : null}

        {!product.inStock ? (
          <span className="mx-product-card__oos">Out of stock</span>
        ) : null}

        <button
          type="button"
          className={`mx-product-card__wish ${liked ? "is-active" : ""}`}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          onClick={onWish}
        >
          <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
        </button>

        <div className="mx-product-card__image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="mx-product-card__quick">
          <span className="mx-product-card__quick-btn">
            <i className="fa-regular fa-eye" /> View details
          </span>
        </div>
      </div>

      <div className="mx-product-card__body">
        <div className="mx-product-card__meta">
          <span className="mx-product-card__cat">{product.category}</span>
          <span className="mx-product-card__rating" aria-label={`${product.rating} out of 5`}>
            <i className="fa-solid fa-star" />
            {product.rating}
            <em>({product.reviews})</em>
          </span>
        </div>

        <div className="mx-product-card__title">
          <h5>{product.name}</h5>
        </div>

        <p className="mx-product-card__ship">
          <i className="fa-solid fa-truck-fast" />{" "}
          {product.inStock ? "Fast delivery available" : "Notify when available"}
        </p>

        <div className="mx-product-card__foot">
          <div className="mx-product-card__price">
            <strong>${product.price.toFixed(2)}</strong>
            {product.was ? <s>${product.was.toFixed(2)}</s> : null}
          </div>
          <button
            type="button"
            className={`mx-product-card__cart ${added ? "is-added" : ""}`}
            onClick={onAdd}
            disabled={!product.inStock}
          >
            {added ? (
              <>
                <i className="fa-solid fa-check" /> Added
              </>
            ) : (
              <>
                <i className="fa-solid fa-bag-shopping" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

type ProductsProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  showCta?: boolean;
  limit?: number;
};

export function ProductsAdvanced({
  eyebrow = "Most Demanding",
  title = "Best Selling Products",
  subtitle = "Curated pharmacy bestsellers — trusted formulas, clear pricing, ready to ship.",
  showCta = true,
  limit = 8,
}: ProductsProps) {
  const display = shopProducts.filter((p) => p.inStock).slice(0, limit);

  return (
    <div className="padding-rl float-left w-100">
      <section className="float-left w-100 best-products-con position-relative padding-top padding-bottom mx-products">
        <div className="mx-products__bg" aria-hidden="true" />
        <div className="main-container position-relative">
          <div className="heading-title-con text-center mx-products__head">
            <span className="special-text d-inline-block">{eyebrow}</span>
            <h2 className="mb-0">{title}</h2>
            <p className="mx-products__sub">{subtitle}</p>
          </div>

          <div className="mx-products__grid">
            {display.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {showCta ? (
            <div className="text-center mx-products__cta">
              <Link href="/shop" className="primary_btn d-inline-block text-decoration-none">
                Browse Full Catalog
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
