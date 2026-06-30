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
   SHARED: Lifecycle (Understand → Update → Demonstrate)
   ═══════════════════════════════════════════ */
const Lifecycle = () => {
  const [hover, setHover] = useState<number | null>(null);
  const steps = [
    { n: "1", label: "Policy guidance", target: "stage-policy" },
    { n: "2", label: "Operational guidance", target: "stage-operational" },
    { n: "3", label: "Evidence guidance", target: "stage-evidence" },
  ];
  const go = (id: string) => {
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => go(s.target)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ display: "flex", alignItems: "center", gap: 8, background: hover === i ? C.paleBlue : C.white, border: `1px solid ${hover === i ? C.blue : C.border}`, color: hover === i ? C.navy : C.textMid, padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s ease" }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: C.navy, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{s.n}</span>
            {s.label}
          </button>
          {i < steps.length - 1 && <span style={{ color: C.textLight, fontSize: 13 }}>→</span>}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 1: HERO
   ═══════════════════════════════════════════ */
const HomeScreen = ({ onGetStarted, onViewExample }: any) => (
  <div style={{ background: C.bg }}>
    <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1B3A5C 50%, ${C.navy} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, rgba(67,176,241,0.06) 1px, transparent 0)`, backgroundSize: "32px 32px" }}/>
      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "72px 32px 64px", textAlign: "center" }}>
        <FadeIn><ShieldLogo size={56}/></FadeIn>
        <FadeIn delay={100}>
          <h1 style={{ fontSize: 44, fontWeight: 700, color: C.white, margin: "20px 0 16px 0", lineHeight: 1.15 }}>
            Understand what changed.<br/>Know what to update.<br/>Plan how to demonstrate compliance.
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", margin: "0 auto 12px", maxWidth: 700, lineHeight: 1.6 }}>
            Govira gives accreditation managers a guided way to review legal updates, helping you see what changed, which policies and procedures may need attention, what operational steps to consider, and what evidence departments commonly use to demonstrate compliance.
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "0 auto 32px", fontStyle: "italic" }}>
            No technical setup required. No integration needed.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={onGetStarted} style={{ padding: "16px 32px", fontSize: 16, fontWeight: 600, borderRadius: 8, border: "none", background: C.white, color: C.navy, cursor: "pointer" }}>
              View Legal Updates
            </button>
            <button onClick={onViewExample} style={{ padding: "16px 32px", fontSize: 16, fontWeight: 600, borderRadius: 8, border: "1px solid rgba(255,255,255,0.4)", background: "transparent", color: C.white, cursor: "pointer" }}>
              View Example Update
            </button>
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 48 }}>
            {[
              { icon: "📋", title: "Policy Guidance", desc: "Understand which policies, procedures, forms, or training materials may need attention." },
              { icon: "⚙️", title: "Operational Guidance", desc: "Consider what your department may need to do in practice beyond updating policy language." },
              { icon: "🗂️", title: "Evidence Guidance", desc: "See common examples of evidence departments use to demonstrate compliance during accreditation review." },
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
            When state laws change, departments scramble to interpret updates and rewrite policies. Govira breaks it down for you: what changed, what your department may need to update, and what evidence you may want to plan for accreditation review.
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
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.navy, margin: "0 0 6px 0" }}>From Legal Update to Review Plan</h2>
            <p style={{ fontSize: 14, color: C.textMid }}>No technical setup required.</p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { step: "1", icon: "⚖️", title: "Review the legal update", desc: "Use Govira to understand what changed, why it matters, and where the source language comes from." },
              { step: "2", icon: "📋", title: "Review affected policies and procedures", desc: "See which department documents may need attention, with suggested starting-point language where helpful." },
              { step: "3", icon: "⚙️", title: "Consider operational next steps", desc: "Think through what the department may need to do in practice to align policy with day-to-day operations." },
              { step: "4", icon: "🗂️", title: "Plan evidence for review", desc: "See examples of documentation departments commonly use to demonstrate compliance. Govira does not store evidence, determine compliance, or replace assessor judgment." },
            ].map((item, i) => (
              <div key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.navy, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>{item.step}</div>
                <div style={{ textAlign: "center", fontSize: 30, marginBottom: 16 }}>{item.icon}</div>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 8px 0" }}>{item.title}</p>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, margin: "16px 0 12px 0" }}>Ready to review what changed?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", margin: "0 0 24px 0" }}>Work through what changed, what may need updating, and what evidence to plan.</p>
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
const UpdateCard = ({ onClick, badge, badgeColor, title, summary, citation, meta }: any) => (
  <div onClick={onClick} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 12, cursor: "pointer" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: C.white, background: badgeColor, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.5 }}>{badge}</span>
    </div>
    <p style={{ fontSize: 17, fontWeight: 600, color: C.navy, margin: "0 0 6px 0" }}>{title}</p>
    <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 10px 0", lineHeight: 1.5 }}>{summary}</p>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: C.textLight }}>
        <span>{citation}</span>
        <span style={{ color: C.border }}>·</span>
        <span>{meta}</span>
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.blue }}>View Update Guidance →</span>
    </div>
  </div>
);

const DashboardScreen = ({ onSelectUpdate, onSelectNew }: any) => (
  <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px" }}>
    <FadeIn>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: C.navy, margin: "0 0 6px 0" }}>Legal Updates</h1>
      <p style={{ fontSize: 15, color: C.textMid, margin: "0 0 32px 0", lineHeight: 1.5 }}>Select a legal update to start a guided review of what changed, what may need updating, what operational steps to consider, and what evidence to plan.</p>
    </FadeIn>

    {/* Changed law */}
    <FadeIn delay={100}>
      <UpdateCard
        onClick={onSelectUpdate}
        badge="UPDATED LAW"
        badgeColor={C.amber}
        title="Crowd Management Policy Requirements"
        summary="HB 6004 updated the requirements for how departments handle crowd management. Several existing requirements were strengthened."
        citation="Connecticut HB 6004, §§ 5 & 6"
        meta="6 changes outlined"
      />
    </FadeIn>

    {/* New law */}
    <FadeIn delay={200}>
      <UpdateCard
        onClick={onSelectNew}
        badge="NEW LAW"
        badgeColor={C.red}
        title="Office of the Inspector General"
        summary="HB 6004 establishes a new Office of the Inspector General to investigate use-of-force cases. This is entirely new and may require new documentation and procedures."
        citation="Connecticut HB 6004, §§ 33-35"
        meta="4 new requirements"
      />
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
   SHARED: Status tracking
   ═══════════════════════════════════════════ */
const STATUSES = [
  { key: "needsreview", label: "Needs Review", color: C.textLight, bg: C.bg },
  { key: "inreview", label: "In Review", color: C.amber, bg: C.amberBg },
  { key: "addressed", label: "Addressed", color: C.green, bg: C.greenBg },
  { key: "na", label: "Not Applicable", color: C.textLight, bg: C.bg },
];

const EVIDENCE_ICONS: any = {
  "Document": "📄", "Procedure": "📄", "Training Record": "📋", "Roster": "📋",
  "Log / Export": "📊", "Supervisor Review": "📋", "Photo": "📷", "Screenshot": "📷",
  "Press Release": "📰", "Email": "📧", "Meeting": "📅",
};
const evidenceIcon = (type: string) => EVIDENCE_ICONS[type] || "📄";

const StatusSelect = ({ value, onChange }: any) => {
  const [open, setOpen] = useState(false);
  const cur = STATUSES.find((s) => s.key === value) || STATUSES[0];
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 600, color: cur.color, background: cur.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: cur.color }}/>
        {cur.label}
        <span style={{ fontSize: 8, color: C.textLight }}>▼</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 10 }}/>
          <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 20, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, boxShadow: "0 6px 20px rgba(21,38,63,0.10)", overflow: "hidden", minWidth: 160 }}>
            {STATUSES.map((s) => (
              <button key={s.key} onClick={() => { onChange(s.key); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", fontSize: 13, color: C.text, background: s.key === value ? C.bg : C.white, border: "none", padding: "9px 12px", cursor: "pointer" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.color }}/>
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CopyButton = ({ text }: any) => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    try { navigator.clipboard.writeText(text); } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={onCopy} style={{ fontSize: 11, fontWeight: 600, color: copied ? C.green : C.blue, background: copied ? C.greenBg : C.white, border: `1px solid ${copied ? C.greenBorder : C.border}`, borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const Collapsible = ({ label, children }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
      <button onClick={() => setOpen((o) => !o)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.blue }}>
        <span style={{ transition: "transform 0.2s ease", display: "inline-block", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
        {open ? "Hide" : "Show"} {label}
      </button>
      {open && <div style={{ marginTop: 14 }}>{children}</div>}
    </div>
  );
};

const StageHeader = ({ n, title, benefit }: any) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
    <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", background: C.navy, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 }}>{n}</span>
    <div>
      <p style={{ fontSize: 19, fontWeight: 700, color: C.navy, margin: "2px 0 3px 0" }}>{title}</p>
      <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.5 }}>{benefit}</p>
    </div>
  </div>
);

const FieldLabel = ({ icon, children }: any) => (
  <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, margin: "0 0 8px 0", display: "flex", alignItems: "center", gap: 6, letterSpacing: 0.2 }}>
    <span style={{ fontSize: 13 }}>{icon}</span> {children}
  </p>
);

/* ═══════════════════════════════════════════
   SHARED: Law Detail (summary + 3 guidance layers)
   ═══════════════════════════════════════════ */
const LawDetail = ({ data, onBack }: any) => {
  const [statuses, setStatuses] = useState<string[]>(data.actions.map(() => "needsreview"));
  const setStatus = (i: number, key: string) => setStatuses((prev) => prev.map((s, idx) => (idx === i ? key : s)));
  const addressed = statuses.filter((s) => s === "addressed" || s === "na").length;
  const total = data.actions.length;
  const pct = total ? Math.round((addressed / total) * 100) : 0;

  const operationalList: any[] = [];
  data.actions.forEach((a: any) => {
    if (a.operationalGuidance) operationalList.push({ tag: a.tag, section: a.section, text: a.operationalGuidance });
  });
  const [opChecked, setOpChecked] = useState<boolean[]>(operationalList.map(() => false));
  const opToggle = (k: number) => setOpChecked((prev) => prev.map((c, idx) => (idx === k ? !c : c)));
  const opPlanned = opChecked.filter(Boolean).length;
  const opTotal = operationalList.length;
  const opPct = opTotal ? Math.round((opPlanned / opTotal) * 100) : 0;

  const evidenceList: any[] = [];
  data.actions.forEach((a: any) => {
    if (a.evidence) a.evidence.forEach((ev: any) => evidenceList.push({ tag: a.tag, section: a.section, type: ev.type, example: ev.example }));
  });
  const [checked, setChecked] = useState<boolean[]>(evidenceList.map(() => false));
  const toggle = (k: number) => setChecked((prev) => prev.map((c, idx) => (idx === k ? !c : c)));
  const gathered = checked.filter(Boolean).length;
  const evidenceTotal = evidenceList.length;
  const evidencePct = evidenceTotal ? Math.round((gathered / evidenceTotal) * 100) : 0;

  const divider = { borderTop: `1px solid ${C.border}`, marginTop: 36, paddingTop: 32 };
  const progressBar = (done: number, tot: number, p: number, unit: string) => (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: done === tot && tot > 0 ? C.green : C.navy, margin: "0 0 10px 0" }}>{done} of {tot} {unit}</p>
      <div style={{ height: 8, background: C.bg, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${p}%`, height: "100%", background: C.green, borderRadius: 99, transition: "width 0.3s ease" }}/>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 32px" }}>
      <FadeIn>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.textMid, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20 }}>← Back to legal updates</button>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.white, background: data.badgeColor, padding: "3px 10px", borderRadius: 4, letterSpacing: 0.5 }}>{data.badge}</span>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: C.navy, margin: "12px 0 6px 0" }}>{data.title}</h2>
          <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 10px 0" }}>{data.citation}</p>
          <p style={{ fontSize: 15, color: C.text, margin: 0, lineHeight: 1.6 }}>{data.summary}</p>
        </div>
      </FadeIn>

      {/* ───────────── LEGAL UPDATE SUMMARY (top, un-numbered) ───────────── */}
      <FadeIn delay={150}>
        <div id="stage-summary">
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 19, fontWeight: 700, color: C.navy, margin: "0 0 3px 0" }}>Legal Update Summary</p>
            <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.5 }}>What changed, why it matters, and where it comes from.</p>
          </div>

          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${data.badgeColor}`, borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: C.text, margin: 0, lineHeight: 1.65 }}>{data.interpretation}</p>
          </div>

          {data.context}

          <div style={{ marginTop: 16 }}>
            <Collapsible label="the exact law text">
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.textLight, letterSpacing: 0.5, textTransform: "uppercase", margin: "0 0 8px 0" }}>{data.source.cite}</p>
                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.8, margin: 0, fontStyle: "italic", borderLeft: `3px solid ${C.blue}`, paddingLeft: 14 }}>{data.source.quote}</p>
                <p style={{ fontSize: 11, color: C.textLight, margin: "10px 0 0 0" }}>{data.source.attribution}</p>
              </div>
            </Collapsible>
          </div>
        </div>
      </FadeIn>

      {/* Guidance navigator */}
      <FadeIn delay={200}>
        <div style={{ marginTop: 28 }}>
          <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 14px 0", lineHeight: 1.6 }}>Govira organized this update into policy guidance, operational guidance, and evidence guidance so you can review what may need attention.</p>
          <Lifecycle/>
        </div>
      </FadeIn>

      {/* ───────────── 1. POLICY GUIDANCE ───────────── */}
      <FadeIn delay={240}>
        <div id="stage-policy" style={{ ...divider, scrollMarginTop: 72 }}>
          <StageHeader n="1" title="Policy Guidance" benefit="Which policies, procedures, forms, training materials, or documents may need attention?"/>
          {progressBar(addressed, total, pct, "review items addressed")}

          {data.actions.map((a: any, i: number) => {
            const st = statuses[i];
            const pColor = a.priority === "Action Required" ? C.red : C.amber;
            const dim = st === "na";
            return (
              <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${pColor}`, borderRadius: 10, padding: 18, marginBottom: 12, opacity: dim ? 0.6 : 1, transition: "opacity 0.2s ease" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: pColor, background: a.priority === "Action Required" ? C.redBg : C.amberBg, padding: "2px 8px", borderRadius: 4 }}>{a.priority}</span>
                  <StatusSelect value={st} onChange={(k: string) => setStatus(i, k)}/>
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: C.text, margin: "0 0 8px 0", lineHeight: 1.5, textDecoration: st === "na" ? "line-through" : "none" }}>{a.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: C.blue, fontWeight: 500 }}>{a.section}</span>
                  <span style={{ fontSize: 11, color: C.textLight, background: C.bg, padding: "2px 8px", borderRadius: 4 }}>{a.tag}</span>
                </div>

                <div style={{ borderTop: `1px solid ${C.borderLight}`, marginTop: 14, paddingTop: 14, display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                      <FieldLabel icon="📝">Starting-point language to review</FieldLabel>
                      {a.suggestedLanguage && <CopyButton text={a.suggestedLanguage}/>}
                    </div>
                    {a.suggestedLanguage ? (
                      <>
                        <div style={{ background: C.paleBlue, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.blue}`, borderRadius: 8, padding: "12px 14px" }}>
                          <p style={{ fontSize: 13, color: C.text, margin: 0, lineHeight: 1.65 }}>{a.suggestedLanguage}</p>
                        </div>
                        <p style={{ fontSize: 11, color: C.textLight, margin: "6px 0 0 0" }}>Use this as a starting point based on {a.section}. Departments review, edit, approve, and adopt their own policies and procedures.</p>
                      </>
                    ) : (
                      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px" }}>
                        <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.6 }}>No policy language suggested at this time. This appears to be an awareness item. Review with leadership to determine whether a procedure, memo, or training notice is needed.</p>
                      </div>
                    )}
                  </div>

                  {a.review && (
                    <div>
                      <FieldLabel icon="📁">Documents to review</FieldLabel>
                      <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.5 }}>{a.review}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div style={{ background: C.paleBlue, borderRadius: 10, padding: "12px 16px" }}>
            <p style={{ fontSize: 12, color: C.navy, margin: 0, lineHeight: 1.6 }}>Suggested language is a starting point. Departments review, edit, approve, and adopt their own policies and procedures. Govira does not approve policy language or determine compliance.</p>
          </div>
        </div>
      </FadeIn>

      {/* ───────────── 2. OPERATIONAL GUIDANCE ───────────── */}
      <FadeIn delay={300}>
        <div id="stage-operational" style={{ ...divider, scrollMarginTop: 72 }}>
          <StageHeader n="2" title="Operational Guidance" benefit="What may your department need to do in practice, beyond updating policy language?"/>
          {progressBar(opPlanned, opTotal, opPct, "steps added to plan")}

          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.lightBlue}`, borderRadius: 12, padding: 8 }}>
            {operationalList.map((op: any, k: number) => (
              <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px", borderRadius: 8, background: opChecked[k] ? C.paleBlue : "transparent", borderTop: k > 0 ? `1px solid ${C.borderLight}` : "none" }}>
                <button onClick={() => opToggle(k)} title={opChecked[k] ? "Remove from plan" : "Add to plan"} style={{ width: 20, height: 20, borderRadius: 5, border: `1px solid ${opChecked[k] ? C.blue : C.border}`, background: opChecked[k] ? C.blue : C.white, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", flexShrink: 0, marginTop: 1 }}>{opChecked[k] ? "✓" : ""}</button>
                <span style={{ fontSize: 14 }}>⚙️</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: C.text, margin: "0 0 4px 0", lineHeight: 1.5 }}>{op.text}</p>
                  <span style={{ fontSize: 11, color: C.textLight }}>Relates to: {op.tag} ({op.section})</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: C.paleBlue, borderRadius: 10, padding: "12px 16px", marginTop: 16 }}>
            <p style={{ fontSize: 12, color: C.navy, margin: 0, lineHeight: 1.6 }}>These are practical steps departments often take to put a change into effect. Adapt them to how your department operates.</p>
          </div>
        </div>
      </FadeIn>

      {/* ───────────── 3. EVIDENCE GUIDANCE ───────────── */}
      <FadeIn delay={360}>
        <div id="stage-evidence" style={{ ...divider, scrollMarginTop: 72 }}>
          <StageHeader n="3" title="Evidence Guidance" benefit="What evidence do departments commonly use to demonstrate compliance during accreditation review?"/>
          {progressBar(gathered, evidenceTotal, evidencePct, "examples added to plan")}

          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.lightBlue}`, borderRadius: 12, padding: 8 }}>
            {evidenceList.map((ev: any, k: number) => (
              <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px", borderRadius: 8, background: checked[k] ? C.paleBlue : "transparent", borderTop: k > 0 ? `1px solid ${C.borderLight}` : "none" }}>
                <button onClick={() => toggle(k)} title={checked[k] ? "Remove from plan" : "Add to plan"} style={{ width: 20, height: 20, borderRadius: 5, border: `1px solid ${checked[k] ? C.blue : C.border}`, background: checked[k] ? C.blue : C.white, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", flexShrink: 0, marginTop: 1 }}>{checked[k] ? "✓" : ""}</button>
                <span style={{ fontSize: 14 }}>{evidenceIcon(ev.type)}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: C.text, margin: "0 0 4px 0", lineHeight: 1.5 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.navy, background: C.bg, border: `1px solid ${C.border}`, padding: "1px 7px", borderRadius: 5, marginRight: 6, whiteSpace: "nowrap" }}>{ev.type}</span>
                    {ev.example}
                  </p>
                  <span style={{ fontSize: 11, color: C.textLight }}>Demonstrates: {ev.tag} ({ev.section})</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: C.paleBlue, borderRadius: 10, padding: "12px 16px", marginTop: 16 }}>
            <p style={{ fontSize: 12, color: C.navy, margin: 0, lineHeight: 1.6 }}>These are common ways departments demonstrate compliance. What an assessor expects can vary by standard and department practice. Govira does not store evidence or determine whether your department is compliant.</p>
          </div>
        </div>
      </FadeIn>

      {/* Who should review (supporting) */}
      <FadeIn delay={420}>
        <div style={divider}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: "0 0 4px 0" }}>Who Should Review This</p>
          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 16px 0" }}>These changes typically involve the following people in your department.</p>
          {data.reviewers.map((item: any, i: number) => (
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
    </div>
  );
};

/* ═══════════════════════════════════════════
   DATA: Updated Law (Crowd Management)
   ═══════════════════════════════════════════ */
const crowdData = {
  badge: "UPDATED LAW",
  badgeColor: C.amber,
  title: "Crowd Management Policy Requirements",
  citation: "Connecticut HB 6004, §§ 5 & 6",
  summary: "HB 6004 strengthened how departments must handle crowd management. Here is what your department needs to address.",
  interpretation: "HB 6004 now requires the crowd management policy to address permissible and impermissible uses of force, the training officers must complete, documentation after physical confrontations, a definition of \"crowd,\" and protections for individual rights during demonstrations.",
  context: (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
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
  ),
  actions: [
    { text: "Address permissible and impermissible uses of force during crowd management", section: "§ 5(2)", tag: "Force Guidance", operationalGuidance: "Confirm officers and supervisors know which force options are permitted and prohibited during crowd incidents, and brief them before planned events.", priority: "Action Required", suggestedLanguage: "During crowd management incidents, officers shall use only objectively reasonable force consistent with the statewide crowd management policy, and shall identify the specific force options that are permitted and prohibited during such incidents.", review: "Crowd Management / Civil Disturbance policy and Use of Force policy", evidence: [{ type: "Document", example: "Adopted policy showing the new crowd-management force language" }, { type: "Supervisor Review", example: "Completed supervisor review confirming force guidance was followed" }] },
    { text: "Specify the type and amount of crowd management training each officer must undergo", section: "§ 5(2)", tag: "Training", operationalGuidance: "Schedule the required crowd management training and track which officers have completed it.", priority: "Action Required", suggestedLanguage: "All officers shall complete crowd management training covering de-escalation, force options, and documentation requirements. The Department shall specify the required number of training hours and how often the training must be repeated.", review: "Training standards and schedules", evidence: [{ type: "Training Record", example: "Sign-in sheet or completion report for crowd management training" }] },
    { text: "Require documentation after any physical confrontation between an officer and a civilian during a crowd incident", section: "§ 5(3)", tag: "Documentation", operationalGuidance: "Confirm supervisors know when post-incident documentation is required and who is responsible for reviewing it.", priority: "Action Required", suggestedLanguage: "Following any physical confrontation between an officer and a civilian during a crowd management incident, the involved officer shall complete a written report documenting the circumstances, any force used, and the outcome before the end of shift.", review: "Incident documentation procedures", evidence: [{ type: "Log / Export", example: "Completed post-incident documentation from a crowd incident" }] },
    { text: "Define \"crowd\" and reflect factors like size, location, purpose, and time of day", section: "§ 5(1)", tag: "Definitions", operationalGuidance: "Make sure officers who decide when to apply the policy understand the working definition of a crowd.", priority: "Action Required", suggestedLanguage: "For purposes of this policy, a crowd is a gathering of individuals that, based on its size, location, purpose, or time of day, may require coordinated management by the Department.", review: "Crowd Management / Civil Disturbance policy", evidence: [{ type: "Document", example: "Adopted policy showing the crowd definition" }] },
    { text: "Establish guidelines that protect individual rights and preserve the peace during demonstrations", section: "§ 5(1)", tag: "Individual Rights", operationalGuidance: "Brief officers on protecting assembly and speech rights so the policy is applied consistently during demonstrations.", priority: "Action Required", suggestedLanguage: "The Department shall manage demonstrations and civil disturbances in a manner that protects individuals' rights to lawful assembly and free speech while preserving public peace and safety.", review: "Crowd Management / Civil Disturbance policy", evidence: [{ type: "Document", example: "Adopted policy showing the individual-rights guidelines" }] },
    { text: "Include the crowd management policy in all basic and review training programs", section: "§ 5", tag: "Training Programs", operationalGuidance: "Confirm the crowd management policy is built into both new-officer and in-service training curricula.", priority: "Awareness", suggestedLanguage: "The crowd management policy shall be incorporated into all basic and in-service training programs.", review: "Training curriculum and schedules", evidence: [{ type: "Training Record", example: "Sign-in sheets showing the policy is part of basic and review training" }] },
  ],
  reviewers: [
    { role: "Accreditation Manager", action: "Review changes, update policy language, plan supporting evidence" },
    { role: "Chief of Police / Admin Lieutenant", action: "Approve updated policy language before adoption" },
    { role: "Accreditation Assessor", action: "Review updated policies and supporting documentation during a future assessment." },
  ],
  source: {
    cite: "HB 6004, § 5 (Connecticut General Assembly)",
    quote: "\"The policy must also establish guidelines for managing crowds in a manner that protects individual rights and preserves the peace during demonstrations and civil disturbances, addresses permissible and impermissible uses of force by a police officer and the type and amount of crowd management training that each police officer must undergo, and sets forth required documentation after any physical confrontation between a police officer and a civilian during a crowd management incident.\"",
    attribution: "Source: OLR Bill Analysis, HB 6004, Emergency Certification, 2020",
  },
};

/* ═══════════════════════════════════════════
   DATA: New Law (Office of the Inspector General)
   ═══════════════════════════════════════════ */
const oigData = {
  badge: "NEW LAW",
  badgeColor: C.red,
  title: "Office of the Inspector General",
  citation: "Connecticut HB 6004, §§ 33-35",
  summary: "HB 6004 created a new Office of the Inspector General. Here is what your department should be aware of and address.",
  interpretation: "HB 6004 created an independent Office of the Inspector General within the Division of Criminal Justice. It can investigate peace officers' use of force, issue subpoenas, and recommend certification actions to POST. Most of this describes what the new office does. Your department's work is to make sure your referral, reporting, and notification procedures account for it.",
  context: (
    <div style={{ background: C.white, border: `2px solid ${C.red}`, borderRadius: 12, padding: 20, position: "relative" }}>
      <div style={{ position: "absolute", top: -10, left: 16, background: C.red, color: C.white, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>ENTIRELY NEW</div>
      <p style={{ fontSize: 12, fontWeight: 600, color: C.red, letterSpacing: 0.5, textTransform: "uppercase", margin: "0 0 12px 0" }}>No prior equivalent existed</p>
      <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, margin: 0 }}>
        HB 6004 establishes a new Office of the Inspector General (OIG) within the Division of Criminal Justice. The OIG will investigate peace officers' use of force and prosecute cases where force was not justified. This is entirely new and departments may need to create or update related procedures.
      </p>
    </div>
  ),
  actions: [
    { text: "The Inspector General will investigate all use-of-force incidents involving peace officers", section: "§ 34", tag: "Use of Force", priority: "Awareness", suggestedLanguage: null, review: null, evidence: null },
    { text: "Chiefs of police may refer use-of-force incidents to the Inspector General and must accept referrals", section: "§ 33", tag: "Reporting", operationalGuidance: "Make sure whoever handles use-of-force reporting knows how and when to refer incidents to the OIG.", priority: "Action Required", suggestedLanguage: "The Chief of Police may refer use-of-force incidents to the Office of the Inspector General and shall cooperate with and accept referrals from the Office of the Inspector General regarding such incidents.", review: "Use of Force reporting procedures", evidence: [{ type: "Document", example: "Updated reporting procedure that references OIG referrals" }] },
    { text: "The Inspector General can issue subpoenas to municipalities, law enforcement units, and current or former employees", section: "§ 33", tag: "Compliance", operationalGuidance: "Identify who in the department receives and responds to OIG subpoenas so requests are not missed.", priority: "Awareness", suggestedLanguage: "The Department shall comply with subpoenas issued by the Office of the Inspector General, including those directed to the municipality, the Department, and current or former employees.", review: "Internal affairs and investigation procedures", evidence: [{ type: "Procedure", example: "Procedure showing how OIG referrals and subpoenas are handled" }] },
    { text: "Inform officers about the Inspector General's role and authority", section: "§ 33", tag: "Notification", operationalGuidance: "Plan how and when officers will be briefed on the OIG's role, such as during roll call or in-service training.", priority: "Awareness", suggestedLanguage: "Officers shall be informed of the role and authority of the Office of the Inspector General, including its authority to investigate use-of-force incidents and to issue subpoenas.", review: "Officer notification procedures", evidence: [{ type: "Screenshot", example: "Briefing or notice informing officers of the OIG's role" }, { type: "Email", example: "Email or briefing record sent to officers" }] },
    { text: "The Inspector General will make recommendations to POST on officer certification actions", section: "§ 33", tag: "Certification", priority: "Awareness", suggestedLanguage: null, review: null, evidence: null },
  ],
  reviewers: [
    { role: "Accreditation Manager", action: "Review the new requirements and update related procedures" },
    { role: "Chief of Police / Admin Lieutenant", action: "Confirm referral and reporting procedures align with the OIG's role" },
    { role: "Accreditation Assessor", action: "Review updated policies and supporting documentation during a future assessment." },
  ],
  source: {
    cite: "HB 6004, §§ 33-35 (Connecticut General Assembly)",
    quote: "\"The bill establishes the Office of the Inspector General as an independent office within the Division of Criminal Justice. The bill requires OIG to investigate peace officers' use of force, prosecute any case in which the inspector general determines the use of force was not justified, and make recommendations to POST concerning censure and suspension, renewal, cancellation, or revocation of a peace officer's certification.\"",
    attribution: "Source: OLR Bill Analysis, HB 6004, Emergency Certification, 2020",
  },
};

const UpdatedLawScreen = ({ onBack }: any) => <LawDetail data={crowdData} onBack={onBack}/>;
const NewLawScreen = ({ onBack }: any) => <LawDetail data={oigData} onBack={onBack}/>;

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function GoviraV2() {
  const [screen, setScreen] = useState("home");
  const goDashboard = () => setScreen("dashboard");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", color: C.text, WebkitFontSmoothing: "antialiased" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <Header onHome={() => setScreen("home")}/>
      {screen === "home" && <HomeScreen onGetStarted={goDashboard} onViewExample={() => setScreen("updated")}/>}
      {screen === "dashboard" && <DashboardScreen onSelectUpdate={() => setScreen("updated")} onSelectNew={() => setScreen("newlaw")}/>}
      {screen === "updated" && <UpdatedLawScreen onBack={goDashboard}/>}
      {screen === "newlaw" && <NewLawScreen onBack={goDashboard}/>}
    </div>
  );
}
