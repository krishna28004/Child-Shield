'use client';

import React, { useState } from 'react';
import { useRiskAnalysis } from '@/hooks/useRiskAnalysis';
import { ConversationInput } from '@/components/analysis/ConversationInput';
import { RiskResult } from '@/components/analysis/RiskResult';
import { Message } from '@/types';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function AnalyzePage() {
  const { analyze, assessment, loading, error } = useRiskAnalysis();
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);

  const handleAnalyze = async (messages: Message[]) => {
    setActiveMessages(messages);
    await analyze(messages);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1rem 0' }}>
        <div className="container" style={{ padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--foreground)' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '8px' }}>
              <Shield size={20} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px' }}>ChildShield</span>
          </Link>
          <nav>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary)' }}>Conversation Analyzer</span>
          </nav>
        </div>
      </header>

      <main className="container" style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div style={{ gridColumn: '1 / -1', marginBottom: '-1rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Conversation Analyzer</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Detect contextual risk signals and escalation patterns in digital interactions.</p>
        </div>

        <section>
          <ConversationInput onAnalyze={handleAnalyze} loading={loading} />
        </section>

        <section>
          {error && (
            <div style={{ background: 'var(--critical-bg)', color: 'var(--critical)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--critical)' }}>
              <strong>Analysis Error:</strong> {error}
            </div>
          )}

          {!assessment && !loading && !error && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Shield size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--foreground)', margin: '0 0 0.5rem 0' }}>Awaiting Input</h3>
              <p style={{ margin: 0, fontSize: '14px', maxWidth: '300px' }}>Select a scenario or enter a custom interaction to analyze its contextual risk.</p>
            </div>
          )}

          {loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '1rem', fontWeight: 500 }}>Analyzing interaction context...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {assessment && !loading && (
            <RiskResult assessment={assessment} messages={activeMessages} />
          )}
        </section>
      </main>
    </div>
  );
}
