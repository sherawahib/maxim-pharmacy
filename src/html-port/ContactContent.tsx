"use client";

import { FormEvent, useState } from "react";
import { CtaAdvanced } from "@/html-port/CtaAdvanced";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";

const info = [
  {
    title: "Visit us",
    lines: ["121 King Street, Melbourne", "Victoria 3000, Australia"],
    icon: "fa-location-dot",
    href: "https://maps.google.com",
  },
  {
    title: "Email",
    lines: ["info@maximpharmacy.com", "support@maximpharmacy.com"],
    icon: "fa-envelope",
    href: "mailto:info@maximpharmacy.com",
  },
  {
    title: "Call",
    lines: ["+1 123 456 7890", "Mon–Sat support line"],
    icon: "fa-phone",
    href: "tel:+11234567890",
  },
  {
    title: "Hours",
    lines: ["Mon–Fri 9am–6pm", "Sat–Sun 12pm–5pm"],
    icon: "fa-clock",
    href: undefined,
  },
];

export function ContactContent() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <SubBannerAdvanced
        title="Contact"
        description="Need help with prescriptions, orders, or delivery? Our licensed team is ready to assist quickly."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        image="/assets/images/main-abt-img1.jpg"
      />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-contact">
          <div className="main-container">
            <div className="heading-title-con text-center">
              <span className="special-text d-inline-block">Contact Info</span>
              <h2 className="mb-0">Reach Maxim Pharmacy</h2>
              <p className="mx-contact__sub">
                Clear channels for patients, caregivers, and clinic partners.
              </p>
            </div>

            <div className="mx-contact__cards">
              {info.map((item) => {
                const inner = (
                  <>
                    <span className="mx-contact__icon" aria-hidden="true">
                      <i className={`fas ${item.icon}`} />
                    </span>
                    <h6>{item.title}</h6>
                    {item.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </>
                );
                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    className="mx-contact__card text-decoration-none"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.title} className="mx-contact__card">
                    {inner}
                  </div>
                );
              })}
            </div>

            <div className="mx-contact__panel">
              <div className="mx-contact__panel-copy">
                <span className="special-text d-inline-block">Get in touch</span>
                <h3>Send us a message</h3>
                <p>
                  Tell us what you need — prescription questions, order help, or
                  vaccination clinic info — and we’ll follow up promptly.
                </p>
              </div>

              <form className="mx-contact__form" onSubmit={onSubmit}>
                <div className="mx-contact__grid">
                  <label>
                    <span>Name</span>
                    <input type="text" name="name" required placeholder="Your name" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input type="email" name="email" required placeholder="you@email.com" />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input type="tel" name="phone" placeholder="+1 123 456 7890" />
                  </label>
                  <label className="mx-contact__full">
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="How can we help?"
                    />
                  </label>
                </div>
                <button type="submit" className="primary_btn">
                  {sent ? "Message Sent" : "Send Message"}
                </button>
                {sent ? (
                  <p className="mx-contact__thanks">
                    Thanks — our team will get back to you shortly.
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>
      </div>

      <div className="padding-rl float-left w-100">
        <div className="mx-contact__map br-30">
          <iframe
            title="Maxim Pharmacy location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.367176743588!2d144.95736461590413!3d-37.81813957974638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65cbce858f6d7%3A0x9cc486b305ba3fb1!2s21%20King%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2s!4v1669200882885!5m2!1sen!2s"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="spacer" />
      <CtaAdvanced />
    </>
  );
}
