import type { Metadata } from "next";
import { VaccineRegistrationContent } from "@/html-port/VaccineRegistrationContent";

export const metadata: Metadata = {
  title: "Vaccine Registration Form",
  description:
    "Complete the Maxim Pharmacy in-store vaccine registration and screening form online before your walk-in visit.",
};

export default function VaccineRegistrationPage() {
  return <VaccineRegistrationContent />;
}
