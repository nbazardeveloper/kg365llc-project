import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  projectType: z.string().min(1).max(120),
  description: z.string().trim().max(2000).optional().default(""),
  preferredContact: z.enum(["email", "phone", "text"]),
});

export const Route = createFileRoute("/api/public/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = leadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const lead = parsed.data;

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const { error } = await supabaseAdmin.from("leads").insert({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            project_type: lead.projectType,
            description: lead.description ?? "",
            preferred_contact: lead.preferredContact,
            source: "website",
          });

          if (error) {
            console.error("[leads] supabase insert failed:", JSON.stringify(error));
            return Response.json({ error: "Could not save your request", detail: error.message }, { status: 500 });
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("[leads] supabase error:", msg);
          return Response.json({ error: "Database error", detail: msg }, { status: 500 });
        }

        try {
          const { sendLeadEmail, sendLeadTelegram } = await import("@/lib/notifications.server");
          await Promise.allSettled([sendLeadEmail(lead), sendLeadTelegram(lead)]);
        } catch (err) {
          console.error("[leads] notification error:", err instanceof Error ? err.message : err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
