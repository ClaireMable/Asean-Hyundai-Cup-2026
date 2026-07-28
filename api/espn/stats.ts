export default async function handler(req: any, res: any) {
  try {
    let response = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/aff.championship/statistics");
    if (!response.ok) {
      response = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/asean.championship/statistics");
    }
    
    if (response.ok) {
      const data = await response.json();
      return res.status(200).json(data);
    }
    
    return res.status(response.status).json({ error: "Failed to fetch stats from ESPN" });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return res.status(500).json({ error: "Internal server error fetching ESPN stats" });
  }
}
