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

const HIDE_KEY = "mx-coupons-hidden-until";
const HIDE_MS = 15 * 60 * 1000; // 15 minutes

function readHiddenUntil(): number {
  try {
    const raw = sessionStorage.getItem(HIDE_KEY);
    const until = raw ? Number(raw) : 0;
    return Number.isFinite(until) ? until : 0;
  } catch {
    return 0;
  }
}

export function FloatingCoupons() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const until = readHiddenUntil();
    const now = Date.now();

    if (until > now) {
      setHidden(true);
      const t = window.setTimeout(() => {
        setHidden(false);
        try {
          sessionStorage.removeItem(HIDE_KEY);
        } catch {
          /* ignore */
        }
      }, until - now);
      return () => window.clearTimeout(t);
    }

    if (until) {
      try {
        sessionStorage.removeItem(HIDE_KEY);
      } catch {
        /* ignore */
      }
    }
    setHidden(false);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  const hide = () => {
    const until = Date.now() + HIDE_MS;
    setHidden(true);
    try {
      sessionStorage.setItem(HIDE_KEY, String(until));
      // migrate away from old permanent hide flag
      sessionStorage.removeItem("mx-coupons-hidden");
    } catch {
      /* ignore */
    }
    window.setTimeout(() => {
      setHidden(false);
      try {
        sessionStorage.removeItem(HIDE_KEY);
      } catch {
        /* ignore */
      }
    }, HIDE_MS);
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
