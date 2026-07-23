import { trustItems } from "@/lib/content";

const icons = {
  shipping: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7V10z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M3 10h18" />
    </svg>
  ),
  guarantee: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12a8 8 0 0116 0v5a2 2 0 01-2 2h-2v-6h4M4 13h4v6H6a2 2 0 01-2-2v-4z" />
    </svg>
  ),
};

const iconMap = {
  shipping: icons.shipping,
  payment: icons.payment,
  guarantee: icons.guarantee,
  support: icons.support,
} as const;

export function TrustStrip() {
  return (
    <section className="relative z-20">
      <div className="wrap -mt-0 md:-mt-8">
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 border border-line shadow-[0_18px_50px_-28px_rgba(12,35,64,0.45)]">
          {trustItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white p-5 md:p-6 hover:bg-bg transition-colors"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center text-white"
                style={{ background: "#1b4f82" }}
              >
                {iconMap[item.id]}
              </div>
              <div>
                <h3 className="font-semibold text-navy text-sm md:text-base leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-navy-soft">{item.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
