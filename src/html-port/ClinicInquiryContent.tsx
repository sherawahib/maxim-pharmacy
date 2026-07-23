"use client";

import Link from "next/link";
import { FormEvent, useState, type HTMLAttributes } from "react";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";

const orgTypes = [
  "Business",
  "Assisted Living",
  "Group Home",
  "School",
  "Municipality",
  "Other",
] as const;

const contactMethods = ["Call", "Email", "Text"] as const;
const timePrefs = ["Morning", "Afternoon", "Evening", "No Preference"] as const;

export function ClinicInquiryContent() {
  const [sent, setSent] = useState(false);
  const [refId, setRefId] = useState("");
  const [form, setForm] = useState({
    orgType: "" as (typeof orgTypes)[number] | "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    contactMethod: "" as (typeof contactMethods)[number] | "",
    orgName: "",
    street: "",
    city: "",
    state: "MA",
    zip: "",
    expectedPatients: "",
    preferredDates: "",
    timeOfDay: "" as (typeof timePrefs)[number] | "",
    notes: "",
  });

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const patients = Number(form.expectedPatients);
    if (!Number.isFinite(patients) || patients < 15) {
      window.alert("Expected patients must be at least 15.");
      return;
    }
    if (!form.orgType || !form.contactMethod || !form.timeOfDay) {
      window.alert("Please complete all required fields.");
      return;
    }

    const id = `CLINIC-${Date.now().toString().slice(-8)}`;
    setRefId(id);
    try {
      localStorage.setItem(
        "maxim-clinic-inquiry-last",
        JSON.stringify({ id, at: new Date().toISOString(), form })
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
          title="Inquiry received"
          description="Thanks — we’ll follow up in 2 to 3 days to set a clinic date."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Vaccinations", href: "/vaccinations" },
            { label: "Clinic inquiry" },
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
                <h2>Clinic inquiry submitted</h2>
                <p>
                  Reference <strong>{refId}</strong>. Maxim Pharmacy will contact you using your
                  preferred method. Once a date is set, we’ll provide registration materials and
                  flyers to help promote the event.
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
                      setForm({
                        orgType: "",
                        firstName: "",
                        lastName: "",
                        jobTitle: "",
                        email: "",
                        phone: "",
                        contactMethod: "",
                        orgName: "",
                        street: "",
                        city: "",
                        state: "MA",
                        zip: "",
                        expectedPatients: "",
                        preferredDates: "",
                        timeOfDay: "",
                        notes: "",
                      });
                    }}
                  >
                    Submit another inquiry
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
        title="On-Site Clinic Inquiry"
        description="Host a vaccine clinic at your workplace, school, or community site."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Vaccinations", href: "/vaccinations" },
          { label: "Clinic inquiry" },
        ]}
        image="/assets/images/s2.jpg"
      />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-vaxform">
          <div className="main-container">
            <div className="mx-vaxform__intro">
              <p>
                Thank you for your interest in hosting a vaccine clinic. Please fill out this short
                questionnaire and we will follow up in 2 to 3 days to set a date. Maxim Pharmacy will
                provide registration materials and flyers to help promote the event once a time is
                set.
              </p>
            </div>

            <form className="mx-vaxform__form" onSubmit={onSubmit} noValidate>
              <fieldset className="mx-vaxform__panel">
                <legend>Organization</legend>

                <label className="mx-vaxform__field">
                  <span>What best describes your organization? *</span>
                  <select
                    value={form.orgType}
                    required
                    onChange={(e) =>
                      setField("orgType", e.target.value as (typeof orgTypes)[number] | "")
                    }
                  >
                    <option value="">Select</option>
                    {orgTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <Field
                  label="Organization name"
                  required
                  value={form.orgName}
                  onChange={(v) => setField("orgName", v)}
                />

                <Field
                  label="Street address"
                  required
                  value={form.street}
                  onChange={(v) => setField("street", v)}
                />

                <div className="mx-vaxform__grid3">
                  <Field label="City" required value={form.city} onChange={(v) => setField("city", v)} />
                  <Field
                    label="State"
                    required
                    value={form.state}
                    onChange={(v) => setField("state", v)}
                  />
                  <Field label="ZIP" required value={form.zip} onChange={(v) => setField("zip", v)} />
                </div>
              </fieldset>

              <fieldset className="mx-vaxform__panel">
                <legend>Contact person</legend>

                <div className="mx-vaxform__grid3">
                  <Field
                    label="First name"
                    required
                    value={form.firstName}
                    onChange={(v) => setField("firstName", v)}
                  />
                  <Field
                    label="Last name"
                    required
                    value={form.lastName}
                    onChange={(v) => setField("lastName", v)}
                  />
                  <Field
                    label="Job title"
                    required
                    value={form.jobTitle}
                    onChange={(v) => setField("jobTitle", v)}
                  />
                </div>

                <div className="mx-vaxform__grid2">
                  <Field
                    label="Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setField("email", v)}
                  />
                  <Field
                    label="Phone number"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(v) => setField("phone", v)}
                    placeholder="(000) 000-0000"
                  />
                </div>

                <div className="mx-vaxform__field">
                  <span>Preferred contact method? *</span>
                  <div className="mx-vaxform__yn" role="radiogroup" aria-label="Preferred contact method">
                    {contactMethods.map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={form.contactMethod === m ? "is-active" : ""}
                        onClick={() => setField("contactMethod", m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </fieldset>

              <fieldset className="mx-vaxform__panel">
                <legend>Clinic details</legend>

                <Field
                  label="How many expected patients? (minimum 15)"
                  type="number"
                  required
                  value={form.expectedPatients}
                  onChange={(v) => setField("expectedPatients", v)}
                  inputMode="numeric"
                  min={15}
                />

                <Field
                  label="Preferred date(s) or day(s) of the week"
                  value={form.preferredDates}
                  onChange={(v) => setField("preferredDates", v)}
                  placeholder="e.g. Tue/Thu mornings, or Oct 12–14"
                />

                <div className="mx-vaxform__field">
                  <span>Preferred time of day? *</span>
                  <div className="mx-vaxform__yn" role="radiogroup" aria-label="Preferred time of day">
                    {timePrefs.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={form.timeOfDay === t ? "is-active" : ""}
                        onClick={() => setField("timeOfDay", t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="mx-vaxform__field">
                  <span>Questions, comments, concerns, notes</span>
                  <textarea
                    rows={5}
                    value={form.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    placeholder="Anything else we should know…"
                  />
                </label>
              </fieldset>

              <div className="mx-vaxform__submit-row">
                <p>We’ll respond within 2–3 business days.</p>
                <button type="submit" className="mx-vax__reg mx-vax__reg--lg">
                  Submit inquiry
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
  placeholder,
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  min?: number;
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
        placeholder={placeholder}
        min={min}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
