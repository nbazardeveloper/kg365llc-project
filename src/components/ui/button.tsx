import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * KG365 Button
 *
 * variant : primary | secondary | outline | ghost | muted | destructive
 * size    : sm | md | lg | icon
 * asChild : true → renders children element as the button (e.g. <Link />)
 */

const buttonVariants = cva(
  // base — layout, typography, interaction
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold " +
  "cursor-pointer select-none " +
  "transition-all duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Gold button — raised with warm shadow, gloss border on top
        primary:
          "bg-primary text-primary-foreground " +
          "shadow-[0_4px_14px_-2px_color-mix(in_oklab,var(--color-primary)_55%,transparent),inset_0_1px_0_0_rgba(255,255,255,0.25)] " +
          "hover:bg-primary/90 " +
          "hover:shadow-[0_6px_20px_-2px_color-mix(in_oklab,var(--color-primary)_65%,transparent),inset_0_1px_0_0_rgba(255,255,255,0.25)] " +
          "hover:-translate-y-0.5 " +
          "active:translate-y-0 active:shadow-[0_2px_6px_-1px_color-mix(in_oklab,var(--color-primary)_40%,transparent)] active:scale-[0.98]",

        // Dark button — raised with ink shadow
        secondary:
          "bg-ink text-background " +
          "shadow-[0_4px_14px_-2px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)] " +
          "hover:bg-ink/85 " +
          "hover:shadow-[0_6px_20px_-2px_rgba(0,0,0,0.45)] " +
          "hover:-translate-y-0.5 " +
          "active:translate-y-0 active:shadow-[0_2px_6px_-1px_rgba(0,0,0,0.3)] active:scale-[0.98]",

        // Outline — border only, fills on hover
        outline:
          "border-2 border-primary text-primary bg-transparent " +
          "shadow-[0_2px_8px_-2px_color-mix(in_oklab,var(--color-primary)_25%,transparent)] " +
          "hover:bg-primary hover:text-primary-foreground " +
          "hover:shadow-[0_4px_14px_-2px_color-mix(in_oklab,var(--color-primary)_50%,transparent)] " +
          "hover:-translate-y-0.5 " +
          "active:translate-y-0 active:scale-[0.98]",

        // Ghost — subtle, no background until hover
        ghost:
          "text-primary hover:bg-primary/10 " +
          "active:scale-[0.98]",

        // Muted — secondary surface button
        muted:
          "bg-secondary text-secondary-foreground " +
          "shadow-[0_2px_6px_-1px_rgba(0,0,0,0.08)] " +
          "hover:bg-secondary/70 hover:shadow-[0_4px_10px_-2px_rgba(0,0,0,0.12)] " +
          "hover:-translate-y-0.5 " +
          "active:translate-y-0 active:scale-[0.98]",

        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[0_3px_10px_-2px_rgba(220,38,38,0.4)] " +
          "hover:bg-destructive/90 hover:shadow-[0_5px_14px_-2px_rgba(220,38,38,0.5)] " +
          "hover:-translate-y-0.5 " +
          "active:translate-y-0 active:scale-[0.98]",
      },
      size: {
        sm:   "px-5 py-2 text-sm [&_svg]:size-4",
        md:   "px-6 py-3 text-base [&_svg]:size-5",
        lg:   "px-8 py-4 text-lg [&_svg]:size-5",
        icon: "h-10 w-10 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
