"use client";
import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════
   GOVIRA V2 — PolicyDelta Engine Prototype
   Light theme · BReW-style flow · Desktop-first
   Built for accreditation managers
   ═══════════════════════════════════════════ */

const C = {
  navy: "#15263F",
  blue: "#2179DA",
  lightBlue: "#43B0F1",
  paleBlue: "#EBF4FF",
  bg: "#F7F8FA",
  white: "#FFFFFF",
  text: "#1A2332",
  textMid: "#4A5568",
  textLight: "#8494A7",
  border: "#E2E8F0",
  borderLight: "#EDF2F7",
  green: "#059669",
  greenBg: "#ECFDF5",
  greenBorder: "#A7F3D0",
  amber: "#D97706",
  amberBg: "#FFFBEB",
  amberBorder: "#FDE68A",
  red: "#DC2626",
  redBg: "#FEF2F2",
  redBorder: "#FECACA",
};

/* ─── Shared Components ─── */

const ShieldLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="shieldGrad" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={C.blue}/>
        <stop offset="100%" stopColor={C.navy}/>
      </linearGradient>
      <linearGradient id="shieldStroke" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={C.lightBlue}/>
        <stop offset="60%" stopColor={C.blue} stopOpacity="0.5"/>
      </linearGradient>
    </defs>
    {/* Shield body */}
    <path d="M32 4L8 15V29C8 43.4 18.4 55.6 32 60C45.6 55.6 56 43.4 56 29V15L32 4Z" fill="url(#shieldGrad)"/>
    <path d="M32 4L8 15V29C8 43.4 18.4 55.6 32 60C45.6 55.6 56 43.4 56 29V15L32 4Z" stroke="url(#shieldStroke)" strokeWidth="1.5" fill="none"/>
    {/* Circuit traces */}
    <path d="M20 44L20 40L24 40" stroke={C.lightBlue} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    <path d="M28 44L28 42L32 42L32 40" stroke={C.lightBlue} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    <path d="M36 44L36 40L40 40" stroke={C.lightBlue} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    <circle cx="20" cy="44" r="1.5" fill={C.lightBlue} opacity="0.7"/>
    <circle cx="28" cy="44" r="1.5" fill={C.lightBlue} opacity="0.5"/>
    <circle cx="36" cy="44" r="1.5" fill={C.lightBlue} opacity="0.7"/>
    {/* Checkmark */}
    <path d="M22 30L28 36L42 22" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Header = ({ onHome }) => (
  <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
    <div onClick={onHome} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <ShieldLogo size={26}/>
      <span style={{ fontSize: 17, fontWeight: 700, color: C.navy, letterSpacing: 1.2 }}>GOVIRA</span>
      <span style={{ fontSize: 11, color: C.lightBlue, fontWeight: 500, letterSpacing: 0.5, marginLeft: 4 }}>STAY COMPLIANT. STAY AHEAD.</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontSize: 13, color: C.textMid }}>Bethany Police Dept.</span>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.paleBlue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: C.navy }}>JM</div>
    </div>
  </div>
);

const Btn = ({ children, primary, large, onClick, style = {}, disabled }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding: large ? "16px 32px" : "12px 24px",
    fontSize: large ? 16 : 14,
    fontWeight: 600,
    borderRadius: 8,
    border: primary ? "none" : `1px solid ${C.border}`,
    background: disabled ? "#CBD5E0" : primary ? C.navy : C.white,
    color: disabled ? C.white : primary ? C.white : C.textMid,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.15s ease",
    letterSpacing: 0.2,
    ...style,
  }}>{children}</button>
);

const StatusBadge = ({ status }) => {
  const map = {
    "Requires Update": { bg: C.redBg, color: C.red, border: C.redBorder, icon: "⊖" },
    "Requires Review": { bg: C.amberBg, color: C.amber, border: C.amberBorder, icon: "△" },
    "No Action Needed": { bg: C.greenBg, color: C.green, border: C.greenBorder, icon: "✓" },
    "Accepted": { bg: C.greenBg, color: C.green, border: C.greenBorder, icon: "✓" },
    "Edited": { bg: C.paleBlue, color: C.blue, border: "#BFDBFE", icon: "✎" },
    "Skipped": { bg: "#F9FAFB", color: C.textLight, border: C.border, icon: "—" },
  };
  const s = map[status] || map["Requires Review"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 6, background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: 13, fontWeight: 600 }}>
      <span style={{ fontSize: 14 }}>{s.icon}</span> {status}
    </span>
  );
};

const FadeIn = ({ children, delay = 0 }) => {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(8px)", transition: "all 0.4s ease" }}>{children}</div>;
};

const StepIndicator = ({ current, total, labels }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
    {labels.map((label, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700,
            background: i < current ? C.green : i === current ? C.navy : C.borderLight,
            color: i <= current ? C.white : C.textLight,
            transition: "all 0.3s ease",
          }}>
            {i < current ? "✓" : i + 1}
          </div>
          <span style={{ fontSize: 13, fontWeight: i === current ? 600 : 400, color: i <= current ? C.text : C.textLight, whiteSpace: "nowrap" }}>{label}</span>
        </div>
        {i < labels.length - 1 && (
          <div style={{ width: 40, height: 2, background: i < current ? C.green : C.borderLight, margin: "0 12px", transition: "background 0.3s ease" }}/>
        )}
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════
   SCREEN 1: HERO LANDING PAGE
   ═══════════════════════════════════════════ */
const HomeScreen = ({ onUpload }) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div style={{ background: C.bg }}>
      {/* ─── HERO ─── */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1B3A5C 50%, ${C.navy} 100%)`, position: "relative", overflow: "hidden" }}>
        {/* Subtle grid texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(67,176,241,0.06) 1px, transparent 0)`, backgroundSize: "32px 32px" }}/>
        <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "72px 32px 64px", textAlign: "center" }}>
          <FadeIn>
            <ShieldLogo size={56}/>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 style={{ fontSize: 44, fontWeight: 700, color: C.white, margin: "20px 0 16px 0", lineHeight: 1.15, letterSpacing: -0.5 }}>
              Know what to update.<br/>Keep your department compliant.
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", margin: "0 auto 12px", maxWidth: 560, lineHeight: 1.6 }}>
              Translates legal changes into clear, actionable policy updates for your department.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "0 auto 32px", fontStyle: "italic" }}>
              No technical setup required. No integration needed.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={onUpload} style={{ padding: "16px 32px", fontSize: 16, fontWeight: 600, borderRadius: 8, border: "none", background: C.white, color: C.navy, cursor: "pointer", letterSpacing: 0.2 }}>
                Try the demo
              </button>
              <button style={{ padding: "16px 32px", fontSize: 16, fontWeight: 600, borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: C.white, cursor: "pointer", letterSpacing: 0.2 }}>
                Read documentation
              </button>
            </div>
          </FadeIn>

          {/* Value prop cards */}
          <FadeIn delay={400}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: 48 }}>
              {[
                { icon: "⊘", title: "What Needs Updating", desc: "Flags where your policy may not align with the latest law." },
                { icon: "⟐", title: "Human in the Loop", desc: "You review every suggestion. Accept, edit, or skip." },
                { icon: "⊞", title: "Audit Trail", desc: "One-click export with before/after text and timestamps." },
                { icon: "◈", title: "Cited Legal Sources", desc: "Every suggestion cites the specific statute or standard." },
                { icon: "⊕", title: "Export Your Policy", desc: "Download PDF or Word. Works with your existing policy management tools." },
              ].map((c, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 16px", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                  <div style={{ fontSize: 22, marginBottom: 10, color: C.lightBlue }}>{c.icon}</div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.white, margin: "0 0 4px 0" }}>{c.title}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ─── VALUE PROP ─── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 32px", display: "flex", alignItems: "center", gap: 64 }}>
        <FadeIn>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: C.navy, lineHeight: 1.2, margin: "0 0 16px 0" }}>
              Stay ahead of<br/>legal changes<br/><span style={{ color: C.lightBlue }}>automatically.</span>
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.7, margin: "0 0 20px 0" }}>
              When state laws change, departments scramble to interpret updates and rewrite policies. Govira does the heavy lifting. It reads the law, compares it against your current policy, and tells you exactly what needs to change.
            </p>
            <p style={{ fontSize: 14, color: C.navy, lineHeight: 1.6, margin: "0 0 20px 0", fontWeight: 500 }}>
              Govira doesn't replace accreditation managers. It makes their job easier, faster, and helps them feel more confident.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Designed for accreditation managers",
                "Aligned with POSTC and CALEA standards",
                "Works alongside your existing systems",
                "No integration required",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.greenBg, border: `1px solid ${C.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.green, flexShrink: 0 }}>✓</div>
                  <span style={{ fontSize: 14, color: C.text }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ─── BEFORE / AFTER ─── */}
      <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 32px" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: C.navy, margin: "0 0 10px 0" }}>The Govira Difference: Before and After</h2>
              <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 20px 0" }}>Compare your current policy with the Govira-recommended update. Legal meaning stays the same. Compliance gaps get closed.</p>
              <div style={{ display: "inline-flex", background: C.bg, borderRadius: 8, padding: 3, border: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAfter(false)} style={{ padding: "10px 24px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: !showAfter ? C.navy : "transparent", color: !showAfter ? C.white : C.textMid, transition: "all 0.2s ease" }}>Current Policy</button>
                <button onClick={() => setShowAfter(true)} style={{ padding: "10px 24px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: showAfter ? C.green : "transparent", color: showAfter ? C.white : C.textMid, transition: "all 0.2s ease" }}>Govira Updated</button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {/* Current */}
              <div style={{ border: `2px solid ${!showAfter ? C.navy : C.border}`, borderRadius: 12, padding: 24, opacity: showAfter ? 0.5 : 1, transition: "all 0.3s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 14 }}>📄</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Current Policy</span>
                </div>
                <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, margin: 0 }}>
                  The department shall manage crowd incidents in a manner consistent with public safety, officer safety, and preservation of order. Supervisors shall respond as needed and coordinate resources necessary to maintain control of the situation. Officers shall use appropriate judgment when responding to demonstrations, assemblies, and disturbances.
                </p>
                <p style={{ fontSize: 12, color: C.textLight, margin: "14px 0 0 0", fontStyle: "italic" }}>Vague language · No force guidance · No documentation trigger</p>
              </div>

              {/* After */}
              <div style={{ border: `2px solid ${showAfter ? C.green : C.border}`, borderRadius: 12, padding: 24, opacity: showAfter ? 1 : 0.5, transition: "all 0.3s ease", position: "relative" }}>
                {showAfter && <div style={{ position: "absolute", top: -10, left: 20, background: C.green, color: C.white, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, letterSpacing: 0.5 }}>RECOMMENDED</div>}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 14 }}>✅</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>With Govira</span>
                </div>
                <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, margin: 0 }}>
                  The department shall manage crowd incidents in a manner consistent with public safety, <span style={{ background: showAfter ? "rgba(5,150,105,0.12)" : "transparent", padding: "1px 3px", borderRadius: 3, transition: "background 0.3s ease" }}>constitutional protections, and applicable statewide crowd-management requirements</span>. Supervisors and officers shall comply with department guidance regarding <span style={{ background: showAfter ? "rgba(5,150,105,0.12)" : "transparent", padding: "1px 3px", borderRadius: 3, transition: "background 0.3s ease" }}>permissible and impermissible uses of force</span> during crowd-management incidents.
                </p>
                <p style={{ fontSize: 12, color: C.green, margin: "14px 0 0 0", fontWeight: 500 }}>Compliant · Force guidance added · Documentation trigger added</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 32px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.lightBlue, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 8px 0" }}>How It Works</p>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.navy, margin: 0 }}>Three steps to compliance</h2>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { step: "1", icon: "↑", title: "Upload your policy", desc: "Drag and drop or browse for your department policy document. We accept PDF and Word files." },
              { step: "2", icon: "⟐", title: "Review what needs to be updated", desc: "See exactly what needs to change based on recent legal updates. Accept, edit, or skip each update." },
              { step: "3", icon: "↓", title: "Download your updated policy", desc: "Export your updated policy and upload it into your existing system." },
            ].map((item, i) => (
              <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 28, position: "relative" }}>
                <div style={{ position: "absolute", top: -12, left: 24, width: 28, height: 28, borderRadius: "50%", background: C.navy, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{item.step}</div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.paleBlue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: C.blue, marginBottom: 14, marginTop: 8 }}>{item.icon}</div>
                <p style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 8px 0" }}>{item.title}</p>
                <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ─── COMPLIANCE SCORE + STATS ─── */}
      <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 32px" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: C.lightBlue, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 8px 0" }}>Your Department</p>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: C.navy, margin: 0 }}>Compliance at a glance</h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              <div style={{ background: C.bg, borderRadius: 12, padding: 28, textAlign: "center", border: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.textLight, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px 0" }}>Compliance Score</p>
                <p style={{ fontSize: 48, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>89%</p>
                <p style={{ fontSize: 13, color: C.amber, fontWeight: 500 }}>↓ 3% this month</p>
              </div>
              <div style={{ background: C.bg, borderRadius: 12, padding: 28, textAlign: "center", border: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.textLight, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px 0" }}>Policies Reviewed</p>
                <p style={{ fontSize: 48, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>12</p>
                <p style={{ fontSize: 13, color: C.green, fontWeight: 500 }}>3 updated this quarter</p>
              </div>
              <div style={{ background: C.bg, borderRadius: 12, padding: 28, textAlign: "center", border: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.textLight, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px 0" }}>Policies Needing Review</p>
                <p style={{ fontSize: 48, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>2</p>
                <p style={{ fontSize: 13, color: C.amber, fontWeight: 500 }}>Use of Force, Crowd Mgmt</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1B3A5C 100%)`, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(67,176,241,0.06) 1px, transparent 0)`, backgroundSize: "32px 32px" }}/>
        <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "64px 32px", textAlign: "center" }}>
          <FadeIn>
            <ShieldLogo size={40}/>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: "16px 0 12px 0" }}>Ready to check your policies?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0" }}>Upload a policy document and see what Govira finds in minutes.</p>
            <button onClick={onUpload} style={{ padding: "16px 40px", fontSize: 16, fontWeight: 600, borderRadius: 8, border: "none", background: C.white, color: C.navy, cursor: "pointer" }}>
              Upload Your Policy →
            </button>
          </FadeIn>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ShieldLogo size={18}/>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>GOVIRA</span>
          <span style={{ fontSize: 11, color: C.textLight, marginLeft: 4 }}>Compliance Intelligence for Law Enforcement</span>
        </div>
        <p style={{ fontSize: 11, color: C.textLight, margin: 0 }}>All recommendations require human review. Govira does not replace legal counsel.</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 2: RESULTS — What Needs Updating
   ═══════════════════════════════════════════ */
const SUGGESTIONS = [
  {
    id: 1,
    section: "Section 3.2 — Use of Force During Crowd Incidents",
    status: "Requires Update",
    summary: "State law now requires crowd-management policy to address permissible and impermissible uses of force. Your current policy does not include this language.",
    law: "HB 6004, § 5 — Crowd Management Policy",
    currentText: "Officers shall use appropriate judgment when responding to demonstrations, assemblies, and disturbances.",
    suggestedText: "Supervisors and officers shall comply with department guidance regarding permissible and impermissible uses of force during crowd-management incidents, consistent with applicable statewide crowd-management requirements.",
    rationale: "The statewide framework specifically requires crowd-management guidance on force expectations. Current language is too general to demonstrate compliance.",
    tags: ["Required for compliance", "Clarifies force expectations"],
  },
  {
    id: 2,
    section: "Section 5.1 — Documentation After Physical Confrontation",
    status: "Requires Update",
    summary: "New requirement for documentation after any physical confrontation during a crowd-management incident. Your current policy has no documentation trigger for crowd incidents.",
    law: "HB 6004, § 5(3) — Required documentation",
    currentText: "Officers shall complete reports as required following significant incidents.",
    suggestedText: "Officers involved in a crowd-management incident shall complete required departmental reporting and documentation following any physical confrontation between an officer and a civilian. Supervisors shall ensure documentation is completed in accordance with department policy and applicable statewide requirements.",
    rationale: "The statewide requirement specifically mandates documentation after physical confrontation during crowd-management incidents. Current procedure does not include this trigger.",
    tags: ["Required for compliance", "Adds documentation trigger"],
  },
  {
    id: 3,
    section: "Section 7.4 — Crowd Management Training",
    status: "Requires Review",
    summary: "The law contemplates crowd-management training for all officers. Your current training standard may need revision once policy changes are approved.",
    law: "HB 6004, § 5(2) — Training requirements",
    currentText: "Annual review training shall include required departmental updates and legal changes as determined by command staff.",
    suggestedText: "Annual review training shall include crowd-management training consistent with applicable statewide requirements, in addition to required departmental updates and legal changes as determined by command staff.",
    rationale: "The statewide requirement includes crowd-management training. Training materials should be updated after policy approval to reflect new requirements.",
    tags: ["Creates training follow-on"],
  },
  {
    id: 4,
    section: "Section 2.1 — Policy Purpose and Scope",
    status: "Requires Review",
    summary: "Policy scope language references 'public safety and preservation of order' but does not reference constitutional protections or statewide requirements.",
    law: "HB 6004, § 5 — Crowd Management Policy",
    currentText: "The department shall manage crowd incidents in a manner consistent with public safety, officer safety, and preservation of order.",
    suggestedText: "The department shall manage crowd incidents in a manner consistent with public safety, constitutional protections, and applicable statewide crowd-management requirements.",
    rationale: "Aligning scope language with the statewide framework strengthens the policy's connection to current law and demonstrates awareness of updated requirements.",
    tags: ["Strengthens compliance posture"],
  },
  {
    id: 5,
    section: "Section 8.2 — Use of Force Cross-Reference",
    status: "No Action Needed",
    summary: "Your Use of Force policy (Policy 2.08) broadly covers force standards. No direct conflict found, but consider adding a cross-reference to crowd-management context after updating Section 3.2.",
    law: "HB 6004, § 5(2)",
    currentText: "Officers shall use force in accordance with department standards and applicable law.",
    suggestedText: "",
    rationale: "Existing language is broad enough to cover crowd-management situations. A cross-reference is recommended but not required for compliance.",
    tags: [],
  },
];

const ResultsScreen = ({ onReview, onHome }) => (
  <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px" }}>
    <StepIndicator current={1} total={4} labels={["Upload", "What Needs Updating", "Review Changes", "Download"]}/>

    <FadeIn>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: C.navy, margin: "0 0 6px 0" }}>Required Policy Updates Identified</h1>
      <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 8px 0" }}>
        We found updates needed in your <strong>Crowd Management & Civil Disturbance Policy</strong> based on recent legal changes.
      </p>
      <p style={{ fontSize: 13, color: C.textLight, margin: "0 0 28px 0" }}>
        Legal source: Connecticut Police Accountability Act (HB 6004) · §§ 5 & 6
      </p>
    </FadeIn>

    {/* Summary counts */}
    <FadeIn delay={100}>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <div style={{ background: C.redBg, border: `1px solid ${C.redBorder}`, borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: C.red }}>2</span>
          <span style={{ fontSize: 13, color: C.red, fontWeight: 500 }}>Require Update</span>
        </div>
        <div style={{ background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: C.amber }}>2</span>
          <span style={{ fontSize: 13, color: C.amber, fontWeight: 500 }}>Require Review</span>
        </div>
        <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: C.green }}>1</span>
          <span style={{ fontSize: 13, color: C.green, fontWeight: 500 }}>No Action Needed</span>
        </div>
      </div>
    </FadeIn>

    {/* Suggestion list */}
    {SUGGESTIONS.map((s, i) => (
      <FadeIn key={s.id} delay={150 + i * 60}>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 6px 0" }}>{s.section}</p>
              <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 8px 0", lineHeight: 1.6 }}>{s.summary}</p>
              <p style={{ fontSize: 12, color: C.textLight, margin: 0 }}>Source: {s.law}</p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <StatusBadge status={s.status}/>
            </div>
          </div>
          {s.status !== "No Action Needed" && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.blue, cursor: "pointer" }}>Review Change →</span>
            </div>
          )}
        </div>
      </FadeIn>
    ))}

    <FadeIn delay={500}>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <Btn primary large onClick={onReview}>Review All Changes →</Btn>
        <Btn onClick={onHome}>Back to Dashboard</Btn>
      </div>
    </FadeIn>
  </div>
);

/* ═══════════════════════════════════════════
   SCREEN 3: REVIEW — Split Pane (BReW-style)
   ═══════════════════════════════════════════ */
const ReviewScreen = ({ onComplete, onBack }) => {
  const reviewable = SUGGESTIONS.filter(s => s.status !== "No Action Needed");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [decisions, setDecisions] = useState({});
  const [editText, setEditText] = useState("");
  const [editing, setEditing] = useState(false);

  const current = reviewable[currentIdx];
  const total = reviewable.length;
  const reviewed = Object.keys(decisions).length;

  const handleDecision = (decision) => {
    const finalText = decision === "edit" ? editText : current.suggestedText;
    setDecisions(prev => ({ ...prev, [current.id]: { decision, text: finalText } }));
    setEditing(false);
    if (currentIdx < total - 1) {
      setCurrentIdx(currentIdx + 1);
      setEditText("");
    }
  };

  const goTo = (idx) => {
    setCurrentIdx(idx);
    setEditing(false);
    setEditText("");
  };

  useEffect(() => {
    if (editing) setEditText(current.suggestedText);
  }, [editing]);

  const allReviewed = reviewed === total;

  return (
    <div style={{ height: "calc(100vh - 56px)", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.textMid, fontSize: 13, cursor: "pointer", padding: 0 }}>← Back to results</button>
          <span style={{ color: C.border }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Review Progress: {reviewed} of {total} suggestions reviewed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 120, height: 6, borderRadius: 3, background: C.borderLight, overflow: "hidden" }}>
            <div style={{ width: `${(reviewed / total) * 100}%`, height: "100%", borderRadius: 3, background: C.green, transition: "width 0.3s ease" }}/>
          </div>
          <span style={{ fontSize: 13, color: C.textMid }}>{Math.round((reviewed / total) * 100)}%</span>
          {allReviewed && <Btn primary onClick={onComplete} style={{ marginLeft: 8 }}>Finalize →</Btn>}
        </div>
      </div>

      {/* Split pane */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* LEFT — Current policy text */}
        <div style={{ flex: 1, borderRight: `1px solid ${C.border}`, overflow: "auto", padding: 32, background: "#FAFBFC" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.textLight, letterSpacing: 0.8, textTransform: "uppercase", margin: "0 0 16px 0" }}>Current Policy Language</p>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, marginBottom: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.textMid, margin: "0 0 8px 0" }}>{current.section}</p>
            <p style={{ fontSize: 15, color: C.text, lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
              "{current.currentText}"
            </p>
          </div>

          <p style={{ fontSize: 12, fontWeight: 600, color: C.textLight, letterSpacing: 0.8, textTransform: "uppercase", margin: "0 0 12px 0" }}>Legal Source</p>
          <div style={{ background: C.paleBlue, border: `1px solid #BFDBFE`, borderRadius: 8, padding: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.navy, margin: "0 0 4px 0" }}>{current.law}</p>
            <p style={{ fontSize: 12, color: C.textMid, margin: 0, lineHeight: 1.5 }}>
              Connecticut Police Accountability Act. Requires crowd-management policy to address force, training, and documentation.
            </p>
          </div>
        </div>

        {/* RIGHT — Suggestion + actions */}
        <div style={{ flex: 1, overflow: "auto", padding: 32 }}>
          {/* Nav pills */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
            {reviewable.map((s, i) => {
              const d = decisions[s.id];
              const isActive = i === currentIdx;
              return (
                <button key={s.id} onClick={() => goTo(i)} style={{
                  padding: "6px 14px", borderRadius: 6, border: `1px solid ${isActive ? C.navy : C.border}`,
                  background: d ? (d.decision === "accept" ? C.greenBg : d.decision === "edit" ? C.paleBlue : "#F9FAFB") : (isActive ? C.navy : C.white),
                  color: isActive && !d ? C.white : d ? (d.decision === "accept" ? C.green : d.decision === "edit" ? C.blue : C.textLight) : C.textMid,
                  fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s ease",
                }}>
                  {d ? (d.decision === "accept" ? "✓" : d.decision === "edit" ? "✎" : "—") : ""} {i + 1}
                </button>
              );
            })}
          </div>

          <StatusBadge status={current.status}/>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: C.navy, margin: "12px 0 6px 0" }}>{current.section}</h2>
          <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 20px 0", lineHeight: 1.6 }}>{current.summary}</p>

          {/* Suggested text */}
          <p style={{ fontSize: 12, fontWeight: 600, color: C.green, letterSpacing: 0.5, textTransform: "uppercase", margin: "0 0 8px 0" }}>Suggested Update</p>
          {editing ? (
            <textarea
              value={editText}
              onChange={e => setEditText(e.target.value)}
              style={{ width: "100%", minHeight: 120, padding: 16, border: `2px solid ${C.blue}`, borderRadius: 8, fontSize: 14, lineHeight: 1.7, color: C.text, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          ) : (
            <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, margin: 0 }}>{current.suggestedText}</p>
            </div>
          )}

          {/* Why this helps */}
          <div style={{ background: "#F8FAFC", border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: 16, marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.textLight, letterSpacing: 0.5, textTransform: "uppercase", margin: "0 0 6px 0" }}>Why This Change Is Needed</p>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, margin: 0 }}>{current.rationale}</p>
          </div>

          {current.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {current.tags.map((t, i) => (
                <span key={i} style={{ fontSize: 11, fontWeight: 600, color: C.green, background: C.greenBg, border: `1px solid ${C.greenBorder}`, padding: "4px 10px", borderRadius: 6 }}>{t}</span>
              ))}
            </div>
          )}

          {/* Actions */}
          <p style={{ fontSize: 12, color: C.textLight, margin: "0 0 10px 0", fontStyle: "italic" }}>You're in control. Accept, edit, or skip. Govira suggests, you decide.</p>
          <div style={{ display: "flex", gap: 10, paddingTop: 12, borderTop: `1px solid ${C.borderLight}` }}>
            {editing ? (
              <>
                <Btn primary onClick={() => handleDecision("edit")}>Save Edit</Btn>
                <Btn onClick={() => setEditing(false)}>Cancel</Btn>
              </>
            ) : (
              <>
                <Btn primary onClick={() => handleDecision("accept")} style={{ background: C.green }}>✓ Accept</Btn>
                <Btn onClick={() => setEditing(true)}>✎ Edit</Btn>
                <Btn onClick={() => handleDecision("skip")}>— Skip</Btn>
              </>
            )}
          </div>

          {decisions[current.id] && (
            <div style={{ marginTop: 16, padding: 12, background: decisions[current.id].decision === "accept" ? C.greenBg : decisions[current.id].decision === "edit" ? C.paleBlue : "#F9FAFB", borderRadius: 8, border: `1px solid ${decisions[current.id].decision === "accept" ? C.greenBorder : decisions[current.id].decision === "edit" ? "#BFDBFE" : C.border}` }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>
                {decisions[current.id].decision === "accept" ? "✓ Accepted" : decisions[current.id].decision === "edit" ? "✎ Edited" : "— Skipped"} — you can change this anytime before finalizing.
              </p>
            </div>
          )}

          {/* Prev/Next */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <Btn onClick={() => goTo(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}>← Previous</Btn>
            <Btn onClick={() => goTo(Math.min(total - 1, currentIdx + 1))} disabled={currentIdx === total - 1}>Next →</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 4: COMPLETE — Download & Audit Trail
   ═══════════════════════════════════════════ */
const CompleteScreen = ({ onHome }) => (
  <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px" }}>
    <StepIndicator current={3} total={4} labels={["Upload", "What Needs Updating", "Review Changes", "Download"]}/>

    <FadeIn>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.greenBg, border: `2px solid ${C.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28, color: C.green }}>✓</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: C.navy, margin: "0 0 8px 0" }}>Policy Review Complete</h1>
        <p style={{ fontSize: 15, color: C.textMid, margin: 0 }}>Your Crowd Management & Civil Disturbance Policy has been updated based on recent legal changes.</p>
      </div>
    </FadeIn>

    <FadeIn delay={150}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
        {/* Download */}
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 16px 0" }}>Download & Export</p>
          {[
            { label: "Download updated policy (PDF)", desc: "Ready to upload to your existing system" },
            { label: "Download updated policy (Word)", desc: "Editable format for further changes" },
            { label: "Download audit trail (PDF)", desc: "All changes, reasoning, timestamps" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: C.text, margin: 0 }}>{item.label}</p>
                <p style={{ fontSize: 12, color: C.textLight, margin: "2px 0 0 0" }}>{item.desc}</p>
              </div>
              <Btn>Download</Btn>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 16px 0" }}>Review Summary</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: C.textMid }}>Suggestions reviewed</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>4 of 4</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: C.textMid }}>Accepted</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.green }}>3</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: C.textMid }}>Edited</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.blue }}>1</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontSize: 14, color: C.textMid }}>Skipped</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.textLight }}>0</span>
          </div>
          <div style={{ background: C.paleBlue, borderRadius: 8, padding: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.navy, margin: "0 0 4px 0" }}>Compliance Score Impact</p>
            <p style={{ fontSize: 13, color: C.textMid, margin: 0 }}>Estimated score after applying updates: <strong style={{ color: C.green }}>94%</strong> (up from 89%)</p>
          </div>
        </div>
      </div>
    </FadeIn>

    {/* Audit Trail */}
    <FadeIn delay={250}>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 24, marginBottom: 32 }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 16px 0" }}>Audit Trail</p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Section", "Decision", "Reviewed By", "Date", "Notes"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: C.textLight, fontWeight: 600, fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { section: "§3.2 Use of Force", decision: "Accepted", by: "J. Mauboussin", date: "Apr 12, 2026", notes: "Required for compliance" },
                { section: "§5.1 Documentation", decision: "Accepted", by: "J. Mauboussin", date: "Apr 12, 2026", notes: "New documentation trigger" },
                { section: "§7.4 Training", decision: "Edited", by: "J. Mauboussin", date: "Apr 12, 2026", notes: "Adjusted training timeline" },
                { section: "§2.1 Scope", decision: "Accepted", by: "J. Mauboussin", date: "Apr 12, 2026", notes: "Aligned with statewide framework" },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                  <td style={{ padding: "10px 12px", fontWeight: 500, color: C.text }}>{row.section}</td>
                  <td style={{ padding: "10px 12px" }}><StatusBadge status={row.decision}/></td>
                  <td style={{ padding: "10px 12px", color: C.textMid }}>{row.by}</td>
                  <td style={{ padding: "10px 12px", color: C.textMid }}>{row.date}</td>
                  <td style={{ padding: "10px 12px", color: C.textLight }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FadeIn>

    {/* Next steps */}
    <FadeIn delay={350}>
      <div style={{ background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 10, padding: 20, marginBottom: 32 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: C.amber, margin: "0 0 8px 0" }}>Next Steps</p>
        <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 4px 0", lineHeight: 1.6 }}>1. Download your updated policy document.</p>
        <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 4px 0", lineHeight: 1.6 }}>2. Upload the updated document to your existing system (e.g., PowerDMS).</p>
        <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.6 }}>3. Route for approval and officer acknowledgment as needed.</p>
      </div>
    </FadeIn>

    <FadeIn delay={400}>
      <div style={{ display: "flex", gap: 12 }}>
        <Btn primary onClick={onHome}>Return to Dashboard</Btn>
      </div>
    </FadeIn>

    {/* Footer */}
    <FadeIn delay={450}>
      <div style={{ textAlign: "center", marginTop: 48, padding: "24px 0", borderTop: `1px solid ${C.borderLight}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
          <ShieldLogo size={18}/>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>GOVIRA</span>
        </div>
        <p style={{ fontSize: 12, color: C.textLight, margin: 0 }}>Compliance Intelligence for Law Enforcement</p>
        <p style={{ fontSize: 11, color: C.textLight, margin: "4px 0 0 0" }}>Govira doesn't replace accreditation managers. It makes their job easier, faster, and helps them feel more confident. All recommendations require human review.</p>
      </div>
    </FadeIn>
  </div>
);

/* ═══════════════════════════════════════════
   SCREEN 2: DASHBOARD (logged-in experience)
   ═══════════════════════════════════════════ */
const DashboardScreen = ({ onUpload }) => (
  <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px" }}>
    <FadeIn>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: C.navy, margin: "0 0 6px 0" }}>Welcome back.</h1>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 32px 0" }}>Upload a department policy to check it against recent legal changes.</p>
    </FadeIn>

    {/* Upload zone */}
    <FadeIn delay={100}>
      <p style={{ fontSize: 13, color: C.textMid, fontStyle: "italic", margin: "0 0 12px 0" }}>Start by uploading your current policy.</p>
      <div onClick={onUpload} style={{ background: C.white, border: `2px dashed ${C.border}`, borderRadius: 12, padding: "48px 32px", textAlign: "center", marginBottom: 32, cursor: "pointer", transition: "border-color 0.2s ease" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.paleBlue, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24, color: C.blue }}>↑</div>
        <p style={{ fontSize: 18, fontWeight: 600, color: C.navy, margin: "0 0 8px 0" }}>Upload Your Policy</p>
        <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 20px 0", maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
          Drag & drop your policy document here or click to browse files.
        </p>
        <Btn primary large>Choose File</Btn>
      </div>
    </FadeIn>

    {/* How it works */}
    <FadeIn delay={200}>
      <p style={{ fontSize: 12, fontWeight: 600, color: C.textLight, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>How It Works</p>
      <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 16px 0", fontStyle: "italic" }}>No technical setup required.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
        {[
          { step: "1", title: "Upload your policy", desc: "Drag and drop or browse for your department policy document (PDF or Word)." },
          { step: "2", title: "Review what needs to be updated", desc: "See exactly what needs to change based on recent legal updates. Accept, edit, or skip each update." },
          { step: "3", title: "Download your updated policy", desc: "Export your updated policy and upload it into your existing system." },
        ].map((item, i) => (
          <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.navy, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{item.step}</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 6px 0" }}>{item.title}</p>
            <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </FadeIn>

    {/* Dashboard stats */}
    <FadeIn delay={300}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: C.textLight, letterSpacing: 0.8, textTransform: "uppercase", margin: "0 0 8px 0" }}>Compliance Score</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>89%</p>
          <p style={{ fontSize: 12, color: C.amber }}>↓ 3% this month</p>
        </div>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: C.textLight, letterSpacing: 0.8, textTransform: "uppercase", margin: "0 0 8px 0" }}>Policies Reviewed</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>12</p>
          <p style={{ fontSize: 12, color: C.green }}>3 updated this quarter</p>
        </div>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: C.textLight, letterSpacing: 0.8, textTransform: "uppercase", margin: "0 0 8px 0" }}>Policies Needing Review</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>2</p>
          <p style={{ fontSize: 12, color: C.amber }}>Use of Force, Crowd Mgmt</p>
        </div>
      </div>
    </FadeIn>
  </div>
);

/* ═══════════════════════════════════════════
   SCREEN 2.5: PROCESSING (analysis animation)
   ═══════════════════════════════════════════ */
const ProcessingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("uploading");

  useEffect(() => {
    const steps = [
      { p: 20, ph: "Uploading document...", t: 400 },
      { p: 40, ph: "Reading policy document...", t: 800 },
      { p: 60, ph: "Checking against current Connecticut statutes...", t: 1200 },
      { p: 80, ph: "Identifying required updates...", t: 800 },
      { p: 100, ph: "Analysis complete.", t: 600 },
    ];
    let timeout;
    let cumulative = 0;
    steps.forEach((step, i) => {
      cumulative += step.t;
      timeout = setTimeout(() => {
        setProgress(step.p);
        setPhase(step.ph);
        if (i === steps.length - 1) setTimeout(onComplete, 500);
      }, cumulative);
    });
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px" }}>
      <StepIndicator current={0} total={4} labels={["Upload", "What Needs Updating", "Review Changes", "Download"]}/>
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.paleBlue, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24, color: C.blue }}>
          {progress < 100 ? "◌" : "✓"}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: C.navy, margin: "0 0 12px 0" }}>
          {progress < 100 ? "Analyzing your policy..." : "Analysis complete"}
        </h2>
        <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 24px 0" }}>{phase}</p>
        <div style={{ width: 300, height: 8, borderRadius: 4, background: C.borderLight, margin: "0 auto", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", borderRadius: 4, background: progress === 100 ? C.green : C.blue, transition: "all 0.5s ease" }}/>
        </div>
        <p style={{ fontSize: 13, color: C.textLight, marginTop: 12 }}>
          Crowd_Management_Policy_6.14.pdf
        </p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function GoviraV2() {
  const [screen, setScreen] = useState("home");

  const goHome = () => setScreen("home");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", color: C.text, WebkitFontSmoothing: "antialiased" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <Header onHome={goHome}/>
      {screen === "home" && <HomeScreen onUpload={() => setScreen("dashboard")}/>}
      {screen === "dashboard" && <DashboardScreen onUpload={() => setScreen("processing")}/>}
      {screen === "processing" && <ProcessingScreen onComplete={() => setScreen("results")}/>}
      {screen === "results" && <ResultsScreen onReview={() => setScreen("review")} onHome={() => setScreen("dashboard")}/>}
      {screen === "review" && <ReviewScreen onComplete={() => setScreen("complete")} onBack={() => setScreen("results")}/>}
      {screen === "complete" && <CompleteScreen onHome={() => setScreen("dashboard")}/>}
    </div>
  );
}
