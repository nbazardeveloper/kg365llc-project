import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact KG365 LLC — Free Renovation Consultation" },
      {
        name: "description",
        content:
          "Book a free renovation consultation with KG365 LLC. Serving Philadelphia, surrounding suburbs, and South New Jersey.",
      },
      { property: "og:title", content: "Contact KG365 LLC" },
      {
        property: "og:description",
        content: "Free consultations for kitchen, bathroom, tile, flooring, painting, and handyman work.",
      },
      { property: "og:url", content: "https://kg365llc.com/contact" },
      { property: "og:image", content: "https://kg365llc.com/og-image.webp" },
    ],
    links: [{ rel: "canonical", href: "https://kg365llc.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="w-full px-5 py-20 md:px-10 md:py-28">
      <div className="container-prose grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Contact</p>
            <h1 className="mt-4">Let's talk about your project.</h1>
            <p className="mt-6 text-xl text-ink-soft">
              Free consultations. Honest estimates. Real timelines.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-5 text-lg">
              <li className="flex items-start gap-4">
                <Phone className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-ink">Call us</p>
                  <a href="tel:+14453331193" className="text-ink-soft hover:text-primary">
                    (445) 333-1193
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <a href="mailto:kg365llc@gmail.com" className="text-ink-soft hover:text-primary">
                    kg365llc@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-ink">Service area</p>
                  <p className="text-ink-soft">Philadelphia, PA · Surrounding suburbs · South Jersey</p>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="w-full min-w-0">
          <div className="w-full min-w-0 rounded-2xl border border-border bg-card p-6 md:p-10">
            <h2 className="text-3xl">Schedule a free consultation</h2>
            <p className="mt-3 text-ink-soft">
              Tell us about your space. We'll reach out within 24 hours.
            </p>
            <div className="mt-8">
              <LeadForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
