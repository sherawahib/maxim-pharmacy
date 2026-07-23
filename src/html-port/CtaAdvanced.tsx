import Link from "next/link";

export function CtaAdvanced() {
  return (
    <div className="padding-rl float-left w-100">
      <section className="btnnnnn_sec mx-cta-banner position-relative br-30">
        <img
          src="/assets/images/work-img-modern.jpg"
          alt=""
          className="mx-cta-banner__photo"
          aria-hidden="true"
        />
        <div className="mx-cta-banner__overlay" aria-hidden="true" />
        <div className="mx-cta-banner__bg" aria-hidden="true" />

        <div className="container position-relative">
          <div className="mx-cta-banner__inner">
            <span className="mx-cta-banner__eyebrow">Pharmacist support</span>
            <h2>
              Want to speak with one of our pharmacists?
              <span>Contact us today.</span>
            </h2>
            <p className="mx-cta-banner__sub">
              Get clear answers on prescriptions, OTC picks, and upcoming
              vaccination clinics — from a licensed team that actually picks up.
            </p>

            <div className="mx-cta-banner__actions">
              <Link href="/contact" className="mx-cta-banner__btn mx-cta-banner__btn--primary">
                Contact Us
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
              <Link href="/shop" className="mx-cta-banner__btn mx-cta-banner__btn--ghost">
                <i className="fa-solid fa-syringe" aria-hidden="true" />
                Vaccination Clinic Info
              </Link>
            </div>

            <div className="mx-cta-banner__meta">
              <a href="tel:+11234567890" className="mx-cta-banner__meta-item">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                +1 123 456 7890
              </a>
              <span className="mx-cta-banner__meta-sep" aria-hidden="true" />
              <span className="mx-cta-banner__meta-item">
                <i className="fa-regular fa-clock" aria-hidden="true" />
                Mon–Sat · 9am–6pm
              </span>
              <span className="mx-cta-banner__meta-sep" aria-hidden="true" />
              <span className="mx-cta-banner__meta-item">
                <i className="fa-solid fa-shield-heart" aria-hidden="true" />
                Licensed pharmacists
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
