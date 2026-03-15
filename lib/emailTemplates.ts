export function buildNoticeEmailHTML(
  noticeText: string,
  deceasedName: string,
  format: string
): string {
  const formatLabel =
    format === "newspaper"
      ? "Newspaper Notice"
      : format === "social"
      ? "Social Media Post"
      : "Email Announcement";

  const formattedText = noticeText
    .split("\n")
    .map((line) =>
      line === "" ? "<br/>" : `<p style="margin:0 0 4px;">${escapeHtml(line)}</p>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Death Notice — ${escapeHtml(deceasedName)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f7fa;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f7fa;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(10deg,#1D4641,#85F199);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#D4E9CA;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Powered by Gaia</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">Evergreen</h1>
              <p style="margin:6px 0 0;color:#D4E9CA;font-size:13px;">A notice that endures</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-left:1px solid #D4E9CA;border-right:1px solid #D4E9CA;">
              <p style="margin:0 0 8px;color:#807388;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(formatLabel)}</p>
              <h2 style="margin:0 0 24px;color:#180026;font-size:20px;font-weight:600;">${escapeHtml(deceasedName)}</h2>

              <div style="background:#f3f7fa;border-left:4px solid #1D4641;border-radius:0 8px 8px 0;padding:24px;font-size:15px;line-height:1.7;color:#180026;">
                ${formattedText}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f7fa;border:1px solid #D4E9CA;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:#807388;font-size:13px;">
                This notice was created with <strong style="color:#1D4641;">Evergreen</strong>,
                powered by <strong style="color:#1D4641;">Gaia</strong>.
              </p>
              <p style="margin:0;color:#807388;font-size:12px;">
                Need help with funeral arrangements?
                <a href="https://gaia.com.au" style="color:#1D4641;text-decoration:underline;">Visit Gaia</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
