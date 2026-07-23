"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const coupons = [
  {
    id: "vitamins",
    code: "VITA5",
    discount: "5%",
    label: "Save",
    panelLabel: "Cashback",
    title: "Vitamins & Supplements",
    hint: "Auto-applied at checkout",
    href: "/shop?category=vitamins",
    tone: "navy" as const,
  },
  {
    id: "baby",
    code: "BABY10",
    discount: "10%",
    label: "OFF",
    panelLabel: "OFF",
    title: "Baby & Childcare",
    hint: "Flat discount · limited time",
    href: "/shop?category=baby",
    tone: "red" as const,
  },
  {
    id: "wellness",
    code: "CARE12",
    discount: "12%",
    label: "Deal",
    panelLabel: "Cashback",
    title: "Personal Care",
    hint: "On wellness essentials",
    href: "/shop?category=wellness",
    tone: "teal" as const,
  },
];

export function FloatingCoupons() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("mx-coupons-hidden") === "1") {
        setHidden(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  const hide = () => {
    setHidden(true);
    try {
      sessionStorage.setItem("mx-coupons-hidden", "1");
    } catch {
      /* ignore */
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
    } catch {
      setCopied(code);
    }
  };

  if (hidden) return null;

  return (
    <aside className="mx-float-coupons" aria-label="Discount coupons">
      <button
        type="button"
        className="mx-float-coupons__close"
        onClick={hide}
        aria-label="Hide coupons"
      >
        <i className="fa-solid fa-xmark" />
      </button>

      <ul className="mx-float-coupons__list">
        {coupons.map((c, i) => {
          const isOpen = openId === c.id;
          return (
            <li
              key={c.id}
              className={`mx-float-coupons__item mx-float-coupons__item--${c.tone} ${
                isOpen ? "is-open" : ""
              }`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              onMouseEnter={() => setOpenId(c.id)}
              onMouseLeave={() => setOpenId(null)}
            >
              <button
                type="button"
                className="mx-float-coupons__tab"
                aria-expanded={isOpen}
                aria-controls={`coupon-panel-${c.id}`}
                onClick={() => setOpenId(isOpen ? null : c.id)}
              >
                <span className="mx-float-coupons__pct">{c.discount}</span>
                <span className="mx-float-coupons__tab-label">{c.label}</span>
              </button>

              <div
                id={`coupon-panel-${c.id}`}
                className="mx-float-coupons__panel"
                role="region"
                aria-label={`${c.discount} ${c.label} — ${c.title}`}
              >
                <div className="mx-float-coupons__ticket">
                  <div className="mx-float-coupons__ticket-left">
                    <span className="mx-float-coupons__eyebrow">Deal</span>
                    <strong className="mx-float-coupons__big">
                      {c.discount}
                      <small>{c.panelLabel}</small>
                    </strong>
                  </div>
                  <div className="mx-float-coupons__perforation" aria-hidden="true" />
                  <div className="mx-float-coupons__ticket-right">
                    <h4>{c.title}</h4>
                    <p>{c.hint}</p>
                    <div className="mx-float-coupons__code-row">
                      <code>{c.code}</code>
                      <button
                        type="button"
                        onClick={() => copyCode(c.code)}
                        aria-label={`Copy code ${c.code}`}
                      >
                        {copied === c.code ? (
                          <>
                            <i className="fa-solid fa-check" /> Copied
                          </>
                        ) : (
                          <>
                            <i className="fa-regular fa-copy" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <Link href={c.href} className="mx-float-coupons__shop">
                      Shop deal <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
