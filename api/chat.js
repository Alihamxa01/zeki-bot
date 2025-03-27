export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": req.headers.referer || "https://yourdomain.com",
          "X-Title": "ZEKI BOT",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }