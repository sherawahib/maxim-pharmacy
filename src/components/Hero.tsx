"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    title: "Instant Pharmacy Access For You",
    text: "Order prescription and over-the-counter medicines online with confidence.",
    image:
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=2400&q=80",
    primary: { href: "/shop", label: "Shop Now" },
    secondary: { href: "/transfer", label: "Upload Prescription" },
  },
  {
    title: "Transfer Your Prescription Fast",
    text: "Secure online transfer with licensed pharmacist support at every step.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2400&q=80",
    primary: { href: "/transfer", label: "Start Transfer" },
    secondary: { href: "/contact", label: "Contact Us" },
  },
  {
    title: "Trusted Care, Delivered Home",
    text: "Vitamins, wellness, and everyday essentials — curated for your family.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=2400&q=80",
    primary: { href: "/shop", label: "Browse Products" },
    secondary: { href: "/services", label: "Our Services" },
  },
];

const pillars = ["Health", "Trust", "Online"];

export function Hero() {
  const [i, setI] = useState(0);

  const next = useCallback(() => setI((v) => (v + 1) % slides.length), []);
  const prev = useCallback(
    () => setI((v) => (v - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[i];

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0">
        {slides.map((s, idx) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt=""
              fill
              priority={idx === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,24,45,0.94)_0%,rgba(8,24,45,0.78)_42%,rgba(8,24,45,0.35)_100%)]" />
          </div>
        ))}
      </div>

      <div className="wrap relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center min-h-[620px] md:min-h-[680px] py-16 md:py-20">
        <div key={slide.title}>
          <ul className="fade-up flex flex-wrap gap-2 mb-6">
            {pillars.map((p) => (
              <li
                key={p}
                className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] border border-white/25 bg-white/5 text-white/85"
              >
                {p}
              </li>
            ))}
          </ul>

          <h1 className="fade-up d1 font-display text-[2.6rem] sm:text-5xl lg:text-[3.5rem] leading-[1.08] text-white max-w-xl">
            {slide.title}
          </h1>

          <div className="fade-up d2 mt-6 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80",
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80",
                "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=100&q=80",
                "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80",
              ].map((src) => (
                <span
                  key={src}
                  className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-navy"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="36px" />
                </span>
              ))}
            </div>
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">4k+</span> Happy clients
            </p>
          </div>

          <p className="fade-up d2 mt-5 max-w-md text-base md:text-lg text-white/70 leading-relaxed">
            {slide.text}
          </p>

          <div className="fade-up d3 mt-8 flex flex-wrap gap-3">
            <Link href={slide.primary.href} className="btn btn-primary">
              {slide.primary.label}
            </Link>
            <Link href={slide.secondary.href} className="btn btn-outline-white">
              {slide.secondary.label}
            </Link>
          </div>

          <div className="fade-up d3 mt-10 inline-flex items-center gap-3 border border-white/15 bg-white/5 px-4 py-3">
            <span
              className="flex h-9 w-9 items-center justify-center text-xs font-bold"
              style={{ background: "#c8102e", color: "#fff" }}
            >
              Rx
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Trusted Drug Store</p>
              <p className="text-xs text-white/55">Licensed pharmacists · Secure delivery</p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block h-[460px]">
          <div className="absolute inset-y-6 right-0 left-10 overflow-hidden border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]">
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover"
              sizes="45vw"
              key={slide.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          </div>
          <div className="absolute -left-2 top-16 bg-white text-navy px-4 py-3 shadow-lg">
            <p className="text-[10px] uppercase tracking-[0.16em] text-navy-soft">Same-day</p>
            <p className="font-display text-xl">Local delivery</p>
          </div>
          <div
            className="absolute bottom-10 right-4 px-4 py-3 text-white shadow-lg"
            style={{ background: "#c8102e" }}
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/80">Support</p>
            <p className="font-semibold">24/7 Pharmacist help</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10">
        <div className="wrap flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === i ? "w-10 bg-[#c8102e]" : "w-5 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="h-10 w-10 border border-white/30 bg-white/5 text-white hover:bg-white hover:text-navy transition-colors cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="h-10 w-10 border border-white/30 bg-white/5 text-white hover:bg-white hover:text-navy transition-colors cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
