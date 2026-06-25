import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Star, CheckCircle2 } from "lucide-react";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { LeadForm } from "@/components/site/LeadForm";
import { Button } from "@/components/ui/button";
import { SERVICES, FAQS } from "@/lib/site-content";
import { featuredPortfolioQuery } from "@/lib/portfolio";
import heroImage from "@/images/hero.webp";
import heroAboutImage from "@/images/hero-about-us.webp";
import reviewHeroImage from "@/images/review-hero.webp";
import licensedInsuredRaw from "@/images/icons/LicensedInsured.svg?raw";
import yearsExperienceRaw from "@/images/icons/YearsExperience.svg?raw";
import onTimeDeliveryRaw from "@/images/icons/OnTimeDelivery.svg?raw";
import transparentPricingRaw from "@/images/icons/TransparentPricing.svg?raw";
import freeEstimatesRaw from "@/images/icons/FreeEstimates.svg?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KG365 LLC — Kitchen, Bathroom & Home Renovations in Philadelphia" },
      {
        name: "description",
        content:
          "Premium kitchen remodeling, bathroom remodeling, tile installation, flooring, painting, and handyman services in Philadelphia & South Jersey. 20+ years of craftsmanship.",
      },
      {
        name: "keywords",
        content:
          "kitchen remodeling Philadelphia, bathroom remodeling Philadelphia, home renovation, tile installation, flooring, painting, handyman services, South Jersey renovation, KG365",
      },
      { property: "og:title", content: "KG365 LLC — Kitchen, Bathroom & Home Renovations in Philadelphia" },
      {
        property: "og:description",
        content:
          "Premium kitchen remodeling, bathroom remodeling, tile installation, flooring, painting, and handyman services in Philadelphia & South Jersey. 20+ years of craftsmanship.",
      },
      { property: "og:url", content: "https://kg365llc.com/" },
      { property: "og:image", content: "https://kg365llc.com/og-image.webp" },
      { property: "og:type", content: "website" },
      { name: "twitter:image", content: "https://kg365llc.com/og-image.webp" },
    ],
    links: [{ rel: "canonical", href: "https://kg365llc.com/" }],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(featuredPortfolioQuery);
  },
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <ServicesSection />
      <OurProcess />
      <PortfolioPreview />
      <Testimonials />
      <FaqTeaser />
      <LeadSection />
    </>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative isolate -mt-16 md:-mt-[77px] w-full overflow-hidden bg-ink text-background">
      <img
        src={heroImage}
        alt="Modern kitchen remodel by KG365 LLC"
        className="absolute inset-0 -z-10 h-full w-full object-cover animate-hero-zoom"
        loading="eager"
      />
      <div className="absolute inset-0 -z-10 bg-overlay/55" />
      <div className="flex w-full flex-col items-center justify-center px-5 pt-40 pb-32 text-center md:px-10 md:pt-56 md:pb-44">
        <Reveal delay={0.05}>
          <h1 className="text-balance text-background">
            Quality Renovations.<br />Done Right the First Time.
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-7 max-w-2xl text-xl text-background/85 md:text-2xl">
            20 years of transforming homes across Philadelphia & South Jersey —
            on time, on budget, and built to last. Free consultation. Honest pricing.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center gap-1 sm:flex-row sm:justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link to="/portfolio">
                View Our Work
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="primary" size="lg">
              <Link to="/contact">
                Get Free Quote
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── TRUST BAR ─────────────────────────────────────────────────────────── */
function colorizeIcon(raw: string) {
  return raw
    // Inject fill="currentColor" on the root <svg> so paths with no fill attribute inherit it
    .replace(/^(<svg\b)/, '$1 fill="currentColor"')
    // Replace explicit black fills
    .replace(/fill:\s*black/gi, "fill:currentColor")
    .replace(/fill="black"/gi, 'fill="currentColor"')
    .replace(/fill="#000000"/gi, 'fill="currentColor"')
    .replace(/fill="#000"/gi, 'fill="currentColor"')
    .replace(/\.fil0\s*\{[^}]*fill\s*:\s*black[^}]*\}/gi, ".fil0{fill:currentColor}")
    .replace(/\.fil1\s*\{[^}]*fill\s*:\s*none[^}]*\}/gi, ".fil1{fill:none}");
}

function SvgIcon({ raw, className }: { raw: string; className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: colorizeIcon(raw) }}
    />
  );
}

function TrustBar() {
  const items = [
    { raw: licensedInsuredRaw,    label: "Insured" },
    { raw: yearsExperienceRaw,    label: "20+ Years\nExperience" },
    { raw: onTimeDeliveryRaw,     label: "On-Time\nDelivery" },
    { raw: transparentPricingRaw, label: "Transparent\nPricing" },
    { raw: freeEstimatesRaw,      label: "Free\nEstimates" },
  ];
  return (
    <div className="w-full border-y border-border bg-background">
      <div className="grid grid-cols-2 overflow-hidden sm:grid-cols-3 lg:grid-cols-5">
        {items.map(({ raw, label }, i) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center gap-4 border-b border-r border-border px-4 py-8 text-center last:border-r-0 md:px-6 md:py-10 lg:border-b-0"
          >
            <SvgIcon
              raw={raw}
              className="block h-16 w-16 shrink-0 text-primary [&_svg]:h-full [&_svg]:w-full"
            />
            <span className="whitespace-pre-line text-lg font-bold uppercase leading-tight tracking-widest text-ink md:text-xl">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT / PROBLEM-SOLUTION ──────────────────────────────────────────── */
function ProblemSolution() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-36">
      <div className="absolute inset-y-0 left-0 w-full md:w-[72%]">
        <img
          src={heroAboutImage}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/40 md:hidden" />
      </div>
      <Reveal className="relative mx-auto px-5 md:ml-auto md:max-w-7xl md:pl-10 md:pr-16">
        <div className="ml-auto w-full md:w-[58%]
                        bg-background rounded-2xl
                        px-8 py-12 md:px-12 md:py-14
                        shadow-[0_25px_60px_-10px_rgba(0,0,0,0.25)]
                        border border-border/20">
          <h2 className="max-w-2xl">
            Philadelphia's trusted renovation partner for over 20 years.
          </h2>
          <p className="mt-6 text-lg text-ink-soft">
            At KG365 LLC we handle every detail with precision and care — from minor repairs
            to full kitchen and bathroom remodels. No hidden fees, no broken timelines.
            Just honest craftsmanship and results you'll be proud of.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-primary/40 pt-10">
            {[
              { n: "20+",  l: "Years experience" },
              { n: "500+", l: "Projects done"    },
              { n: "100%", l: "Free estimates"   },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl font-bold text-ink md:text-5xl">{s.n}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-ink-soft">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-start gap-3">
            <Button asChild variant="outline" size="md">
              <Link to="/about">Our Story</Link>
            </Button>
            <Button asChild variant="primary" size="md">
              <Link to="/contact">
                Get a Free Estimate
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── SERVICES CAROUSEL ─────────────────────────────────────────────────── */
function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("[data-card]") as HTMLElement;
    const amount = (card?.offsetWidth ?? 320) + 24;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="w-full overflow-hidden bg-background py-24 md:py-32">
      <div className="px-5 md:px-10">
        <Reveal>
          <h2 className="max-w-2xl">What we can do for your home...</h2>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            From minor repairs to full renovations — KG365 LLC handles every detail with
            precision and care, delivering results you'll be proud of.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-20">
        <button
          onClick={() => scroll("left")}
          aria-label="Previous"
          className="absolute left-2 top-1/3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition hover:border-primary hover:text-primary md:left-5"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-5 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              data-card
              className="w-[calc(100%-40px)] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <ServiceCard {...s} index={i} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Next"
          className="absolute right-2 top-1/3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition hover:border-primary hover:text-primary md:right-5"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center gap-4 px-5 md:px-10">
          <Button asChild variant="primary" size="md">
            <Link to="/services">
              View All Services
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="md">
            <Link to="/contact">Request a Custom Quote</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── OUR PROCESS ───────────────────────────────────────────────────────── */
function OurProcess() {
  const steps = [
    {
      n: "01",
      title: "Free Consultation",
      desc: "We visit your space, listen to your vision, and assess the project — no pressure, no fees, no obligations.",
    },
    {
      n: "02",
      title: "Clear Proposal",
      desc: "You receive a detailed written estimate with full scope, fixed pricing, and a realistic timeline. No surprises.",
    },
    {
      n: "03",
      title: "Expert Execution",
      desc: "Our crew shows up on time every day, works cleanly, and gives you progress updates throughout the project.",
    },
    {
      n: "04",
      title: "Your Approval",
      desc: "We do a final walkthrough together. We don't call it done until every detail meets your expectations.",
    },
  ];

  return (
    <section className="w-full bg-ink px-5 py-24 md:px-10 md:py-32">
      <div className="container-prose">
        <Reveal>
          <h2 className="max-w-2xl text-background">
            A simple process.<br />No guesswork.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 md:gap-0">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1}>
              <div className={[
                "flex flex-col pb-10 pr-6",
                i > 0 ? "mt-10 border-t border-white/10 pt-10 md:mt-0 md:border-t-0 md:pt-0 md:border-l md:border-white/10 md:pl-8" : "",
                "border-b-[3px] border-primary",
              ].join(" ")}>
                <span className="font-display text-[5rem] font-bold leading-none text-primary md:text-[6rem]">
                  {step.n}
                </span>
                <h3 className="mt-4 text-background">{step.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-background/70">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 border-t border-white/10 pt-10">
            <Button asChild variant="primary" size="md">
              <Link to="/contact">
                Start with a free consultation
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── PORTFOLIO PREVIEW ─────────────────────────────────────────────────── */
function PortfolioPreview() {
  const { data } = useSuspenseQuery(featuredPortfolioQuery);
  return (
    <section className="w-full px-5 py-24 md:px-10 md:py-32">
      <div className="container-prose">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <h2 className="max-w-2xl">Real spaces. Real results.</h2>
          </Reveal>
          <Reveal>
            <Button asChild variant="ghost" size="md">
              <Link to="/portfolio">
                Browse full portfolio
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.slice(0, 6).map((p) => (
            <StaggerItem key={p.id}>
              <article className="group relative overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={p.after_image_url}
                    alt={`${p.title} — completed by KG365 LLC`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                    <p className="text-xs uppercase tracking-[0.25em] text-background/70">
                      {p.category}
                    </p>
                    <h3 className="mt-2 text-background">{p.title}</h3>
                    {p.location && (
                      <p className="mt-1 text-sm text-background/80">{p.location}</p>
                    )}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────────────────────── */
function Testimonials() {
  const reviews = [
    {
      quote:
        "KG365 completely transformed our kitchen. The tile work is flawless, the cabinets fit perfectly, and they finished two days ahead of schedule. Couldn't be happier.",
      name: "Maria S.",
      project: "Kitchen Remodel",
      city: "Philadelphia, PA",
    },
    {
      quote:
        "We had three contractors quote us. KG365 was the only one who was upfront about costs without overselling. The bathroom turned out better than we imagined.",
      name: "James T.",
      project: "Bathroom Renovation",
      city: "Cherry Hill, NJ",
    },
    {
      quote:
        "From consultation to final walkthrough — professional, clean, and on time every single day. I've already referred them to two of my neighbors.",
      name: "Linda M.",
      project: "Flooring & Painting",
      city: "South Philadelphia, PA",
    },
  ];

  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive((a) => (a + 1) % reviews.length);

  const visible = [reviews[active], reviews[(active + 1) % reviews.length]];

  return (
    <section className="relative w-full overflow-hidden py-24 md:py-36">
      {/* Background image — full on mobile/tablet, 70% from right on desktop */}
      <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[70%]">
        <img
          src={reviewHeroImage}
          alt="Happy client"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/65 lg:bg-ink/50" />
      </div>

      {/* Content */}
      <div className="relative px-5 md:px-10">
        <Reveal>
          <h2 className="max-w-2xl text-background lg:text-ink">What our clients say.</h2>
        </Reveal>

        {/* Carousel */}
        <div className="mt-10 flex items-center gap-4 lg:w-[75%]">
          {/* Left arrow — tablet + desktop */}
          <button
            onClick={prev}
            className="hidden shrink-0 h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-ink transition hover:border-primary hover:text-primary md:flex"
            aria-label="Previous"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Cards: 1 on mobile/tablet, 2 on desktop */}
          <div className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-2">
            {visible.map((r, i) => (
              <div
                key={`${active}-${i}`}
                className={[
                  "flex flex-col rounded-2xl border border-border bg-background p-7 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.2)]",
                  i === 1 ? "hidden lg:flex" : "flex",
                ].join(" ")}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-star text-star" />
                  ))}
                </div>
                <div className="mt-3 font-display text-6xl leading-none text-primary/20">"</div>
                <p className="-mt-3 flex-1 text-base leading-relaxed text-ink-soft">
                  {r.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-base font-bold text-primary">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{r.name}</p>
                    <p className="text-sm text-ink-soft">{r.project} · {r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow — tablet + desktop */}
          <button
            onClick={next}
            className="hidden shrink-0 h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-ink transition hover:border-primary hover:text-primary md:flex"
            aria-label="Next"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile arrows + dots */}
        <div className="mt-6 flex items-center gap-4 md:hidden">
          <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-ink" aria-label="Previous">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={["h-2 rounded-full transition-all duration-300", i === active ? "w-6 bg-primary" : "w-2 bg-background/50"].join(" ")}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-ink" aria-label="Next">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Tablet dots (no arrows — arrows are in carousel row) */}
        <div className="mt-6 hidden justify-center gap-2 md:flex lg:hidden">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={["h-2 rounded-full transition-all duration-300", i === active ? "w-6 bg-primary" : "w-2 bg-background/50"].join(" ")}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ TEASER ────────────────────────────────────────────────────────── */
function FaqTeaser() {
  return (
    <section className="w-full bg-background px-5 py-24 md:px-10 md:py-32">
      <div className="container-prose grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal>
          <h2 className="max-w-2xl">Quick answers.</h2>
          <p className="mt-6 text-lg text-ink-soft">
            Have a different question? Reach out anytime — we're happy to help.
          </p>
          <Button asChild variant="ghost" size="md" className="mt-8">
            <Link to="/faq">
              All questions
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
        <Reveal delay={0.1}>
          <FAQAccordion items={FAQS.slice(0, 4)} />
        </Reveal>
      </div>
    </section>
  );
}

/* ─── LEAD / CTA ────────────────────────────────────────────────────────── */
function LeadSection() {
  return (
    <section id="contact" className="w-full bg-ink px-5 py-16 text-background md:px-10 md:py-32">
      <div className="container-prose grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
        {/* Form first on mobile, second on desktop */}
        <div className="order-1 min-w-0 md:order-2">
          <Reveal delay={0.1} className="w-full min-w-0">
            <div className="w-full min-w-0 rounded-2xl bg-background p-6 text-foreground md:p-8">
              <LeadForm />
            </div>
          </Reveal>
        </div>
        <div className="order-2 min-w-0 md:order-1">
          <Reveal>
            <h2 className="max-w-2xl text-background">Ready to upgrade your space?</h2>
            <p className="mt-4 text-lg text-background/80 md:mt-6 md:text-xl">
              Tell us a little about your project. We'll get back to you within 24 hours
              with next steps and a preliminary estimate.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-6 space-y-3 text-base text-background/85 md:mt-10 md:space-y-4 md:text-lg">
              {[
                "Free, no-obligation consultation",
                "Honest pricing — no hidden fees",
                "Trusted by Philadelphia & South Jersey homeowners",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary md:mt-1 md:h-6 md:w-6" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
