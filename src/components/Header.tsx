"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled
          ? "border-line bg-white/95 shadow-sm backdrop-blur-md"
          : "border-line/70 bg-white"
      }`}
    >
      <div className="hidden md:block bg-navy text-white">
        <div className="wrap flex h-9 items-center justify-between text-xs">
          <p className="text-white/70">{site.hours}</p>
          <div className="flex items-center gap-5">
            <a href={site.phoneHref} className="hover:text-white text-white/80">
              {site.phone}
            </a>
            <a href={site.emailHref} className="hover:text-white text-white/80">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="wrap flex h-16 md:h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="Maxim Pharmacy"
            width={52}
            height={52}
            className="h-11 w-11 object-contain"
            priority
          />
          <div>
            <p className="font-display text-xl leading-none text-navy">
              Maxim <span className="text-blue">Pharmacy</span>
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-navy-soft">
              Licensed · Trusted · Local
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-crimson" : "text-navy-soft hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/transfer" className="btn btn-primary">
            Transfer Rx
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-line bg-white cursor-pointer"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex w-4 flex-col gap-1">
            <span className={`h-px bg-navy transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`h-px bg-navy transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-px bg-navy transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-white">
          <nav className="wrap flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line py-3 text-base font-medium text-navy"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/transfer"
              className="btn btn-primary mt-4"
              onClick={() => setOpen(false)}
            >
              Transfer Prescription
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
