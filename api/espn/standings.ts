export default async function handler(req: any, res: any) {
  try {
    let response = await fetch("https://site.api.espn.com/apis/v2/sports/soccer/aff.championship/standings");
    if (!response.ok) {
      response = await fetch("https://site.api.espn.com/apis/v2/sports/soccer/asean.championship/standings");
    }
    
    if (response.ok) {
      const data = await response.json();
      return res.status(200).json(data);
    }
    
    return res.status(response.status).json({ error: "Failed to fetch standings from ESPN" });
  } catch (error) {
    console.error("Standings fetch error:", error);
    return res.status(500).json({ error: "Internal server error fetching ESPN standings" });
  }
}
