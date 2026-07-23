"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/html-port/CartProvider";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

const steps = [
  { id: 1, label: "Shipping", icon: "fa-truck-fast" },
  { id: 2, label: "Payment", icon: "fa-credit-card" },
  { id: 3, label: "Review", icon: "fa-clipboard-check" },
] as const;

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  delivery: "standard" | "express";
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  notes: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  delivery: "standard",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
  notes: "",
};

export function CheckoutContent() {
  const router = useRouter();
  const {
    lines,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    coupon,
    clearCart,
    ready,
  } = useCart();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const expressExtra = form.delivery === "express" ? 7.5 : 0;
  const grandTotal = Math.round((total + expressExtra) * 100) / 100;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateShipping = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required";
    if (form.phone.trim().length < 7) next.phone = "Valid phone required";
    if (!form.address.trim()) next.address = "Required";
    if (!form.city.trim()) next.city = "Required";
    if (!form.state.trim()) next.state = "Required";
    if (!form.zip.trim()) next.zip = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validatePayment = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.cardName.trim()) next.cardName = "Required";
    const digits = form.cardNumber.replace(/\s/g, "");
    if (digits.length < 12) next.cardNumber = "Enter a valid card number";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) next.expiry = "Use MM/YY";
    if (form.cvc.trim().length < 3) next.cvc = "Invalid CVC";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateShipping()) return;
    if (step === 2 && !validatePayment()) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validateShipping() || !validatePayment()) {
      setStep(1);
      return;
    }
    const id = `MX-${Date.now().toString().slice(-8)}`;
    setOrderId(id);
    setPlaced(true);
    clearCart();
  };

  const maskedCard = useMemo(() => {
    const digits = form.cardNumber.replace(/\D/g, "");
    if (digits.length < 4) return "••••";
    return `•••• •••• •••• ${digits.slice(-4)}`;
  }, [form.cardNumber]);

  if (ready && lines.length === 0 && !placed) {
    return (
      <>
        <SubBannerAdvanced
          title="Checkout"
          description="Complete your order with secure, encrypted payment."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
          image="/assets/images/s1.jpg"
        />
        <div className="padding-rl float-left w-100">
          <section className="float-left w-100 padding-top padding-bottom mx-checkout">
            <div className="main-container">
              <div className="mx-cart__empty">
                <span className="mx-cart__empty-icon" aria-hidden="true">
                  <i className="fa-solid fa-cart-shopping" />
                </span>
                <h2>Nothing to checkout</h2>
                <p>Add products from the shop, then return to complete your order.</p>
                <Link href="/shop" className="mx-cart__primary">
                  Browse shop
                </Link>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  if (placed) {
    return (
      <>
        <SubBannerAdvanced
          title="Order confirmed"
          description="Thank you — your pharmacy order is being prepared."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Checkout" },
          ]}
          image="/assets/images/s1.jpg"
        />
        <div className="padding-rl float-left w-100">
          <section className="float-left w-100 padding-top padding-bottom mx-checkout">
            <div className="main-container">
              <div className="mx-checkout__success">
                <span className="mx-checkout__success-icon" aria-hidden="true">
                  <i className="fa-solid fa-circle-check" />
                </span>
                <h2>Payment successful</h2>
                <p>
                  Order <strong>{orderId}</strong> is confirmed. A receipt was sent to{" "}
                  <strong>{form.email || "your email"}</strong>.
                </p>
                <ul>
                  <li>
                    <i className="fa-solid fa-box" /> Packing starts within 2 hours
                  </li>
                  <li>
                    <i className="fa-solid fa-truck" />{" "}
                    {form.delivery === "express"
                      ? "Express delivery · 1–2 business days"
                      : "Standard delivery · 3–5 business days"}
                  </li>
                  <li>
                    <i className="fa-solid fa-phone" /> Pharmacist follow-up if needed
                  </li>
                </ul>
                <div className="mx-checkout__success-actions">
                  <Link href="/shop" className="mx-cart__primary">
                    Continue shopping
                  </Link>
                  <Link href="/" className="mx-checkout__ghost">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <SubBannerAdvanced
        title="Checkout"
        description="Secure encrypted checkout for prescription support and OTC essentials."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
        image="/assets/images/s1.jpg"
      />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-checkout">
          <div className="main-container">
            <ol className="mx-checkout__steps">
              {steps.map((s) => (
                <li
                  key={s.id}
                  className={`mx-checkout__step ${step === s.id ? "is-active" : ""} ${
                    step > s.id ? "is-done" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (s.id < step) setStep(s.id);
                    }}
                    disabled={s.id > step}
                  >
                    <span className="mx-checkout__step-icon">
                      <i className={`fa-solid ${step > s.id ? "fa-check" : s.icon}`} />
                    </span>
                    <span>{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="mx-checkout__layout">
              <form className="mx-checkout__form" onSubmit={placeOrder}>
                {step === 1 ? (
                  <div className="mx-checkout__panel">
                    <header>
                      <h2>Shipping details</h2>
                      <p>Where should we deliver your pharmacy order?</p>
                    </header>

                    <div className="mx-checkout__grid2">
                      <Field
                        label="First name"
                        value={form.firstName}
                        error={errors.firstName}
                        onChange={(v) => update("firstName", v)}
                        autoComplete="given-name"
                      />
                      <Field
                        label="Last name"
                        value={form.lastName}
                        error={errors.lastName}
                        onChange={(v) => update("lastName", v)}
                        autoComplete="family-name"
                      />
                    </div>

                    <div className="mx-checkout__grid2">
                      <Field
                        label="Email"
                        type="email"
                        value={form.email}
                        error={errors.email}
                        onChange={(v) => update("email", v)}
                        autoComplete="email"
                      />
                      <Field
                        label="Phone"
                        type="tel"
                        value={form.phone}
                        error={errors.phone}
                        onChange={(v) => update("phone", v)}
                        autoComplete="tel"
                      />
                    </div>

                    <Field
                      label="Street address"
                      value={form.address}
                      error={errors.address}
                      onChange={(v) => update("address", v)}
                      autoComplete="street-address"
                    />

                    <div className="mx-checkout__grid3">
                      <Field
                        label="City"
                        value={form.city}
                        error={errors.city}
                        onChange={(v) => update("city", v)}
                        autoComplete="address-level2"
                      />
                      <Field
                        label="State"
                        value={form.state}
                        error={errors.state}
                        onChange={(v) => update("state", v)}
                        autoComplete="address-level1"
                      />
                      <Field
                        label="ZIP"
                        value={form.zip}
                        error={errors.zip}
                        onChange={(v) => update("zip", v)}
                        autoComplete="postal-code"
                      />
                    </div>

                    <div className="mx-checkout__delivery">
                      <p className="mx-checkout__label">Delivery speed</p>
                      <div className="mx-checkout__delivery-opts">
                        <button
                          type="button"
                          className={form.delivery === "standard" ? "is-active" : ""}
                          onClick={() => update("delivery", "standard")}
                        >
                          <strong>Standard</strong>
                          <span>3–5 business days · Included</span>
                        </button>
                        <button
                          type="button"
                          className={form.delivery === "express" ? "is-active" : ""}
                          onClick={() => update("delivery", "express")}
                        >
                          <strong>Express</strong>
                          <span>1–2 business days · +$7.50</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="mx-checkout__panel">
                    <header>
                      <h2>Payment</h2>
                      <p>Demo checkout — no real charge is processed.</p>
                    </header>

                    <Field
                      label="Name on card"
                      value={form.cardName}
                      error={errors.cardName}
                      onChange={(v) => update("cardName", v)}
                      autoComplete="cc-name"
                    />
                    <Field
                      label="Card number"
                      value={form.cardNumber}
                      error={errors.cardNumber}
                      onChange={(v) =>
                        update(
                          "cardNumber",
                          v
                            .replace(/[^\d]/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim()
                            .slice(0, 19)
                        )
                      }
                      autoComplete="cc-number"
                      placeholder="4242 4242 4242 4242"
                    />

                    <div className="mx-checkout__grid2">
                      <Field
                        label="Expiry"
                        value={form.expiry}
                        error={errors.expiry}
                        onChange={(v) => {
                          const clean = v.replace(/[^\d]/g, "").slice(0, 4);
                          const formatted =
                            clean.length > 2
                              ? `${clean.slice(0, 2)}/${clean.slice(2)}`
                              : clean;
                          update("expiry", formatted);
                        }}
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                      />
                      <Field
                        label="CVC"
                        value={form.cvc}
                        error={errors.cvc}
                        onChange={(v) => update("cvc", v.replace(/\D/g, "").slice(0, 4))}
                        autoComplete="cc-csc"
                        placeholder="123"
                      />
                    </div>

                    <div className="mx-checkout__pay-trust">
                      <span>
                        <i className="fa-brands fa-cc-visa" />
                      </span>
                      <span>
                        <i className="fa-brands fa-cc-mastercard" />
                      </span>
                      <span>
                        <i className="fa-brands fa-cc-amex" />
                      </span>
                      <span>
                        <i className="fa-solid fa-lock" /> 256-bit SSL
                      </span>
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="mx-checkout__panel">
                    <header>
                      <h2>Review & place order</h2>
                      <p>Confirm details before completing your purchase.</p>
                    </header>

                    <div className="mx-checkout__review">
                      <div>
                        <h4>Ship to</h4>
                        <p>
                          {form.firstName} {form.lastName}
                          <br />
                          {form.address}
                          <br />
                          {form.city}, {form.state} {form.zip}
                          <br />
                          {form.email} · {form.phone}
                        </p>
                        <button type="button" onClick={() => setStep(1)}>
                          Edit shipping
                        </button>
                      </div>
                      <div>
                        <h4>Payment</h4>
                        <p>
                          {form.cardName}
                          <br />
                          {maskedCard}
                          <br />
                          Exp {form.expiry}
                        </p>
                        <button type="button" onClick={() => setStep(2)}>
                          Edit payment
                        </button>
                      </div>
                    </div>

                    <label className="mx-checkout__notes">
                      <span>Order notes (optional)</span>
                      <textarea
                        rows={3}
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        placeholder="Delivery instructions, caregiver name…"
                      />
                    </label>
                  </div>
                ) : null}

                <div className="mx-checkout__actions">
                  {step > 1 ? (
                    <button
                      type="button"
                      className="mx-checkout__ghost"
                      onClick={() => setStep((s) => s - 1)}
                    >
                      Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mx-checkout__ghost"
                      onClick={() => router.push("/cart")}
                    >
                      Back to cart
                    </button>
                  )}

                  {step < 3 ? (
                    <button type="button" className="mx-cart__checkout" onClick={goNext}>
                      Continue
                      <i className="fa-solid fa-arrow-right" />
                    </button>
                  ) : (
                    <button type="submit" className="mx-cart__checkout">
                      Place order · {money(grandTotal)}
                      <i className="fa-solid fa-lock" />
                    </button>
                  )}
                </div>
              </form>

              <aside className="mx-cart__summary mx-checkout__summary">
                <h3>Order summary</h3>
                <p className="mx-checkout__summary-count">
                  {itemCount} item{itemCount === 1 ? "" : "s"}
                </p>

                <ul className="mx-checkout__mini">
                  {lines.map((line) => (
                    <li key={line.id}>
                      <figure>
                        <img src={line.product.image} alt="" />
                        <em>{line.qty}</em>
                      </figure>
                      <div>
                        <strong>{line.product.name}</strong>
                        <span>{line.product.category}</span>
                      </div>
                      <b>{money(line.lineTotal)}</b>
                    </li>
                  ))}
                </ul>

                <dl className="mx-cart__totals">
                  <div>
                    <dt>Subtotal</dt>
                    <dd>{money(subtotal)}</dd>
                  </div>
                  {discount > 0 ? (
                    <div className="is-discount">
                      <dt>Discount{coupon ? ` (${coupon})` : ""}</dt>
                      <dd>−{money(discount)}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>Shipping</dt>
                    <dd>{shipping === 0 ? "Free" : money(shipping)}</dd>
                  </div>
                  {expressExtra > 0 ? (
                    <div>
                      <dt>Express upgrade</dt>
                      <dd>{money(expressExtra)}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>Tax</dt>
                    <dd>{money(tax)}</dd>
                  </div>
                  <div className="is-total">
                    <dt>Total</dt>
                    <dd>{money(grandTotal)}</dd>
                  </div>
                </dl>

                <p className="mx-cart__secure">
                  <i className="fa-solid fa-shield-halved" /> Licensed pharmacy · Encrypted
                  checkout
                </p>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className={`mx-checkout__field ${error ? "has-error" : ""}`} htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
      {error ? <em>{error}</em> : null}
    </label>
  );
}
