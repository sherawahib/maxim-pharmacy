import { trustItems } from "@/lib/content";

const marqueeItems = [
  ...trustItems.map((t) => t.title),
  "Licensed Pharmacists",
  "HIPAA-Aware Handling",
  "Same-Day Local Options",
  "Insurance Friendly",
];

export function TrustMarquee() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative overflow-hidden border-y border-line bg-surface">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

      <div className="py-5 flex whitespace-nowrap marquee-track w-max">
        {loop.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-4 px-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-ink/70">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
