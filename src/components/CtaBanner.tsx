import Link from "next/link";
import { site } from "@/lib/content";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_50%,#1b4f82,transparent_45%),radial-gradient(circle_at_80%_30%,#c8102e55,transparent_40%)]" />
      <div className="wrap relative py-14 md:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9ec0e8]">
            Pharmacist support
          </p>
          <h2 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
            Do you want to speak with one of our pharmacists? Contact Us Today!
          </h2>
          <p className="mt-3 text-white/65">
            {site.hours}. Or check upcoming vaccination clinic preregistration & info.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Contact Us Today
          </Link>
          <Link href="/transfer" className="btn btn-outline-white">
            Transfer Rx
          </Link>
        </div>
      </div>
    </section>
  );
}
