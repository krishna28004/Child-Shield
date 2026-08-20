export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type ActivityType = 'conversation' | 'search' | 'link';

export type RiskCategory =
  | 'cyberbullying'
  | 'grooming'
  | 'personal_info_request'
  | 'privacy_risks'
  | 'secrecy_isolation'
  | 'pressure_coercion'
  | 'harassment_coercion'
  | 'phishing_scams'
  | 'suspicious_link'
  | 'unsafe_content'
  | 'safe';

export interface Message {
  id: string;
  sender: 'child' | 'contact';
  content: string;
  timestamp: string;           // ISO string
}

export interface RiskAssessment {
  score: number;               // 0–100
  severity: Severity;
  category: RiskCategory;
  factors: RiskFactor[];
  explanation: string;         // Human-readable
  contextualNotes: string;     // Why sequence matters
}

export interface RiskFactor {
  name: string;
  weight: number;              // 0–1
  description: string;
  messageIndices: number[];    // Which messages contributed
}

export interface EscalationPoint {
  messageIndex: number;
  riskScore: number;
  label: string;               // e.g., "Personal info request"
  severity: Severity;
  delta: number;               // Change from previous point
}

export interface Intervention {
  level: Severity;
  title: string;
  message: string;             // Child-facing message
  guardianAlert: boolean;
  recommendedAction: string;
  evidence?: string[];         // Minimal, privacy-preserving
}
