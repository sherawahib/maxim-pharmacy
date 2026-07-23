"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const forms = [
  {
    id: "walkin",
    href: "/vaccinations/register",
    tabLabel: "Walk-in",
    title: "Walk-in registration",
    hint: "Fill the vaccine form before your in-store visit.",
    icon: "fa-syringe",
    tone: "red" as const,
  },
  {
    id: "home",
    href: "/vaccinations/home-visit",
    tabLabel: "Home",
    title: "Home visit request",
    hint: "Request an in-home vaccination — we’ll do our best to accommodate.",
    icon: "fa-house-medical",
    tone: "navy" as const,
  },
  {
    id: "clinic",
    href: "/vaccinations/clinic-inquiry",
    tabLabel: "Clinic",
    title: "On-site clinic inquiry",
    hint: "Host a vaccine clinic at your workplace, school, or community site.",
    icon: "fa-building",
    tone: "teal" as const,
  },
];

export function FloatingVaccines() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("mx-vax-float-hidden") === "1") {
        setHidden(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const hide = () => {
    setHidden(true);
    try {
      sessionStorage.setItem("mx-vax-float-hidden", "1");
    } catch {
      /* ignore */
    }
  };

  if (hidden) return null;

  return (
    <aside className="mx-float-vax" aria-label="Vaccination forms">
      <button
        type="button"
        className="mx-float-vax__close"
        onClick={hide}
        aria-label="Hide vaccination forms"
      >
        <i className="fa-solid fa-xmark" />
      </button>

      <ul className="mx-float-vax__list">
        {forms.map((f, i) => {
          const isOpen = openId === f.id;
          return (
            <li
              key={f.id}
              className={`mx-float-vax__item mx-float-vax__item--${f.tone} ${
                isOpen ? "is-open" : ""
              }`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              onMouseEnter={() => setOpenId(f.id)}
              onMouseLeave={() => setOpenId(null)}
            >
              <button
                type="button"
                className="mx-float-vax__tab"
                aria-expanded={isOpen}
                aria-controls={`vax-panel-${f.id}`}
                onClick={() => setOpenId(isOpen ? null : f.id)}
              >
                <i className={`fa-solid ${f.icon}`} aria-hidden="true" />
                <span className="mx-float-vax__tab-label">{f.tabLabel}</span>
              </button>

              <div
                id={`vax-panel-${f.id}`}
                className="mx-float-vax__panel"
                role="region"
                aria-label={f.title}
              >
                <div className="mx-float-vax__card">
                  <span className="mx-float-vax__eyebrow">Vaccinations</span>
                  <h4>{f.title}</h4>
                  <p>{f.hint}</p>
                  <Link href={f.href} className="mx-float-vax__go">
                    Open form <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
