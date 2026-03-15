import { Resend } from "resend";
import { buildNoticeEmailHTML } from "@/lib/emailTemplates";

interface SendNoticeBody {
  to: string;
  deceasedName: string;
  format: string;
  noticeText: string;
}

export async function POST(req: Request) {
  let body: SendNoticeBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { to, deceasedName, format, noticeText } = body;

  if (!to || !deceasedName || !noticeText) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: "Email service not configured" },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@evergreen.gaia.com.au";

    await resend.emails.send({
      from: `Evergreen <${fromEmail}>`,
      to,
      subject: `Death Notice — ${deceasedName}`,
      html: buildNoticeEmailHTML(noticeText, deceasedName, format),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
