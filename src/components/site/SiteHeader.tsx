import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import logoImage from "@/images/logo.webp";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Transparent header only on the home page (hero provides dark background)
  const isHome = location.pathname === "/";
  // Header is "light" when scrolled OR on any non-home page
  const light = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 z-50 w-full transition-all duration-500",
        light
          ? "border-b border-border bg-background/92 backdrop-blur-md shadow-sm"
          : "border-b border-white/10 bg-transparent",
      ].join(" ")}
    >
      <div className="flex w-full items-center justify-between px-5 py-4 lg:grid lg:grid-cols-[1fr_auto_1fr] md:px-10 md:py-5">
        {/* Logo — left */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoImage}
            alt="KG365 LLC"
            className="h-10 w-auto transition-all duration-500 md:h-12"
          />
          <div
            className={[
              "flex flex-col justify-between self-stretch leading-none transition-colors duration-500",
              light ? "text-ink" : "text-white",
            ].join(" ")}
          >
            <span className="font-logo text-[26px] tracking-[0.03em]">KG365 LLC</span>
            <div className="h-px w-full bg-primary opacity-70" />
            <span className="font-logo text-[21px] tracking-[0.06em]">RENOVATION</span>
          </div>
        </Link>

        {/* Nav links — center */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={[
                "text-base font-semibold uppercase tracking-widest transition-colors duration-300 hover:text-primary",
                light ? "text-ink-soft" : "text-white/85",
              ].join(" ")}
              activeProps={{ className: "!text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + burger — right */}
        <div className="flex items-center justify-end gap-3">
          {/* Phone number — desktop only */}
          <a
            href="tel:+14453331193"
            className={[
              "hidden xl:inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 hover:text-primary",
              light ? "text-ink-soft" : "text-white/80",
            ].join(" ")}
          >
            <Phone className="h-4 w-4" />
            (445) 333-1193
          </a>
          <Button asChild variant="primary" size="sm" className="hidden lg:inline-flex">
            <Link to="/contact">Free Consultation</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className={[
              "inline-flex h-12 w-12 items-center justify-center rounded-md lg:hidden transition-colors duration-300",
              light ? "text-ink" : "text-background",
            ].join(" ")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-lg font-medium text-ink-soft hover:bg-accent"
                activeProps={{ className: "text-primary bg-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="primary" size="md" className="mt-2">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Free Consultation
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
