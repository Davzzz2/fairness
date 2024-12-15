import React, { useState } from "react";
import "./styles/main.css";

const App = () => {
  const [seed, setSeed] = useState("");
  const [clientSeed, setClientSeed] = useState("");
  const [amount, setAmount] = useState(1);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setResults([]);

    try {
      const response = await fetch("/api/generate-tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed, clientSeed, amount: Number(amount) }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate tickets");
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Provably Fair RNG</h1>
      <form onSubmit={handleGenerate}>
        <label>
          Seed:
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            required
          />
        </label>
        <label>
          Client Seed:
          <input
            type="text"
            value={clientSeed}
            onChange={(e) => setClientSeed(e.target.value)}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            required
          />
        </label>
        <button type="submit">Generate</button>
      </form>

      {error && <p className="error">{error}</p>}
      {results.length > 0 && (
        <div>
          <h2>Generated Values</h2>
          <ul>
            {results.map((value, index) => (
              <li key={index}>
                Case {index + 1}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
