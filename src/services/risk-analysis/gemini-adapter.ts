import { Message, RiskAssessment } from '@/types';
import { IRiskAnalyzer } from './types';
import { GoogleGenerativeAI, Schema, SchemaType } from '@google/generative-ai';

export class GeminiAdapter implements IRiskAnalyzer {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    if (process.env.GEMINI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
  }

  async analyze(messages: Message[]): Promise<RiskAssessment> {
    if (!this.genAI) {
      throw new Error('Gemini API key not configured');
    }

    const model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: this.getSchema(),
        temperature: 0.2, // Low temperature for more deterministic analysis
      }
    });

    const systemInstruction = `You are the core analysis engine for ChildShield, a proactive digital safety system.
Your job is to analyze sequences of messages and identify potential safety concerns, interaction risks, and behavioural patterns.
Do not rely solely on isolated keywords; analyze the context and escalation of the conversation.
Categories of risk: cyberbullying, grooming, personal_info_request, secrecy_isolation, pressure_coercion, suspicious_link, safe.
Severity levels: low, medium, high, critical.
Do not label anyone as a "predator" or "criminal" - use terms like "interaction risk", "potential safety concern".
Output valid JSON adhering to the provided schema.`;

    const userPrompt = `Analyze the following sequence of messages for interaction risk. 
Consider the sequence and context of how the conversation develops.

Messages:
${JSON.stringify(messages, null, 2)}`;

    try {
      const fullPrompt = `${systemInstruction}\n\n${userPrompt}`;
      const result = await model.generateContent(fullPrompt);
      const text = result.response.text();
      
      const assessment: RiskAssessment = JSON.parse(text);
      return assessment;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  private getSchema(): Schema {
    return {
      type: SchemaType.OBJECT,
      properties: {
        score: {
          type: SchemaType.NUMBER,
          description: 'Risk score from 0 to 100.'
        },
        severity: {
          type: SchemaType.STRING,
          format: 'enum',
          enum: ['low', 'medium', 'high', 'critical'],
          description: 'The severity level.'
        },
        category: {
          type: SchemaType.STRING,
          format: 'enum',
          enum: ['cyberbullying', 'grooming', 'personal_info_request', 'secrecy_isolation', 'pressure_coercion', 'suspicious_link', 'safe'],
          description: 'The primary risk category.'
        },
        explanation: {
          type: SchemaType.STRING,
          description: 'A human-readable explanation of the risk.'
        },
        contextualNotes: {
          type: SchemaType.STRING,
          description: 'Explanation of why the sequence of messages matters.'
        },
        factors: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              name: { type: SchemaType.STRING },
              weight: { type: SchemaType.NUMBER, description: 'Weight of this factor from 0 to 1.' },
              description: { type: SchemaType.STRING },
              messageIndices: { 
                type: SchemaType.ARRAY, 
                items: { type: SchemaType.INTEGER },
                description: 'Indices (0-based) of the messages that contributed to this factor.'
              }
            },
            required: ['name', 'weight', 'description', 'messageIndices']
          }
        }
      },
      required: ['score', 'severity', 'category', 'explanation', 'contextualNotes', 'factors']
    };
  }
}
