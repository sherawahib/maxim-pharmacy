"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const posts = [
  {
    title: "5 Natural Ways to Strengthen Your Immune System",
    excerpt:
      "Discover simple lifestyle habits and key supplements that can naturally boost your immunity year-round.",
    image: "/assets/images/news-and-articles-img1.jpg",
    tag: "Immunity",
    date: "Mar 12, 2026",
    read: "4 min read",
    author: "Maxim Pharmacists",
    authorRole: "Clinical Team",
    featured: true,
  },
  {
    title: "Skincare Advice for Sensitive Skin: Simple Tips for a Calmer Routine",
    excerpt:
      "Learn how to care for sensitive skin with gentle routines and dermatologist-recommended products.",
    image: "/assets/images/news-and-articles-img2.jpg",
    tag: "Skincare",
    date: "Mar 4, 2026",
    read: "5 min read",
    author: "Care Team",
    authorRole: "Wellness Desk",
  },
  {
    title: "Do You Really Need Supplements? A Practical Guide to Boosting Health",
    excerpt:
      "Find out when supplements are helpful and how to choose the right ones for your health needs.",
    image: "/assets/images/news-and-articles-img3.jpg",
    tag: "Wellness",
    date: "Feb 21, 2026",
    read: "6 min read",
    author: "Maxim Pharmacists",
    authorRole: "Clinical Team",
  },
  {
    title: "Heart-Healthy Habits That Fit Into a Busy Week",
    excerpt:
      "Small daily choices — movement, hydration, and smart OTC support — that protect long-term heart health.",
    image: "/assets/images/blog-image1.jpg",
    tag: "Heart Health",
    date: "Feb 10, 2026",
    read: "5 min read",
    author: "Care Team",
    authorRole: "Wellness Desk",
  },
  {
    title: "Cold & Flu Season Prep: What to Keep in Your Medicine Cabinet",
    excerpt:
      "A pharmacist-curated checklist so you are ready before symptoms hit — without overbuying.",
    image: "/assets/images/blog-image2.jpg",
    tag: "Immunity",
    date: "Jan 28, 2026",
    read: "4 min read",
    author: "Maxim Pharmacists",
    authorRole: "Clinical Team",
  },
  {
    title: "How to Read a Supplement Label Without the Confusion",
    excerpt:
      "Decode servings, claims, and quality markers so every bottle you buy actually earns a place on your shelf.",
    image: "/assets/images/blog-image3.jpg",
    tag: "Wellness",
    date: "Jan 14, 2026",
    read: "7 min read",
    author: "Care Team",
    authorRole: "Wellness Desk",
  },
  {
    title: "Morning Skincare Mistakes That Make Irritation Worse",
    excerpt:
      "Avoid common habits that strip your barrier, and rebuild a calm routine that works with pharmacy-grade care.",
    image: "/assets/images/blog-image4.jpg",
    tag: "Skincare",
    date: "Jan 3, 2026",
    read: "5 min read",
    author: "Care Team",
    authorRole: "Wellness Desk",
  },
  {
    title: "Prescription Transfers Made Simple: What to Expect",
    excerpt:
      "A clear walkthrough of transferring your Rx to Maxim — paperwork, timelines, and how we keep refills on track.",
    image: "/assets/images/post-featured.jpg",
    tag: "Pharmacy Tips",
    date: "Dec 18, 2025",
    read: "3 min read",
    author: "Maxim Pharmacists",
    authorRole: "Clinical Team",
  },
];

const filters = [
  "All",
  "Immunity",
  "Skincare",
  "Wellness",
  "Heart Health",
  "Pharmacy Tips",
] as const;

type Filter = (typeof filters)[number];
type Post = (typeof posts)[number];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function BlogAdvanced() {
  const [filter, setFilter] = useState<Filter>("All");

  const featured = posts.find((p) => p.featured) ?? posts[0];

  const gridPosts = useMemo(() => {
    const list =
      filter === "All" ? posts.filter((p) => !p.featured) : posts.filter((p) => p.tag === filter);
    const withoutFeatured = list.filter((p) => p.title !== featured.title);
    return (withoutFeatured.length ? withoutFeatured : list).slice(0, 6);
  }, [filter, featured.title]);

  return (
    <div className="padding-rl float-left w-100">
      <section className="float-left w-100 news-and-articles-con padding-top padding-bottom position-relative mx-blog">
        <div className="mx-blog__bg" aria-hidden="true" />

        <div className="main-container position-relative">
          <div className="mx-blog__head-row">
            <div className="mx-blog__head">
              <span className="special-text d-inline-block">Journal</span>
              <h2 className="mb-0">Pharmacist insights & wellness reads</h2>
              <p className="mx-blog__sub">
                Clear guidance from licensed pharmacists — written for real routines, not trends.
              </p>
            </div>
            <Link href="/blog" className="mx-blog__head-link">
              All articles <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>

          {/* Cinematic featured story — not a split card */}
          <Link href="/blog" className="mx-blog__hero text-decoration-none">
            <img
              src={featured.image}
              alt={featured.title}
              className="mx-blog__hero-img"
            />
            <div className="mx-blog__hero-shade" aria-hidden="true" />
            <div className="mx-blog__hero-content">
              <div className="mx-blog__hero-kicker">
                <span>Editor’s pick</span>
                <span className="mx-blog__hero-sep" />
                <span>{featured.tag}</span>
                <span className="mx-blog__hero-sep" />
                <span>{featured.read}</span>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <div className="mx-blog__hero-bottom">
                <div className="mx-blog__author-block">
                  <span className="mx-blog__avatar" aria-hidden="true">
                    {initials(featured.author)}
                  </span>
                  <span>
                    <strong>{featured.author}</strong>
                    <em>
                      {featured.authorRole} · {featured.date}
                    </em>
                  </span>
                </div>
                <span className="mx-blog__hero-btn">
                  Read story <i className="fa-solid fa-arrow-right" />
                </span>
              </div>
            </div>
          </Link>

          <div
            className="mx-blog__filters"
            role="tablist"
            aria-label="Filter articles by topic"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={`mx-blog__filter ${filter === item ? "is-active" : ""}`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mx-blog__editorial">
            {gridPosts.map((post, i) => (
              <EditorialCard key={post.title} post={post} index={i} />
            ))}
          </div>

          <div className="text-center mx-blog__cta">
            <Link
              href="/blog"
              className="primary_btn d-inline-block text-decoration-none"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function EditorialCard({ post, index }: { post: Post; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className="mx-blog__ed-card"
      style={{ animationDelay: `${0.05 + index * 0.06}s` }}
    >
      <Link href="/blog" className="mx-blog__ed-media text-decoration-none">
        <img src={post.image} alt={post.title} />
        <span className="mx-blog__ed-num">{num}</span>
      </Link>
      <div className="mx-blog__ed-body">
        <div className="mx-blog__ed-meta">
          <span>{post.tag}</span>
          <span className="mx-blog__dot" />
          <span>{post.read}</span>
        </div>
        <Link href="/blog" className="text-decoration-none">
          <h4>{post.title}</h4>
        </Link>
        <p>{post.excerpt}</p>
        <div className="mx-blog__ed-foot">
          <div className="mx-blog__author-block mx-blog__author-block--sm">
            <span className="mx-blog__avatar" aria-hidden="true">
              {initials(post.author)}
            </span>
            <span>
              <strong>{post.author}</strong>
              <em>{post.date}</em>
            </span>
          </div>
          <Link href="/blog" className="mx-blog__ed-more">
            Read <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </article>
  );
}
