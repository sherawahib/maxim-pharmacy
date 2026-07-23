"use client";

import Link from "next/link";

const promos = [
  {
    badge: "5% Cashback",
    title: "Vitamins & Supplements",
    href: "/shop?category=vitamins",
    tone: "vitamins",
    image: "/assets/images/promotion-banner1.jpg",
  },
  {
    badge: "Flat 10% OFF",
    title: "Baby & Childcare",
    href: "/shop?category=baby",
    tone: "baby",
    image: "/assets/images/promotion-banner2.jpg",
  },
  {
    badge: "12% Cashback",
    title: "Personal Care & Wellness",
    href: "/shop?category=wellness",
    tone: "personal",
    image: "/assets/images/promotion-banner3.jpg",
  },
];

function PromoCard({
  promo,
  index,
}: {
  promo: (typeof promos)[number];
  index: number;
}) {
  const isClone = index >= promos.length;

  return (
    <Link
      href={promo.href}
      className={`mx-promo__card mx-promo__card--${promo.tone}`}
      tabIndex={isClone ? -1 : undefined}
      aria-hidden={isClone ? true : undefined}
      style={{ backgroundImage: `url(${promo.image})` }}
    >
      <div className="mx-promo__overlay">
        <span className="mx-promo__badge">{promo.badge}</span>
        <h4>{promo.title}</h4>
        <span className="mx-promo__btn">
          Browse All <i className="fa-solid fa-arrow-right" />
        </span>
      </div>
    </Link>
  );
}

type Props = {
  compact?: boolean;
};

export function PromotionsAdvanced({ compact = false }: Props) {
  const loop = [...promos, ...promos, ...promos];

  return (
    <div className={`padding-rl float-left w-100 ${compact ? "mx-promo--compact" : ""}`}>
      <section className="float-left w-100 position-relative mx-promo">
        {!compact ? (
          <div className="main-container">
            <div className="heading-title-con text-center mx-promo__head">
              <span className="special-text d-inline-block">Limited offers</span>
              <h2 className="mb-0">Deals You Shouldn’t Miss</h2>
              <p className="mx-promo__sub">
                Cashback and discounts scrolling live — tap any offer to shop now.
              </p>
            </div>
          </div>
        ) : null}

        <div className="mx-promo__marquee" aria-label="Discount offers">
          <div className="mx-promo__track">
            {loop.map((promo, i) => (
              <div className="mx-promo__slide" key={`${promo.title}-${i}`}>
                <PromoCard promo={promo} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/** Slim always-on offer ticker */
export function PromoTicker() {
  const items = [
    "5% Cashback on Vitamins & Supplements",
    "Flat 10% OFF on Baby & Childcare",
    "12% Cashback on Personal Care & Wellness",
    "Free shipping on orders over $200",
  ];
  const loop = [...items, ...items];

  return (
    <div className="mx-ticker" aria-label="Current offers">
      <div className="mx-ticker__label">
        <i className="fa-solid fa-bolt" /> Offers
      </div>
      <div className="mx-ticker__viewport">
        <div className="mx-ticker__track">
          {loop.map((text, i) => (
            <span key={`${text}-${i}`} className="mx-ticker__item">
              {text}
              <Link href="/shop">Shop now</Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
