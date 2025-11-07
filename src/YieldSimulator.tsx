import React, { useMemo } from 'react';

export interface YieldSimulatorProps { yield: number; }

const YieldSimulator: React.FC<YieldSimulatorProps> = React.memo(({ yield: y }) => {
  const chartData = useMemo(() => Array.from({ length: 12 }, (_, i) => y * (1 + i * 0.1)), [y]);
  return (
    <div role="img" aria-label={`Yield trend: rising to ${y * 1.4} tons`}>
      <p>Projected 2030: {y * 4.5} tons (Symbiont Boost!)</p>
      <svg width="200" height="100" viewBox="0 0 200 100">
        {chartData.map((val, i) => (
          <rect key={i} x={i * 16} y={100 - val * 2} width="15" height={val * 2} fill="#008000" />
        ))}
      </svg>
    </div>
  );
});

export default YieldSimulator;