import type { Metadata } from "next";
import { TransferContent } from "@/html-port/TransferContent";

export const metadata: Metadata = { title: "Transfer a Prescription" };

export default function TransferPage() {
  return <TransferContent />;
}
