export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(200).json({ status: "proxy ok" });
  }

  try {
    const { url, method = "GET", body } = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(body ? { body } : {}),
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

export const config = {
  api: { bodyParser: true },
};
