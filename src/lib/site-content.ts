import {
  Hammer,
  Paintbrush,
  Wrench,
  Building2,
  Grid3x3,
  type LucideIcon,
} from "lucide-react";

import kitchenBathroomImg from "@/images/services/KitchenBathroom.webp";
import flooringImg from "@/images/services/Flooring.webp";
import paintingDrywallImg from "@/images/services/PaintingDrywall.webp";
import handymanImg from "@/images/services/HandymanServices.webp";
import fullRenovationsImg from "@/images/services/FullRenovations.webp";

export type ServiceItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
  image: string;
  keywords: string;
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Kitchen & Bathroom Remodeling",
    description:
      "Full-scale kitchen and bathroom remodels — custom cabinetry, quartz countertops, designer tile, and professional finishes that elevate your space.",
    Icon: Hammer,
    image: kitchenBathroomImg,
    keywords: "Kitchen Remodeling · Bathroom Remodeling",
  },
  {
    title: "Flooring & Tile Installation",
    description:
      "Expert installation of hardwood, engineered wood, vinyl plank, laminate, and ceramic or porcelain tile — precision laid and built to last.",
    Icon: Grid3x3,
    image: flooringImg,
    keywords: "Flooring · Tile Installation",
  },
  {
    title: "Painting & Drywall",
    description:
      "Flawless interior and exterior painting, drywall repair, and custom trim work. Clean lines, even coverage, zero shortcuts.",
    Icon: Paintbrush,
    image: paintingDrywallImg,
    keywords: "Painting · Drywall",
  },
  {
    title: "Handyman Services",
    description:
      "Reliable, efficient help for the long list — repairs, mounting, assembly, fixture replacement, and the things that keep your home moving.",
    Icon: Wrench,
    image: handymanImg,
    keywords: "Handyman Services",
  },
  {
    title: "Full Renovations",
    description:
      "End-to-end project management for residential and commercial spaces. One team, clear timelines, transparent pricing.",
    Icon: Building2,
    image: fullRenovationsImg,
    keywords: "Home & Commercial Renovations",
  },
];

export const FAQS = [
  {
    q: "Do you offer free estimates?",
    a: "Yes — every project starts with a free consultation and preliminary cost estimate. We'll discuss your goals, walk the space, and give you a clear, honest scope.",
  },
  {
    q: "What areas do you serve?",
    a: "We proudly serve Philadelphia, its surrounding suburbs, and South New Jersey. If you're nearby and unsure, just ask — we travel for the right project.",
  },
  {
    q: "Can I hire you for small tasks?",
    a: "Absolutely. From a single light fixture to a multi-week renovation, we treat every job with the same level of care and professionalism.",
  },
  {
    q: "Do you help with material selection?",
    a: "Yes. With 20+ years of hands-on experience, we'll guide you to materials that fit your style, perform well in your space, and stay within budget.",
  },
  {
    q: "How do we get started?",
    a: "Send us a message through the booking form or call us directly. We'll set up a free consultation, walk through your vision, and follow up with a written estimate.",
  },
];
