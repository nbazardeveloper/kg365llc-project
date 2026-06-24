/**
 * Lead notification helpers.
 *
 * Real Resend + Telegram integrations are stubbed for this release.
 * Replace the bodies below with real gateway calls once API keys are wired in.
 *
 * Resend (via connector gateway):
 *   POST https://connector-gateway.lovable.dev/resend/emails
 *
 * Telegram (via connector gateway):
 *   POST https://connector-gateway.lovable.dev/telegram/sendMessage
 */

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description?: string;
  preferredContact: "email" | "phone" | "text";
};

export async function sendLeadEmail(lead: LeadPayload) {
  console.log("[notifications] (mock) Resend email for new lead:", lead.email);
  // TODO: integrate Resend
  // const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  // const RESEND_API_KEY = process.env.RESEND_API_KEY;
  // await fetch("https://connector-gateway.lovable.dev/resend/emails", { ... });
  return { ok: true, mocked: true as const };
}

export async function sendLeadTelegram(lead: LeadPayload) {
  console.log("[notifications] (mock) Telegram message for new lead from:", lead.name);
  // TODO: integrate Telegram
  // const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  // const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
  // await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", { ... });
  return { ok: true, mocked: true as const };
}
