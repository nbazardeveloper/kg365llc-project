import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import heroImage from "@/images/hero.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About KG365 LLC — 20+ Years of Renovation Craftsmanship" },
      {
        name: "description",
        content:
          "Learn about KG365 LLC — a Philadelphia-area renovation team with 20+ years of experience in kitchen, bathroom, flooring, tile, painting, and handyman services.",
      },
      { property: "og:title", content: "About KG365 LLC" },
      {
        property: "og:description",
        content:
          "Two decades of hands-on experience renovating homes and commercial spaces in Philadelphia and South Jersey.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative isolate w-full overflow-hidden bg-ink px-5 py-28 text-background md:px-10 md:py-40">
        <img
          src={heroImage}
          alt="Craftsmanship in progress"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-overlay/70" />
        <div className="container-prose">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-primary">About</p>
            <h1 className="mt-4 max-w-4xl text-background">
              Experienced craftsmanship<br />you can trust.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="w-full px-5 py-24 md:px-10 md:py-32">
        <div className="container-prose grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-2xl text-ink md:text-3xl md:leading-snug">
              At KG365 LLC, we believe every space has the potential to be functional,
              beautiful, and modern.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-lg text-ink-soft">
              <p>
                With over two decades of hands-on experience, our team specializes in
                bringing renovation ideas to life. Whether you need a quick repair or a
                complete transformation of your home or office, we handle every detail
                with precision and professional care.
              </p>
              <p>
                We're committed to honest, transparent pricing and project timelines you
                can rely on. From the first consultation to the final walkthrough, you'll
                know exactly where your project stands.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-sand px-5 py-24 md:px-10 md:py-32">
        <div className="container-prose">
          <Reveal>
            <h2 className="max-w-3xl">A few numbers that matter.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              { n: "20+", l: "Years of experience" },
              { n: "500+", l: "Projects completed" },
              { n: "2", l: "States served — PA & NJ" },
            ].map((s) => (
              <Reveal key={s.l}>
                <div className="rounded-2xl border border-border bg-card p-8">
                  <div className="font-display text-6xl text-primary">{s.n}</div>
                  <div className="mt-2 text-lg text-ink-soft">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-24 md:px-10 md:py-32">
        <div className="container-prose flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal>
            <h2 className="max-w-2xl">Let's build something great together.</h2>
          </Reveal>
          <Reveal>
            <Button asChild variant="primary" size="lg">
              <Link to="/contact">
                Get a free estimate
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
