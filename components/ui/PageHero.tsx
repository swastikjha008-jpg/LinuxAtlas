import { Badge } from "@/components/ui/Badge";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="px-6 pb-14 pt-16 text-center">
      <div className="mx-auto max-w-2xl">
        {eyebrow && (
          <div className="mb-4 flex justify-center">
            <Badge>{eyebrow}</Badge>
          </div>
        )}
        <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-white/55">{description}</p>}
      </div>
    </div>
  );
}
