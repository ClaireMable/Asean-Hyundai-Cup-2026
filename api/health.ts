export default function handler(req: any, res: any) {
  res.status(200).json({
    status: "operational",
    siteName: "KAPSUL4D World Cup Edition Blue",
    serverTime: new Date().toISOString(),
    activePlayers: 18492,
    rtpStatus: "LIVE",
  });
}
