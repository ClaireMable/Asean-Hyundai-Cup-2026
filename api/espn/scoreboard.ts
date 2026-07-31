export default async function handler(req: any, res: any) {
  try {
    const dates = req.query?.dates || "20260724-20260826";
    let response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/aff.championship/scoreboard?dates=${dates}`);
    if (!response.ok) {
      response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/asean.championship/scoreboard?dates=${dates}`);
    }
    
    if (response.ok) {
      const data = await response.json();
      return res.status(200).json(data);
    }
    
    return res.status(response.status).json({ error: "Failed to fetch from ESPN" });
  } catch (error) {
    console.error("Scoreboard fetch error:", error);
    return res.status(500).json({ error: "Internal server error fetching ESPN scoreboard" });
  }
}
