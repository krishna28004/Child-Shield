import { useState } from 'react';
import { Message, RiskAssessment } from '@/types';

export function useRiskAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

  const analyze = async (messages: Message[]) => {
    setLoading(true);
    setError(null);
    setAssessment(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setAssessment(data.riskAssessment);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAssessment(null);
    setError(null);
  };

  return { analyze, assessment, loading, error, reset };
}
