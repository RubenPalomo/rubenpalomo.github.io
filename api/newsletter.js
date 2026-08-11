const escapeMarkdown = (value = "") =>
  String(value).replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");

const json = (response, statusCode, body) => {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(body));
};

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    json(response, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  const telegramToken = process.env.TELEGRAM_TOKEN;
  const telegramId = process.env.TELEGRAM_ID;

  if (!telegramToken || !telegramId) {
    json(response, 500, { ok: false, error: "Telegram is not configured" });
    return;
  }

  const { name, email, company, consent, source } = request.body || {};
  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim();
  const cleanCompany = String(company || "").trim();
  const cleanSource = String(source || "").trim();

  if (!cleanName || !cleanEmail || consent !== true) {
    json(response, 400, { ok: false, error: "Missing required fields" });
    return;
  }

  const text = [
    "*Nueva suscripción a la newsletter*",
    "",
    `*Nombre:* ${escapeMarkdown(cleanName)}`,
    `*Email:* ${escapeMarkdown(cleanEmail)}`,
    cleanCompany ? `*Empresa:* ${escapeMarkdown(cleanCompany)}` : "",
    "",
    "Interés: ofertas, automatización, productividad, alcance e IA aplicada.",
    cleanSource ? `Origen: ${escapeMarkdown(cleanSource)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${telegramToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramId,
        text,
        parse_mode: "MarkdownV2",
      }),
    },
  );

  if (!telegramResponse.ok) {
    json(response, 502, { ok: false, error: "Telegram notification failed" });
    return;
  }

  json(response, 200, { ok: true });
};
