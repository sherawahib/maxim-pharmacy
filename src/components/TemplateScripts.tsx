"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    jQuery?: any;
    WOW?: any;
  }
}

export function TemplateScripts() {
  useEffect(() => {
    // hide preloader if present
    const mask = document.querySelector(".loader-mask") as HTMLElement | null;
    if (mask) {
      mask.style.opacity = "0";
      setTimeout(() => {
        mask.style.display = "none";
      }, 400);
    }
  }, []);

  return (
    <>
      <Script src="/assets/js/jquery-3.7.1.min.js" strategy="afterInteractive" />
      <Script
        src="/assets/js/popper.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          const s = document.createElement("script");
          s.src = "/assets/js/bootstrap.min.js";
          document.body.appendChild(s);
        }}
      />
      <Script
        src="/assets/js/wow.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            if (window.WOW) new window.WOW().init();
          } catch {
            /* ignore */
          }
        }}
      />
      <Script src="/assets/js/owl.carousel.js" strategy="lazyOnload" />
      <Script src="/assets/js/carousel.js" strategy="lazyOnload" />
      <Script src="/assets/js/search.js" strategy="lazyOnload" />
      <Script src="/assets/js/country_dropdown.js" strategy="lazyOnload" />
      <Script src="/assets/js/back-to-top-button.js" strategy="lazyOnload" />
      <Script src="/assets/js/counter.js" strategy="lazyOnload" />
    </>
  );
}
