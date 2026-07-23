import type { Metadata } from "next";
import { VaccinationsContent } from "@/html-port/VaccinationsContent";

export const metadata: Metadata = {
  title: "Vaccination Clinics",
  description:
    "Upcoming vaccination clinics, walk-in COVID and adult vaccines, and registration links at Maxim Pharmacy.",
};

export default function VaccinationsPage() {
  return <VaccinationsContent />;
}
