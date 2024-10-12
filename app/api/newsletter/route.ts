import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const MailchimpKey = process.env.MAILCHIMP_API_KEY;
  const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
  const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;

  const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

  try {
    const response = await fetch(customUrl, {
      method: "POST",
      headers: {
        Authorization: `apikey ${MailchimpKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(400).json({ error: data.detail || "Error subscribing" });
    }

    return res.status(201).json({ message: "Subscription successful", data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
