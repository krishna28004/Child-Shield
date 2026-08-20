import { Severity } from '@/types';
import { AlertCircle, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import React from 'react';

interface Props {
  severity: Severity;
}

export const SeverityBadge: React.FC<Props> = ({ severity }) => {
  const getStyles = () => {
    switch (severity) {
      case 'critical':
        return { bg: 'var(--critical-bg)', color: 'var(--critical)', icon: <AlertCircle size={14} /> };
      case 'high':
        return { bg: 'var(--high-bg)', color: 'var(--high)', icon: <AlertTriangle size={14} /> };
      case 'medium':
        return { bg: 'var(--medium-bg)', color: 'var(--medium)', icon: <AlertTriangle size={14} /> };
      case 'low':
        return { bg: 'var(--safe-bg)', color: 'var(--safe)', icon: <ShieldCheck size={14} /> };
      default:
        return { bg: 'var(--low-bg)', color: 'var(--low)', icon: <Info size={14} /> };
    }
  };

  const styles = getStyles();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 10px',
        borderRadius: '9999px',
        backgroundColor: styles.bg,
        color: styles.color,
        fontWeight: 600,
        fontSize: '12px',
        textTransform: 'uppercase',
      }}
    >
      {styles.icon}
      {severity}
    </span>
  );
};
