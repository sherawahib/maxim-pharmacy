import type { Metadata } from "next";
import { HomeVisitRequestContent } from "@/html-port/HomeVisitRequestContent";

export const metadata: Metadata = {
  title: "Home Visit Vaccination Request",
  description:
    "Request an in-home vaccination visit from Maxim Pharmacy for the 2025/26 season.",
};

export default function HomeVisitRequestPage() {
  return <HomeVisitRequestContent />;
}
