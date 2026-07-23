import Link from "next/link";
import { BenefitsAdvanced } from "@/html-port/BenefitsAdvanced";
import { CtaAdvanced } from "@/html-port/CtaAdvanced";
import { ProcessAdvanced } from "@/html-port/ProcessAdvanced";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";
import { TestimonialsAdvanced } from "@/html-port/TestimonialsAdvanced";

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Lead Pharmacist",
    image: "/assets/images/team-person1.jpg",
  },
  {
    name: "James Miller",
    role: "Clinical Specialist",
    image: "/assets/images/team-person2.jpg",
  },
  {
    name: "Emily Torres",
    role: "Patient Care Lead",
    image: "/assets/images/team-person3.jpg",
  },
  {
    name: "Michael Brooks",
    role: "Fulfillment Manager",
    image: "/assets/images/team-person4.jpg",
  },
];

const stats = [
  { value: "15+", label: "Years of care" },
  { value: "40k+", label: "Happy patients" },
  { value: "24/7", label: "Online ordering" },
  { value: "100%", label: "Licensed team" },
];

export function AboutContent() {
  return (
    <>
      <SubBannerAdvanced
        title="About Maxim"
        description="Trusted prescription and OTC care — delivered with pharmacist expertise and genuine confidence."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        image="/assets/images/main-abt-img1.jpg"
      />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-about-story">
          <div className="main-container">
            <div className="mx-about-story__grid">
              <div className="mx-about-story__media">
                <img
                  src="/assets/images/main-abt-img2.jpg"
                  alt="Maxim Pharmacy care team"
                />
              </div>
              <div className="mx-about-story__copy">
                <span className="special-text d-inline-block">Who we are</span>
                <h2>Committed to making healthcare accessible</h2>
                <p>
                  Maxim Pharmacy blends licensed clinical guidance with a modern
                  shopping experience — so prescriptions, wellness essentials,
                  and everyday OTC care arrive safely and on time.
                </p>
                <p>
                  From secure prescription uploads to discreet delivery, every
                  step is designed around clarity, trust, and patient peace of
                  mind.
                </p>
                <div className="mx-about-story__actions">
                  <Link href="/shop" className="primary_btn text-decoration-none">
                    Shop Medicines
                  </Link>
                  <Link href="/transfer" className="mx-about-story__ghost">
                    Transfer a Prescription
                  </Link>
                </div>
              </div>
            </div>

            <div className="mx-about-story__stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <BenefitsAdvanced />
      <ProcessAdvanced />

      <div className="padding-rl float-left w-100">
        <section className="float-left w-100 padding-top padding-bottom mx-team">
          <div className="main-container">
            <div className="heading-title-con text-center">
              <span className="special-text d-inline-block">Our Team</span>
              <h2 className="mb-0">The people behind the care</h2>
              <p className="mx-team__sub">
                Licensed pharmacists and care specialists focused on precision,
                privacy, and patient support.
              </p>
            </div>
            <div className="mx-team__grid">
              {team.map((member) => (
                <article key={member.name} className="mx-team__card">
                  <div className="mx-team__photo">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <TestimonialsAdvanced />
      <CtaAdvanced />
    </>
  );
}
