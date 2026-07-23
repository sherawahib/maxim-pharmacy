"use client";

import Image from "next/image";
import { useState } from "react";
import { testimonials } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="section bg-bg">
      <div className="wrap">
        <SectionHeading
          eyebrow="Testimonials"
          title="Our Client Reviews"
          text="Real feedback from people who transferred, ordered, and came back."
          align="center"
        />

        <div className="mt-12 max-w-4xl mx-auto">
          <blockquote className="relative bg-white border border-line p-8 md:p-12 text-center">
            <span
              className="font-display text-6xl leading-none absolute top-4 left-6 opacity-20"
              style={{ color: "#c8102e" }}
            >
              “
            </span>
            <div className="flex justify-center gap-1 text-[#c8102e] text-sm mb-5">
              {"★★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
            <p className="text-lg md:text-xl text-navy leading-relaxed">
              {t.quote}
            </p>
            <footer className="mt-8">
              <p className="font-semibold text-navy text-lg">{t.name}</p>
              <p className="text-sm text-navy-soft mt-1">{t.role}</p>
            </footer>
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {testimonials.map((person, idx) => (
              <button
                key={person.name}
                type="button"
                onClick={() => setActive(idx)}
                className={`flex items-center gap-3 border px-3 py-2 transition-colors cursor-pointer ${
                  idx === active
                    ? "border-crimson bg-white"
                    : "border-line bg-white/60 hover:border-navy/30"
                }`}
              >
                <span className="relative h-10 w-10 overflow-hidden rounded-full bg-line">
                  <Image
                    src={`https://images.unsplash.com/photo-${
                      [
                        "1559839734-2b71ea197ec2",
                        "1612349317150-e413f6a5b16d",
                        "1594824476967-48c8b964273f",
                        "1622253692010-333f2da6031d",
                      ][idx]
                    }?auto=format&fit=crop&w=100&q=80`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </span>
                <span className="text-left hidden sm:block">
                  <span className="block text-sm font-semibold text-navy">
                    {person.name}
                  </span>
                  <span className="block text-xs text-navy-soft">{person.role}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() =>
                setActive((v) => (v - 1 + testimonials.length) % testimonials.length)
              }
              className="h-10 w-10 border border-line bg-white text-navy hover:bg-navy hover:text-white transition-colors cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => setActive((v) => (v + 1) % testimonials.length)}
              className="h-10 w-10 border border-line bg-white text-navy hover:bg-navy hover:text-white transition-colors cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
