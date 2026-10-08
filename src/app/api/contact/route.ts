import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer needs Node's net/tls modules, so this can't run on the Edge.
export const runtime = "nodejs";

const FIELDS = [
  { key: "fullName", label: "Full name", max: 120 },
  { key: "email", label: "Email", max: 254 },
  { key: "phone", label: "Phone / WhatsApp", max: 40 },
  { key: "company", label: "Company", max: 160 },
  { key: "interestedIn", label: "Interested in", max: 160 },
  { key: "message", label: "Message", max: 5000 },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];
type Lead = Record<FieldKey, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Light per-IP throttle so the form can't be used to flood the inbox. Lives in
// memory, which is fine for the single PM2 instance this runs on.
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT.windowMs
  );
  hits.push(now);
  recentSubmissions.set(ip, hits);
  return hits.length > RATE_LIMIT.max;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseLead(body: unknown): Lead | string {
  if (!body || typeof body !== "object") return "Invalid request.";
  const input = body as Record<string, unknown>;
  const lead = {} as Lead;

  for (const { key, label, max } of FIELDS) {
    const raw = input[key];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (!value) return `${label} is required.`;
    if (value.length > max) return `${label} is too long.`;
    lead[key] = value;
  }

  if (!EMAIL_PATTERN.test(lead.email)) return "Please enter a valid email.";
  return lead;
}

function buildEmail(lead: Lead, submittedAt: string) {
  const rows = FIELDS.map(({ key, label }) => {
    const value = escapeHtml(lead[key]).replace(/\n/g, "<br />");
    const content =
      key === "email"
        ? `<a href="mailto:${escapeHtml(lead.email)}" style="color:#0325E1;">${value}</a>`
        : key === "phone"
          ? `<a href="tel:${escapeHtml(lead.phone.replace(/[^\d+]/g, ""))}" style="color:#0325E1;">${value}</a>`
          : value;

    return `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #eef0f4;width:160px;vertical-align:top;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">${label}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #eef0f4;vertical-align:top;font-size:15px;color:#111827;line-height:1.5;">${content}</td>
      </tr>`;
  }).join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr>
        <td style="background:#0325E1;padding:24px;">
          <div style="font-size:12px;color:#c7d0ff;text-transform:uppercase;letter-spacing:0.08em;">Xvintec website</div>
          <div style="font-size:22px;font-weight:700;color:#ffffff;margin-top:4px;">New lead from the contact form</div>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 8px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px 24px;font-size:13px;color:#6b7280;">
          Submitted on ${escapeHtml(submittedAt)}.<br />
          Reply to this email to respond to ${escapeHtml(lead.fullName)} directly.
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New lead from the Xvintec website contact form",
    "",
    ...FIELDS.map(({ key, label }) => `${label}: ${lead[key]}`),
    "",
    `Submitted on ${submittedAt}`,
  ].join("\n");

  return { html, text };
}

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } =
    process.env;

  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !CONTACT_TO_EMAIL
  ) {
    console.error("Contact form: SMTP environment variables are missing.");
    return NextResponse.json(
      { error: "The form is temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in. Pretend it worked so
  // bots don't learn to skip it.
  const honeypot = (body as Record<string, unknown> | null)?.website;
  if (typeof honeypot === "string" && honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const lead = parseLead(body);
  if (typeof lead === "string") {
    return NextResponse.json({ error: lead }, { status: 400 });
  }

  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 is implicit TLS; 587 upgrades via STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const submittedAt = `${new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Colombo",
  }).format(new Date())} (Sri Lanka time)`;
  const { html, text } = buildEmail(lead, submittedAt);

  try {
    await transporter.sendMail({
      // Zoho only relays mail sent from the authenticated mailbox.
      from: { name: "Xvintec Website", address: SMTP_USER },
      to: CONTACT_TO_EMAIL.split(",")
        .map((address) => address.trim())
        .filter(Boolean),
      replyTo: { name: lead.fullName, address: lead.email },
      subject: `New enquiry: ${lead.interestedIn} – ${lead.fullName} (${lead.company})`,
      html,
      text,
    });
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
