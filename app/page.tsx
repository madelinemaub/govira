"use client";
import { useState, useEffect } from "react";

const C = {
  navy: "#15263F", blue: "#2179DA", lightBlue: "#43B0F1",
  paleBlue: "#EBF4FF", bg: "#F7F8FA", white: "#FFFFFF",
  text: "#1A2332", textMid: "#4A5568", textLight: "#8494A7",
  border: "#E2E8F0", borderLight: "#EDF2F7",
  green: "#059669", greenBg: "#ECFDF5", greenBorder: "#A7F3D0",
  amber: "#D97706", amberBg: "#FFFBEB", amberBorder: "#FDE68A",
  red: "#DC2626", redBg: "#FEF2F2",
};

const ShieldLogo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="sg" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={C.blue}/><stop offset="100%" stopColor={C.navy}/>
      </linearGradient>
    </defs>
    <path d="M32 4L8 15V29C8 43.4 18.4 55.6 32 60C45.6 55.6 56 43.4 56 29V15L32 4Z" fill="url(#sg)"/>
    <path d="M20 44L20 40L24 40" stroke={C.lightBlue} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    <path d="M28 44L28 42L32 42L32 40" stroke={C.lightBlue} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    <path d="M36 44L36 40L40 40" stroke={C.lightBlue} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    <circle cx="20" cy="44" r="1.5" fill={C.lightBlue} opacity="0.7"/>
    <circle cx="28" cy="44" r="1.5" fill={C.lightBlue} opacity="0.5"/>
    <circle cx="36" cy="44" r="1.5" fill={C.lightBlue} opacity="0.7"/>
    <path d="M22 30L28 36L42 22" stroke="#FFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Header = ({ onHome }: any) => (
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

const FadeIn = ({ children, delay = 0 }: any) => {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(8px)", transition: "all 0.4s ease" }}>{children}</div>;
};

/* ═══════════════════════════════════════════
   SCREEN 1: HERO
   ═══════════════════════════════════════════ */
const HomeScreen = ({ onGetStarted }: any) => (
  <div style={{ background: C.bg }}>
    <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1B3A5C 50%, ${C.navy} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(67,176,241,0.06) 1px, transparent 0)`, backgroundSize: "32px 32px" }}/>
      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "72px 32px 64px", textAlign: "center" }}>
        <FadeIn><ShieldLogo size={56}/></FadeIn>
        <FadeIn delay={100}>
          <h1 style={{ fontSize: 44, fontWeight: 700, color: C.white, margin: "20px 0 16px 0", lineHeight: 1.15 }}>
            Know what to update.<br/>Keep your department compliant.
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", margin: "0 auto 12px", maxWidth: 560, lineHeight: 1.6 }}>
            Translates legal changes into clear, actionable guidance for your department.
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "0 auto 32px", fontStyle: "italic" }}>
            No technical setup required. No integration needed.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <button onClick={onGetStarted} style={{ padding: "16px 32px", fontSize: 16, fontWeight: 600, borderRadius: 8, border: "none", background: C.white, color: C.navy, cursor: "pointer" }}>
            View Legal Updates
          </button>
        </FadeIn>
        <FadeIn delay={400}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 48 }}>
            {[
              { icon: "⚖️", title: "Legal Changes Explained", desc: "See exactly what changed in the law, in plain English." },
              { icon: "📋", title: "What You Need to Do", desc: "A clear list of what your department needs to address." },
              { icon: "🔍", title: "Where to Look", desc: "Know which of your policies and documents to review." },
              { icon: "📄", title: "Cited Sources", desc: "Every item traces back to the specific law or standard." },
            ].map((c, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 16px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.white, margin: "0 0 4px 0" }}>{c.title}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>

    {/* Value prop */}
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 32px", display: "flex", alignItems: "center", gap: 64 }}>
      <FadeIn>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: C.navy, lineHeight: 1.2, margin: 0 }}>
          Stay ahead of<br/>legal changes<br/><span style={{ color: C.lightBlue }}>with confidence.</span>
        </h2>
      </FadeIn>
      <FadeIn delay={150}>
        <div>
          <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.7, margin: "0 0 8px 0" }}>
            When state laws change, departments scramble to interpret updates and rewrite policies. Govira breaks it down for you. See exactly what changed, what it means, and what to do about it.
          </p>
          <p style={{ fontSize: 14, color: C.navy, lineHeight: 1.6, margin: "0 0 20px 0", fontWeight: 500 }}>
            Govira doesn't replace accreditation managers. It makes their job easier, faster, and helps them feel more confident.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Designed for accreditation managers", "Supports departments managing POSTC and CALEA requirements", "Works alongside your existing systems", "No integration required"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.greenBg, border: `1px solid ${C.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.green, flexShrink: 0 }}>✓</div>
                <span style={{ fontSize: 14, color: C.text }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>

    {/* How it works */}
    <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 32px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.navy, margin: "0 0 6px 0" }}>How It Works</h2>
            <p style={{ fontSize: 14, color: C.textMid }}>No technical setup required.</p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { step: "1", icon: "⚖️", title: "We break down the legal change", desc: "When a new law or requirement is released, Govira lays out what changed in plain English and shows the exact source language." },
              { step: "2", icon: "📋", title: "See what your department needs to do", desc: "Get a clear, bulleted list of what the law now requires. Each item cites the specific section of the law." },
              { step: "3", icon: "🔍", title: "Know where to look in your files", desc: "See which types of policies and documents in your department are likely affected so you know where to start." },
            ].map((item, i) => (
              <div key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 28 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.navy, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>{item.step}</div>
                <div style={{ textAlign: "center", fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <p style={{ fontSize: 16, fontWeight: 600, color: C.text, margin: "0 0 8px 0" }}>{item.title}</p>
                <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>

    {/* CTA */}
    <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1B3A5C 100%)`, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(67,176,241,0.06) 1px, transparent 0)`, backgroundSize: "32px 32px" }}/>
      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "64px 32px", textAlign: "center" }}>
        <FadeIn>
          <ShieldLogo size={40}/>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: "16px 0 12px 0" }}>Ready to see what's changed?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0" }}>See what recent legal changes mean for your department.</p>
          <button onClick={onGetStarted} style={{ padding: "16px 40px", fontSize: 16, fontWeight: 600, borderRadius: 8, border: "none", background: C.white, color: C.navy, cursor: "pointer" }}>View Legal Updates →</button>
        </FadeIn>
      </div>
    </div>

    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ShieldLogo size={18}/><span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>GOVIRA</span>
        <span style={{ fontSize: 11, color: C.textLight, marginLeft: 4 }}>Compliance Tools for Law Enforcement</span>
      </div>
      <p style={{ fontSize: 11, color: C.textLight, margin: 0 }}>Departments stay in control of every update. Govira does not replace legal counsel.</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   SCREEN 2: DASHBOARD
   ═══════════════════════════════════════════ */
const DashboardScreen = ({ onSelectUpdate, onSelectNew }: any) => (
  <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px" }}>
    <FadeIn>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: C.navy, margin: "0 0 6px 0" }}>Legal Updates</h1>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 32px 0" }}>Here are the latest legal changes that may affect your department.</p>
    </FadeIn>

    {/* Changed law */}
    <FadeIn delay={100}>
      <div onClick={onSelectUpdate} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 12, cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.white, background: C.amber, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.5 }}>UPDATED LAW</span>
            </div>
            <p style={{ fontSize: 17, fontWeight: 600, color: C.navy, margin: "0 0 6px 0" }}>Crowd Management Policy Requirements</p>
            <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 10px 0", lineHeight: 1.5 }}>HB 6004 updated the requirements for how departments handle crowd management. Several existing requirements were strengthened.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: C.textLight }}>
              <span>Connecticut HB 6004, §§ 5 & 6</span>
              <span style={{ color: C.border }}>·</span>
              <span>6 changes outlined</span>
            </div>
          </div>
          <span style={{ fontSize: 18, color: C.blue, flexShrink: 0, paddingTop: 4 }}>→</span>
        </div>
      </div>
    </FadeIn>

    {/* New law */}
    <FadeIn delay={200}>
      <div onClick={onSelectNew} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 12, cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.white, background: C.red, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.5 }}>NEW LAW</span>
            </div>
            <p style={{ fontSize: 17, fontWeight: 600, color: C.navy, margin: "0 0 6px 0" }}>Office of the Inspector General</p>
            <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 10px 0", lineHeight: 1.5 }}>HB 6004 establishes a new Office of the Inspector General to investigate use-of-force cases. This is entirely new and may require new documentation and procedures.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: C.textLight }}>
              <span>Connecticut HB 6004, §§ 33-35</span>
              <span style={{ color: C.border }}>·</span>
              <span>4 new requirements</span>
            </div>
          </div>
          <span style={{ fontSize: 18, color: C.blue, flexShrink: 0, paddingTop: 4 }}>→</span>
        </div>
      </div>
    </FadeIn>

    {/* Reviewed */}
    <FadeIn delay={300}>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, opacity: 0.6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.white, background: C.green, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.5 }}>REVIEWED</span>
        </div>
        <p style={{ fontSize: 17, fontWeight: 600, color: C.navy, margin: "0 0 6px 0" }}>Consent Search Limits</p>
        <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 10px 0", lineHeight: 1.5 }}>Prohibits consent searches of individuals and limits vehicle searches during traffic stops.</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: C.textLight }}>
          <span>Connecticut HB 6004, §§ 21 & 22</span>
          <span style={{ color: C.border }}>·</span>
          <span style={{ color: C.green }}>Reviewed Mar 14</span>
        </div>
      </div>
    </FadeIn>
  </div>
);

/* ═══════════════════════════════════════════
   SCREEN 3A: UPDATED LAW (old vs new)
   ═══════════════════════════════════════════ */
const UpdatedLawScreen = ({ onBack }: any) => {
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px" }}>
      <FadeIn>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.textMid, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20 }}>← Back to legal updates</button>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.white, background: C.amber, padding: "3px 10px", borderRadius: 4, letterSpacing: 0.5 }}>UPDATED LAW</span>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: C.navy, margin: "12px 0 6px 0" }}>Crowd Management Policy Requirements</h2>
          <p style={{ fontSize: 14, color: C.textMid, margin: 0 }}>Connecticut HB 6004, §§ 5 & 6</p>
        </div>
      </FadeIn>

      {/* Old vs New */}
      <FadeIn delay={200}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.textLight, letterSpacing: 0.5, textTransform: "uppercase", margin: "0 0 12px 0" }}>Before (Prior Law)</p>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, margin: 0 }}>
              No statewide crowd management policy existed. Departments were expected to manage crowd incidents using <span style={{ color: C.red, textDecoration: "line-through" }}>general operational judgment and local department standards</span>. There were no specific requirements around force guidance, training, or documentation for crowd incidents.
            </p>
          </div>
          <div style={{ background: C.white, border: `2px solid ${C.green}`, borderRadius: 12, padding: 20, position: "relative" }}>
            <div style={{ position: "absolute", top: -10, left: 16, background: C.green, color: C.white, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>NEW REQUIREMENT</div>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.green, letterSpacing: 0.5, textTransform: "uppercase", margin: "0 0 12px 0" }}>After (HB 6004)</p>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, margin: 0 }}>
              POST must adopt a <span style={{ background: "rgba(5,150,105,0.12)", padding: "1px 3px", borderRadius: 3 }}>uniform statewide crowd management policy</span>. Departments must align with this policy, which must address <span style={{ background: "rgba(5,150,105,0.12)", padding: "1px 3px", borderRadius: 3 }}>force expectations, training, documentation, and individual rights protections</span>.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* What changed - bulleted list */}
      <FadeIn delay={300}>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>What Changed</p>
          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 16px 0" }}>Here is exactly what HB 6004 now requires that was not previously required.</p>

          {[
            { text: "Departments must address permissible and impermissible uses of force during crowd management", section: "§ 5(2)", tag: "Force Guidance", priority: "Action Required" },
            { text: "Departments must specify the type and amount of crowd management training each officer must undergo", section: "§ 5(2)", tag: "Training", priority: "Action Required" },
            { text: "Departments must require documentation after any physical confrontation between an officer and a civilian during a crowd incident", section: "§ 5(3)", tag: "Documentation", priority: "Action Required" },
            { text: "Crowd management policy must define \"crowd\" and reflect factors like size, location, purpose, and time of day", section: "§ 5(1)", tag: "Definitions", priority: "Action Required" },
            { text: "Policy must establish guidelines that protect individual rights and preserve the peace during demonstrations", section: "§ 5(1)", tag: "Individual Rights", priority: "Action Required" },
            { text: "All basic and review training programs must include training on the crowd management policy", section: "§ 5", tag: "Training Programs", priority: "Awareness" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.priority === "Action Required" ? C.red : C.amber, marginTop: 7, flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, color: C.text, margin: "0 0 4px 0", lineHeight: 1.5 }}>{item.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: C.blue, fontWeight: 500 }}>{item.section}</span>
                  <span style={{ fontSize: 11, color: C.textLight, background: C.bg, padding: "2px 8px", borderRadius: 4 }}>{item.tag}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: item.priority === "Action Required" ? C.red : C.amber, background: item.priority === "Action Required" ? C.redBg : C.amberBg, padding: "2px 8px", borderRadius: 4 }}>{item.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Where to look */}
      <FadeIn delay={400}>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>Where to Look in Your Department</p>
          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 16px 0" }}>Based on these changes, you'll likely want to review the following types of documents.</p>
          {[
            { doc: "Crowd Management / Civil Disturbance policy", why: "Directly addressed by this law. Needs force guidance, training, and documentation language." },
            { doc: "Incident Documentation procedures", why: "New requirement for documentation after physical confrontation during crowd incidents." },
            { doc: "Training standards and schedules", why: "All training programs must now include crowd management policy training." },
            { doc: "Use of Force policy", why: "May need a cross-reference to crowd-specific force guidance." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none" }}>
              <span style={{ fontSize: 14, marginTop: 1 }}>📁</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.navy, margin: "0 0 2px 0" }}>{item.doc}</p>
                <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.5 }}>{item.why}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Who should review */}
      <FadeIn delay={450}>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>Who Should Review This</p>
          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 16px 0" }}>These changes typically involve the following people in your department.</p>
          {[
            { role: "Accreditation Manager", action: "Review changes, update policy language, upload revised documents" },
            { role: "Chief of Police / Admin Lieutenant", action: "Approve updated policy language before adoption" },
            { role: "Accreditation Assessor", action: "Verify updates during next review cycle" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none" }}>
              <span style={{ fontSize: 14, marginTop: 1 }}>👤</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.navy, margin: "0 0 2px 0" }}>{item.role}</p>
                <p style={{ fontSize: 13, color: C.textMid, margin: 0 }}>{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Source - Updated Law */}
      <FadeIn delay={500}>
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
          <button onClick={() => setSourceOpen(!sourceOpen)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.blue }}>
            <span style={{ transition: "transform 0.2s ease", display: "inline-block", transform: sourceOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
            {sourceOpen ? "Hide" : "View"} source language from HB 6004
          </button>
          {sourceOpen && (
            <div style={{ marginTop: 12, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: C.textLight, letterSpacing: 0.5, textTransform: "uppercase", margin: "0 0 8px 0" }}>HB 6004, § 5 (Connecticut General Assembly)</p>
              <p style={{ fontSize: 13, color: C.text, lineHeight: 1.8, margin: 0, fontStyle: "italic", borderLeft: `3px solid ${C.blue}`, paddingLeft: 14 }}>
                "The policy must also establish guidelines for managing crowds in a manner that protects individual rights and preserves the peace during demonstrations and civil disturbances, addresses permissible and impermissible uses of force by a police officer and the type and amount of crowd management training that each police officer must undergo, and sets forth required documentation after any physical confrontation between a police officer and a civilian during a crowd management incident."
              </p>
              <p style={{ fontSize: 11, color: C.textLight, margin: "10px 0 0 0" }}>Source: OLR Bill Analysis, HB 6004, Emergency Certification, 2020</p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 3B: NEW LAW
   ═══════════════════════════════════════════ */
const NewLawScreen = ({ onBack }: any) => {
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px" }}>
      <FadeIn>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.textMid, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20 }}>← Back to legal updates</button>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.white, background: C.red, padding: "3px 10px", borderRadius: 4, letterSpacing: 0.5 }}>NEW LAW</span>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: C.navy, margin: "12px 0 6px 0" }}>Office of the Inspector General</h2>
          <p style={{ fontSize: 14, color: C.textMid, margin: 0 }}>Connecticut HB 6004, §§ 33-35</p>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div style={{ background: C.white, border: `2px solid ${C.red}`, borderRadius: 12, padding: 20, marginBottom: 24, position: "relative" }}>
          <div style={{ position: "absolute", top: -10, left: 16, background: C.red, color: C.white, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>ENTIRELY NEW</div>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.red, letterSpacing: 0.5, textTransform: "uppercase", margin: "0 0 12px 0" }}>No prior equivalent existed</p>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, margin: 0 }}>
            HB 6004 establishes a new Office of the Inspector General (OIG) within the Division of Criminal Justice. The OIG will investigate peace officers' use of force and prosecute cases where force was not justified. This is entirely new and departments may need to create or update related procedures.
          </p>
        </div>
      </FadeIn>

      {/* What this requires */}
      <FadeIn delay={300}>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>What This Means for Your Department</p>
          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 16px 0" }}>These are the new requirements your department should be aware of.</p>

          {[
            { text: "The Inspector General will investigate all use-of-force incidents involving peace officers", section: "§ 34", tag: "Use of Force", priority: "Awareness" },
            { text: "Chiefs of police may refer use-of-force incidents to the Inspector General and must accept referrals", section: "§ 33", tag: "Reporting", priority: "Action Required" },
            { text: "The Inspector General can issue subpoenas to municipalities, law enforcement units, and current or former employees", section: "§ 33", tag: "Compliance", priority: "Awareness" },
            { text: "The Inspector General will make recommendations to POST on officer certification actions", section: "§ 33", tag: "Certification", priority: "Awareness" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.priority === "Action Required" ? C.red : C.amber, marginTop: 7, flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, color: C.text, margin: "0 0 4px 0", lineHeight: 1.5 }}>{item.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: C.blue, fontWeight: 500 }}>{item.section}</span>
                  <span style={{ fontSize: 11, color: C.textLight, background: C.bg, padding: "2px 8px", borderRadius: 4 }}>{item.tag}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: item.priority === "Action Required" ? C.red : C.amber, background: item.priority === "Action Required" ? C.redBg : C.amberBg, padding: "2px 8px", borderRadius: 4 }}>{item.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Where to look */}
      <FadeIn delay={400}>
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>Where to Look in Your Department</p>
          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 16px 0" }}>You may need to create or update the following types of documents.</p>
          {[
            { doc: "Use of Force reporting procedures", why: "OIG will investigate use-of-force incidents. Your reporting process may need to account for OIG referrals." },
            { doc: "Internal affairs / investigation procedures", why: "OIG has subpoena power over your department and employees." },
            { doc: "Officer notification procedures", why: "Officers should be informed about the OIG's role and authority." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none" }}>
              <span style={{ fontSize: 14, marginTop: 1 }}>📁</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.navy, margin: "0 0 2px 0" }}>{item.doc}</p>
                <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.5 }}>{item.why}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Source */}
      <FadeIn delay={500}>
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
          <button onClick={() => setSourceOpen(!sourceOpen)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.blue }}>
            <span style={{ transition: "transform 0.2s ease", display: "inline-block", transform: sourceOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
            {sourceOpen ? "Hide" : "View"} source language from HB 6004
          </button>
          {sourceOpen && (
            <div style={{ marginTop: 12, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: C.textLight, letterSpacing: 0.5, textTransform: "uppercase", margin: "0 0 8px 0" }}>HB 6004, §§ 33-35 (Connecticut General Assembly)</p>
              <p style={{ fontSize: 13, color: C.text, lineHeight: 1.8, margin: 0, fontStyle: "italic", borderLeft: `3px solid ${C.blue}`, paddingLeft: 14 }}>
                "The bill establishes the Office of the Inspector General as an independent office within the Division of Criminal Justice. The bill requires OIG to investigate peace officers' use of force, prosecute any case in which the inspector general determines the use of force was not justified, and make recommendations to POST concerning censure and suspension, renewal, cancellation, or revocation of a peace officer's certification."
              </p>
              <p style={{ fontSize: 11, color: C.textLight, margin: "10px 0 0 0" }}>Source: OLR Bill Analysis, HB 6004, Emergency Certification, 2020</p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function GoviraV2() {
  const [screen, setScreen] = useState("home");
  const goDashboard = () => setScreen("dashboard");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", color: C.text, WebkitFontSmoothing: "antialiased" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <Header onHome={goDashboard}/>
      {screen === "home" && <HomeScreen onGetStarted={goDashboard}/>}
      {screen === "dashboard" && <DashboardScreen onSelectUpdate={() => setScreen("updated")} onSelectNew={() => setScreen("newlaw")}/>}
      {screen === "updated" && <UpdatedLawScreen onBack={goDashboard}/>}
      {screen === "newlaw" && <NewLawScreen onBack={goDashboard}/>}
    </div>
  );
}
