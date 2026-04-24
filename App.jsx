import React, { useState, useMemo, useCallback, memo, lazy, Suspense } from "react";

const items = new Array(3000).fill(0).map((_, i) => ({
  id: i,
  text: "Item " + i + " " + new Array(100).fill("x").join(""),
  computed: ("Item " + i + " " + new Array(100).fill("x").join("")).split("").reverse().join(""),
}));

const Row = memo(({ row }) => {
  const handleClick = useCallback(() => {
    alert("Button clicked!");
  }, []);

  return (
    <div style={{
      padding: 8,
      borderBottom: "1px solid #eee",
      display: "flex",
      justifyContent: "space-between",
    }}>
      <div>
        <strong>{row.id}</strong> – {row.computed.substring(0, 60)}
      </div>
      <button onClick={handleClick}>Btn</button>
    </div>
  );
});

function HeavyComponent() {
  const [input, setInput] = useState("");

  const derivedValue = useMemo(
    () => items.map((i) => i.id).join("-"),
    []
  );

  const handleInput = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  return (
    <div style={{ border: "2px solid green", padding: 16, marginTop: 32 }}>
      <h2>HeavyComponent (Optimized)</h2>
      <p>Optimized: memoized data, no CPU blocking, memoized rows.</p>

      <input
        value={input}
        onChange={handleInput}
        placeholder="Type here (smooth now!)"
      />

      <div style={{ height: 300, overflowY: "scroll", border: "1px solid #ccc", marginTop: 16 }}>
        {items.map((row) => (
          <Row key={row.id} row={row} />
        ))}
      </div>

      <p style={{ marginTop: 16 }}>
        Derived: <strong>{derivedValue.slice(0, 100)}</strong>
      </p>
    </div>
  );
}

const HeavyAnalyticsChart = lazy(() =>
  Promise.resolve({
    default: memo(({ config }) => (
      <div style={{ padding: 16, background: "#222", color: "#fff", borderRadius: 8 }}>
        Chart (theme: {config.theme}, value: {Math.round(config.value)})
      </div>
    )),
  })
);

export default function SlowStudentDashboard() {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  const heavyData = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 5000000; i++) {
      result += Math.random();
    }
    return result;
  }, []);

  const handleCountClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const handleChartUpdate = useCallback(() => {
    console.log("Chart updated");
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Performance Audit Dashboard</h1>

      <div className="hero-section">
        <img
          src="https://via.placeholder.com/800x400.png"
          alt="Hero"
          loading="lazy"
          width={800}
          height={400}
        />
      </div>

      <div className="controls">
        <h2>Interactivity Test</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type here (smooth now!)"
        />
        <button onClick={handleCountClick}>
          Re-render App (Count: {count})
        </button>
      </div>

      <div className="analytics">
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyAnalyticsChart
            config={{ theme: "dark", value: heavyData }}
            onUpdate={handleChartUpdate}
          />
        </Suspense>
      </div>

      <HeavyComponent />
    </div>
  );
}