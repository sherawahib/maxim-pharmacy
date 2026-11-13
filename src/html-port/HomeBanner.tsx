"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/html-port/SiteHeader";

const pillars = ["Health", "Trust", "Online"];

const trust = [
  {
    label: "Licensed pharmacy",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3.2 9.3v-1.1c0-1.27 2.13-1.95 3.2-1.95s3.2.68 3.2 1.95v1.1H8.8z"
        />
      </svg>
    ),
  },
  {
    label: "Fast delivery",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 7h11v8H3V7zm12 2h3.2L21 13.2V15h-6V9zM6.5 17.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zm10 0a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5z"
        />
      </svg>
    ),
  },
  {
    label: "Pharmacist support",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-7 8v-1.2C5 16.1 8.1 15 12 15s7 1.1 7 3.8V20H5zm13.5-9.5V9h-1.5v1.5H15v1.5h1.5V13.5H18V12h1.5V10.5H18z"
        />
      </svg>
    ),
  },
  {
    label: "Secure checkout",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm3 10.2A1.7 1.7 0 1 1 13.7 14.5 1.7 1.7 0 0 1 12 16.2z"
        />
      </svg>
    ),
  },
];

export function HomeBanner() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="home_banner_outer float-left w-100 main-box position-relative">
      <SiteHeader />

      <div className="padding-rl float-left w-100">
        <section
          className={`float-left w-100 banner-con mx-banner position-relative br-30 ${
            ready ? "is-ready" : ""
          }`}
        >
          <img
            src="/assets/images/banner-bg-img.jpg"
            alt=""
            className="mx-banner__photo"
            aria-hidden="true"
          />
          <div className="mx-banner__overlay" aria-hidden="true" />
          <div className="mx-banner__glow" aria-hidden="true" />
          <div className="mx-banner__orb mx-banner__orb--1" aria-hidden="true" />
          <div className="mx-banner__orb mx-banner__orb--2" aria-hidden="true" />
          <div className="mx-banner__grid" aria-hidden="true" />

          <div className="wrapper1560">
            <div className="row align-items-start mx-banner__top g-3 g-lg-4">
              <div className="col-12 col-lg-8">
                <div className="banner-content-left-con mx-banner__left">
                  <ul className="list-unstyled d-flex mx-banner__pills">
                    {pillars.map((p) => (
                      <li className="d-inline-block position-relative" key={p}>
                        <i className="fa-solid fa-circle" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <h1>
                    Instant Pharmacy
                    <br />
                    Access For You
                  </h1>

                  <p className="mx-banner__left-note">
                    Licensed pharmacists · Secure delivery · Everyday wellness —
                    order prescription and OTC medicines online with confidence.
                  </p>

                  <div className="mx-banner__actions">
                    <Link href="/shop" className="mx-banner__btn mx-banner__btn--primary">
                      <i className="fas fa-shopping-bag" aria-hidden="true" />
                      Shop Now
                    </Link>
                    <Link href="/vaccinations" className="mx-banner__btn mx-banner__btn--ghost">
                      <i className="fas fa-syringe" aria-hidden="true" />
                      Vaccination Clinics
                    </Link>
                    <Link href="/transfer" className="mx-banner__btn mx-banner__btn--ghost">
                      <i className="fas fa-exchange-alt" aria-hidden="true" />
                      Transfer Rx
                    </Link>
                    <button
                      type="button"
                      className="mx-banner__btn mx-banner__btn--ghost"
                      onClick={() => inputRef.current?.click()}
                    >
                      <i className="fas fa-upload" aria-hidden="true" />
                      Upload Prescription
                    </button>
                    <input
                      ref={inputRef}
                      type="file"
                      hidden
                      accept="image/*,.pdf"
                      onChange={(e) =>
                        setFileName(e.target.files?.[0]?.name || "")
                      }
                    />
                  </div>

                  {fileName ? (
                    <div className="mx-banner__file">
                      <i className="fa-solid fa-file-medical" />
                      <span>{fileName}</span>
                      <button
                        type="button"
                        onClick={() => setFileName("")}
                        aria-label="Remove file"
                      >
                        ✕
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between imgz-outer-con position-relative mx-banner__media">
              <div className="mx-banner__trust-float">
                <i className="fa-solid fa-circle-check" />
                <div>
                  <strong>Trusted Drug Store</strong>
                  <span>Verified products · Secure checkout</span>
                </div>
              </div>

              <figure className="mx-banner__shot mx-banner__shot--a">
                <img
                  src="/assets/images/banner-img1.jpg"
                  alt="Maxim Pharmacy pick-up counter"
                  className="img-fluid"
                />
                <span className="mx-banner__shot-label">Pick-up desk</span>
              </figure>
              <figure className="mx-banner__shot mx-banner__shot--b">
                <img
                  src="/assets/images/banner-img2.jpg"
                  alt="Pain relief aisle at Maxim Pharmacy"
                  className="img-fluid"
                />
                <span className="mx-banner__shot-label">In-store aisle</span>
              </figure>
            </div>

            <ul className="mx-banner__trust list-unstyled">
              {trust.map((item) => (
                <li key={item.label}>
                  <span className="mx-banner__trust-icon notranslate" aria-hidden="true">
                    {item.svg}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
