type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: Props) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson mb-3">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl md:text-4xl text-navy">{title}</h2>
      {text ? (
        <p className="mt-3 text-navy-soft text-base md:text-lg leading-relaxed">
          {text}
        </p>
      ) : null}
    </div>
  );
}
