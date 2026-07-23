import Image from "next/image";

type Props = {
  title: string;
  text?: string;
  image?: string;
};

export function PageHero({
  title,
  text,
  image = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=80",
}: Props) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill className="object-cover opacity-35" sizes="100vw" priority />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,35,64,0.95)_0%,rgba(12,35,64,0.75)_55%,rgba(12,35,64,0.55)_100%)]" />
      </div>
      <div className="wrap relative py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9ec0e8] mb-3">
          Maxim Pharmacy
        </p>
        <h1 className="font-display text-4xl md:text-5xl max-w-2xl">{title}</h1>
        {text ? (
          <p className="mt-4 max-w-xl text-white/70 text-base md:text-lg">{text}</p>
        ) : null}
      </div>
    </section>
  );
}
