const SITE_URL = "https://www.linda-x.com";
const DEFAULT_FROM = "Linda Somiari-Stewart <hello@linda-x.com>";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function firstNameFrom(name) {
  const first = String(name || "")
    .trim()
    .split(/\s+/)[0];
  return first || "friend";
}

export function buildReadersClubWelcome({ name }) {
  const firstName = firstNameFrom(name);
  const safeName = escapeHtml(firstName);
  const subject = "Hello from Linda";

  const text = `Dear ${firstName},

Thank you for reading with me. Stories are sacred to me, and every tale is a journey home.

I will write when there is a new story to share. If you are deciding where to begin, Woyingi, Tari-Ere, and Firelight Fables are there for you.

Make a cup of tea, find a quiet corner, and let the stories lead you.

With gratitude,
Linda Somiari-Stewart
Author | Cultural Custodian | Modern Griot
www.linda-x.com
`;

  const html = `<div>
<p>Dear ${safeName},</p>
<p>Thank you for reading with me. Stories are sacred to me, and every tale is a journey home.</p>
<p>I will write when there is a new story to share. If you are deciding where to begin, <em>Woyingi</em>, <em>Tari-Ere</em>, and <em>Firelight Fables</em> are there for you.</p>
<p>Make a cup of tea, find a quiet corner, and let the stories lead you.</p>
<p>With gratitude,<br>
Linda Somiari-Stewart<br>
Author | Cultural Custodian | Modern Griot<br>
<a href="${SITE_URL}">www.linda-x.com</a></p>
</div>`;

  return { subject, text, html };
}

export async function sendReadersClubWelcome({ name, email }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set. Welcome email was not sent.");
    return { sent: false, reason: "missing_api_key" };
  }

  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const { subject, text, html } = buildReadersClubWelcome({ name });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: "hello@linda-x.com",
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Resend welcome email failed:", response.status, details);
    return { sent: false, reason: "resend_error" };
  }

  return { sent: true };
}
