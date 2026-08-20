import { RiskFactor, Message } from '@/types';
import React from 'react';

interface Props {
  factors: RiskFactor[];
  messages: Message[];
}

export const RiskFactors: React.FC<Props> = ({ factors, messages }) => {
  if (!factors || factors.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h3 style={{ fontSize: '16px', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Contributing Factors</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {factors.map((factor, idx) => (
          <div key={idx} style={{ background: 'var(--background)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>{factor.name}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Weight: {factor.weight}</span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>{factor.description}</p>
            
            {factor.messageIndices && factor.messageIndices.length > 0 && (
              <div style={{ marginTop: '0.5rem', borderLeft: '2px solid var(--border)', paddingLeft: '0.75rem' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--foreground)' }}>Related signals:</span>
                {factor.messageIndices.map(index => {
                  const msg = messages[index];
                  return msg ? (
                    <div key={index} style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                      &quot;{msg.content}&quot;
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
