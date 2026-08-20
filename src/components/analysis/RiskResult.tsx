import { RiskAssessment, Message } from '@/types';
import React from 'react';
import { RiskScore } from '../shared/RiskScore';
import { SeverityBadge } from '../shared/SeverityBadge';
import { RiskFactors } from './RiskFactors';

interface Props {
  assessment: RiskAssessment;
  messages: Message[];
}

export const RiskResult: React.FC<Props> = ({ assessment, messages }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 0.5rem 0' }}>Analysis Complete</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <SeverityBadge severity={assessment.severity} />
            <span style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
              Category: <strong style={{ color: 'var(--foreground)' }}>{assessment.category.replace(/_/g, ' ')}</strong>
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '15px' }}>{assessment.explanation}</p>
        </div>
        <div style={{ paddingLeft: '2rem' }}>
          <RiskScore score={assessment.score} severity={assessment.severity} />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '16px', margin: '0 0 0.5rem 0' }}>Contextual Analysis</h3>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>{assessment.contextualNotes}</p>
      </div>

      <RiskFactors factors={assessment.factors} messages={messages} />
    </div>
  );
};
