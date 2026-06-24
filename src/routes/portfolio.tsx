import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/Reveal";
import { portfolioListQuery } from "@/lib/portfolio";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Renovation & Remodel Projects | KG365 LLC" },
      {
        name: "description",
        content:
          "Browse completed kitchen, bathroom, flooring, tile, painting, and full renovation projects by KG365 LLC across Philadelphia and South Jersey.",
      },
      { property: "og:title", content: "Portfolio — KG365 LLC" },
      {
        property: "og:description",
        content: "Featured kitchen, bathroom, tile, flooring, and renovation projects.",
      },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(portfolioListQuery);
  },
  component: PortfolioPage,
  errorComponent: () => (
    <div className="container-prose py-24">
      <h1>Portfolio unavailable</h1>
      <p className="mt-4 text-ink-soft">Please refresh in a moment.</p>
    </div>
  ),
});

function PortfolioPage() {
  const { data } = useSuspenseQuery(portfolioListQuery);

  return (
    <>
      <section className="w-full bg-sand px-5 py-24 md:px-10 md:py-32">
        <div className="container-prose">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Portfolio</p>
            <h1 className="mt-4 max-w-4xl">
              Featured projects.
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-ink-soft">
              A look at recent kitchen, bathroom, tile, flooring, and renovation work
              we've completed across Philadelphia and South Jersey.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="w-full px-5 py-20 md:px-10 md:py-28">
        <div className="container-prose">
          {data.length === 0 ? (
            <p className="text-ink-soft">No projects published yet.</p>
          ) : (
            <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.map((p) => (
                <StaggerItem key={p.id}>
                  <article className="group overflow-hidden rounded-2xl border border-border bg-card">
                    {p.before_image_url && (
                      <div className="grid grid-cols-2">
                        <figure className="relative aspect-square overflow-hidden">
                          <img
                            src={p.before_image_url}
                            alt={`${p.title} before`}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                          <figcaption className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-widest text-background">
                            Before
                          </figcaption>
                        </figure>
                        <figure className="relative aspect-square overflow-hidden">
                          <img
                            src={p.after_image_url}
                            alt={`${p.title} after`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <figcaption className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs uppercase tracking-widest text-primary-foreground">
                            After
                          </figcaption>
                        </figure>
                      </div>
                    )}
                    {!p.before_image_url && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={p.after_image_url}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-[0.25em] text-primary">
                        {p.category}
                      </p>
                      <h3 className="mt-2 text-2xl">{p.title}</h3>
                      {p.location && (
                        <p className="mt-1 text-sm text-ink-soft">{p.location}</p>
                      )}
                      {p.description && (
                        <p className="mt-3 text-ink-soft">{p.description}</p>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </>
  );
}
