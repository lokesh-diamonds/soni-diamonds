import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="container-luxe pt-16 pb-12 md:pt-24 md:pb-16">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05] text-bone">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-bone-dim">
            {intro}
          </p>
        )}
      </Reveal>
      <div className="hairline mt-12" />
    </section>
  );
}
