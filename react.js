import React, { useState } from "react";
import Chance from "chance";

const App = () => {
  const [seed, setSeed] = useState("");
  const [clientSeed, setClientSeed] = useState("");
  const [amount, setAmount] = useState(1);
  const [results, setResults] = useState([]);

  const generateTickets = () => {
    const chanceInstance = new Chance(seed);
    const generatedResults = [];

    for (let i = 0; i < amount; i++) {
      const caseSeed = `${seed}-${clientSeed}-CASE-${i + 1}`;
      const instance = new Chance(caseSeed);
      generatedResults.push(instance.floating({ min: 0, max: 1, fixed: 10 }));
    }

    setResults(generatedResults);
  };

  return (
    <div>
      <h1>Provably Fair RNG</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateTickets();
        }}
      >
        <label>
          Seed:
          <input value={seed} onChange={(e) => setSeed(e.target.value)} />
        </label>
        <label>
          Client Seed:
          <input
            value={clientSeed}
            onChange={(e) => setClientSeed(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </label>
        <button type="submit">Generate</button>
      </form>
      {results.length > 0 && (
        <div>
          <h2>Results</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>Case {index + 1}: {result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
