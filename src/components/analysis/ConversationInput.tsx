import { Message } from '@/types';
import React, { useState } from 'react';
import { safeConversation, cyberbullyingConversation, groomingConversation } from '@/data/sample-conversations';

interface Props {
  onAnalyze: (messages: Message[]) => void;
  loading: boolean;
}

export const ConversationInput: React.FC<Props> = ({ onAnalyze, loading }) => {
  const [messages, setMessages] = useState<Message[]>(safeConversation);
  const [customInput, setCustomInput] = useState('');
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');

  const handlePresetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'safe': setMessages(safeConversation); break;
      case 'cyberbullying': setMessages(cyberbullyingConversation); break;
      case 'grooming': setMessages(groomingConversation); break;
      default: setMessages([]);
    }
  };

  const handleAnalyze = () => {
    if (activeTab === 'custom') {
      const parsed = customInput.split('\n').filter(l => l.trim()).map((line, i) => ({
        id: i.toString(),
        sender: i % 2 === 0 ? 'contact' as const : 'child' as const,
        content: line.trim(),
        timestamp: new Date().toISOString()
      }));
      onAnalyze(parsed);
    } else {
      onAnalyze(messages);
    }
  };

  const activeMessages = activeTab === 'preset' ? messages : customInput.split('\n').filter(l => l.trim()).map((line, i) => ({
    id: i.toString(),
    sender: i % 2 === 0 ? 'contact' as const : 'child' as const,
    content: line.trim(),
    timestamp: new Date().toISOString()
  }));

  return (
    <div className="card">
      <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 1rem 0' }}>Interaction Source</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <button 
          className="btn"
          style={{ background: activeTab === 'preset' ? 'var(--background)' : 'transparent', border: '1px solid var(--border)' }}
          onClick={() => setActiveTab('preset')}
        >
          Preset Scenarios
        </button>
        <button 
          className="btn"
          style={{ background: activeTab === 'custom' ? 'var(--background)' : 'transparent', border: '1px solid var(--border)' }}
          onClick={() => setActiveTab('custom')}
        >
          Custom Input
        </button>
      </div>

      {activeTab === 'preset' ? (
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '0.5rem' }}>Select Scenario</label>
          <select 
            onChange={handlePresetSelect}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '14px' }}
          >
            <option value="safe">Safe Conversation</option>
            <option value="cyberbullying">Cyberbullying Pattern</option>
            <option value="grooming">Grooming/Manipulation</option>
          </select>
        </div>
      ) : (
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '0.5rem' }}>Enter Messages (one per line, alternates Contact/Child)</label>
          <textarea 
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '14px', fontFamily: 'inherit' }}
            placeholder="Hey, how are you?&#10;I'm good, thanks!&#10;Where do you live?"
          />
        </div>
      )}

      <div style={{ background: 'var(--background)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
        {activeMessages.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>No messages to display.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'child' ? 'flex-end' : 'flex-start' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'capitalize' }}>
                  {msg.sender}
                </span>
                <div style={{ 
                  background: msg.sender === 'child' ? 'var(--primary)' : 'var(--surface)', 
                  color: msg.sender === 'child' ? 'white' : 'var(--foreground)',
                  padding: '8px 12px', 
                  borderRadius: '12px',
                  border: msg.sender === 'child' ? 'none' : '1px solid var(--border)',
                  maxWidth: '80%',
                  fontSize: '14px'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        className="btn btn-primary" 
        style={{ width: '100%' }}
        onClick={handleAnalyze}
        disabled={loading || activeMessages.length === 0}
      >
        {loading ? 'Analyzing Interaction...' : 'Analyze Interaction'}
      </button>
    </div>
  );
};
