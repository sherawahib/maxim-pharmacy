"use client";

import { useEffect, useMemo, useState } from "react";

const avatars = [
  "/assets/images/user1.png",
  "/assets/images/user2.png",
  "/assets/images/user3.png",
  "/assets/images/user4.png",
];

const stats = [
  { value: "4k+", label: "Happy clients" },
  { value: "24/7", label: "Order online" },
  { value: "100%", label: "Licensed care" },
  { value: "Free*", label: "Delivery options" },
];

const reviews = [
  {
    name: "Jennifer Troyer",
    role: "Ipswich patient",
    image: "/assets/images/client-img1.jpg",
    quote:
      "Ordering was seamless, the pharmacist followed up personally, and everything arrived exactly when promised. Maxim makes online pharmacy care feel safe and premium.",
  },
  {
    name: "Fergus Douglas",
    role: "Transfer patient",
    image: "/assets/images/client-img2.jpg",
    quote:
      "From upload to doorstep, the process was simple and well explained. The support team answered every question quickly and made the whole experience stress-free.",
  },
  {
    name: "Lucy Smith",
    role: "Wellness shopper",
    image: "/assets/images/client-img3.jpg",
    quote:
      "I love how easy it is to reorder essentials and manage prescriptions in one place. The delivery updates and discreet packaging gave me a lot of confidence.",
  },
  {
    name: "John Smith",
    role: "Local family",
    image: "/assets/images/client-img4.jpg",
    quote:
      "Professional service, clear pricing, and genuinely helpful pharmacists. Same-day friendly fulfillment and real follow-up when we needed it most.",
  },
];

export function TestimonialsAdvanced() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const review = reviews[active];
  const stars = useMemo(() => Array.from({ length: 5 }), []);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 5600);
    return () => window.clearInterval(t);
  }, [paused]);

  const goPrev = () => {
    setActive((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goNext = () => {
    setActive((prev) => (prev + 1) % reviews.length);
  };

  return (
    <div className="padding-rl float-left w-100">
      <section
        className="client-review-slider w-100 float-left padding-top padding-bottom position-relative main-box br-30 mx-testimonials"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img
          src="/assets/images/testimonials_image1.jpg"
          alt=""
          className="mx-testimonials__photo"
          aria-hidden="true"
        />
        <div className="mx-testimonials__overlay" aria-hidden="true" />
        <div className="mx-testimonials__bg" aria-hidden="true" />

        <div className="container position-relative">
          <div className="mx-testimonials__layout">
            <div className="mx-testimonials__intro">
              <span className="special-text d-inline-block">Testimonials</span>
              <h2>Trusted by thousands of local families</h2>
              <p>
                Same-day friendly fulfillment, discreet packaging, and real pharmacist follow-up
                when you need it — straight from people who shop Maxim Pharmacy.
              </p>

              <div className="mx-testimonials__proof">
                <div className="mx-testimonials__faces">
                  {avatars.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      style={{ zIndex: avatars.length - i }}
                    />
                  ))}
                </div>
                <div>
                  <strong>4k+ happy clients</strong>
                  <span>Verified reviews · Licensed care</span>
                </div>
              </div>

              <ul className="mx-testimonials__stats">
                {stats.map((item) => (
                  <li key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-testimonials__stage">
              <article
                key={review.name}
                className="mx-testimonials__card"
                aria-live="polite"
              >
                <div className="mx-testimonials__quote-mark" aria-hidden="true">
                  “
                </div>
                <div className="mx-testimonials__stars" aria-label="5 star rating">
                  {stars.map((_, i) => (
                    <i key={i} className="fa-solid fa-star" />
                  ))}
                </div>
                <p className="mx-testimonials__quote">{review.quote}</p>
                <div className="mx-testimonials__author">
                  <img src={review.image} alt="" className="img-fluid" />
                  <div>
                    <h4>{review.name}</h4>
                    <p>{review.role}</p>
                  </div>
                </div>
              </article>

              <div className="mx-testimonials__controls">
                <button
                  type="button"
                  className="mx-testimonials__arrow"
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                >
                  <i className="fa-solid fa-arrow-left" />
                </button>

                <div className="mx-testimonials__avatars">
                  {reviews.map((item, index) => (
                    <button
                      type="button"
                      key={item.name}
                      className={`mx-testimonials__avatar ${
                        index === active ? "is-active" : ""
                      }`}
                      onClick={() => setActive(index)}
                      aria-label={`Show review from ${item.name}`}
                    >
                      <img src={item.image} alt="" className="img-fluid" />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="mx-testimonials__arrow"
                  onClick={goNext}
                  aria-label="Next testimonial"
                >
                  <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
