export default async function handler(req, res) {
    const API_KEY = process.env.API_CURRENCY_KEY;
  
    if (!API_KEY) {
      return res.status(500).json({ error: "API key is not set in environment variables." });
    }
  
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
      if (!response.ok) {
        throw new Error("Error fetching data from external API");
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
