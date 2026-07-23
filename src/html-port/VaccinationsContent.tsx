"use client";

import Link from "next/link";
import { CtaAdvanced } from "@/html-port/CtaAdvanced";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";

const clinics = [
  {
    when: "July — In-store Mon–Fri, 10:00 AM – 5:00 PM",
    where: "Maxim Pharmacy · 126 High St (MA RT1A/133), Ipswich, MA 01938",
    vaccines:
      "2025–2026 Pfizer 12yrs+ & Moderna 12yrs+ COVID, RSV, Pneumonia, Shingles, Tetanus (TDaP), Hep B, MMR, HPV",
    register: "/vaccinations/register",
    registerInternal: true,
  },
  {
    when: "September 19, 2026 · 2:00 PM – 4:30 PM",
    where: "Benchmark at Shrewsbury Crossing (Residents & Staff)",
    vaccines: "COVID, Flu, Pneumonia, RSV, Shingles, TDaP, Hep-B, MMR, HPV",
    register: "https://form.jotform.com/261976033765163",
  },
  {
    when: "October 14, 2026 · 10:00 AM – Noon",
    where: "Georgetown COA, 51 North St, Georgetown, MA",
    vaccines: "COVID, Flu, Pneumonia, RSV, Shingles, TDaP, Hep-B, MMR, HPV",
    register: "https://form.jotform.com/261966322866165",
  },
  {
    when: "October 16, 2026 · 7:30–9:30 AM & 11:30 AM–1:30 PM",
    where: "Brooks School (Students & Staff), N. Andover",
    vaccines: "COVID, Flu, Pneumonia, RSV, Shingles, TDaP, Hep-B, MMR, HPV",
    register: "https://form.jotform.com/261975640409161",
  },
  {
    when: "October 20, 2026 · 2:00 PM – 4:00 PM",
    where: "Newbury Town Hall Council on Aging, 12 Kent Way, Byfield, MA",
    vaccines: "COVID, Flu, Pneumonia, RSV, Shingles, TDaP, Hep-B, MMR, HPV",
    register: "https://form.jotform.com/261974224181155",
  },
];

const coverage = [
  {
    name: "Shingrix (Shingles)",
    patients:
      "50yrs and older (anyone). 19yrs and older with immune compromise from disease or therapy.",
    insurance: "Medicare D is $0 copay; fully covered by most insurance plans.",
  },
  {
    name: "RSV (Respiratory syncytial virus)",
    patients:
      "All adults 75+ (mResvia). Adults 50+ with certain chronic conditions (asthma, COPD, heart disease, severe diabetes). Pregnant patients 32–36 weeks during September–January (Abrysvo).",
    insurance: "Covered by most Medicare D plans and insurances.",
  },
  {
    name: "Prevnar / Capvaxive (Pneumonia)",
    patients:
      "50yrs and older (anyone). Ages 19–50 with qualifying conditions (chronic heart/lung/liver disease, diabetes, smoking, immunosuppression, and other listed risk factors).",
    insurance: "Medicare B is $0 copay; fully covered by most insurance plans.",
  },
  {
    name: "Boostrix (Tdap)",
    patients: "10yrs and older (every 10 years). Pregnant women (3rd trimester).",
    insurance: "Medicare D is $0 copay; fully covered by most insurance plans.",
  },
];

const quickLinks = [
  {
    title: "Walk-in registration",
    blurb: "Fill our online vaccine registration form before you visit.",
    href: "/vaccinations/register",
    icon: "fa-syringe",
    internal: true,
  },
  {
    title: "Home visit request",
    blurb: "Request an in-home vaccination — we’ll do our best to accommodate.",
    href: "/vaccinations/home-visit",
    icon: "fa-house-medical",
    internal: true,
  },
  {
    title: "Clinic preregistration",
    blurb: "Reserve a spot at an upcoming community clinic.",
    href: "https://form.jotform.com/261976033765163",
    icon: "fa-calendar-check",
  },
  {
    title: "On-site clinic inquiry",
    blurb: "Businesses, schools, and groups — request a clinic.",
    href: "/vaccinations/clinic-inquiry",
    icon: "fa-building",
    internal: true,
  },
  {
    title: "MA digital vaccine card",
    blurb: "Access records via myvaxrecords.mass.gov.",
    href: "https://myvaxrecords.mass.gov",
    icon: "fa-id-card",
  },
];

export function VaccinationsContent() {
  return (
    <>
      <SubBannerAdvanced
        title="Vaccination Clinics"
        description="Walk-in vaccines Mon–Fri 10am–5pm, plus upcoming community clinics. No appointment needed for in-store visits."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Vaccinations" },
        ]}
        image="/assets/images/s2.jpg"
      />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-vax">
          <div className="main-container">
            <div className="mx-vax__alert">
              <div>
                <span className="mx-vax__eyebrow">Available now</span>
                <h2>2025/2026 COVID vaccines in stock</h2>
                <p>
                  Pfizer (Comirnaty) and Moderna (mNexspike), plus RSV, pneumonia, shingles,
                  Hepatitis-B, MMR, and TDaP — administered Monday–Friday, 10am–5pm, all year.
                </p>
              </div>
              <p className="mx-vax__walkin">
                <i className="fa-solid fa-person-walking" aria-hidden="true" />
                No appointment needed — just walk in
              </p>
            </div>

            <div className="mx-vax__links">
              {quickLinks.map((item) => {
                const inner = (
                  <>
                    <span className="mx-vax__link-icon" aria-hidden="true">
                      <i className={`fa-solid ${item.icon}`} />
                    </span>
                    <strong>{item.title}</strong>
                    <em>{item.blurb}</em>
                  </>
                );
                return item.internal ? (
                  <Link key={item.title} href={item.href} className="mx-vax__link">
                    {inner}
                  </Link>
                ) : (
                  <a
                    key={item.title}
                    href={item.href}
                    className="mx-vax__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                );
              })}
            </div>

            <div className="mx-vax__head">
              <span className="special-text d-inline-block">Schedule</span>
              <h2>Upcoming vaccination clinics</h2>
              <p>
                Community and in-store clinics for COVID, flu, and other recommended vaccines.
                Bring your ID, insurance card, and Medicare card when you visit.
              </p>
            </div>

            <div className="mx-vax__table-wrap">
              <table className="mx-vax__table">
                <thead>
                  <tr>
                    <th>Date / Time</th>
                    <th>Location</th>
                    <th>Vaccines available</th>
                    <th>Registration</th>
                  </tr>
                </thead>
                <tbody>
                  {clinics.map((row) => (
                    <tr key={row.when}>
                      <td data-label="Date / Time">{row.when}</td>
                      <td data-label="Location">{row.where}</td>
                      <td data-label="Vaccines">{row.vaccines}</td>
                      <td data-label="Registration">
                        {"registerInternal" in row && row.registerInternal ? (
                          <Link href={row.register} className="mx-vax__reg">
                            Register online
                          </Link>
                        ) : (
                          <a
                            href={row.register}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-vax__reg"
                          >
                            Register
                            <i className="fa-solid fa-arrow-up-right-from-square" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mx-vax__note">
              <i className="fa-solid fa-circle-info" aria-hidden="true" />
              <p>
                For a speedier walk-in visit,{" "}
                <Link href="/vaccinations/register">complete our online registration form</Link>{" "}
                before you arrive. Questions? Call{" "}
                <a href="tel:+19783562121">978-356-2121</a> or{" "}
                <Link href="/contact">contact us</Link>.
              </p>
            </div>

            <div className="mx-vax__head mx-vax__head--gap">
              <span className="special-text d-inline-block">Coverage guide</span>
              <h2>Who should get vaccinated</h2>
              <p>Common adult vaccines, recommended patients, and typical insurance coverage.</p>
            </div>

            <div className="mx-vax__cards">
              {coverage.map((item) => (
                <article key={item.name} className="mx-vax__card">
                  <h3>{item.name}</h3>
                  <p>
                    <strong>Recommended:</strong> {item.patients}
                  </p>
                  <p>
                    <strong>Insurance:</strong> {item.insurance}
                  </p>
                </article>
              ))}
            </div>

            <div className="mx-vax__footer-cta">
              <div>
                <h3>Walk-in vaccines Monday–Friday, 10am–5pm</h3>
                <p>
                  COVID, RSV, Shingles, Pneumonia, TDaP, Hepatitis-B, MMR &amp; HPV — all year at
                  our pharmacy counter.
                </p>
              </div>
              <div className="mx-vax__footer-actions">
                <Link href="/vaccinations/register" className="mx-vax__reg mx-vax__reg--lg">
                  Walk-in registration
                </Link>
                <a
                  href="https://myvaxrecords.mass.gov"
                  className="mx-vax__ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MA vaccine records
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CtaAdvanced />
    </>
  );
}
