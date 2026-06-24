import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(30),
  projectType: z.string().min(1, "Choose a project type"),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  preferredContact: z.enum(["email", "phone", "text"]),
});

type FormValues = z.infer<typeof schema>;

const PROJECT_TYPES = [
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Flooring & Tile",
  "Painting & Drywall",
  "Handyman / Repairs",
  "Full Renovation",
  "Commercial Project",
  "Other",
];

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { preferredContact: "email", projectType: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Submission failed");
      toast.success("Thanks! We'll reach out within 24 hours.");
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "block w-full max-w-full rounded-md border border-input bg-background px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
  const labelCls = "block text-[15px] font-medium text-ink mb-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 w-full min-w-0 gap-5" noValidate>
      <div className={compact ? "grid grid-cols-1 gap-5 sm:grid-cols-2" : "grid grid-cols-1 min-w-0 gap-5 md:grid-cols-2"}>
        <div className="min-w-0">
          <label className={labelCls} htmlFor="name">Full name</label>
          <input id="name" className={inputCls} placeholder="Jane Smith" {...register("name")} />
          {errors.name && <p className="mt-1.5 text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="min-w-0">
          <label className={labelCls} htmlFor="phone">Phone</label>
          <input id="phone" className={inputCls} placeholder="(215) 555-0123" {...register("phone")} />
          {errors.phone && <p className="mt-1.5 text-sm text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 min-w-0 gap-5 md:grid-cols-2">
        <div className="min-w-0">
          <label className={labelCls} htmlFor="email">Email</label>
          <input id="email" type="email" className={inputCls} placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="mt-1.5 text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="min-w-0">
          <label className={labelCls} htmlFor="projectType">Project type</label>
          <select id="projectType" className={inputCls} {...register("projectType")} defaultValue="">
            <option value="" disabled>Select a project…</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.projectType && <p className="mt-1.5 text-sm text-destructive">{errors.projectType.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="description">Tell us about your project</label>
        <textarea
          id="description"
          rows={5}
          className={inputCls}
          placeholder="A few sentences about your space, timeline, and what you'd like to achieve."
          {...register("description")}
        />
      </div>

      <div>
        <span className={labelCls}>Preferred contact method</span>
        <div className="flex flex-wrap gap-2">
          {(["email", "phone", "text"] as const).map((m) => (
            <label
              key={m}
              className="cursor-pointer rounded-full border border-input bg-background px-5 py-2.5 text-base font-medium capitalize text-ink-soft has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
            >
              <input type="radio" value={m} className="sr-only" {...register("preferredContact")} />
              {m}
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={submitting} className="w-full">
        {submitting ? <Loader2 className="animate-spin" /> : <Send />}
        Schedule My Free Consultation
      </Button>
      <p className="text-sm text-ink-soft">
        No obligation. We reply within 24 hours during business days.
      </p>
    </form>
  );
}
