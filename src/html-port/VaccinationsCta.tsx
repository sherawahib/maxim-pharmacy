import Link from "next/link";

const forms = [
  {
    href: "/vaccinations/register",
    label: "Walk-in registration",
    icon: "fa-syringe",
    primary: true,
  },
  {
    href: "/vaccinations/home-visit",
    label: "Home visit request",
    icon: "fa-house-medical",
  },
  {
    href: "/vaccinations/clinic-inquiry",
    label: "On-site clinic inquiry",
    icon: "fa-building",
  },
] as const;

export function VaccinationsCta() {
  return (
    <div className="padding-rl float-left w-100">
      <section className="mx-vax-cta br-30">
        <div className="mx-vax-cta__glow" aria-hidden="true" />
        <div className="container position-relative">
          <div className="mx-vax-cta__inner">
            <span className="mx-vax-cta__eyebrow">Vaccination forms</span>
            <h2>
              Register online
              <span>before your visit</span>
            </h2>
            <p>
              Walk-in vaccines Mon–Fri 10am–5pm. Choose a form — walk-in registration, home visit,
              or host an on-site clinic.
            </p>

            <div className="mx-vax-cta__actions">
              {forms.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mx-vax-cta__btn ${
                    "primary" in item && item.primary
                      ? "mx-vax-cta__btn--primary"
                      : "mx-vax-cta__btn--ghost"
                  }`}
                >
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </div>

            <Link href="/vaccinations" className="mx-vax-cta__all">
              View clinics & coverage
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
