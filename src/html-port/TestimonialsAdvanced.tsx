"use client";

import { useMemo, useState } from "react";

const reviews = [
  {
    name: "Jennifer Troyer",
    role: "Administrator",
    image: "/assets/images/client-img1.jpg",
    quote:
      "Ordering was seamless, the pharmacist followed up personally, and everything arrived exactly when promised. Maxim makes online pharmacy care feel safe and premium.",
  },
  {
    name: "Fergus Douglas",
    role: "Happy Customer",
    image: "/assets/images/client-img2.jpg",
    quote:
      "From upload to doorstep, the process was simple and well explained. The support team answered every question quickly and made the whole experience stress-free.",
  },
  {
    name: "Lucy Smith",
    role: "Satisfied Customer",
    image: "/assets/images/client-img3.jpg",
    quote:
      "I love how easy it is to reorder essentials and manage prescriptions in one place. The delivery updates and packaging gave me a lot of confidence.",
  },
  {
    name: "John Smith",
    role: "Satisfied Client",
    image: "/assets/images/client-img4.jpg",
    quote:
      "Professional service, clear pricing, and genuinely helpful pharmacists. It feels modern, polished, and far better than the typical pharmacy website experience.",
  },
];

export function TestimonialsAdvanced() {
  const [active, setActive] = useState(0);
  const review = reviews[active];
  const stars = useMemo(() => Array.from({ length: 5 }), []);

  const goPrev = () => {
    setActive((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goNext = () => {
    setActive((prev) => (prev + 1) % reviews.length);
  };

  return (
    <div className="padding-rl float-left w-100">
      <section className="client-review-slider w-100 float-left padding-top padding-bottom position-relative main-box br-30 mx-testimonials">
        <div className="mx-testimonials__bg" aria-hidden="true" />
        <div className="container position-relative">
          <div className="heading-title-con text-center mx-testimonials__head">
            <span className="special-text d-inline-block">Testimonials</span>
            <h2 className="mb-0">Our Client Reviews</h2>
            <p className="mx-testimonials__sub">
              Honest feedback from customers who trust Maxim Pharmacy for
              delivery, wellness essentials, and prescription support.
            </p>
          </div>

          <div className="mx-testimonials__card">
            <div className="mx-testimonials__quote-mark" aria-hidden="true">
              "
            </div>
            <div className="mx-testimonials__stars" aria-label="5 star rating">
              {stars.map((_, i) => (
                <i key={i} className="fa-solid fa-star" />
              ))}
            </div>

            <p className="mx-testimonials__quote">{review.quote}</p>

            <div className="mx-testimonials__author">
              <img src={review.image} alt={review.name} className="img-fluid" />
              <div>
                <h4>{review.name}</h4>
                <p>{review.role}</p>
              </div>
            </div>
          </div>

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
      </section>
    </div>
  );
}
