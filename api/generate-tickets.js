const Chance = require("chance");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { seed, clientSeed, amount } = req.body;

  if (!seed || !clientSeed || typeof amount !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  const results = [];
  for (let i = 0; i < amount; i++) {
    const caseSeed = `${seed}-${clientSeed}-CASE-${i + 1}`;
    const chanceInstance = new Chance(caseSeed);
    results.push(chanceInstance.floating({ min: 0, max: 1, fixed: 10 }));
  }

  res.status(200).json({ results });
}
