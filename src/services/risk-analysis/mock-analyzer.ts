import { Message, RiskAssessment } from '@/types';
import { IRiskAnalyzer } from './types';

export class MockAnalyzer implements IRiskAnalyzer {
  async analyze(messages: Message[]): Promise<RiskAssessment> {
    // Simple mock logic for demonstration purposes
    const content = messages.map(m => m.content.toLowerCase()).join(' ');

    if (content.includes('where do you live') || content.includes('address')) {
      return {
        score: 75,
        severity: 'high',
        category: 'personal_info_request',
        explanation: 'The contact is asking for personally identifiable information, which poses a significant privacy risk.',
        contextualNotes: 'The request for location data occurred after casual conversation, indicating potential grooming or phishing.',
        factors: [
          {
            name: 'Location Request',
            weight: 0.8,
            description: 'Asked for home address or location.',
            messageIndices: messages.map((m, i) => (m.content.toLowerCase().includes('live') || m.content.toLowerCase().includes('address') ? i : -1)).filter(i => i !== -1),
          }
        ]
      };
    }

    if (content.includes('ugly') || content.includes('hate') || content.includes('stupid')) {
      return {
        score: 60,
        severity: 'medium',
        category: 'cyberbullying',
        explanation: 'The interaction contains insulting or derogatory language.',
        contextualNotes: 'Repeated use of negative words towards the child.',
        factors: [
          {
            name: 'Derogatory Language',
            weight: 0.7,
            description: 'Insulting words detected.',
            messageIndices: messages.map((m, i) => (m.content.toLowerCase().includes('ugly') || m.content.toLowerCase().includes('stupid') ? i : -1)).filter(i => i !== -1),
          }
        ]
      };
    }

    return {
      score: 10,
      severity: 'low',
      category: 'safe',
      explanation: 'No significant risk factors detected in this conversation.',
      contextualNotes: 'The conversation appears to be normal and safe.',
      factors: []
    };
  }
}
