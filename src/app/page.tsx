import Link from "next/link";
import { Shield, MessageSquare, Bell, Lock } from "lucide-react";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      {/* Header */}
      <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "1rem 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ background: "var(--primary)", color: "white", padding: "6px", borderRadius: "8px", display: "flex" }}>
              <Shield size={20} />
            </div>
            <span style={{ fontWeight: 700, fontSize: "18px" }}>ChildShield</span>
          </div>
          <Link href="/analyze" className="btn btn-primary">
            Open Conversation Analyzer
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container" style={{ flex: 1, padding: "3rem 2rem", maxWidth: "900px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--low-bg)", color: "var(--low)", padding: "0.35rem 0.85rem", borderRadius: "9999px", fontSize: "13px", fontWeight: 600, marginBottom: "1rem" }}>
            <Lock size={14} /> Privacy-First Child Online Safety
          </div>
          <h1 style={{ fontSize: "36px", fontWeight: 800, margin: "0 0 1rem 0", lineHeight: 1.2 }}>
            Proactive, Context-Aware Digital Safety for Children
          </h1>
          <p style={{ fontSize: "17px", color: "var(--text-muted)", maxWidth: "680px", margin: "0 auto 2rem auto", lineHeight: 1.6 }}>
            ChildShield evaluates digital interaction context rather than isolated keywords to detect risks like grooming, cyberbullying, and coercion—without invasive surveillance.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/analyze" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", fontSize: "15px" }}>
              Try Live Analyzer Prototype →
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ background: "var(--low-bg)", color: "var(--low)", padding: "8px", borderRadius: "8px" }}>
                <MessageSquare size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Conversation Analyzer</h3>
            </div>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Evaluates multi-turn conversation patterns, escalation sequences, and manipulation indicators.
            </p>
          </div>

          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ background: "var(--medium-bg)", color: "var(--medium)", padding: "8px", borderRadius: "8px" }}>
                <Bell size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Dynamic Escalation & Intervention</h3>
            </div>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Provides proportionate actions (Allow, Guide, Warn, Restrict/Alert) grounded in transparent risk scoring.
            </p>
          </div>

          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ background: "var(--safe-bg)", color: "var(--safe)", padding: "8px", borderRadius: "8px" }}>
                <Lock size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Privacy-First Principles</h3>
            </div>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.5 }}>
              No invasive surveillance or raw chat mirroring. Parents receive actionable safety insights only when warranted.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
