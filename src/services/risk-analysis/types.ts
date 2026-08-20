import { Message, RiskAssessment } from '@/types';

export interface IRiskAnalyzer {
  analyze(messages: Message[]): Promise<RiskAssessment>;
}
