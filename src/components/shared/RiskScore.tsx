import { Severity } from '@/types';
import React from 'react';

interface Props {
  score: number;
  severity: Severity;
}

export const RiskScore: React.FC<Props> = ({ score, severity }) => {
  const getColor = () => {
    switch (severity) {
      case 'critical': return 'var(--critical)';
      case 'high': return 'var(--high)';
      case 'medium': return 'var(--medium)';
      case 'low': return 'var(--safe)';
      default: return 'var(--text-muted)';
    }
  };

  const color = getColor();
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="80" height="80" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="var(--border)"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--foreground)' }}>{score}</span>
      </div>
    </div>
  );
};
