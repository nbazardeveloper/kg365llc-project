import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServiceCard({
  title,
  description,
  image,
  index,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  image: string;
  keywords?: string;
  index: number;
}) {
  const serial = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative flex flex-col overflow-hidden">

      {/*
        1. IMAGE CONTAINER
           - position: relative  → anchor for the absolute overlay
           - overflow: hidden    → clips the overlay; overlay slides within this boundary only
           The outer card wrapper also has overflow:hidden as a safety context.
      */}
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "2/3" }}>
        <img
          src={image}
          alt={`${title} by KG365 LLC`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/*
          ABSOLUTE OVERLAY — lives INSIDE the image container.
          position: absolute; bottom: 0; left: 0; width: 100%
          Base state:  translateY(100%)  → hidden below the image clipping edge
          Hover state: translateY(0)     → slides up, covers bottom portion of image
          Card height NEVER changes. Nothing below this div is touched.
        */}
        <div
          className="absolute bottom-0 left-0 w-full translate-y-full bg-background px-5 py-6 transition-transform duration-[350ms] ease-in-out group-hover:translate-y-0"
        >
          <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link to="/contact">
              Get a Free Quote
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. SERIAL NUMBER + LINE — fixed directly beneath the image, never moves */}
      <div className="mt-4 flex items-center gap-3">
        <span className="shrink-0 text-sm font-bold tracking-[0.25em] text-primary">{serial}</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* 3. SERVICE TITLE — fixed beneath number+line, never moves */}
      <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{title}</h3>

      {/* 4+5. DESCRIPTION + CTA — visible on mobile (no hover), hidden on desktop (shown via overlay) */}
      <div className="mt-4 md:hidden">
        <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link to="/contact">
            Get a Free Quote
            <ArrowRight />
          </Link>
        </Button>
      </div>

    </div>
  );
}
