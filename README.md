# ChildShield 🛡️
> Privacy-Conscious, Context-Aware Digital Safety for Children

ChildShield is a proactive child online safety web application designed to identify digital risks through contextual analysis rather than invasive surveillance. By evaluating multi-turn interaction patterns and escalation trajectories, ChildShield protects children from online harms while respecting their privacy.

---

## 📌 Problem

Traditional parental control tools suffer from two major flaws:
1. **Invasive Surveillance**: Full screen mirroring and keystroke logging destroy trust between children and guardians.
2. **Brittle Keyword Filtering**: Naive word blacklists generate excessive false positives and fail to detect subtle manipulation, coercion, and multi-stage grooming.

Children need safety systems that understand **conversational context, intent, and escalation** without subjecting them to round-the-clock surveillance.

---

## 💡 Solution

ChildShield analyzes relevant digital activities using a unified, privacy-first safety pipeline:
- **Context-Aware Classification**: Identifies safety concerns by examining interaction patterns across sequences rather than isolated keywords.
- **Dynamic Risk Scoring**: Provides transparent 0–100 risk assessments with clear explanations and contributing factors.
- **Proportionate Interventions**: Delivers tiered responses from gentle guidance to guardian alerts based on deterministic risk thresholds.
- **Privacy-Preserving Insights**: Parents receive actionable incident summaries and trend alerts without exposing raw, private message histories.

---

## 🏗️ Architecture & Pipeline

```
[ Activity Sources ]
  • Conversations (Active)
  • Search Queries (Roadmap)
  • Suspicious Links (Roadmap)
            │
            ▼
┌────────────────────────────────────────┐
│        Unified Safety Pipeline         │
│  • AI Contextual Analyzer (Gemini)     │
│  • Deterministic Fallback (Mock)       │
│  • Structured Schema Validation        │
└────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────┐
│       Unified Safety Assessment        │
│  • Score (0-100) & Severity Level      │
│  • Primary Threat Category             │
│  • Contextual Notes & Factor Weights   │
└────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────┐
│     Tiered Intervention Engine         │
│  • 0–30 (Low): Allow                   │
│  • 31–60 (Moderate): Guide             │
│  • 61–89 (High): Warn                  │
│  • 90–100 (Critical): Restrict / Alert │
└────────────────────────────────────────┘
```

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: React 18, Vanilla CSS Design System, [Lucide React](https://lucide.dev/) Icons
- **AI Engine**: [Google Gemini 1.5 Flash](https://aistudio.google.com/) via `@google/generative-ai` with structured JSON schema
- **Fallback**: Local deterministic rule-based analyzer for zero-setup development

---

## 📦 Current Implementation Status

The project currently has a working, end-to-end interactive prototype:

- [x] **Next.js + TypeScript Foundation**: Production-ready App Router structure.
- [x] **Modular Risk Analyzer Service**: Pluggable interface (`IRiskAnalyzer`) with `GeminiAdapter` and `MockAnalyzer`.
- [x] **AI Analysis Pipeline**: Structured schema validation returning score, severity, category, contextual explanation, and weighted factors with message index attribution.
- [x] **API Endpoint (`POST /api/analyze`)**: Validates payloads and orchestrates risk assessment.
- [x] **Interactive Conversation Analyzer UI (`/analyze`)**:
  - Preset test scenarios (**Safe**, **Cyberbullying**, **Grooming / Manipulation**).
  - Custom multi-line interaction tester with automatic sender alternating.
  - Circular risk gauge, severity badge, category indicators, and factor breakdown.
- [x] **Graceful Mock Fallback**: Runs smoothly even without an API key for immediate hackathon evaluation.

---

## 🗺️ Planned MVP Roadmap

1. **Additional Activity Analyzers**: Extend the unified safety interface to ingest search queries and suspicious URLs.
2. **Expanded Threat Taxonomy**: Full classification coverage for phishing/scams, unsafe content, privacy risks, and coercion.
3. **Escalation Timeline**: Visual risk trajectory showing risk evolution across historical touchpoints.
4. **Proportionate Intervention Engine**:
   - `Low (0–30)`: Allow
   - `Moderate (31–60)`: Guide (in-context digital literacy nudges for the child)
   - `High (61–89)`: Warn (explicit caution prompts)
   - `Critical (90–100)`: Restrict & Guardian Alert
5. **Guardian Safety Digest**: Aggregated safety overview showing critical incident types, trends, and recommended actions without raw conversation logs.

---

## 🔒 Privacy Approach

- **Context over Content**: Analysis focuses on behavioral indicators (e.g., pressure tactics, isolation attempts, location requests) rather than indexing all personal correspondence.
- **Surveillance-Free Guardian Alerts**: Guardians are alerted with the nature of the risk and recommended parental actions, not verbatim chat mirrors.
- **Transparent Scope**: ChildShield explicitly avoids claims of silent background device recording; all evaluations are scoped to authorized activity streams.

---

## 🛠️ Local Setup & Development

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd Child-Shield
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env.local` and add your Google Gemini API key:
```bash
cp .env.example .env.local
```
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> **Note**: If `GEMINI_API_KEY` is not provided, the application will automatically use the built-in `MockAnalyzer` for offline demonstration.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application or head directly to [http://localhost:3000/analyze](http://localhost:3000/analyze).

### 4. Build & Verify
```bash
npm run lint
npm run build
```
