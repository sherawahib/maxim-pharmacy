import Image from "next/image";
import Link from "next/link";
import { processSteps } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export function ProcessSection() {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[420px] lg:min-h-[520px]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=80"
              alt="Pharmacy care process"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/80 via-navy/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Our Process</p>
            <p className="mt-2 font-display text-3xl">From upload to your door</p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Our Process"
            title="How it Works"
            text="Three simple steps to get medicines delivered safely and on time."
          />

          <ol className="mt-10 space-y-6">
            {processSteps.map((step) => (
              <li key={step.step} className="flex gap-5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center font-display text-lg text-white"
                  style={{ background: "#0c2340" }}
                >
                  {step.step}
                </span>
                <div className="border-b border-line pb-6 flex-1">
                  <h3 className="font-display text-xl text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm text-navy-soft leading-relaxed">{step.blurb}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link href="/shop" className="btn btn-primary mt-8">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
