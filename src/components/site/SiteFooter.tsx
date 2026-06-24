import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import logoImage from "@/images/logo.webp";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-ink text-background">
      <div className="grid w-full gap-12 px-5 py-16 md:grid-cols-3 md:px-10 md:py-20">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="KG365 LLC"
              className="h-12 w-auto"
            />
            <div className="flex flex-col justify-between self-stretch leading-none text-background">
              <span className="font-logo text-[40px] tracking-[0.03em]">KG365 LLC</span>
              <div className="h-px w-full bg-primary opacity-70" />
              <span className="font-logo text-[32px] tracking-[0.06em]">RENOVATION</span>
            </div>
          </Link>
          <p className="mt-4 max-w-sm text-background/70">
            Premium home and commercial renovations. 20+ years of craftsmanship serving
            Philadelphia and South Jersey.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="rounded-full border border-background/20 p-3 transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="rounded-full border border-background/20 p-3 transition-colors hover:border-primary hover:text-primary"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl text-background">Contact</h3>
          <ul className="mt-5 space-y-4 text-background/80">
            <li className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <a href="tel:+14453331193" className="hover:text-primary">
                (445) 333-1193
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <a href="mailto:kg365llc@gmail.com" className="hover:text-primary">
                kg365llc@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <span>Philadelphia, PA & South Jersey</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl text-background">Explore</h3>
          <ul className="mt-5 grid grid-cols-2 gap-y-3 text-background/80">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary">Portfolio</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="flex w-full flex-col gap-3 px-5 py-6 text-sm text-background/60 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {year} KG365 LLC. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
