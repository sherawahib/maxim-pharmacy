import type { Metadata } from "next";
import { ServicesContent } from "@/html-port/ServicesContent";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return <ServicesContent />;
}
