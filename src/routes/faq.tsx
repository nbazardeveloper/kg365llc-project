import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { FAQS } from "@/lib/site-content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Renovation Questions Answered | KG365 LLC" },
      {
        name: "description",
        content:
          "Answers to common questions about KG365 LLC's renovation, remodeling, and handyman services in Philadelphia and South Jersey.",
      },
      { property: "og:title", content: "FAQ — KG365 LLC" },
      { property: "og:description", content: "Common questions about our renovation services." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <section className="w-full bg-sand px-5 py-24 md:px-10 md:py-32">
        <div className="container-prose">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-primary">FAQ</p>
            <h1 className="mt-4 max-w-3xl">Your questions, answered.</h1>
          </Reveal>
        </div>
      </section>
      <section className="w-full px-5 py-20 md:px-10 md:py-28">
        <div className="container-prose max-w-4xl">
          <Reveal>
            <FAQAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
