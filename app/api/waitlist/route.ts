const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface WaitlistRequestBody {
  email?: unknown;
  consent?: unknown;
  website?: unknown;
  source?: unknown;
}

function json(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function demoResponse(): Response {
  return json({
    ok: true,
    mode: "demo",
    message:
      "Demo mode: waitlist delivery is not configured, so your email was not stored or sent. Configure RESEND_API_KEY / WAITLIST_* or WAITLIST_WEBHOOK_URL to enable delivery.",
  });
}

export async function POST(request: Request) {
  let body: WaitlistRequestBody;

  try {
    body = (await request.json()) as WaitlistRequestBody;
  } catch {
    return json(
      { ok: false, error: "The waitlist request was not valid JSON." },
      400,
    );
  }

  // Honeypot field. Return an innocuous demo response without processing.
  if (typeof body.website === "string" && body.website.trim()) {
    return demoResponse();
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json(
      { ok: false, error: "Enter a valid email address." },
      400,
    );
  }

  if (body.consent !== true) {
    return json(
      { ok: false, error: "Consent is required to join the waitlist." },
      400,
    );
  }

  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.WAITLIST_FROM_EMAIL;
  const toEmail = process.env.WAITLIST_TO_EMAIL;

  const payload = {
    email,
    consent: true,
    source:
      typeof body.source === "string" ? body.source.slice(0, 80) : "afterform",
    submittedAt: new Date().toISOString(),
  };

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Waitlist webhook failed:", response.status);
        return json(
          {
            ok: false,
            error:
              "The waitlist endpoint rejected the request. No address was saved.",
          },
          502,
        );
      }

      return json({
        ok: true,
        mode: "webhook",
        message:
          "Your signal was delivered to the configured waitlist webhook.",
      });
    } catch {
      return json(
        {
          ok: false,
          error:
            "The waitlist endpoint could not be reached. No address was saved.",
        },
        502,
      );
    }
  }

  if (resendKey) {
    if (!fromEmail || !toEmail) {
      return json(
        {
          ok: false,
          error:
            "Waitlist email is partially configured. Set WAITLIST_FROM_EMAIL and WAITLIST_TO_EMAIL.",
        },
        503,
      );
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: "AFTERFORM waitlist / new signal",
          text: [
            "New AFTERFORM waitlist signal.",
            "",
            `Email: ${email}`,
            `Source: ${payload.source}`,
            `Submitted: ${payload.submittedAt}`,
            "",
            "This address was submitted with consent on the concept site.",
          ].join("\n"),
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Resend waitlist delivery failed:", response.status);
        return json(
          {
            ok: false,
            error:
              "The waitlist email could not be sent. No address was stored by this app.",
          },
          502,
        );
      }

      return json({
        ok: true,
        mode: "resend",
        message:
          "Your signal was delivered to the studio's configured inbox.",
      });
    } catch {
      return json(
        {
          ok: false,
          error:
            "The waitlist email provider could not be reached. No address was stored by this app.",
        },
        502,
      );
    }
  }

  return demoResponse();
}
