import { NextResponse } from 'next/server';
import { Message } from '@/types';
import { riskAnalyzer } from '@/services/risk-analysis/risk-analyzer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: Message[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty messages array' },
        { status: 400 }
      );
    }

    const riskAssessment = await riskAnalyzer.analyze(messages);

    return NextResponse.json({ riskAssessment });
  } catch (error) {
    console.error('API /analyze error:', error);
    return NextResponse.json(
      { error: 'Internal server error during risk analysis' },
      { status: 500 }
    );
  }
}
