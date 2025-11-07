import React, { useState, useMemo, useCallback, lazy, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import toast, { Toaster } from 'react-hot-toast'; // Via esm.sh

// Lazy-load heavy sim component for perf
const YieldSimulator = lazy(() => import('./YieldSimulator'));

type FarmData = {
  yield: number; // tons/hectare
  risk: number; // % blight risk
  water: number; // liters saved
  suggestions: string[];
};

const useFarmData = (initialYield: number = 12) => {
  const [data, setData] = useState<FarmData>({
    yield: initialYield,
    risk: 25,
    water: 0,
    suggestions: ['Monitor humidity east plot.'],
  });

  // Memoized prediction fn (simulates ARL) with clamping
  const predictYield = useCallback((adjustment: number) => {
    const newYield = Math.max(0, Math.min(60, data.yield + adjustment)); // Clamp 0-60 tons/ha
    const newRisk = Math.max(0, data.risk - Math.abs(adjustment) * 2);
    const newWater = data.water + (adjustment * 50); // Mock savings
    const hunches = [
      'Pivot irrigation 15° east.',
      'Dose nutrients +10% N.',
      'Harvest early if risk >20%.',
    ];
    return { yield: newYield, risk: newRisk, water: newWater, suggestions: hunches.slice(0, 2) };
  }, [data]);

  // Offline persistence with IndexedDB + error toast
  useEffect(() => {
    if ('indexedDB' in window) {
      try {
        const dbRequest = indexedDB.open('SymbiontDB', 1);
        dbRequest.onupgradeneeded = (e) => {
          const db = (e.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains('farmData')) {
            db.createObjectStore('farmData', { keyPath: 'id' });
          }
        };
        dbRequest.onsuccess = (e) => {
          const db = (e.target as IDBOpenDBRequest).result;
          const tx = db.transaction('farmData', 'readwrite');
          try {
            tx.objectStore('farmData').put({ ...data, id: 1 });
          } catch (err) {
            // handle quota or other put errors
            toast.error('Storage error: Could not save farm data.');
          }
        };
        dbRequest.onerror = () => {
          toast.error('Storage error: Could not save farm data. Check device space.');
        };
      } catch (e) {
        toast.error(`IndexedDB error: ${(e as Error).message}`);
      }
    }
  }, [data]);

  return { data, update: setData, predict: predictYield };
};

const App: React.FC = () => {
  const { data, update, predict } = useFarmData();
  const [darkMode, setDarkMode] = useState(false);
  const [adjustment, setAdjustment] = useState(0);

  // Auto-detect dark mode with listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    // Some browsers use addListener for older APIs — fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if ((mediaQuery as any).addListener) {
      (mediaQuery as any).addListener(handleChange);
      return () => (mediaQuery as any).removeListener(handleChange);
    }
  }, []);

  // Apply dark mode to body
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Memoized dashboard for re-render optimization
  const dashboard = useMemo(() => (
    <div className="dashboard" role="region" aria-label="Farm Metrics">
      <div className="metric">
        <h2>Yield</h2>
        <p aria-live="polite">{data.yield.toFixed(1)} tons/ha</p>
      </div>
      <div className="metric">
        <h2>Risk</h2>
        <p aria-live="polite">{data.risk.toFixed(1)}% Blight</p>
      </div>
      <div className="metric">
        <h2>Water Saved</h2>
        <p>{Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(data.water * 0.1)}</p>
      </div>
      <div className="metric">
        <h2>AI Hunches</h2>
        <ul>{data.suggestions.map((s, i) => <li key={i} className="suggestion">{s}</li>)}</ul>
      </div>
    </div>
  ), [data]);

  const handleEvolve = useCallback(() => {
    const newData = predict(adjustment);
    update(newData);
    toast.success('Neural co-evolution applied! Yield updated.');
    setAdjustment(0);
  }, [predict, update, adjustment]);

  // Nigeria time/date
  const naijaTime = new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' });

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <button className="toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Dark Mode">
        {darkMode ? '☀️' : '🌙'}
      </button>
      <h1>Symbiont Dashboard 🇳🇬</h1>
      <p>Empowering farmers since 2025. Local time: {naijaTime}</p>
      {dashboard}
      <div>
        <label htmlFor="adjustment">AI Adjustment (+/- tons):</label>
        <input
          id="adjustment"
          type="number"
          value={adjustment}
          onChange={(e) => {
            const val = Number(e.target.value);
            setAdjustment(isNaN(val) ? 0 : val); // Input validation
          }}
          aria-describedby="evolve-desc"
          style={{ margin: '0 10px', padding: '8px' }}
          min="-10" max="10" // UI hint for bounds
        />
        <button onClick={handleEvolve} disabled={adjustment === 0}>
          Co-Evolve Yield
        </button>
        <p id="evolve-desc">Apply neural hunch to optimize farm.</p>
      </div>
      <Suspense fallback={<div>Loading Simulator...</div>}>
        <YieldSimulator yield={data.yield} />
      </Suspense>
    </div>
  );
};

const container = document.getElementById('app')!;
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}  
