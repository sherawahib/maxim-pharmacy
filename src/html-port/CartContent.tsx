"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  CART_FREE_SHIPPING_AT,
  useCart,
} from "@/html-port/CartProvider";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";
import { productHref } from "@/html-port/shop-catalog";

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export function CartContent() {
  const {
    lines,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    coupon,
    couponMessage,
    setQty,
    removeItem,
    clearCart,
    applyCoupon,
    clearCoupon,
    ready,
  } = useCart();

  const [code, setCode] = useState("");

  const onCoupon = (e: FormEvent) => {
    e.preventDefault();
    applyCoupon(code);
  };

  const remainingForFreeShip = Math.max(0, CART_FREE_SHIPPING_AT - (subtotal - discount));

  return (
    <>
      <SubBannerAdvanced
        title="Your Cart"
        description="Review pharmacy essentials, adjust quantities, and checkout securely."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "Cart" },
        ]}
        image="/assets/images/promotion-banner1.jpg"
      />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-cart">
          <div className="main-container">
            {!ready ? (
              <p className="mx-cart__loading">Loading cart…</p>
            ) : lines.length === 0 ? (
              <div className="mx-cart__empty">
                <span className="mx-cart__empty-icon" aria-hidden="true">
                  <i className="fa-solid fa-bag-shopping" />
                </span>
                <h2>Your cart is empty</h2>
                <p>Browse trusted OTC medicines, vitamins, and care essentials.</p>
                <Link href="/shop" className="mx-cart__primary">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="mx-cart__layout">
                <div className="mx-cart__list">
                  <div className="mx-cart__list-head">
                    <div>
                      <h2>Shopping cart</h2>
                      <p>
                        {itemCount} item{itemCount === 1 ? "" : "s"} ready for checkout
                      </p>
                    </div>
                    <button type="button" className="mx-cart__clear" onClick={clearCart}>
                      <i className="fa-solid fa-trash-can" /> Clear all
                    </button>
                  </div>

                  <div className="mx-cart__cols" aria-hidden="true">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Qty</span>
                    <span>Total</span>
                    <span />
                  </div>

                  <ul className="mx-cart__items">
                    {lines.map((line) => (
                      <li key={line.id} className="mx-cart__item">
                        <div className="mx-cart__product">
                          <figure>
                            <img src={line.product.image} alt={line.product.name} />
                          </figure>
                          <div>
                            <span className="mx-cart__cat">{line.product.category}</span>
                            <h3>
                              <Link href={productHref(line.id)}>{line.product.name}</Link>
                            </h3>
                            <p>
                              <i className="fa-solid fa-star" /> {line.product.rating} · Fast
                              delivery
                            </p>
                          </div>
                        </div>

                        <div className="mx-cart__price" data-label="Price">
                          {money(line.product.price)}
                          {line.product.was ? <s>{money(line.product.was)}</s> : null}
                        </div>

                        <div className="mx-cart__qty" data-label="Qty">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.id, line.qty - 1)}
                          >
                            <i className="fa-solid fa-minus" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={99}
                            value={line.qty}
                            onChange={(e) => setQty(line.id, Number(e.target.value) || 1)}
                            aria-label={`Quantity for ${line.product.name}`}
                          />
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.id, line.qty + 1)}
                          >
                            <i className="fa-solid fa-plus" />
                          </button>
                        </div>

                        <div className="mx-cart__line" data-label="Total">
                          <strong>{money(line.lineTotal)}</strong>
                        </div>

                        <button
                          type="button"
                          className="mx-cart__remove"
                          aria-label={`Remove ${line.product.name}`}
                          onClick={() => removeItem(line.id)}
                        >
                          <i className="fa-solid fa-xmark" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mx-cart__trust">
                    <span>
                      <i className="fa-solid fa-shield-halved" /> Secure checkout
                    </span>
                    <span>
                      <i className="fa-solid fa-truck-fast" /> Discreet delivery
                    </span>
                    <span>
                      <i className="fa-solid fa-headset" /> Pharmacist support
                    </span>
                  </div>

                  <Link href="/shop" className="mx-cart__continue">
                    <i className="fa-solid fa-arrow-left" /> Continue shopping
                  </Link>
                </div>

                <aside className="mx-cart__summary">
                  <h3>Order summary</h3>

                  {remainingForFreeShip > 0 ? (
                    <div className="mx-cart__ship-note">
                      <div className="mx-cart__ship-bar">
                        <span
                          style={{
                            width: `${Math.min(
                              100,
                              ((subtotal - discount) / CART_FREE_SHIPPING_AT) * 100
                            )}%`,
                          }}
                        />
                      </div>
                      <p>
                        Add <strong>{money(remainingForFreeShip)}</strong> more for free
                        shipping
                      </p>
                    </div>
                  ) : (
                    <p className="mx-cart__ship-free">
                      <i className="fa-solid fa-circle-check" /> Free shipping unlocked
                    </p>
                  )}

                  <form className="mx-cart__coupon" onSubmit={onCoupon}>
                    <label htmlFor="cart-coupon">Promo code</label>
                    <div className="mx-cart__coupon-row">
                      <input
                        id="cart-coupon"
                        type="text"
                        placeholder="MAXIM10"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <button type="submit">Apply</button>
                    </div>
                    {coupon ? (
                      <p className="mx-cart__coupon-ok">
                        {coupon} · {couponMessage}{" "}
                        <button type="button" onClick={clearCoupon}>
                          Remove
                        </button>
                      </p>
                    ) : couponMessage ? (
                      <p className="mx-cart__coupon-err">{couponMessage}</p>
                    ) : (
                      <p className="mx-cart__coupon-hint">Try MAXIM10 or SAVE5</p>
                    )}
                  </form>

                  <dl className="mx-cart__totals">
                    <div>
                      <dt>Subtotal</dt>
                      <dd>{money(subtotal)}</dd>
                    </div>
                    {discount > 0 ? (
                      <div className="is-discount">
                        <dt>Discount</dt>
                        <dd>−{money(discount)}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>Shipping</dt>
                      <dd>{shipping === 0 ? "Free" : money(shipping)}</dd>
                    </div>
                    <div>
                      <dt>Tax</dt>
                      <dd>{money(tax)}</dd>
                    </div>
                    <div className="is-total">
                      <dt>Total</dt>
                      <dd>{money(total)}</dd>
                    </div>
                  </dl>

                  <Link href="/checkout" className="mx-cart__checkout">
                    Proceed to checkout
                    <i className="fa-solid fa-arrow-right" />
                  </Link>

                  <p className="mx-cart__secure">
                    <i className="fa-solid fa-lock" /> Encrypted payment · HIPAA-aware care
                  </p>
                </aside>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
