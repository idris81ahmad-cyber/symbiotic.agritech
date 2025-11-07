import React, { useMemo } from 'react';

export interface YieldSimulatorProps {
  yield: number;
}

const YieldSimulator: React.FC<YieldSimulatorProps> = React.memo(({ yield: y }) => {
  const chartData = useMemo(() => Array.from({ length: 12 }, (_, i) => y * (1 + i * 0.1)), [y]);
  return (
    <div role="img" aria-label={`Yield trend: rising to ${y * 1.4} tons`}> 
      <h3>Monthly Projection (SVG Chart)</h3>
      <p>Projected 2030: {y * 4.5} tons (Symbiont Boost!)</p>
      <svg width="200" height="100" viewBox="0 0 200 100" aria-hidden="true">
        {chartData.map((val, i) => (
          <rect
            key={i}
            x={i * 16}
            y={100 - Math.max(0, val * 2)}
            width="15"
            height={Math.max(0, val * 2)}
            fill="#008000"
            title={`Month ${i + 1}: ${val.toFixed(1)} tons`} // Tooltip
          />
        ))}
      </svg>
    </div>
  );
});

export default YieldSimulator;
