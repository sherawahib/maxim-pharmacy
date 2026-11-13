"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/vaccinations", label: "Vaccinations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const locations = [
  "Downtown Pharmacy",
  "South Florida Pharmacy",
  "Miami Lakes Pharmacy",
  "West Palm Pharmacy",
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  };

  return (
    <>
      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 footer-con position-relative br-30 padding-rl-responsive mx-footer">
          <div className="mx-footer__glow" aria-hidden="true" />

          <div className="main-container position-relative">
            <div className="mx-footer__cta">
              <div>
                <p className="mx-footer__eyebrow">Pharmacist support</p>
                <h3>Need help transferring a prescription?</h3>
                <p>Our licensed team is ready — call or start online in minutes.</p>
              </div>
              <div className="mx-footer__cta-actions">
                <Link href="/transfer" className="mx-footer__btn-primary">
                  Transfer a Prescription
                </Link>
                <a href="tel:+11234567890" className="mx-footer__btn-ghost">
                  Call +1 123 456 7890
                </a>
              </div>
            </div>

            <div className="middle_portion mx-footer__main">
              <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="logo-content mx-footer__brand">
                    <Link href="/" className="footer-logo d-flex align-items-center">
                      <img
                        src="/assets/images/logo.png"
                        alt="Maxim Pharmacy"
                        className="d-inline-block"
                      />
                      <span className="mx-footer__brand-text">
                        Maxim <em>Pharmacy</em>
                      </span>
                    </Link>
                    <p className="mx-footer__blurb">
                      Trusted care, delivered with confidence. Licensed pharmacists,
                      secure checkout, and local delivery.
                    </p>
                    <h4>Subscribe to Our Newsletter</h4>
                    <form onSubmit={onSubmit}>
                      <div className="form-group position-relative mb-0 mx-footer__form">
                        <input
                          type="email"
                          className="form_style"
                          placeholder="Enter email address"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setDone(false);
                            setEmail(e.target.value);
                          }}
                          required
                        />
                        <button type="submit" aria-label="Subscribe">
                          <i className="fa-solid fa-paper-plane" />
                        </button>
                      </div>
                      {done ? (
                        <p className="mx-footer__thanks">Thanks — you’re on the list.</p>
                      ) : (
                        <p className="mx-footer__hint">Health tips only. No spam.</p>
                      )}
                    </form>
                  </div>
                </div>

                <div className="col-lg-2 col-md-4 col-sm-6 col-12">
                  <div className="links mx-footer__col">
                    <h4 className="heading">Navigation</h4>
                    <ul className="list-unstyled mb-0">
                      {nav.map((item) => (
                        <li key={item.href}>
                          <i className="fa-solid fa-arrow-right" />
                          <Link href={item.href} className="text-decoration-none">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <i className="fa-solid fa-arrow-right" />
                        <Link href="/transfer" className="text-decoration-none">
                          Transfer Rx
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="contact mx-footer__col">
                    <h4 className="heading">Contact Info</h4>
                    <ul className="list-unstyled mb-0">
                      <li className="text">
                        <i className="fa-solid fa-phone-flip" />
                        <a href="tel:+11234567890" className="text-decoration-none">
                          +1 123 456 7890
                        </a>
                      </li>
                      <li className="text">
                        <i className="fa-solid fa-envelope" />
                        <a
                          href="mailto:info@maximpharmacy.com"
                          className="text-decoration-none"
                        >
                          info@maximpharmacy.com
                        </a>
                      </li>
                      <li className="text">
                        <i className="fa-solid fa-location-dot" />
                        <span className="address mb-0">USA</span>
                      </li>
                      <li className="text">
                        <i className="fa-solid fa-clock" />
                        <p className="address mb-0">Mon - Sat: 9:00 am to 6:00 pm</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-12 col-12">
                  <div className="mx-footer__col mx-footer__locations">
                    <h4 className="heading">Locations</h4>
                    <ul className="list-unstyled mb-0">
                      {locations.map((loc) => (
                        <li key={loc}>{loc}</li>
                      ))}
                    </ul>
                    <div className="icon mx-footer__social">
                      <ul className="list-unstyled mb-0 social-icons">
                        <li>
                          <a
                            href="https://www.facebook.com/"
                            className="text-decoration-none"
                            aria-label="Facebook"
                          >
                            <i className="fa-brands fa-facebook-f social-networks" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://instagram.com/"
                            className="text-decoration-none"
                            aria-label="Instagram"
                          >
                            <i className="fa-brands fa-instagram social-networks" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.linkedin.com/"
                            className="text-decoration-none"
                            aria-label="LinkedIn"
                          >
                            <i className="fa-brands fa-linkedin social-networks" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="copyright d-flex justify-content-between align-items-center padding-rl-responsive mx-footer__copy">
              <p className="mb-0">
                Copyright © {new Date().getFullYear()} Maxim Pharmacy. All Rights
                Reserved.
              </p>
              <div className="mx-footer__copy-right">
                <span>Licensed · Secure · HIPAA-aware</span>
                <img
                  src="/assets/images/payment-cards.png"
                  alt="Accepted payment cards"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="spacer" />
    </>
  );
}
