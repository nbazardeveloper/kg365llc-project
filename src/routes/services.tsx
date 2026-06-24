import { createFileRoute } from "@tanstack/react-router";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { LeadForm } from "@/components/site/LeadForm";
import { SERVICES } from "@/lib/site-content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kitchen, Bathroom, Tile, Flooring, Painting | KG365 LLC" },
      {
        name: "description",
        content:
          "Bathroom remodeling, kitchen remodeling, tile installation, flooring, painting, and handyman services in Philadelphia & South Jersey by KG365 LLC.",
      },
      { property: "og:title", content: "Services — KG365 LLC" },
      {
        property: "og:description",
        content:
          "Premium remodeling, tile, flooring, painting, and handyman services in Philadelphia & South Jersey.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="w-full bg-sand px-5 py-24 md:px-10 md:py-32">
        <div className="container-prose">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Services</p>
            <h1 className="mt-4 max-w-4xl">
              Premium remodeling & handyman services.
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-ink-soft">
              Whether you're upgrading a single room or transforming a whole building,
              we deliver clean, durable, beautifully-finished work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="w-full px-5 py-24 md:px-10 md:py-32">
        <div className="container-prose">
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.title}>
                <ServiceCard {...s} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="w-full bg-ink px-5 py-24 text-background md:px-10 md:py-32">
        <div className="container-prose grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Reveal>
            <h2 className="text-background">Get a free estimate.</h2>
            <p className="mt-6 text-xl text-background/80">
              Send us a few details and we'll be in touch within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-background p-6 text-foreground md:p-10">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
