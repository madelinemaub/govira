import React, { useState, useEffect } from "react";

/* ============================================================
   GOVIRA — redesign
   Direction: modern records system, not SaaS.
   Public Sans (USWDS typeface) for UI · Source Serif 4 for law.
   Document-grade semantic colors. The docket is the signature.
   ============================================================ */

const FONTS =
  "https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap";

const C = {
  bg: "#F2F1EC",          // ivory record paper
  surface: "#FFFFFF",
  ink: "#21201B",         // warm near-black body
  navy: "#1B2A44",        // brand / headings
  mid: "#565349",
  faint: "#6E6B61",       // fixed: >=4.5:1 on white and ivory
  line: "#DAD7CD",
  lineStrong: "#AFAB9D",
  blue: "#1F4E9C",        // single action color
  blueBg: "#EDF1F8",
  brick: "#A03123",       // Action Required
  brickBg: "#F7EAE7",
  ochre: "#8A5D0B",       // In Review
  ochreBg: "#F6EEDC",
  forest: "#2E5E3F",      // Reviewed / Addressed
  forestBg: "#E9F0E9",
};

const SERIF = "'Source Serif 4', Georgia, serif";
const SANS = "'Public Sans', system-ui, sans-serif";

/* ---------- flat shield mark, no gradient ---------- */
const ShieldLogo = ({ size = 24, tone = C.navy }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
    <path d="M32 4L8 15V29C8 43.4 18.4 55.6 32 60C45.6 55.6 56 43.4 56 29V15L32 4Z" fill={tone} />
    <path d="M22 31L29 38L43 23" stroke="#FFF" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

/* ---------- small primitives ---------- */
const Caps = ({ children, color = C.faint, size = 12, weight = 700, style }) => (
  <span style={{ fontFamily: SANS, fontSize: size, fontWeight: weight, letterSpacing: ".09em", textTransform: "uppercase", color, ...style }}>
    {children}
  </span>
);

const Stamp = ({ children, tone = C.forest }) => (
  <span
    style={{
      display: "inline-block",
      fontFamily: SANS,
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: tone,
      border: `2px solid ${tone}`,
      padding: "7px 13px",
      transform: "rotate(-2deg)",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const Notice = ({ children }) => (
  <div style={{ borderLeft: `3px solid ${C.lineStrong}`, padding: "10px 14px", background: C.surface, marginTop: 16 }}>
    <Caps>Notice</Caps>
    <p style={{ fontFamily: SANS, fontSize: 14, color: C.mid, margin: "5px 0 0", lineHeight: 1.6 }}>{children}</p>
  </div>
);

const FadeIn = ({ children, delay = 0 }) => {
  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(6px)", transition: "opacity .35s ease, transform .35s ease" }}>
      {children}
    </div>
  );
};

const Btn = ({ children, onClick, variant = "primary", style }) => {
  const base = {
    fontFamily: SANS,
    fontSize: 15.5,
    fontWeight: 600,
    padding: "14px 26px",
    borderRadius: 3,
    cursor: "pointer",
    transition: "background .15s ease, border-color .15s ease",
  };
  const v =
    variant === "primary"
      ? { background: C.navy, color: "#FFF", border: `1px solid ${C.navy}` }
      : variant === "blue"
      ? { background: C.blue, color: "#FFF", border: `1px solid ${C.blue}` }
      : { background: "transparent", color: C.navy, border: `1px solid ${C.lineStrong}` };
  return (
    <button onClick={onClick} style={{ ...base, ...v, ...style }}>
      {children}
    </button>
  );
};

/* ============================================================
   HEADER — flat, quiet chrome. No slogan in the workspace.
   ============================================================ */
const Header = ({ onHome }) => (
  <div
    style={{
      background: C.surface,
      borderBottom: `1px solid ${C.line}`,
      padding: "0 32px",
      height: 54,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}
  >
    <button onClick={onHome} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", background: "none", border: "none", padding: 0 }}>
      <ShieldLogo size={22} />
      <span style={{ fontFamily: SANS, fontSize: 16.5, fontWeight: 800, color: C.navy, letterSpacing: ".14em" }}>GOVIRA</span>
    </button>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <Caps color={C.mid} size={12.5} weight={600} style={{ letterSpacing: ".04em", textTransform: "none" }}>
        Bethany Police Department
      </Caps>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 3,
          background: C.navy,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: SANS,
          fontSize: 12.5,
          fontWeight: 700,
          color: "#FFF",
          letterSpacing: ".04em",
        }}
      >
        JM
      </div>
    </div>
  </div>
);

/* ============================================================
   REDLINE — legislative convention: struck = removed, underline = added
   ============================================================ */
const Removed = ({ children }) => (
  <span style={{ color: C.brick, textDecoration: "line-through", textDecorationThickness: 1.5 }}>{children}</span>
);
const Added = ({ children }) => (
  <span style={{ color: C.forest, textDecoration: "underline", textUnderlineOffset: 3, textDecorationThickness: 1.5, background: "rgba(46,94,63,.07)" }}>
    {children}
  </span>
);

const Redline = ({ prior, amended, citeLabel, priorLabel = "Prior law", amendedLabel = "As amended", changeLabel = "What changed in the law" }) => (
  <div style={{ background: C.surface, border: `1px solid ${C.line}`, marginTop: 16 }}>
    <div style={{ padding: "10px 18px", borderBottom: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <Caps color={C.navy}>{changeLabel}</Caps>
      <div style={{ display: "flex", gap: 16 }}>
        <Caps size={11.5}><Removed>struck</Removed>&nbsp; removed</Caps>
        <Caps size={11.5}><Added>underlined</Added>&nbsp; added</Caps>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "125px 1fr", gap: 0 }}>
      <div style={{ padding: "18px 0 18px 18px", borderRight: `1px solid ${C.line}` }}>
        <Caps size={11.5}>{priorLabel}</Caps>
      </div>
      <div style={{ padding: "16px 20px 18px" }}>
        <p style={{ fontFamily: SERIF, fontSize: 16.5, lineHeight: 1.8, color: C.ink, margin: 0 }}>{prior}</p>
      </div>
      <div style={{ padding: "18px 0 18px 18px", borderRight: `1px solid ${C.line}`, borderTop: `1px solid ${C.line}` }}>
        <Caps size={11.5} color={C.navy}>{amendedLabel}</Caps>
        <div style={{ marginTop: 4 }}>
          <Caps size={11.5}>{citeLabel}</Caps>
        </div>
      </div>
      <div style={{ padding: "16px 20px 18px", borderTop: `1px solid ${C.line}` }}>
        <p style={{ fontFamily: SERIF, fontSize: 16.5, lineHeight: 1.8, color: C.ink, margin: 0 }}>{amended}</p>
      </div>
    </div>
    <div style={{ padding: "9px 18px", borderTop: `1px solid ${C.line}`, background: C.bg }}>
      <p style={{ fontFamily: SANS, fontSize: 12, color: C.faint, margin: 0, lineHeight: 1.5 }}>
        Source comparison shown for orientation. Official source text controls; confirm before acting.
      </p>
    </div>
  </div>
);

/* ============================================================
   DOCKET HEADER + REVIEW RECORD (consolidated progress ledger)
   ============================================================ */
const badgeTone = (badge) => (badge === "NEW LAW" ? C.brick : badge === "UPDATED LAW" || badge === "REVISED STANDARD" ? C.ochre : C.forest);

const ReviewRecord = ({ rows, complete }) => (
  <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 18, paddingTop: 14 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <Caps color={C.navy}>Progress</Caps>
      {complete && <Stamp>Review complete</Stamp>}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 18 }}>
      {rows.map((r) => {
        const pct = r.total ? Math.round((r.done / r.total) * 100) : 0;
        const full = r.total > 0 && r.done === r.total;
        return (
          <div key={r.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
              <Caps size={11.5}>{r.label}</Caps>
              <span style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 700, color: full ? C.forest : C.navy, fontVariantNumeric: "tabular-nums" }}>
                {r.done}/{r.total}
              </span>
            </div>
            <div style={{ height: 6, background: C.bg, border: `1px solid ${C.line}` }}>
              <div style={{ width: `${pct}%`, height: "100%", background: full ? C.forest : C.navy, transition: "width .3s ease" }} />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

/* ============================================================
   STATUS SELECT — text-first, document-grade colors
   ============================================================ */
const DECISIONS = [
  { key: "done", label: "Already addressed", color: C.forest, bg: C.forestBg },
  { key: "na", label: "Not applicable", color: C.faint, bg: C.bg },
];
const LATER = { key: "later", label: "Save for later", color: C.blue, bg: C.blueBg };

const DecisionGroup = ({ value, onChange, allowLater }) => {
  const opts = allowLater ? [...DECISIONS, LATER] : DECISIONS;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      {opts.map((d) => {
        const on = value === d.key;
        return (
          <button key={d.key} onClick={() => onChange(on ? null : d.key)} aria-pressed={on}
            style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: ".04em", padding: "6px 12px", borderRadius: 3, cursor: "pointer", border: `1px solid ${on ? d.color : C.line}`, background: on ? d.bg : C.surface, color: on ? d.color : C.mid, transition: "all .13s" }}>
            {d.label}
          </button>
        );
      })}
    </div>
  );
};

const Collapsible = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${C.line}`, background: C.surface, marginTop: 16 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", background: "none", border: "none", padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}
      >
        <Caps color={C.blue}>{open ? "Hide" : "Show"} {label}</Caps>
        <span style={{ color: C.faint, fontSize: 12.5, transform: open ? "rotate(90deg)" : "none", transition: "transform .15s", display: "inline-block" }}>▶</span>
      </button>
      {open && <div style={{ padding: "0 16px 16px" }}>{children}</div>}
    </div>
  );
};

/* ============================================================
   SECTION RAIL — statute-style table of contents with scrollspy
   ============================================================ */
const RAIL = [
  { id: "sec-understand", label: "Understand" },
  { id: "sec-review", label: "What to review" },
  { id: "sec-do", label: "What to do" },
  { id: "sec-proofs", label: "Proofs to plan" },
  { id: "sec-plan", label: "Summary" },
];

const SectionRail = ({ active }) => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <nav aria-label="Docket sections" className="gv-rail">
      <Caps size={11.5}>Contents</Caps>
      <div style={{ marginTop: 10, borderLeft: `1px solid ${C.line}` }}>
        {RAIL.map((r, i) => {
          const on = active === r.id;
          return (
            <button
              key={r.id}
              onClick={() => go(r.id)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                borderLeft: `2px solid ${on ? C.navy : "transparent"}`,
                marginLeft: -1,
                padding: "7px 0 7px 12px",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 700, color: on ? C.navy : C.faint, fontVariantNumeric: "tabular-nums" }}>{i + 1}.</span>
              <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: on ? 700 : 500, color: on ? C.navy : C.mid }}>{r.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

/* ============================================================
   DOCKET DETAIL
   ============================================================ */
const SectionHead = ({ n, title, benefit, id }) => (
  <div id={id} style={{ borderTop: `2px solid ${C.navy}`, marginTop: 44, paddingTop: 16, scrollMarginTop: 70 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      <span style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 800, color: C.navy, fontVariantNumeric: "tabular-nums" }}>{n}.</span>
      <h3 style={{ fontFamily: SANS, fontSize: 21, fontWeight: 800, color: C.navy, margin: 0, letterSpacing: "-.01em" }}>{title}</h3>
    </div>
    <p style={{ fontFamily: SANS, fontSize: 14.5, color: C.mid, margin: "6px 0 18px 24px", lineHeight: 1.55 }}>{benefit}</p>
  </div>
);

const GroupHeader = ({ children, sub }) => (
  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "11px 18px", background: C.navy }}>
    <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#FFF" }}>{children}</span>
    {sub && <span style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,.7)" }}>{sub}</span>}
  </div>
);

const groupBy = (items, keyFn) => {
  const map = new Map();
  items.forEach((it, i) => {
    const k = keyFn(it) || "Other";
    if (!map.has(k)) map.set(k, []);
    map.get(k).push({ ...it, _i: i });
  });
  return [...map.entries()];
};

const PointerRow = ({ k, v }) => (
  <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: 14, padding: "9px 0", borderTop: `1px solid ${C.line}` }}>
    <Caps size={11} color={C.navy}>{k}</Caps>
    <span style={{ fontFamily: SANS, fontSize: 14.5, color: C.ink, lineHeight: 1.6 }}>{v}</span>
  </div>
);

const EvidenceRow = ({ decision, onDecide, example, meta, allowLater }) => (
  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, flexWrap: "wrap", padding: "13px 16px", borderTop: `1px solid ${C.line}`, background: decision === "later" ? C.blueBg : "transparent", opacity: decision === "na" || decision === "done" ? 0.55 : 1, transition: "background .15s, opacity .15s" }}>
    <div style={{ flex: 1, minWidth: 260 }}>
      <p style={{ fontFamily: SANS, fontSize: 15, color: C.ink, margin: "0 0 4px", lineHeight: 1.55, textDecoration: decision === "na" ? "line-through" : "none", fontWeight: decision ? 400 : 500 }}>
        {example}
      </p>
      <Caps size={11} weight={600} style={{ letterSpacing: ".03em", textTransform: "none" }}>{meta}</Caps>
    </div>
    <DecisionGroup value={decision} onChange={onDecide} allowLater={allowLater} />
  </div>
);

const LawDetail = ({ data, onBack }) => {
  const [decisions, setDecisions] = useState(data.actions.map(() => null));
  const setDecision = (i, key) => setDecisions((prev) => prev.map((d, idx) => (idx === i ? key : d)));

  const doList = data.actions.filter((a) => a.action).map((a) => ({ tag: a.tag, section: a.section, text: a.action, cat: a.cat }));
  const [doDecisions, setDoDecisions] = useState(doList.map(() => null));
  const setDoDecision = (k, v) => setDoDecisions((p) => p.map((c, i) => (i === k ? v : c)));

  const proofList = [];
  data.actions.forEach((a) => { if (a.proofs) a.proofs.forEach((pr) => proofList.push({ tag: a.tag, section: a.section, type: pr.type, example: pr.example })); });
  const [prDecisions, setPrDecisions] = useState(proofList.map(() => null));
  const setPrDecision = (k, v) => setPrDecisions((p) => p.map((c, i) => (i === k ? v : c)));

  const [markedComplete, setMarkedComplete] = useState(false);
  const allTriagedCheck = (r) => r.total === 0 || r.done === r.total;

  const all = [
    ...data.actions.map((a, i) => ({ kind: "Review", label: a.where || a.requirement, dec: decisions[i] })),
    ...doList.map((op, i) => ({ kind: "Do", label: op.text, dec: doDecisions[i] })),
    ...proofList.map((pr, i) => ({ kind: "Proof", label: `${pr.type} · ${pr.example}`, dec: prDecisions[i] })),
  ];
  const attention = all.filter((x) => x.dec === null);
  const addressed = all.filter((x) => x.dec === "done");
  const notApplicable = all.filter((x) => x.dec === "na");
  const savedLater = all.filter((x) => x.dec === "later");

  const rows = [
    { label: "Review items", done: decisions.filter((d) => d !== null).length, total: data.actions.length },
    { label: "Department actions", done: doDecisions.filter((d) => d !== null).length, total: doList.length },
    { label: "Proofs", done: prDecisions.filter((d) => d !== null).length, total: proofList.length },
  ];

  const allTriaged = rows.every(allTriagedCheck);

  const [active, setActive] = useState("sec-understand");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    RAIL.forEach((r) => { const el = document.getElementById(r.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const tone = badgeTone(data.badge);

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 32px 72px" }}>
      <FadeIn>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 18 }}>
          <Caps color={C.blue}>← All updates</Caps>
        </button>
      </FadeIn>

      <div className="gv-detail" style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 40, alignItems: "start" }}>
        <div className="gv-railwrap" style={{ position: "sticky", top: 78 }}>
          <SectionRail active={active} />
        </div>

        <div style={{ minWidth: 0 }}>
          {/* Docket header */}
          <FadeIn>
            <div style={{ background: C.surface, border: `1px solid ${C.lineStrong}`, borderTop: `4px solid ${tone}`, padding: "22px 26px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
                  <div>
                    <Caps size={11.5}>Status</Caps>
                    <div style={{ marginTop: 4 }}><Caps color={tone} size={13} weight={800}>{data.badge}</Caps></div>
                  </div>
                  <div>
                    <Caps size={11.5}>Authority</Caps>
                    <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.mid, marginTop: 4 }}>{data.authority}</div>
                  </div>
                  <div>
                    <Caps size={11.5}>Citation</Caps>
                    <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: C.navy, marginTop: 4 }}>{data.citation}</div>
                  </div>
                  <div>
                    <Caps size={11.5}>May apply to</Caps>
                    <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.mid, marginTop: 4 }}>{data.appliesTo}</div>
                  </div>
                  <div>
                    <Caps size={11.5}>Effective</Caps>
                    <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: C.brick, marginTop: 4 }}>{data.effective}</div>
                  </div>
                </div>
                {markedComplete && <Stamp>Review complete</Stamp>}
              </div>
              <h2 style={{ fontFamily: SANS, fontSize: 30, fontWeight: 800, color: C.navy, margin: "16px 0 8px", letterSpacing: "-.015em", lineHeight: 1.2 }}>{data.title}</h2>
              <p style={{ fontFamily: SANS, fontSize: 16, color: C.ink, margin: 0, lineHeight: 1.65, maxWidth: 640 }}>{data.summary}</p>
              <ReviewRecord rows={rows} complete={markedComplete} />
            </div>
          </FadeIn>

          {/* 1. UNDERSTAND */}
          <div id="sec-understand" style={{ scrollMarginTop: 70 }}>
            <SectionHead n="1" title="Understand the change" benefit="The external side: what the authority did, in its own words, with the source one click away. Nothing here is about your department yet." />
            <div style={{ background: C.surface, border: `1px solid ${C.line}`, padding: "18px 22px" }}>
              <Caps size={11} color={C.navy}>Why this is on your desk</Caps>
              <p style={{ fontFamily: SANS, fontSize: 16, color: C.ink, margin: "8px 0 0", lineHeight: 1.7 }}>{data.interpretation}</p>
            </div>
            <Redline prior={data.redline.prior} amended={data.redline.amended} citeLabel={data.redline.cite} priorLabel={data.redline.priorLabel} amendedLabel={data.redline.amendedLabel} changeLabel={data.redline.changeLabel} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
              <Caps size={11}>Official record</Caps>
              {(data.recordLinks || ["Act text", "OLR summary", "Bill status"]).map((l) => (
                <button key={l} style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: C.blue, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 3, padding: "5px 12px", cursor: "pointer" }}>
                  {l} ↗
                </button>
              ))}
            </div>
            <Collapsible label="the exact source text">
              <Caps size={11}>{data.source.cite}</Caps>
              <p style={{ fontFamily: SERIF, fontSize: 16.5, color: C.ink, lineHeight: 1.85, margin: "10px 0 0", borderLeft: `3px solid ${C.navy}`, paddingLeft: 16 }}>{data.source.quote}</p>
              <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.faint, margin: "10px 0 0" }}>{data.source.attribution}</p>
            </Collapsible>
          </div>

          {/* 2. WHAT TO REVIEW */}
          <div id="sec-review" style={{ scrollMarginTop: 70 }}>
            <SectionHead n="2" title="What to review" benefit="The internal side: what the change above may mean inside your department, grouped by where you’ll go in PowerDMS. Locations follow the POSTC Law Enforcement Accreditation Standards Manual, 6th Edition; mappings are drafts pending SME review." />
            {data.actions.length === 0 && (
              <div style={{ background: C.surface, border: `1px solid ${C.line}`, padding: "20px 22px" }}>
                <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: C.navy, margin: 0 }}>No policy review identified for this change.</p>
              </div>
            )}
            {groupBy(data.actions, (a) => a.dms).map(([loc, items]) => (
              <div key={loc} style={{ border: `1px solid ${C.lineStrong}`, marginBottom: 16, background: C.surface }}>
                <GroupHeader sub={`${items.length} item${items.length === 1 ? "" : "s"}`}>{loc}</GroupHeader>
                {items.map((a) => {
                  const dec = decisions[a._i];
                  const dim = dec === "na" || dec === "done";
                  return (
                    <div key={a._i} style={{ borderTop: `1px solid ${C.line}`, padding: "15px 18px 8px", opacity: dim ? 0.55 : 1, transition: "opacity .2s" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                        <p style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: C.ink, margin: 0, lineHeight: 1.55, flex: 1, minWidth: 260, textDecoration: dec === "na" ? "line-through" : "none" }}>
                          <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 800, color: C.navy, marginRight: 10 }}>{a.section}</span>
                          {a.requirement}
                        </p>
                        <DecisionGroup value={dec} onChange={(k) => setDecision(a._i, k)} />
                      </div>
                      {a.where ? (
                        <div style={{ margin: "10px 0 8px" }}>
                          <PointerRow k="What to review" v={a.review} />
                          <PointerRow k="Why" v={a.why} />
                          <PointerRow k="Department documents" v={a.where} />
                        </div>
                      ) : (
                        <p style={{ fontFamily: SANS, fontSize: 14, color: C.mid, margin: "8px 0 10px", lineHeight: 1.6 }}>Awareness item: no document review identified. {a.why}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
            <Notice>Govira points to what may warrant review. It does not draft or replace policy language. Reviews run through your department's normal policy process.</Notice>
          </div>

          {/* 3. WHAT TO DO */}
          <div id="sec-do" style={{ scrollMarginTop: 70 }}>
            <SectionHead n="3" title="What to do" benefit="Practical steps beyond documents, grouped by type. Clear what’s handled or doesn’t apply." />
            {groupBy(doList, (op) => op.cat).map(([cat, items]) => (
              <div key={cat} style={{ border: `1px solid ${C.lineStrong}`, marginBottom: 16, background: C.surface }}>
                <GroupHeader sub={`${items.length} step${items.length === 1 ? "" : "s"}`}>{cat}</GroupHeader>
                {items.map((op) => (
                  <EvidenceRow key={op._i} decision={doDecisions[op._i]} onDecide={(v) => setDoDecision(op._i, v)} example={op.text} meta={`Relates to ${op.tag} · ${op.section}`} />
                ))}
              </div>
            ))}
            <Notice>These are practical steps departments often take to put a change into effect. Adapt them to how your department operates.</Notice>
          </div>

          {/* 4. PROOFS TO PLAN */}
          <div id="sec-proofs" style={{ scrollMarginTop: 70 }}>
            <SectionHead n="4" title="Proofs to plan" benefit="Field records that show the requirement working in practice, not more documents. Save ideas for later if they’re not for now." />
            {groupBy(proofList, (ev) => ev.type).map(([type, items]) => (
              <div key={type} style={{ border: `1px solid ${C.lineStrong}`, marginBottom: 16, background: C.surface }}>
                <GroupHeader sub={`${items.length} idea${items.length === 1 ? "" : "s"}`}>{type}</GroupHeader>
                {items.map((ev) => (
                  <EvidenceRow key={ev._i} decision={prDecisions[ev._i]} onDecide={(v) => setPrDecision(ev._i, v)} example={ev.example} meta={`Relates to ${ev.tag} · ${ev.section}`} allowLater />
                ))}
              </div>
            ))}
            <Notice>Proofs to consider, not verdicts. What an assessor expects varies by standard and practice. Govira does not store proofs or make determinations for your department.</Notice>
          </div>

          {/* 5. SUMMARY (auto-built from decisions) */}
          <div id="sec-plan" style={{ scrollMarginTop: 70 }}>
            <SectionHead n="5" title="Summary" benefit="Built automatically as you work. The docket is your plan; this is the record of it." />
            <div style={{ background: C.surface, border: `1px solid ${C.lineStrong}`, borderTop: `4px solid ${C.navy}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "14px 20px", borderBottom: `1px solid ${C.line}` }}>
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 18, fontWeight: 800, color: attention.length === 0 ? C.forest : C.navy, letterSpacing: "-.01em", marginBottom: 3 }}>
                    {attention.length === 0 ? "Nothing left needing attention." : `${attention.length} item${attention.length === 1 ? "" : "s"} still need${attention.length === 1 ? "s" : ""} attention.`}
                  </div>
                  <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.mid }}>
                    {addressed.length} addressed · {notApplicable.length} not applicable · {savedLater.length} saved for later
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: C.blue, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 3, padding: "10px 16px", cursor: "pointer" }}>
                    Export summary
                  </button>
                  <button onClick={() => attention.length === 0 && setMarkedComplete((m) => !m)} disabled={attention.length > 0}
                    style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: markedComplete ? C.forest : "#FFF", background: markedComplete ? C.forestBg : C.navy, border: `1px solid ${markedComplete ? C.forest : C.navy}`, borderRadius: 3, padding: "10px 16px", cursor: attention.length === 0 ? "pointer" : "not-allowed", opacity: attention.length === 0 ? 1 : 0.45 }}>
                    {attention.length > 0 ? "Resolve remaining items to complete" : markedComplete ? "✓ Marked complete · reopen" : "Mark review complete"}
                  </button>
                </div>
              </div>
              {[
                ["Still needs attention", attention, C.ochre],
                ["Already addressed", addressed, C.forest],
                ["Saved for later", savedLater, C.blue],
                ["Not applicable", notApplicable, C.faint],
              ].map(([label, items, tone]) =>
                items.length > 0 ? (
                  <div key={label} style={{ padding: "14px 20px", borderBottom: `1px solid ${C.line}` }}>
                    <Caps size={11} color={tone} weight={800}>{label} · {items.length}</Caps>
                    {items.map((it, i) => (
                      <p key={i} style={{ fontFamily: SANS, fontSize: 14, color: C.ink, margin: "9px 0 0", lineHeight: 1.55 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: C.navy, border: `1px solid ${C.lineStrong}`, padding: "1px 6px", marginRight: 8, borderRadius: 2 }}>{it.kind}</span>
                        {it.label}
                      </p>
                    ))}
                  </div>
                ) : null
              )}
            </div>
            <Notice>Execution happens in your existing systems, PowerDMS or otherwise. Govira ends where execution begins.</Notice>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   DASHBOARD — docket list, cite-first rows
   ============================================================ */
const DocketRow = ({ onClick, badge, title, summary, citation, authority, meta, reviewed, wstatus, delay }) => {
  const tone = badgeTone(badge);
  const [hover, setHover] = useState(false);
  return (
    <FadeIn delay={delay}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "190px 1fr 180px",
          gap: 24,
          width: "100%",
          textAlign: "left",
          background: hover ? C.surface : "transparent",
          border: "none",
          borderTop: `1px solid ${C.lineStrong}`,
          padding: "22px 12px",
          cursor: "pointer",
          alignItems: "start",
          opacity: reviewed ? 0.75 : 1,
          transition: "background .15s",
        }}
      >
        <div>
          <div style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 800, color: C.navy, lineHeight: 1.4 }}>{citation}</div>
          <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: C.faint, marginTop: 3 }}>{authority}</div>
          <div style={{ marginTop: 6 }}>
            <Caps color={tone} size={12} weight={800}>{badge}</Caps>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: SANS, fontSize: 18.5, fontWeight: 700, color: C.ink, letterSpacing: "-.01em" }}>{title}</div>
          <p style={{ fontFamily: SANS, fontSize: 15, color: C.mid, margin: "6px 0 0", lineHeight: 1.6, maxWidth: 520 }}>{summary}</p>
          <div style={{ marginTop: 8 }}>
            <Caps size={11.5} weight={600} style={{ textTransform: "none", letterSpacing: ".02em" }}>{meta}</Caps>
          </div>
        </div>
        <div style={{ justifySelf: "end", textAlign: "right" }}>
          {reviewed ? <Stamp>Reviewed · Mar 14</Stamp> : <Caps color={C.blue} size={12.5}>Open docket →</Caps>}
        </div>
      </button>
    </FadeIn>
  );
};

const SOURCE_FILTERS = ["All sources", "Laws", "Regulations", "Court decisions", "Standards"];

const SOURCE_DEFS = {
  "All sources": "Govira tracks different types of external changes that may require your department’s attention.",
  "Laws": "Requirements created by the legislature. A new or updated law may require changes to department policies, procedures, training, or practices.",
  "Regulations": "Rules issued by government agencies under legal authority. They may add specific requirements for how departments carry out or document their work.",
  "Court decisions": "Rulings that interpret laws and constitutional requirements. A decision may change how existing rules apply, even when no new law has been passed.",
  "Standards": "Requirements established by accreditation programs. They may require departments to maintain policies, follow certain practices, and provide proofs showing how the standard is met.",
};

const DOCKETS = [
  { key: "updated", filter: "Laws", badge: "UPDATED LAW", wstatus: "Needs review", citation: "HB 6004 §§ 5–6", authority: "CT General Assembly", title: "Crowd management policy requirements", summary: "HB 6004 updated the requirements for how departments handle crowd management. Several existing requirements were strengthened.", meta: "6 changes outlined · Phased effective dates" },
  { key: "newlaw", filter: "Laws", badge: "NEW LAW", wstatus: "New", citation: "HB 6004 §§ 33–35", authority: "CT General Assembly", title: "Office of the Inspector General", summary: "Establishes a new Office of the Inspector General to investigate use-of-force cases. Entirely new; may require new documentation and procedures.", meta: "4 new requirements" },
  { key: "standard", filter: "Standards", badge: "REVISED STANDARD", wstatus: "In progress", citation: "CALEA Std. 4.2.2", authority: "CALEA", title: "Use of force: reporting and administrative review", summary: "The revised standard expands what agencies must document after force is used and adds a required annual analysis of use-of-force reports.", meta: "3 changes outlined · Next assessment cycle" },
  { key: "reviewed", filter: "Laws", badge: "REVIEWED", reviewed: true, wstatus: "Completed", citation: "HB 6004 §§ 21–22", authority: "CT General Assembly", title: "Consent search limits", summary: "Prohibits consent searches of individuals and limits vehicle searches during traffic stops.", meta: "Reviewed by J. Mauboussin" },
];

const DashboardScreen = ({ onOpen }) => {
  const [filter, setFilter] = useState("All sources");
  const shown = DOCKETS.filter((d) => filter === "All sources" || d.filter === filter);
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "44px 32px 72px" }}>
      <FadeIn>
        <Caps color={C.navy}>Docket · Connecticut · Bethany Police Department</Caps>
        <h1 style={{ fontFamily: SANS, fontSize: 34, fontWeight: 800, color: C.navy, margin: "10px 0 8px", letterSpacing: "-.015em" }}>Updates</h1>
        <p style={{ fontFamily: SANS, fontSize: 16, color: C.mid, margin: "0 0 20px", lineHeight: 1.6, maxWidth: 600 }}>
          Every change that can obligate your agency, from any authority: statutes, accreditation standards,
          state regulations, and court decisions. Select a docket to work through it.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          {SOURCE_FILTERS.map((f) => {
            const on = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)} aria-pressed={on}
                style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, padding: "8px 16px", borderRadius: 3, cursor: "pointer", border: `1px solid ${on ? C.navy : C.lineStrong}`, background: on ? C.navy : C.surface, color: on ? "#FFF" : C.mid, transition: "all .15s" }}>
                {f}
              </button>
            );
          })}
        </div>
        <p style={{ fontFamily: SANS, fontSize: 14, color: C.mid, margin: "-8px 0 20px", lineHeight: 1.6, maxWidth: 640 }}>{SOURCE_DEFS[filter]}</p>
      </FadeIn>
      {shown.map((d, i) => (
        <DocketRow key={d.key} delay={60 + i * 70} onClick={() => d.reviewed ? null : onOpen(d.key)} badge={d.badge} reviewed={d.reviewed} wstatus={d.wstatus} citation={d.citation} authority={d.authority} title={d.title} summary={d.summary} meta={d.meta} />
      ))}
      {shown.length === 0 && (
        <FadeIn>
          <div style={{ borderTop: `1px solid ${C.lineStrong}`, borderBottom: `1px solid ${C.lineStrong}`, padding: "36px 12px", textAlign: "center" }}>
            <p style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.navy, margin: 0 }}>No case-law dockets yet for Connecticut.</p>
            <p style={{ fontFamily: SANS, fontSize: 13.5, color: C.mid, margin: "8px 0 0", lineHeight: 1.6 }}>
              When a court decision changes what your policies must say, it will appear here as a docket with the same
              policy, operational, and evidence guidance.
            </p>
          </div>
        </FadeIn>
      )}
      {shown.length > 0 && <div style={{ borderTop: `1px solid ${C.lineStrong}` }} />}
    </div>
  );
};

/* ============================================================
   HOME — lead with the artifact, not the adjectives
   ============================================================ */
const HeroDocket = () => (
  <div style={{ background: C.surface, border: `1px solid ${C.lineStrong}`, borderTop: `4px solid ${C.ochre}`, padding: "18px 20px", boxShadow: "0 1px 0 rgba(27,42,68,.06)", position: "relative" }}>
    <span style={{ position: "absolute", top: -11, right: 14, background: C.navy, color: "#FFF", fontFamily: SANS, fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", padding: "3px 9px" }}>
      Example docket
    </span>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 18 }}>
        <div>
          <Caps size={11}>Status</Caps>
          <div style={{ marginTop: 3 }}><Caps color={C.ochre} size={12} weight={800}>Updated law</Caps></div>
        </div>
        <div>
          <Caps size={11}>Citation</Caps>
          <div style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 700, color: C.navy, marginTop: 3 }}>CT HB 6004, §§ 5–6</div>
        </div>
        <div>
          <Caps size={11}>Effective</Caps>
          <div style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 700, color: C.brick, marginTop: 3 }}>Phased</div>
        </div>
      </div>
      <Caps color={C.blue} size={11.5}>Open docket →</Caps>
    </div>
    <div style={{ fontFamily: SANS, fontSize: 18, fontWeight: 800, color: C.navy, margin: "12px 0 10px", letterSpacing: "-.01em" }}>
      Crowd management policy requirements
    </div>
    <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
      <Caps size={11} color={C.navy}>Legislative change</Caps>
      <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.75, color: C.ink, margin: "8px 0 0" }}>
        Departments manage crowd incidents using <Removed>general operational judgment and local standards</Removed>{" "}
        <Added>a uniform statewide policy addressing force expectations, training, documentation, and individual rights</Added>.
      </p>
    </div>
    <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 12, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <Caps size={11}>Review 4/6 · Actions 3/6 · Proofs 5/9</Caps>
      <Stamp tone={C.ochre}>In review</Stamp>
    </div>
  </div>
);

const HomeScreen = ({ onGetStarted, onViewExample }) => (
  <div style={{ background: C.bg }}>
    {/* Hero: flat, artifact-led */}
    <div style={{ borderBottom: `1px solid ${C.lineStrong}` }}>
      <div className="gv-hero" style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 32px 56px", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 56, alignItems: "center" }}>
        <FadeIn>
          <div>
            <Caps color={C.navy}>One queue for every change that obligates your agency</Caps>
            <h1 style={{ fontFamily: SANS, fontSize: "clamp(34px,4.5vw,48px)", fontWeight: 800, color: C.navy, lineHeight: 1.12, letterSpacing: "-.02em", margin: "14px 0 16px" }}>
              When requirements change, know what to review, what to do, and what proofs to plan.
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 17, color: C.mid, lineHeight: 1.7, margin: "0 0 22px", maxWidth: 480 }}>
              A statute, a revised standard, a regulation, a ruling: each arrives on its own schedule. Govira turns
              external requirement changes into an internal action plan, then you complete the work in the systems
              you already use.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.lineStrong}`, background: C.surface, borderRadius: 3 }}>
                <span style={{ padding: "0 0 0 12px" }}>
                  <Caps size={11.5}>State</Caps>
                </span>
                <select
                  aria-label="Select your state"
                  defaultValue="CT"
                  style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.navy, background: "transparent", border: "none", padding: "12px 10px 12px 8px", cursor: "pointer" }}
                >
                  <option value="CT">Connecticut</option>
                  <option value="NY" disabled>New York (soon)</option>
                  <option value="NJ" disabled>New Jersey (soon)</option>
                  <option value="TX" disabled>Texas (soon)</option>
                </select>
              </div>
              <Btn onClick={onGetStarted}>View Connecticut docket</Btn>
              <Btn variant="ghost" onClick={onViewExample}>See an example docket</Btn>
            </div>
            <p style={{ fontFamily: SANS, fontSize: 13.5, color: C.faint, margin: "14px 0 0", lineHeight: 1.5 }}>
              One special-session bill, HB 6004, produced six items to review, six department actions, and proofs
              to plan, with phased effective dates. Three changes can still mean thirty policies touched.
            </p>
            <div style={{ marginTop: 22, borderLeft: `3px solid ${C.lineStrong}`, padding: "8px 14px" }}>
              <p style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.navy, margin: 0, lineHeight: 1.65 }}>
                Govira does not determine compliance, store evidence, or replace legal counsel. Departments stay in
                control of every update.
              </p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <HeroDocket />
        </FadeIn>
      </div>
    </div>

    {/* The funnel: from the state's raw feed to your docket */}
    <div style={{ borderBottom: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 32px 44px" }}>
        <FadeIn>
          <Caps color={C.navy}>Why this is hard by hand</Caps>
          <p style={{ fontFamily: SANS, fontSize: 16, color: C.mid, margin: "10px 0 24px", lineHeight: 1.65, maxWidth: 640 }}>
            Connecticut publishes every act on its official Acts Effective lists, alongside dormancy fees, hospice
            rules, and everything else the session produced. Someone has to read the whole list to find your part of it.
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="gv-funnel" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 18, alignItems: "stretch", borderTop: `2px solid ${C.navy}`, paddingTop: 20 }}>
            {[
              ["312", "Public acts in one session", "Everything the legislature passed, on the state's own effective-date lists."],
              ["19", "Relevant to law enforcement", "Govira reads the full list and keeps what may obligate an agency."],
              ["3", "May apply to your agency", "Filtered by agency type and accreditation program, with you as the final check. These become dockets."],
            ].map(([num, label, desc], i) => (
              <React.Fragment key={num}>
                {i > 0 && <div style={{ display: "flex", alignItems: "center", color: C.lineStrong, fontSize: 20 }} aria-hidden>→</div>}
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 800, color: i === 2 ? C.navy : C.mid, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{num}</div>
                  <div style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 700, color: C.ink, margin: "8px 0 5px" }}>{label}</div>
                  <p style={{ fontFamily: SANS, fontSize: 13, color: C.mid, margin: 0, lineHeight: 1.55 }}>{desc}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
          <p style={{ fontFamily: SANS, fontSize: 11.5, color: C.faint, margin: "16px 0 0" }}>
            Counts illustrative of a typical Connecticut session. Effective dates run January 1, July 1, October 1, and from passage.
          </p>
        </FadeIn>
      </div>
    </div>

    {/* How it works: numbered ledger, no cards, no emoji */}
    <div style={{ background: C.surface, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 32px" }}>
        <FadeIn>
          <Caps color={C.navy}>How a docket works</Caps>
          <h2 style={{ fontFamily: SANS, fontSize: 30, fontWeight: 800, color: C.navy, margin: "10px 0 24px", letterSpacing: "-.015em" }}>
            From legal update to review plan.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ borderTop: `2px solid ${C.navy}` }}>
            {[
              ["1", "Understand the change", "A statute, a revised standard, a regulation, or a ruling: what changed, when it takes effect, with the exact source one click away."],
              ["2", "See what to review", "The department materials that may warrant review: which document, which sections, and why."],
              ["3", "See what to do", "The practical steps beyond documents: training, briefings, forms, assignments."],
              ["4", "Plan the proofs", "Records departments commonly use to demonstrate implementation. Proofs to consider, not verdicts."],
              ["5", "The docket is the plan", "Work through it in place. A summary of your decisions builds automatically, ready for your existing systems."],
            ].map(([n, title, desc], i) => (
              <div key={n} style={{ display: "grid", gridTemplateColumns: "60px 290px 1fr", gap: 20, padding: "18px 4px", borderBottom: `1px solid ${C.line}`, alignItems: "baseline" }}>
                <span style={{ fontFamily: SANS, fontSize: 24, fontWeight: 800, color: C.navy, fontVariantNumeric: "tabular-nums" }}>{n}.</span>
                <span style={{ fontFamily: SANS, fontSize: 16.5, fontWeight: 700, color: C.ink }}>{title}</span>
                <span style={{ fontFamily: SANS, fontSize: 15, color: C.mid, lineHeight: 1.6 }}>{desc}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: SANS, fontSize: 14, color: C.mid, margin: "18px 0 0", lineHeight: 1.65, maxWidth: 640 }}>
            <strong style={{ color: C.navy }}>Where it ends:</strong> you leave with an action plan and execute it in
            PowerDMS or wherever the work already happens. Govira ends where execution begins.
          </p>
        </FadeIn>
      </div>
    </div>

    {/* Value: specificity over slogans */}
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }} className="gv-two">
      <FadeIn>
        <h2 style={{ fontFamily: SANS, fontSize: 30, fontWeight: 800, color: C.navy, lineHeight: 1.25, letterSpacing: "-.015em", margin: 0 }}>
          Built for the person who answers to the assessor.
        </h2>
        <p style={{ fontFamily: SANS, fontSize: 15.5, color: C.mid, lineHeight: 1.7, margin: "14px 0 0" }}>
          When requirements change, accreditation managers are the ones who identify what may need review, brief
          command staff, coordinate next steps, and prepare for future assessment. Govira organizes that work;
          it does not take it over.
        </p>
      </FadeIn>
      <FadeIn delay={120}>
        <div style={{ borderTop: `2px solid ${C.navy}` }}>
          {[
            "Designed for accreditation managers, not general counsel",
            "Supports departments managing POSTC and CALEA requirements",
            "Works alongside PowerDMS, SharePoint, or wherever your policies live",
            "No integration or technical setup required",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "13px 2px", borderBottom: `1px solid ${C.line}` }}>
              <span style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 800, color: C.forest }}>✓</span>
              <span style={{ fontFamily: SANS, fontSize: 15.5, color: C.ink }}>{t}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>

    {/* CTA: flat navy band */}
    <div style={{ background: C.navy }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontFamily: SANS, fontSize: 26, fontWeight: 800, color: "#FFF", margin: 0, letterSpacing: "-.015em" }}>Ready to review what changed?</h2>
          <p style={{ fontFamily: SANS, fontSize: 15, color: "rgba(255,255,255,.72)", margin: "8px 0 0", lineHeight: 1.6 }}>
            Open the Connecticut docket and work through it section by section.
          </p>
        </div>
        <button onClick={onGetStarted} style={{ fontFamily: SANS, fontSize: 15.5, fontWeight: 700, padding: "14px 28px", borderRadius: 3, border: "none", background: "#FFF", color: C.navy, cursor: "pointer" }}>
          View legal updates →
        </button>
      </div>
    </div>

    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "26px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ShieldLogo size={16} />
        <Caps color={C.navy} size={12.5} weight={800}>Govira</Caps>
        <Caps size={11.5} weight={600} style={{ textTransform: "none", letterSpacing: ".02em" }}>Change dockets for accredited public safety agencies</Caps>
      </div>
      <Caps size={11.5} weight={600} style={{ textTransform: "none", letterSpacing: ".02em" }}>
        Departments stay in control of every update. Govira does not replace legal counsel.
      </Caps>
    </div>
  </div>
);

/* ============================================================
   DATA
   ============================================================ */
const crowdData = {
  badge: "UPDATED LAW",
  authority: "Connecticut General Assembly · Statute",
  sourceName: "OLR Bill Analysis, 2020",
  citation: "Connecticut HB 6004, §§ 5–6",
  effective: "Phased · Oct 2020 – Jan 2021",
  appliesTo: "Municipal police agencies",
  title: "Crowd management policy requirements",
  summary: "HB 6004 strengthened how departments must handle crowd management. Work through what may need review, what to do, and what proofs to plan.",
  interpretation:
    "HB 6004 now requires the crowd management policy to address permissible and impermissible uses of force, the training officers must complete, documentation after physical confrontations, a definition of “crowd,” and protections for individual rights during demonstrations.",
  redline: {
    cite: "HB 6004 § 5",
    prior: (
      <>
        No statewide crowd management policy existed. Departments were expected to manage crowd incidents using{" "}
        <Removed>general operational judgment and local department standards</Removed>. There were no specific requirements
        around force guidance, training, or documentation for crowd incidents.
      </>
    ),
    amended: (
      <>
        POST must adopt <Added>a uniform statewide crowd management policy</Added>. Departments must align with this policy,
        which must address <Added>force expectations, training, documentation, and individual rights protections</Added>.
      </>
    ),
  },
  actions: [
    { requirement: "Address permissible and impermissible uses of force during crowd management", section: "§ 5(2)", tag: "Force guidance", dms: "PowerDMS · Tier I · Ch. 14 Use-of-Force",
      where: "Crowd Management / Civil Disturbance policy; Use of Force policy",
      review: "Sections addressing force options during crowd incidents, including which options are permitted and prohibited",
      why: "§ 5(2) now requires the policy to address permissible and impermissible force during crowd management.",
      action: "Confirm officers and supervisors know which force options are permitted and prohibited during crowd incidents, and brief them before planned events.", cat: "Briefing",
      proofs: [{ type: "Supervisor review", example: "Completed supervisor review from a crowd incident" }, { type: "Roster", example: "Pre-event briefing roster showing force guidance was covered" }] },
    { requirement: "Specify the type and amount of crowd management training each officer must undergo", section: "§ 5(2)", tag: "Training", dms: "PowerDMS · Tier I · Ch. 13 Training",
      where: "Training standards and schedules",
      review: "Whether the type, amount, and frequency of crowd management training are specified",
      why: "§ 5(2) requires the policy to specify the training each officer must undergo.",
      action: "Schedule the required crowd management training and track which officers have completed it.", cat: "Training",
      proofs: [{ type: "Training record", example: "Sign-in sheet or completion report for crowd management training" }] },
    { requirement: "Require documentation after any physical confrontation between an officer and a civilian during a crowd incident", section: "§ 5(3)", tag: "Documentation", dms: "PowerDMS · Tier I · Ch. 10 Records",
      where: "Incident documentation procedures",
      review: "When post-confrontation reports are required, who completes them, and who reviews them",
      why: "§ 5(3) requires documentation after any physical confrontation during a crowd management incident.",
      action: "Confirm supervisors know when post-incident documentation is required and who is responsible for reviewing it.", cat: "Process",
      proofs: [{ type: "Log / export", example: "Completed post-incident report from a crowd incident, with supervisor sign-off" }] },
    { requirement: "Define “crowd” reflecting factors like size, location, purpose, and time of day", section: "§ 5(1)", tag: "Definitions", dms: "PowerDMS · Tier I · Ch. 7 Operations",
      where: "Crowd Management / Civil Disturbance policy",
      review: "Whether “crowd” is defined and whether the definition reflects size, location, purpose, and time of day",
      why: "§ 5(1) requires a definition of crowd reflecting those factors.",
      action: "Make sure officers who decide when to apply the policy understand the working definition of a crowd.", cat: "Briefing",
      proofs: [{ type: "Roster", example: "Roll-call briefing record covering the crowd definition" }] },
    { requirement: "Establish guidelines that protect individual rights and preserve the peace during demonstrations", section: "§ 5(1)", tag: "Individual rights", dms: "PowerDMS · Tier I · Ch. 7 Operations",
      where: "Crowd Management / Civil Disturbance policy",
      review: "Guidelines protecting lawful assembly and free speech during demonstrations and civil disturbances",
      why: "§ 5(1) requires guidelines that protect individual rights while preserving the peace.",
      action: "Brief officers on protecting assembly and speech rights so the policy is applied consistently during demonstrations.", cat: "Briefing",
      proofs: [{ type: "Photo", example: "Event photos showing posted assembly-area notices at a demonstration" }] },
    { requirement: "Include the crowd management policy in all basic and review training programs", section: "§ 5", tag: "Training programs", dms: "PowerDMS · Tier I · Ch. 13 Training",
      where: "Basic and in-service training curricula",
      review: "Whether the crowd management policy appears in both new-officer and in-service programs",
      why: "§ 5 requires the policy to be incorporated into all basic and review training programs.",
      action: "Confirm the crowd management policy is built into both new-officer and in-service training curricula.", cat: "Training",
      proofs: [{ type: "Training record", example: "Sign-in sheets showing the policy in basic and review training" }] },
  ],
  source: {
    cite: "HB 6004, § 5 (Connecticut General Assembly)",
    quote:
      "“The policy must also establish guidelines for managing crowds in a manner that protects individual rights and preserves the peace during demonstrations and civil disturbances, addresses permissible and impermissible uses of force by a police officer and the type and amount of crowd management training that each police officer must undergo, and sets forth required documentation after any physical confrontation between a police officer and a civilian during a crowd management incident.”",
    attribution: "Source: OLR Bill Analysis, HB 6004, Emergency Certification, 2020",
  },
};

const oigData = {
  badge: "NEW LAW",
  authority: "Connecticut General Assembly · Statute",
  sourceName: "OLR Bill Analysis, 2020",
  citation: "Connecticut HB 6004, §§ 33–35",
  effective: "Phased · 2020 – 2021",
  appliesTo: "All CT law enforcement",
  title: "Office of the Inspector General",
  summary: "HB 6004 created a new Office of the Inspector General. Here is what your department should be aware of and address.",
  interpretation:
    "HB 6004 created an independent Office of the Inspector General within the Division of Criminal Justice. It can investigate peace officers’ use of force, issue subpoenas, and recommend certification actions to POST. Most of this describes what the new office does; your department’s work is making sure referral, reporting, and notification procedures account for it.",
  redline: {
    cite: "HB 6004 §§ 33–35",
    prior: <>No equivalent office or provision existed. Use-of-force investigations followed existing state{"’"}s attorney procedures.</>,
    amended: (
      <>
        <Added>An independent Office of the Inspector General is established within the Division of Criminal Justice</Added> to
        investigate peace officers{"’"} use of force, <Added>issue subpoenas to municipalities, law enforcement units, and current
        or former employees</Added>, and <Added>make recommendations to POST concerning officer certification</Added>.
      </>
    ),
  },
  actions: [
    { requirement: "The Inspector General will investigate all use-of-force incidents involving peace officers", section: "§ 34", tag: "Use of force", dms: "General awareness",
      why: "This describes the OIG’s role; no department document change is identified." },
    { requirement: "Chiefs of police may refer use-of-force incidents to the Inspector General and must accept referrals", section: "§ 33", tag: "Reporting", dms: "PowerDMS · Tier I · Ch. 14 Use-of-Force",
      where: "Use of Force reporting procedures",
      review: "How incidents are referred to the OIG and how referrals from the OIG are received and handled",
      why: "§ 33 authorizes referrals and requires cooperation with the OIG.",
      action: "Make sure whoever handles use-of-force reporting knows how and when to refer incidents to the OIG.", cat: "Process",
      proofs: [{ type: "Log / export", example: "Record of a completed OIG referral, with dates" }] },
    { requirement: "The Inspector General can issue subpoenas to municipalities, law enforcement units, and current or former employees", section: "§ 33", tag: "Compliance", dms: "PowerDMS · Tier I · Ch. 5 Management",
      where: "Internal affairs and investigation procedures",
      review: "Who receives and responds to OIG subpoenas so requests are not missed",
      why: "§ 33 grants subpoena authority over the municipality, the unit, and employees.",
      action: "Identify who in the department receives and responds to OIG subpoenas.", cat: "Assignment",
      proofs: [{ type: "Email", example: "Dated assignment memo naming the OIG point of contact" }] },
    { requirement: "Inform officers about the Inspector General’s role and authority", section: "§ 33", tag: "Notification", dms: "PowerDMS · Tier I · Ch. 5 Management",
      where: "Officer notification procedures",
      review: "How and when officers are informed of the OIG’s role and authority",
      why: "§ 33 establishes authority officers need to understand in practice.",
      action: "Plan how officers will be briefed on the OIG’s role, such as roll call or in-service training.", cat: "Communication",
      proofs: [{ type: "Screenshot", example: "Posted notice or intranet bulletin on the OIG’s role" }, { type: "Email", example: "Dated communication sent to officers" }] },
    { requirement: "The Inspector General will make recommendations to POST on officer certification actions", section: "§ 33", tag: "Certification", dms: "General awareness",
      why: "This describes the OIG’s authority; no department document change is identified." },
  ],
  source: {
    cite: "HB 6004, §§ 33–35 (Connecticut General Assembly)",
    quote:
      "“The bill establishes the Office of the Inspector General as an independent office within the Division of Criminal Justice. The bill requires OIG to investigate peace officers’ use of force, prosecute any case in which the inspector general determines the use of force was not justified, and make recommendations to POST concerning censure and suspension, renewal, cancellation, or revocation of a peace officer’s certification.”",
    attribution: "Source: OLR Bill Analysis, HB 6004, Emergency Certification, 2020",
  },
};

const caleaData = {
  badge: "REVISED STANDARD",
  authority: "CALEA · Accreditation standard",
  sourceName: "CALEA Standards Manual (rev.)",
  citation: "CALEA Standard 4.2.2",
  recordLinks: ["Standards manual", "Revision notice"],
  effective: "Next assessment cycle",
  appliesTo: "CALEA-accredited agencies",
  title: "Use of force: reporting and administrative review",
  summary: "CALEA revised the standard governing use-of-force reporting. No law changed; the accreditation requirement did, and your files must reflect it by your next on-site.",
  interpretation:
    "The revised standard expands what a written directive must require after force is used: de-escalation documentation, supervisor administrative review within a defined timeframe, and a documented annual analysis of use-of-force reports. Agencies that met the prior standard may still fall short of the revised one.",
  redline: {
    cite: "Std. 4.2.2 (rev.)",
    priorLabel: "Prior standard",
    amendedLabel: "As revised",
    changeLabel: "What changed in the standard",
    prior: (
      <>
        A written directive requires officers to submit a report whenever force is used. Reports are{" "}
        <Removed>reviewed by a supervisor</Removed>.
      </>
    ),
    amended: (
      <>
        A written directive requires officers to submit a report whenever force is used, including{" "}
        <Added>documentation of de-escalation attempts</Added>. Reports receive{" "}
        <Added>administrative review by a supervisor within a defined timeframe</Added>, and the agency conducts a{" "}
        <Added>documented annual analysis of all use-of-force reports</Added>, retained for assessment.
      </>
    ),
  },
  actions: [
    { requirement: "Use-of-force reports must document de-escalation attempts", section: "Std. 4.2.2(a)", tag: "Reporting", dms: "CALEA Standards Manual · Std. 4.2.2",
      where: "Use of Force policy and report forms",
      review: "Whether reports must document de-escalation attempts, or why de-escalation was not feasible",
      why: "The revised standard requires de-escalation documentation in every force report.",
      action: "Update the report form or RMS fields to capture de-escalation documentation and brief officers on the new field.", cat: "Forms",
      proofs: [{ type: "Log / export", example: "Completed reports demonstrating the de-escalation field in use" }] },
    { requirement: "Supervisor administrative review must occur within a defined timeframe", section: "Std. 4.2.2(b)", tag: "Review timeline", dms: "CALEA Standards Manual · Std. 4.2.2",
      where: "Use of Force policy; supervisor duties",
      review: "Whether a review timeframe is defined and achievable with current staffing",
      why: "The revised standard requires administrative review within an agency-defined timeframe.",
      action: "Decide the review window with command staff and confirm supervisors can meet it.", cat: "Process",
      proofs: [{ type: "Supervisor review", example: "Completed reviews showing dates within the defined window" }] },
    { requirement: "A documented annual analysis of use-of-force reports must be conducted and retained", section: "Std. 4.2.2(c)", tag: "Annual analysis", dms: "CALEA Standards Manual · Std. 4.2.2",
      where: "Administrative reporting procedures",
      review: "Whether an annual analysis is conducted, documented, and retained for assessment",
      why: "The revised standard requires a documented annual analysis, retained for review.",
      action: "Assign ownership of the annual analysis and calendar it so it exists before the assessment.", cat: "Assignment",
      proofs: [{ type: "Report", example: "The completed annual use-of-force analysis, dated and retained" }, { type: "Meeting", example: "Command staff review of the analysis findings" }] },
  ],
  source: {
    cite: "CALEA Standards Manual, Standard 4.2.2 (revised)",
    quote: "“A written directive requires a report whenever force is used, documentation of de-escalation efforts, administrative review within an agency-defined timeframe, and a documented annual analysis of use-of-force reports.”",
    attribution: "Paraphrased for demonstration. Consult the current CALEA Standards Manual for controlling language.",
  },
};

/* ============================================================
   APP
   ============================================================ */
export default function GoviraRedesign() {
  const [screen, setScreen] = useState("home");
  const goDashboard = () => setScreen("dashboard");
  useEffect(() => { window.scrollTo({ top: 0 }); }, [screen]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: SANS, color: C.ink, WebkitFontSmoothing: "antialiased" }}>
      <link href={FONTS} rel="stylesheet" />
      <style>{`
        button:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 2px; }
        ::selection { background: rgba(31,78,156,.14); }
        @media (max-width: 880px) {
          .gv-funnel { grid-template-columns: 1fr !important; }
          .gv-funnel > div[aria-hidden] { display: none !important; }
          .gv-hero { grid-template-columns: 1fr !important; gap: 32px !important; padding-top: 44px !important; }
          .gv-two { grid-template-columns: 1fr !important; gap: 28px !important; }
          .gv-detail { grid-template-columns: 1fr !important; gap: 0 !important; }
          .gv-railwrap { position: static !important; margin-bottom: 20px; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>
      <Header onHome={() => setScreen("home")} />
      {screen === "home" && <HomeScreen onGetStarted={goDashboard} onViewExample={() => setScreen("updated")} />}
      {screen === "dashboard" && <DashboardScreen onOpen={(key) => setScreen(key)} />}
      {screen === "updated" && <LawDetail data={crowdData} onBack={goDashboard} />}
      {screen === "newlaw" && <LawDetail data={oigData} onBack={goDashboard} />}
      {screen === "standard" && <LawDetail data={caleaData} onBack={goDashboard} />}
    </div>
  );
}
