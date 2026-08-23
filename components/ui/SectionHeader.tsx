export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan/80">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-white/60">{description}</p>}
    </div>
  );
}
