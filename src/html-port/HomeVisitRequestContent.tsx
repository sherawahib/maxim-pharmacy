"use client";

import Link from "next/link";
import { FormEvent, useState, type HTMLAttributes } from "react";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";

const emptyForm = {
  firstName: "",
  lastName: "",
  phone: "",
  street: "",
  street2: "",
  city: "",
  state: "MA",
  zip: "",
  email: "",
  notes: "",
};

export function HomeVisitRequestContent() {
  const [sent, setSent] = useState(false);
  const [refId, setRefId] = useState("");
  const [form, setForm] = useState(emptyForm);

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim()) {
      window.alert("Please enter your name and phone number.");
      return;
    }

    const id = `HOME-${Date.now().toString().slice(-8)}`;
    setRefId(id);
    try {
      localStorage.setItem(
        "maxim-home-visit-last",
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
          title="Request received"
          description="We’ll do our best to accommodate your in-home vaccination request."
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Vaccinations", href: "/vaccinations" },
            { label: "Home visit" },
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
                <h2>Home visit request submitted</h2>
                <p>
                  Reference <strong>{refId}</strong>. This is not a guarantee of an in-home vaccine —
                  we will do our best to accommodate. If someone does not reach out within 3 days,
                  please call the pharmacy at{" "}
                  <a href="tel:+19783562121">978-356-2121</a> to follow up.
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
                      setForm(emptyForm);
                    }}
                  >
                    Submit another request
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
        title="Home Visit Vaccination"
        description="Request an in-home vaccination for the 2025/26 season."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Vaccinations", href: "/vaccinations" },
          { label: "Home visit" },
        ]}
        image="/assets/images/s2.jpg"
      />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-vaxform">
          <div className="main-container">
            <div className="mx-vaxform__intro">
              <p>
                Please complete the following request for an in-home vaccination.{" "}
                <strong>
                  This is not a guarantee for an in-home vaccine, but we will do our best to
                  accommodate.
                </strong>{" "}
                If someone does not reach out to you within 3 days of your request, please call the
                pharmacy at <a href="tel:+19783562121">978-356-2121</a> to follow up and check in.
              </p>
            </div>

            <form className="mx-vaxform__form" onSubmit={onSubmit} noValidate>
              <fieldset className="mx-vaxform__panel">
                <legend>Contact</legend>

                <div className="mx-vaxform__grid2">
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
                </div>

                <div className="mx-vaxform__grid2">
                  <Field
                    label="Phone number"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(v) => setField("phone", v)}
                    placeholder="(000) 000-0000"
                  />
                  <Field
                    label="Email (optional)"
                    type="email"
                    value={form.email}
                    onChange={(v) => setField("email", v)}
                  />
                </div>
              </fieldset>

              <fieldset className="mx-vaxform__panel">
                <legend>Address</legend>

                <Field
                  label="Street address"
                  value={form.street}
                  onChange={(v) => setField("street", v)}
                />
                <Field
                  label="Street address line 2"
                  value={form.street2}
                  onChange={(v) => setField("street2", v)}
                />

                <div className="mx-vaxform__grid3">
                  <Field label="City" value={form.city} onChange={(v) => setField("city", v)} />
                  <Field
                    label="State / Province"
                    value={form.state}
                    onChange={(v) => setField("state", v)}
                  />
                  <Field
                    label="Postal / ZIP code"
                    value={form.zip}
                    onChange={(v) => setField("zip", v)}
                  />
                </div>
              </fieldset>

              <fieldset className="mx-vaxform__panel">
                <legend>Notes</legend>
                <label className="mx-vaxform__field">
                  <span>Notes / comments</span>
                  <textarea
                    rows={5}
                    value={form.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    placeholder="Vaccines needed, access notes, preferred days…"
                  />
                </label>
              </fieldset>

              <div className="mx-vaxform__submit-row">
                <p>We’ll try to respond within 3 days.</p>
                <button type="submit" className="mx-vax__reg mx-vax__reg--lg">
                  Submit request
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
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
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
