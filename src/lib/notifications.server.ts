import { Resend } from "resend";

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description?: string;
  preferredContact: "email" | "phone" | "text";
};

const NOTIFY_TO = "kg365llc@gmail.com";
const FROM_EMAIL = "noreply@kg365llc.com"; // домен верифицирован в Resend

export async function sendLeadEmail(lead: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[notifications] RESEND_API_KEY not set — skipping email");
    return { ok: false, reason: "no_api_key" };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `KG365 LLC Website <${FROM_EMAIL}>`,
    to: NOTIFY_TO,
    replyTo: lead.email,
    subject: `New Lead: ${lead.projectType} — ${lead.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #F9B41F; padding: 24px 32px;">
          <h1 style="margin: 0; color: #1a1a1a; font-size: 22px;">New Project Inquiry</h1>
        </div>
        <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e5e5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; width: 140px; font-size: 14px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #1a1a1a;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #1a1a1a;">
                <a href="tel:${lead.phone}" style="color: #1a1a1a;">${lead.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #1a1a1a;">
                <a href="mailto:${lead.email}" style="color: #1a1a1a;">${lead.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px;">Project Type</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #1a1a1a;">${lead.projectType}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px;">Contact via</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #1a1a1a; text-transform: capitalize;">${lead.preferredContact}</td>
            </tr>
            ${lead.description ? `
            <tr>
              <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Description</td>
              <td style="padding: 10px 0; color: #1a1a1a; line-height: 1.6;">${lead.description}</td>
            </tr>
            ` : ""}
          </table>
        </div>
        <div style="padding: 20px 32px; background: #f9f9f9; border: 1px solid #e5e5e5; border-top: none;">
          <p style="margin: 0; color: #999; font-size: 12px;">
            Submitted via kg365llc.com · Reply to this email to contact the client directly.
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[notifications] Resend error:", error);
    return { ok: false, error };
  }

  console.log("[notifications] Email sent to", NOTIFY_TO);
  return { ok: true };
}

// Telegram — можно добавить позже
export async function sendLeadTelegram(lead: LeadPayload) {
  console.log("[notifications] Telegram not configured, skipping:", lead.name);
  return { ok: false, reason: "not_configured" };
}
