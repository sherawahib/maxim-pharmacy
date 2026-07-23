import type { Metadata } from "next";
import { ClinicInquiryContent } from "@/html-port/ClinicInquiryContent";

export const metadata: Metadata = {
  title: "On-Site Vaccination Clinic Inquiry",
  description:
    "Request an on-site vaccine clinic for your business, school, assisted living, or community group with Maxim Pharmacy.",
};

export default function ClinicInquiryPage() {
  return <ClinicInquiryContent />;
}
