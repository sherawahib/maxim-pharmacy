import { BenefitsAdvanced } from "@/html-port/BenefitsAdvanced";
import { CtaAdvanced } from "@/html-port/CtaAdvanced";
import { ServicesAdvanced } from "@/html-port/ServicesAdvanced";
import { SubBannerAdvanced } from "@/html-port/SubBannerAdvanced";

export function ServicesContent() {
  return (
    <>
      <SubBannerAdvanced
        title="Our Services"
        description="Professional pharmacy services designed for precision, convenience, and peace of mind."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
        image="/assets/images/s1.jpg"
      />
      <BenefitsAdvanced />
      <ServicesAdvanced />
      <CtaAdvanced />
    </>
  );
}
