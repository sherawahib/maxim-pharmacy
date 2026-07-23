import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopContent } from "@/html-port/ShopContent";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="padding-rl float-left w-100">
          <section className="float-left w-100 padding-top padding-bottom">
            <div className="main-container">
              <p style={{ textAlign: "center", color: "#6b7c90" }}>Loading shop…</p>
            </div>
          </section>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
