import React, { useState } from 'react';
import { HeavyAnalyticsChart } from './HeavyComponents'; 

export default function SlowStudentDashboard() {
  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);

  const expensiveCalculation = () => {
    console.log('Running expensive calculation...');
    let result = 0;
    for (let i = 0; i < 500000000; i++) {
      result += Math.random();
    }
    return result;
  };
  
  const heavyData = expensiveCalculation(); 

  return (
    <div className="dashboard-container">
      <h1>Performance Audit Dashboard</h1>
      <div className="hero-section">
        <img 
          src="https://via.placeholder.com/1200x600.png" 
          alt="Large Hero Asset" 
        />
      </div>

      <div className="controls">
        <h2>Interactivity Test</h2>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Type here to feel the lag..." 
        />
        
        <button onClick={() => setCount(count + 1)}>
          Re-render App (Count: {count})
        </button>
      </div>

      <div className="analytics">
        <HeavyAnalyticsChart 
          config={{ theme: 'dark', value: heavyData }} 
          onUpdate={() => console.log('Chart updated')} 
        />
      </div>
    </div>
  );
}
