import type { Metadata } from "next";
import { CheckoutContent } from "@/html-port/CheckoutContent";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <CheckoutContent />;
}
