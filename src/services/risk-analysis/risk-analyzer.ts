import { Message, RiskAssessment } from '@/types';
import { IRiskAnalyzer } from './types';
import { MockAnalyzer } from './mock-analyzer';
import { GeminiAdapter } from './gemini-adapter';

export class RiskAnalyzerService implements IRiskAnalyzer {
  private geminiAdapter: GeminiAdapter;
  private mockAnalyzer: MockAnalyzer;

  constructor() {
    this.geminiAdapter = new GeminiAdapter();
    this.mockAnalyzer = new MockAnalyzer();
  }

  async analyze(messages: Message[]): Promise<RiskAssessment> {
    try {
      if (!process.env.GEMINI_API_KEY) {
        console.warn('GEMINI_API_KEY is not set. Falling back to MockAnalyzer.');
        return await this.mockAnalyzer.analyze(messages);
      }

      // Try Gemini API first
      const result = await this.geminiAdapter.analyze(messages);
      
      // Basic validation of the result
      if (!result || typeof result.score !== 'number' || !result.severity) {
        throw new Error('Invalid response format from Gemini');
      }
      
      return result;
    } catch (error) {
      console.error('Error during risk analysis, falling back to mock:', error);
      return await this.mockAnalyzer.analyze(messages);
    }
  }
}

export const riskAnalyzer = new RiskAnalyzerService();
