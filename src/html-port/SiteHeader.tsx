"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/html-port/CartProvider";
import { LanguageSwitcher } from "@/html-port/LanguageSwitcher";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/vaccinations", label: "Vaccinations" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className={`mx-header-wrap padding-rl float-left w-100 ${scrolled ? "is-sticky" : ""}`}>
        <div className="mx-topbar d-none d-lg-block">
          <div className="mx-topbar__inner">
            <div className="mx-topbar__left">
              <span>
                <i className="fa-solid fa-clock" /> Mon – Sat: 9:00 am – 6:00 pm
              </span>
              <span className="mx-topbar__dot" />
              <span>
                <i className="fa-solid fa-location-dot" /> USA · Licensed Pharmacy
              </span>
            </div>
            <div className="mx-topbar__right">
              <a href="tel:+11234567890">
                <i className="fa-solid fa-phone" /> +1 123 456 7890
              </a>
              <a href="mailto:info@maximpharmacy.com">
                <i className="fa-solid fa-envelope" /> info@maximpharmacy.com
              </a>
            </div>
          </div>
        </div>

        <header className={`mx-header header-con w-100 float-left position-relative main-box ${scrolled ? "is-scrolled" : ""}`}>
          <div className="container-fluid">
            <nav className="mx-nav navbar navbar-expand-lg navbar-light">
              <Link className="mx-brand navbar-brand" href="/">
                <figure className="mb-0">
                  <img src="/assets/images/logo.png" alt="Maxim Pharmacy" />
                </figure>
                <span className="mx-brand__text">
                  <strong>Maxim</strong>
                  <em>Pharmacy</em>
                </span>
              </Link>

              <div className="mx-nav__desktop d-none d-lg-flex">
                <ul className="navbar-nav mx-nav__links">
                  {nav.map((item) => (
                    <li className="nav-item" key={item.href}>
                      <Link
                        className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="header-contact mx-actions d-flex align-items-center">
                <div className="last_list mx-icons">
                  <button
                    type="button"
                    className="mx-icon-btn search ml-0"
                    aria-label="Search"
                    onClick={() => setSearchOpen(true)}
                  >
                    <img src="/assets/images/header-search.png" alt="" />
                  </button>
                  <Link className="cart" href="/cart" aria-label={`Cart, ${ready ? itemCount : 0} items`}>
                    <img src="/assets/images/header-cart.png" alt="" />
                    <span>{ready ? itemCount : 0}</span>
                  </Link>
                  <Link className="admin mr-0 d-none d-md-inline-flex" href="/contact" aria-label="Account">
                    <img src="/assets/images/header-admin.png" alt="" />
                  </Link>
                </div>

                <Link href="/transfer" className="contact-btn mx-cta d-none d-md-inline-block">
                  Transfer a Prescription
                </Link>

                <LanguageSwitcher className="d-none d-lg-block" />

                <button
                  type="button"
                  className={`mx-burger d-lg-none ${menuOpen ? "is-open" : ""}`}
                  aria-label="Menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <span />
                  <span />
                  <span />
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <div className={`mx-mobile ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mx-mobile__panel">
          <div className="mx-mobile__head">
            <span>Menu</span>
            <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              ✕
            </button>
          </div>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" onClick={() => setMenuOpen(false)}>
                Cart{ready && itemCount > 0 ? ` (${itemCount})` : ""}
              </Link>
            </li>
          </ul>
          <div className="mx-mobile__lang">
            <p>Language / Ngôn ngữ</p>
            <LanguageSwitcher compact />
          </div>
          <a href="tel:+11234567890" className="mx-mobile__phone">
            <i className="fa-solid fa-phone" /> +1 123 456 7890
          </a>
          <Link href="/transfer" className="contact-btn mx-mobile__cta" onClick={() => setMenuOpen(false)}>
            Transfer a Prescription
          </Link>
        </div>
        <button
          type="button"
          className="mx-mobile__backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      </div>

      <div className={`mx-search ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
        <button
          type="button"
          className="mx-search__close"
          aria-label="Close search"
          onClick={() => setSearchOpen(false)}
        >
          ✕
        </button>
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setSearchOpen(false);
            window.location.href = "/shop";
          }}
        >
          <p>Search medicines & wellness</p>
          <input name="q" type="search" placeholder="Type to search…" autoFocus={searchOpen} />
          <button type="submit" className="primary_btn">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
