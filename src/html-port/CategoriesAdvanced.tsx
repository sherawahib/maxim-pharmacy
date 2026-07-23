"use client";

import Link from "next/link";

const categories = [
  {
    title: "Nutrition & Weight",
    blurb: "Metabolism & wellness picks",
    image: "/assets/images/popular-category1.jpg",
    href: "/shop?category=nutrition",
    count: "48+",
  },
  {
    title: "Skin Essentials",
    blurb: "Calm, healthy skin care",
    image: "/assets/images/popular-category2.jpg",
    href: "/shop?category=skin",
    count: "36+",
  },
  {
    title: "Vitamins & Minerals",
    blurb: "Daily energy foundations",
    image: "/assets/images/popular-category3.jpg",
    href: "/shop?category=vitamins",
    count: "62+",
  },
  {
    title: "Cold & Flu Care",
    blurb: "Fast seasonal relief",
    image: "/assets/images/popular-category4.jpg",
    href: "/shop?category=cold-flu",
    count: "29+",
  },
];

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[number];
  index: number;
}) {
  return (
    <Link
      href={cat.href}
      className="popular-box mx-cats__card position-relative"
      tabIndex={index >= categories.length ? -1 : undefined}
      aria-hidden={index >= categories.length ? true : undefined}
    >
      <figure>
        <img src={cat.image} alt={index >= categories.length ? "" : cat.title} />
      </figure>
      <span className="mx-cats__count">{cat.count} items</span>
      <div className="category-content position-absolute mx-cats__label">
        <h6 className="mb-0">{cat.title}</h6>
        <p>{cat.blurb}</p>
      </div>
      <span className="mx-cats__arrow" aria-hidden="true">
        <i className="fa-solid fa-arrow-right" />
      </span>
    </Link>
  );
}

export function CategoriesAdvanced() {
  const loop = [...categories, ...categories];

  return (
    <div className="padding-rl float-left w-100">
      <section className="float-left w-100 position-relative padding-top padding-bottom br-30 popular-categories-con background-lemon mx-cats">
        <div className="mx-cats__bg" aria-hidden="true" />
        <div className="main-container">
          <div className="heading-title-con text-center mx-cats__head">
            <span className="special-text d-inline-block">Top Choices</span>
            <h2 className="mb-0">Our Popular Categories</h2>
            <p className="mx-cats__sub">
              Shop curated pharmacy categories for everyday care and seasonal needs.
            </p>
          </div>
        </div>

        <div className="mx-cats__marquee" aria-label="Popular categories carousel">
          <div className="mx-cats__track">
            {loop.map((cat, i) => (
              <div className="mx-cats__slide" key={`${cat.title}-${i}`}>
                <CategoryCard cat={cat} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
