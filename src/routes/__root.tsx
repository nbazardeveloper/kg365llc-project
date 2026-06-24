import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Button } from "../components/ui/button";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-2xl">Page not found</h2>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for has moved or doesn't exist.
        </p>
        <div className="mt-8">
          <Button asChild variant="primary" size="md">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h2 className="text-2xl">Something went wrong</h2>
        <p className="mt-3 text-muted-foreground">
          Please try again or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => { router.invalidate(); reset(); }}
          >
            Try again
          </Button>
          <Button asChild variant="outline" size="md">
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KG365 LLC — Premium Renovations & Handyman Services in Philadelphia" },
      {
        name: "description",
        content:
          "KG365 LLC delivers premium kitchen & bathroom remodeling, tile, flooring, painting, and handyman services across Philadelphia and South Jersey. 20+ years of craftsmanship.",
      },
      { name: "author", content: "KG365 LLC" },
      { property: "og:site_name", content: "KG365 LLC" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "KG365 LLC — Premium Renovations in Philadelphia" },
      {
        property: "og:description",
        content:
          "Kitchen & bathroom remodeling, tile, flooring, painting, and handyman services. 20+ years of experience serving Philadelphia and South Jersey.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GeneralContractor",
          name: "KG365 LLC",
          description:
            "Premium home and commercial renovations, remodeling, tile, flooring, painting, and handyman services.",
          areaServed: ["Philadelphia, PA", "South New Jersey"],
          telephone: "+1-445-333-1193",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        {/* Spacer compensates for the fixed header so page content isn't hidden behind it */}
        <div className="h-16 shrink-0 md:h-[77px]" />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        {/* Bottom padding on mobile so sticky button doesn't cover footer */}
        <div className="h-20 lg:hidden" />
      </div>
      {/* Mobile sticky CTA — hidden on desktop, hidden on /contact page */}
      <MobileStickyButton />
      <Toaster position="top-center" richColors closeButton />
    </QueryClientProvider>
  );
}

function MobileStickyButton() {
  const location = useLocation();
  // Don't show on the contact page itself
  if (location.pathname === "/contact") return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full px-4 pb-4 pt-3 lg:hidden
                    bg-gradient-to-t from-background/95 to-transparent backdrop-blur-sm">
      <Button asChild variant="primary" size="lg" className="w-full">
        <Link to="/contact">
          <Phone />
          Get a Free Consultation
        </Link>
      </Button>
    </div>
  );
}
