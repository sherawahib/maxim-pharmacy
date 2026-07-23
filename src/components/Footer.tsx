import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-[#091a30] text-white">
      <div className="wrap py-14 grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Maxim Pharmacy"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="font-display text-xl">
              Maxim <span className="text-[#9ec0e8]">Pharmacy</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-sm">
            {site.tagline}. Licensed pharmacists, secure delivery, and care you can
            count on.
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-white/40">
            Upcoming Vaccination Clinic
          </p>
          <p className="mt-1 text-sm text-white/70">
            Preregistration & info available —{" "}
            <Link href="/contact" className="text-white underline underline-offset-2">
              Contact Us
            </Link>
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-4">
            Navigation
          </p>
          <ul className="space-y-2.5 text-sm text-white/75">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/transfer" className="hover:text-white transition-colors">
                Transfer a Prescription
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-4">
            Contact Info
          </p>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{site.location}</li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-4">
            Subscribe to Our Newsletter
          </p>
          <p className="text-sm text-white/60 mb-4">
            Health tips and pharmacy updates — no spam.
          </p>
          <form className="flex flex-col sm:flex-row gap-2" action="#" method="post">
            <input
              type="email"
              required
              placeholder="Your email"
              className="min-h-11 flex-1 border border-white/20 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-white/45">
          <p>Copyright © {new Date().getFullYear()} Maxim Pharmacy. All Rights Reserved.</p>
          <p>Licensed pharmacy · Secure checkout · HIPAA-aware care</p>
        </div>
      </div>
    </footer>
  );
}
