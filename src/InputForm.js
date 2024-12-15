import React from "react";

const InputForm = ({ seed, setSeed, clientSeed, setClientSeed, amount, setAmount, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      Seed:
      <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} required />
    </label>
    <label>
      Client Seed:
      <input type="text" value={clientSeed} onChange={(e) => setClientSeed(e.target.value)} required />
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
);

export default InputForm;
