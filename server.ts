import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health API
  app.get("/api/health", (req, res) => {
    res.json({
      status: "operational",
      siteName: "KAPSUL4D AFF Edition Blue",
      serverTime: new Date().toISOString(),
      activePlayers: 18492,
      rtpStatus: "LIVE",
    });
  });

  // ESPN Scoreboard Endpoint
  app.get("/api/espn/scoreboard", async (req, res) => {
    try {
      let response = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/aff.championship/scoreboard");
      if (!response.ok) {
        response = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/asean.championship/scoreboard");
      }
      
      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }
      
      return res.status(response.status).json({ error: "Failed to fetch from ESPN" });
    } catch (error) {
      console.error("Scoreboard fetch error:", error);
      return res.status(500).json({ error: "Internal server error fetching ESPN scoreboard" });
    }
  });

  // ESPN Statistics Endpoint
  app.get("/api/espn/stats", async (req, res) => {
    try {
      let response = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/aff.championship/statistics");
      if (!response.ok) {
        response = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/asean.championship/statistics");
      }
      
      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }
      
      return res.status(response.status).json({ error: "Failed to fetch stats from ESPN" });
    } catch (error) {
      console.error("Stats fetch error:", error);
      return res.status(500).json({ error: "Internal server error fetching ESPN stats" });
    }
  });

  // ESPN Standings Endpoint
  app.get("/api/espn/standings", async (req, res) => {
    try {
      let response = await fetch("https://site.api.espn.com/apis/v2/sports/soccer/aff.championship/standings");
      if (!response.ok) {
        response = await fetch("https://site.api.espn.com/apis/v2/sports/soccer/asean.championship/standings");
      }
      
      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }
      
      return res.status(response.status).json({ error: "Failed to fetch standings from ESPN" });
    } catch (error) {
      console.error("Standings fetch error:", error);
      return res.status(500).json({ error: "Internal server error fetching ESPN standings" });
    }
  });

  // Vite Middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(3000, "localhost", () => {
    console.log(`Kapsul4D Asean Hyundai Cup server running on http://localhost:3000/`);
  });
}

startServer();
