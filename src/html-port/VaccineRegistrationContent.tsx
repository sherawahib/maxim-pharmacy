"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState, type HTMLAttributes } from "react";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";

const vaccines = [
  {
    id: "covid-moderna",
    label: "COVID — Moderna",
    eligibility: "Age 12yrs+: mNexspike",
  },
  {
    id: "covid-pfizer",
    label: "COVID — Pfizer",
    eligibility: "Age 12yrs+: Comirnaty",
  },
  {
    id: "pneumonia",
    label: "Pneumonia (Capvaxive)",
    eligibility: "Age 50yrs+ or age 19+ with a qualifying condition",
  },
  {
    id: "shingles",
    label: "Shingles (Shingrix)",
    eligibility: "Age 50yrs+ or age 19+ with a qualifying condition",
  },
  {
    id: "tdap",
    label: "Tetanus (TDaP / Boostrix)",
    eligibility: "Age 10yrs+ (every 10 years) and pregnant women (3rd trimester)",
  },
  {
    id: "rsv",
    label: "RSV",
    eligibility:
      "Age 75yrs+ or age 50+ with qualifying condition (mResvia). 32–36 weeks pregnant: Abrysvo",
  },
  {
    id: "hep-b",
    label: "Hepatitis-B",
    eligibility: "Age 3yrs+: Heplisav-B",
  },
  {
    id: "mmr",
    label: "Measles, Mumps, Rubella",
    eligibility: "Age 3yrs+ and born 1957 or later: MMR II",
  },
  {
    id: "hpv",
    label: "HPV",
    eligibility: "Age 9yrs+: Gardasil 9",
  },
] as const;

const screening = [
  "Are you feeling sick today?",
  "Do you have severe allergies or reactions to any foods, medications, vaccines, or latex (for example: eggs, gelatin, neomycin, thimerosal, polyethylene glycol, polysorbate), or have you ever had a severe allergic reaction (e.g., anaphylaxis)?",
  "Have you ever had a serious reaction after receiving a vaccination?",
  "Do you have a long-term health problem with heart, lung, kidney, or metabolic disease (e.g., diabetes), asthma, a blood disorder, no spleen, complement component deficiency, a cochlear implant, or a spinal fluid leak?",
  "Do you have cancer, leukemia, HIV/AIDS, or any other immune system problem?",
  "Do you have a parent, brother, or sister with an immune system problem?",
  "In the past 3 months, have you taken medications that affect your immune system (such as prednisone, other steroids, anticancer drugs, or drugs for rheumatoid arthritis, Crohn’s disease, or psoriasis), or had radiation treatments?",
  "Have you had a seizure or a brain or other nervous system problem, or have you ever had Guillain-Barré Syndrome?",
  "During the past year, have you received a transfusion of blood or blood products, or been given immune (gamma) globulin or an antiviral drug?",
  "For women: Are you pregnant or is there a chance you could become pregnant during the next month?",
  "Have you received any vaccinations in the past 4 weeks?",
] as const;

type Arm = "" | "left" | "right";
type Yn = "" | "yes" | "no" | "unknown";

type VaccineChoice = {
  selected: boolean;
  arm: Arm;
};

const emptyVaccines = (): Record<string, VaccineChoice> =>
  Object.fromEntries(vaccines.map((v) => [v.id, { selected: false, arm: "" as Arm }]));

const emptyScreening = (): Record<number, Yn> =>
  Object.fromEntries(screening.map((_, i) => [i, "" as Yn]));

function todayISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function VaccineRegistrationContent() {
  const [sent, setSent] = useState(false);
  const [refId, setRefId] = useState("");

  const [form, setForm] = useState({
    lastName: "",
    today: todayISO(),
    firstName: "",
    middle: "",
    age: "",
    dob: "",
    gender: "",
    street: "",
    city: "",
    state: "MA",
    zip: "",
    phone: "",
    email: "",
    language: "English",
    race: "",
    ssn4: "",
    hispanic: "" as "" | "yes" | "no",
    pcp: "",
    allergyDetail: "",
    immunocompromised: false,
    consent: false,
    printName: "",
    signName: "",
    signDate: todayISO(),
  });

  const [vax, setVax] = useState(emptyVaccines);
  const [screen, setScreen] = useState(emptyScreening);

  const selectedCount = useMemo(
    () => Object.values(vax).filter((v) => v.selected).length,
    [vax]
  );

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedCount === 0) {
      window.alert("Please select at least one vaccine.");
      return;
    }
    if (!form.consent) {
      window.alert("Please confirm consent before submitting.");
      return;
    }
    const missingArm = vaccines.some(
      (v) => vax[v.id].selected && !vax[v.id].arm
    );
    if (missingArm) {
      window.alert("Please choose Left or Right arm for each selected vaccine.");
      return;
    }

    const id = `VAX-${Date.now().toString().slice(-8)}`;
    setRefId(id);
    try {
      localStorage.setItem(
        "maxim-vaccine-registration-last",
        JSON.stringify({ id, at: new Date().toISOString(), form, vax, screen })
      );
    } catch {
      /* ignore */
    }
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (sent) {
    return (
      <>
        <SubBannerAdvanced
          title="Registration received"
          description="Thank you — your vaccine registration has been submitted."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Vaccinations", href: "/vaccinations" },
            { label: "Register" },
          ]}
          image="/assets/images/s2.jpg"
        />
        <div className="padding-rl float-left w-100">
          <section className="float-left w-100 padding-top padding-bottom mx-vaxform">
            <div className="main-container">
              <div className="mx-vaxform__success">
                <span className="mx-vaxform__success-icon" aria-hidden="true">
                  <i className="fa-solid fa-circle-check" />
                </span>
                <h2>Form submitted successfully</h2>
                <p>
                  Reference <strong>{refId}</strong>. Please bring your ID, insurance card, and
                  Medicare card to your visit. Walk-ins are welcome Mon–Fri, 10am–5pm.
                </p>
                <div className="mx-vaxform__success-actions">
                  <Link href="/vaccinations" className="mx-vax__reg mx-vax__reg--lg">
                    Back to clinics
                  </Link>
                  <button
                    type="button"
                    className="mx-vax__ghost"
                    onClick={() => {
                      setSent(false);
                      setVax(emptyVaccines());
                      setScreen(emptyScreening());
                      setForm((f) => ({
                        ...f,
                        consent: false,
                        signName: "",
                        printName: "",
                        today: todayISO(),
                        signDate: todayISO(),
                      }));
                    }}
                  >
                    Submit another form
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <SubBannerAdvanced
        title="Vaccine Registration"
        description="Complete both sections of this form before your walk-in visit for a faster appointment."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Vaccinations", href: "/vaccinations" },
          { label: "Register" },
        ]}
        image="/assets/images/s2.jpg"
      />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-vaxform">
          <div className="main-container">
            <div className="mx-vaxform__intro">
              <p>
                Please complete all fields. You may choose multiple vaccines. Printable PDF reference:{" "}
                <a
                  href="https://ei3mam8j5x6.exactdn.com/wp-content/uploads/2026/07/Vaccine-Registration-Form-IN-STORE-between-seasons-07222026-PDF.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  download original form
                </a>
                .
              </p>
            </div>

            <form className="mx-vaxform__form" onSubmit={onSubmit} noValidate>
              <fieldset className="mx-vaxform__panel">
                <legend>Patient information</legend>

                <div className="mx-vaxform__grid3">
                  <Field label="Last name" required value={form.lastName} onChange={(v) => setField("lastName", v)} />
                  <Field label="First name" required value={form.firstName} onChange={(v) => setField("firstName", v)} />
                  <Field label="Middle" value={form.middle} onChange={(v) => setField("middle", v)} />
                </div>

                <div className="mx-vaxform__grid4">
                  <Field label="Today’s date" type="date" required value={form.today} onChange={(v) => setField("today", v)} />
                  <Field label="Date of birth" type="date" required value={form.dob} onChange={(v) => setField("dob", v)} />
                  <Field label="Age" type="number" value={form.age} onChange={(v) => setField("age", v)} />
                  <label className="mx-vaxform__field">
                    <span>Gender</span>
                    <select value={form.gender} onChange={(e) => setField("gender", e.target.value)} required>
                      <option value="">Select</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other / prefer not to say</option>
                    </select>
                  </label>
                </div>

                <Field label="Street address" required value={form.street} onChange={(v) => setField("street", v)} />

                <div className="mx-vaxform__grid3">
                  <Field label="City / Town" required value={form.city} onChange={(v) => setField("city", v)} />
                  <Field label="State" required value={form.state} onChange={(v) => setField("state", v)} />
                  <Field label="ZIP" required value={form.zip} onChange={(v) => setField("zip", v)} />
                </div>

                <div className="mx-vaxform__grid2">
                  <Field label="Phone" type="tel" required value={form.phone} onChange={(v) => setField("phone", v)} />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => setField("email", v)} />
                </div>

                <div className="mx-vaxform__grid4">
                  <Field label="Preferred language" value={form.language} onChange={(v) => setField("language", v)} />
                  <Field label="Race" value={form.race} onChange={(v) => setField("race", v)} />
                  <Field
                    label="Last 4 digits SS#"
                    value={form.ssn4}
                    onChange={(v) => setField("ssn4", v.replace(/\D/g, "").slice(0, 4))}
                    inputMode="numeric"
                  />
                  <label className="mx-vaxform__field">
                    <span>Hispanic / Latino</span>
                    <select
                      value={form.hispanic}
                      onChange={(e) => setField("hispanic", e.target.value as "" | "yes" | "no")}
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>
                </div>

                <Field
                  label="Primary care practitioner & location"
                  value={form.pcp}
                  onChange={(v) => setField("pcp", v)}
                />
              </fieldset>

              <fieldset className="mx-vaxform__panel">
                <legend>Vaccines requested</legend>
                <p className="mx-vaxform__hint">
                  Check the vaccine(s) you want and circle which arm. You may choose multiple.
                </p>

                <div className="mx-vaxform__vax-list">
                  {vaccines.map((item) => {
                    const choice = vax[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`mx-vaxform__vax-row ${choice.selected ? "is-on" : ""}`}
                      >
                        <label className="mx-vaxform__check">
                          <input
                            type="checkbox"
                            checked={choice.selected}
                            onChange={(e) =>
                              setVax((prev) => ({
                                ...prev,
                                [item.id]: {
                                  ...prev[item.id],
                                  selected: e.target.checked,
                                  arm: e.target.checked ? prev[item.id].arm : "",
                                },
                              }))
                            }
                          />
                          <span>
                            <strong>{item.label}</strong>
                            <em>{item.eligibility}</em>
                          </span>
                        </label>
                        <div className="mx-vaxform__arm" role="group" aria-label={`Arm for ${item.label}`}>
                          <button
                            type="button"
                            className={choice.arm === "left" ? "is-active" : ""}
                            disabled={!choice.selected}
                            onClick={() =>
                              setVax((prev) => ({
                                ...prev,
                                [item.id]: { ...prev[item.id], arm: "left" },
                              }))
                            }
                          >
                            Left
                          </button>
                          <button
                            type="button"
                            className={choice.arm === "right" ? "is-active" : ""}
                            disabled={!choice.selected}
                            onClick={() =>
                              setVax((prev) => ({
                                ...prev,
                                [item.id]: { ...prev[item.id], arm: "right" },
                              }))
                            }
                          >
                            Right
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <label className="mx-vaxform__check mx-vaxform__check--block">
                  <input
                    type="checkbox"
                    checked={form.immunocompromised}
                    onChange={(e) => setField("immunocompromised", e.target.checked)}
                  />
                  <span>
                    I attest that I am immunocompromised or have a qualifying health condition as
                    identified by the CDC.
                  </span>
                </label>
              </fieldset>

              <fieldset className="mx-vaxform__panel">
                <legend>Screening checklist</legend>
                <p className="mx-vaxform__hint">
                  If you answer “yes” to any question, it does not necessarily mean you should not be
                  vaccinated — additional questions may be asked.
                </p>

                <ol className="mx-vaxform__screen">
                  {screening.map((q, i) => (
                    <li key={q}>
                      <p>
                        {i + 1}. {q}
                      </p>
                      {i === 1 ? (
                        <Field
                          label="If yes, what are you allergic to?"
                          value={form.allergyDetail}
                          onChange={(v) => setField("allergyDetail", v)}
                        />
                      ) : null}
                      <div className="mx-vaxform__yn" role="radiogroup" aria-label={`Question ${i + 1}`}>
                        {(["yes", "no", "unknown"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={screen[i] === opt ? "is-active" : ""}
                            onClick={() => setScreen((prev) => ({ ...prev, [i]: opt }))}
                          >
                            {opt === "unknown" ? "Don’t know" : opt === "yes" ? "Yes" : "No"}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </fieldset>

              <fieldset className="mx-vaxform__panel">
                <legend>Consent & acknowledgment</legend>
                <p className="mx-vaxform__consent-text">
                  I certify that I am either: (a) the patient (age 18+), (b) the patient’s legal
                  guardian, or (c) authorized to consent on the patient’s behalf. I consent to Maxim
                  Pharmacy and its licensed healthcare providers (“Provider”) administering the
                  requested vaccine(s). I understand the risks, benefits, and possible side effects,
                  have received and reviewed the vaccine information (VIS/EUA Fact Sheet), and had
                  my questions answered. On behalf of myself/the patient, I release and hold harmless
                  the Provider and its staff from any claims related to vaccine administration. I
                  understand my vaccination may be reported to my state’s registry as required by
                  law. I authorize the Provider to release necessary medical and billing information
                  to insurers, healthcare providers, or government agencies as required; bill my
                  insurer; and receive payment on my behalf. I accept responsibility for any copays,
                  deductibles, or uncovered costs.
                </p>

                <label className="mx-vaxform__check mx-vaxform__check--block">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setField("consent", e.target.checked)}
                    required
                  />
                  <span>I have read and agree to the consent and acknowledgment above.</span>
                </label>

                <div className="mx-vaxform__grid3">
                  <Field
                    label="Signature (type full name)"
                    required
                    value={form.signName}
                    onChange={(v) => setField("signName", v)}
                  />
                  <Field
                    label="Print name"
                    required
                    value={form.printName}
                    onChange={(v) => setField("printName", v)}
                  />
                  <Field
                    label="Date"
                    type="date"
                    required
                    value={form.signDate}
                    onChange={(v) => setField("signDate", v)}
                  />
                </div>
              </fieldset>

              <div className="mx-vaxform__submit-row">
                <p>
                  Selected vaccines: <strong>{selectedCount}</strong>
                </p>
                <button type="submit" className="mx-vax__reg mx-vax__reg--lg">
                  Submit registration
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <label className="mx-vaxform__field" htmlFor={id}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
