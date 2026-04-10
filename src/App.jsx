import { useState, useEffect, useRef } from "react";

const NAVY = "#0A1628";
const NAVY_DEEP = "#060F1C";
const NAVY_CARD = "#0E1A2E";
const NAVY_BORDER = "#162036";
const SILVER = "#B4BCC8";
const SILVER_LIGHT = "#D6DCE4";
const TEXT = "#E4E8ED";
const TEXT_MUTED = "#7A8494";
const ACCENT = "#8FA3BA";
const PAGES = ["Home", "About", "Services", "Track Record", "Contact"];

const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
  about: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1920&q=80",
  services: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80",
  track: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1920&q=80",
  contact: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80",
};

const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@200;300;400;500&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const styleEl = document.createElement("style");
styleEl.textContent = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: ${NAVY_DEEP}; overflow-x: hidden; }
  ::selection { background: ${SILVER}; color: ${NAVY_DEEP}; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fadeInSlow { from { opacity: 0; } to { opacity: 0.12; } }
  @keyframes lineGrow { from { width: 0; } to { width: 56px; } }
  @keyframes panSlow { 0% { transform: scale(1.08) translate(0,0); } 100% { transform: scale(1.08) translate(-1%,-1%); } }
  .fu { animation: fadeUp 0.8s ease forwards; opacity: 0; }
  .fi { animation: fadeIn 0.6s ease forwards; opacity: 0; }
  .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
  .d4{animation-delay:.4s}.d5{animation-delay:.5s}.d6{animation-delay:.6s}
  .photo-bg { position: absolute; inset: 0; background-size: cover; background-position: center;
    animation: panSlow 30s ease-in-out infinite alternate; }
  .grain { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat; background-size: 200px; }
`;
document.head.appendChild(styleEl);

const s = (fam, sz, wt, col, ls, tt) => ({
  fontFamily: fam === "s" ? "'EB Garamond', serif" : "'DM Sans', sans-serif",
  fontSize: sz, fontWeight: wt, color: col, letterSpacing: ls || 0, textTransform: tt || "none",
});

function PhotoSection({ src, overlay = 0.82, children, style: sx }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...sx }}>
      <div className="photo-bg" style={{ backgroundImage: `url(${src})` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(6,15,28,${overlay}) 0%, rgba(6,15,28,${Math.min(overlay + 0.1, 0.96)}) 100%)` }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function Line({ style }) {
  return <div style={{ height: 1, background: `linear-gradient(90deg, ${SILVER}, transparent)`, animation: "lineGrow 1s ease forwards", width: 56, opacity: 0.5, ...style }} />;
}

function Btn({ children, primary, onClick, style: bsx }) {
  const [h, setH] = useState(false);
  const base = primary
    ? { background: h ? SILVER_LIGHT : "transparent", border: `1px solid ${SILVER}`, color: h ? NAVY_DEEP : SILVER }
    : { background: "transparent", border: `1px solid ${h ? TEXT_MUTED : NAVY_BORDER}`, color: h ? TEXT : TEXT_MUTED };
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...base, padding: "13px 32px", ...s("b", 11, 400, null, 2.5, "uppercase"), cursor: "pointer", transition: "all 0.3s", backdropFilter: "blur(4px)", ...bsx }}>
      {children}
    </button>
  );
}

function Divider() {
  return <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${NAVY_BORDER}, transparent)`, margin: "0 80px" }} />;
}

function Nav({ page, setPage }) {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 48px", height: 70,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: sc ? "rgba(6,15,28,0.92)" : "transparent",
      backdropFilter: sc ? "blur(24px) saturate(1.2)" : "none",
      borderBottom: `1px solid ${sc ? NAVY_BORDER : "transparent"}`,
      transition: "all 0.4s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={() => setPage("Home")}>
        <div style={{ width: 34, height: 34, border: `1px solid ${SILVER}`, display: "flex", alignItems: "center", justifyContent: "center", ...s("s", 16, 500, SILVER, 1), backdropFilter: "blur(8px)" }}>E</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ ...s("b", 11, 500, TEXT, 3.5, "uppercase") }}>Evara</span>
          <span style={{ ...s("b", 8.5, 300, TEXT_MUTED, 2.5, "uppercase") }}>Advisory</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {PAGES.map(p => (
          <button key={p} onClick={() => setPage(p)} style={{
            background: "none", border: "none", cursor: "pointer",
            ...s("b", 10.5, 400, page === p ? SILVER_LIGHT : TEXT_MUTED, 2.5, "uppercase"),
            transition: "color 0.3s", position: "relative", padding: "4px 0",
          }}>
            {p}
            {page === p && <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 1, background: SILVER, opacity: 0.6 }} />}
          </button>
        ))}
      </div>
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <PhotoSection src={PHOTOS.hero} overlay={0.78} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ padding: "0 80px", position: "relative", maxWidth: 780 }}>
        <p className="fu d1" style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 28 }}>
          Advisory · Modelling · Capital Strategy
        </p>
        <h1 className="fu d2" style={{ ...s("s", 76, 400, TEXT), lineHeight: 1.04, marginBottom: 8 }}>
          Evara<br />Advisory
        </h1>
        <p className="fu d2" style={{ ...s("b", 13, 300, TEXT_MUTED, 0.5), marginTop: 6, marginBottom: 10 }}>
          Founded by Amar Kashyap
        </p>
        <Line style={{ marginBottom: 32 }} />
        <p className="fu d3" style={{ ...s("b", 17, 300, SILVER), lineHeight: 1.8, maxWidth: 520, marginBottom: 18 }}>
          Commercial advisory and financial modelling for businesses at every stage — from founders preparing for their first raise to established groups navigating complex growth.
        </p>
        <p className="fu d3" style={{ ...s("s", 15, 400, TEXT_MUTED), lineHeight: 1.75, maxWidth: 540, marginBottom: 48, fontStyle: "italic", opacity: 0.55 }}>
          Background in institutional banking, venture capital, and private equity.
        </p>
        <div className="fu d4" style={{ display: "flex", gap: 14 }}>
          <Btn primary onClick={() => setPage("Contact")}>Get in Touch</Btn>
          <Btn onClick={() => setPage("Services")}>View Services</Btn>
        </div>
      </div>
      <div className="fu d5" style={{ position: "absolute", bottom: 56, left: 80, right: 80, display: "flex", borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: 32, zIndex: 1 }}>
        {[
          ["7+", "Years in Private Markets"],
          ["Early Stage → Enterprise", "Across the Business Lifecycle"],
          ["Modelling · Strategy · Capital", "Core Competencies"],
          ["Sydney", "Australia"],
        ].map(([big, small], i) => (
          <div key={i} style={{ flex: 1, borderRight: i < 3 ? `1px solid rgba(255,255,255,0.06)` : "none", paddingRight: 24 }}>
            <div style={{ ...s("s", 24, 400, SILVER_LIGHT), marginBottom: 6 }}>{big}</div>
            <div style={{ ...s("b", 10, 300, TEXT_MUTED, 1.5, "uppercase") }}>{small}</div>
          </div>
        ))}
      </div>
    </PhotoSection>
  );
}

function AboutPage() {
  return (
    <>
      <PhotoSection src={PHOTOS.about} overlay={0.88} style={{ padding: "140px 80px 80px" }}>
        <p className="fu d1" style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>About</p>
        <h2 className="fu d2" style={{ ...s("s", 52, 400, TEXT), marginBottom: 6 }}>The Principal</h2>
        <p className="fu d2" style={{ ...s("s", 22, 400, SILVER), lineHeight: 1.65, maxWidth: 600, marginTop: 20, fontStyle: "italic" }}>
          I've spent my career on both sides of the table — working with institutions deploying capital and founders raising it.
        </p>
      </PhotoSection>
      <div style={{ padding: "64px 80px 80px", background: NAVY_DEEP }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 72 }}>
          <div className="fu d3">
            <p style={{ ...s("b", 15, 300, TEXT_MUTED), lineHeight: 1.85, marginBottom: 22 }}>
              My career started in one of Australia's largest institutional banks, working across M&A advisory and leveraged finance — structuring debt facilities for private equity sponsors and advising on complex transactions. I transitioned into the bank's venture investment arm, gaining direct exposure to high-growth technology companies from Series A onwards across the fintech ecosystem.
            </p>
            <p style={{ ...s("b", 15, 300, TEXT_MUTED), lineHeight: 1.85, marginBottom: 22 }}>
              From there I joined a major ASX-listed technology platform, evaluating proptech venture investments and supporting corporate development strategy. I then became the founding hire at an early-stage venture fund — sole-leading due diligence, managing Investment Committee approvals, and driving fund capital raising and operations.
            </p>
            <p style={{ ...s("b", 15, 300, TEXT_MUTED), lineHeight: 1.85, marginBottom: 22 }}>
              Since launching Evara Advisory, I've partnered with family offices on fund structuring and institutional-grade modelling, worked with early-stage founders on investor readiness, and helped established SMBs build the commercial tools and frameworks they need to scale. I also leverage advanced AI tooling to deliver work at a speed and depth that traditional advisory firms can't match.
            </p>
            <p style={{ ...s("b", 15, 300, TEXT_MUTED), lineHeight: 1.85 }}>
              I'm selective about engagements because depth matters more than volume. Every client gets the same rigour I'd apply to a transaction on an institutional desk.
            </p>
          </div>
          <div className="fu d4" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 32 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Education</p>
              <p style={{ ...s("s", 19, 500, TEXT), marginBottom: 3 }}>University of New South Wales</p>
              <p style={{ ...s("b", 13, 300, TEXT_MUTED) }}>Bachelor of Commerce — Finance & Information Systems</p>
            </div>
            <div style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 32 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Career Heritage</p>
              {[
                "Major Australian Bank — M&A Advisory & Leveraged Finance",
                "Bank Venture Arm — Growth-Stage Technology Investments",
                "ASX-Listed Technology Platform — Corp Dev & Proptech VC",
                "Early-Stage Venture Fund — Founding Hire & Fund Operations",
                "Family Office — Fund Structuring & Investment Strategy",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < 4 ? 12 : 0 }}>
                  <div style={{ width: 3, height: 3, borderRadius: "50%", background: ACCENT, marginTop: 8, flexShrink: 0 }} />
                  <p style={{ ...s("b", 12.5, 300, TEXT_MUTED), lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 32 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Who I Work With</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Family Offices", "PE-Backed Platforms", "Seed & Series A Founders", "Franchise Groups", "SMB Operators", "Established Businesses"].map(item => (
                  <span key={item} style={{ ...s("b", 10.5, 300, TEXT_MUTED, 0.5), padding: "6px 12px", border: `1px solid ${NAVY_BORDER}` }}>{item}</span>
                ))}
              </div>
            </div>
            <div style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 32 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Sector Exposure</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Fintech", "Proptech", "Health & Wellness", "Sports Technology", "Franchising", "Legaltech", "Building & Construction", "Beauty & Retail"].map(item => (
                  <span key={item} style={{ ...s("b", 10.5, 300, TEXT_MUTED, 0.5), padding: "6px 12px", border: `1px solid ${NAVY_BORDER}` }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ServicesPage() {
  const sections = [
    {
      heading: "For Founders & Early-Stage Ventures",
      sub: "Getting investor-ready with the right foundations.",
      items: [
        { n: "01", t: "Financial Modelling", d: "Investor-grade Excel models — unit economics, revenue forecasts, scenario analysis, and cash runway planning. Built to hold up under due diligence and answer the questions investors will actually ask." },
        { n: "02", t: "Pitch Decks & Investor Materials", d: "Compelling, structured decks and supporting documents that communicate your opportunity clearly. Built from scratch around your story — not recycled templates." },
        { n: "03", t: "Capital Raising Preparation", d: "End-to-end fundraising readiness — data room build-out, model stress-testing, investor targeting, narrative refinement, and process management." },
        { n: "04", t: "Investor Readiness Coaching", d: "Sharpen your narrative, pressure-test your assumptions, and rehearse for tough questions. Candid feedback from someone who has sat on both sides of the table." },
      ]
    },
    {
      heading: "For Established Businesses & Private Capital",
      sub: "Institutional rigour applied to complex mandates.",
      items: [
        { n: "05", t: "Fund Structuring & Modelling", d: "End-to-end fund architecture — vehicle design, capital deployment logic, GP/LP economics, distribution waterfalls, and cross-border structuring across multiple jurisdictions." },
        { n: "06", t: "Strategic & Commercial Advisory", d: "Revenue diversification, market entry analysis, M&A screening, and operational strategy for family offices, PE-backed platforms, and established operators." },
        { n: "07", t: "Board & Investor Reporting", d: "Structured board packs, quarterly updates, and management reporting frameworks. Clear, decision-oriented documents that build confidence with stakeholders." },
        { n: "08", t: "Operational Tooling & Excel Systems", d: "Custom-built Excel tools for pricing, estimating, forecasting, and workflows. For businesses that have outgrown spreadsheets but aren't ready for enterprise software." },
      ]
    },
    {
      heading: "AI-Enhanced Delivery",
      sub: "Modern tooling, institutional standards.",
      items: [
        { n: "09", t: "AI-Assisted Research & Analysis", d: "Advanced AI to compress weeks of market research, competitive analysis, and data synthesis into days — without sacrificing depth. Every insight validated and sourced." },
        { n: "10", t: "Rapid Prototyping & MVPs", d: "Functional product prototypes, landing pages, and interactive demos built to support investor conversations and early customer validation." },
      ]
    }
  ];
  return (
    <>
      <PhotoSection src={PHOTOS.services} overlay={0.88} style={{ padding: "140px 80px 80px" }}>
        <p className="fu d1" style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>Services</p>
        <h2 className="fu d2" style={{ ...s("s", 52, 400, TEXT), marginBottom: 12 }}>How I Help</h2>
        <Line style={{ marginBottom: 24 }} />
        <p className="fu d2" style={{ ...s("b", 16, 300, SILVER), lineHeight: 1.8, maxWidth: 580, marginBottom: 12 }}>
          Every engagement is scoped around a specific outcome — a model, a document, a decision. I don't bill for ambiguity.
        </p>
        <p className="fu d3" style={{ ...s("b", 12, 300, TEXT_MUTED), lineHeight: 1.6, maxWidth: 580, fontStyle: "italic", opacity: 0.6 }}>
          Evara Advisory provides commercial and strategic advisory services. We do not provide financial product advice.
        </p>
      </PhotoSection>
      <div style={{ padding: "64px 80px 80px", background: NAVY_DEEP }}>
        {sections.map((sec, si) => (
          <div key={si} style={{ marginBottom: si < sections.length - 1 ? 56 : 0 }}>
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ ...s("s", 26, 500, TEXT), marginBottom: 6 }}>{sec.heading}</h3>
              <p style={{ ...s("b", 13, 300, TEXT_MUTED) }}>{sec.sub}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: sec.items.length <= 2 ? "1fr 1fr" : "1fr 1fr", gap: 1, background: NAVY_BORDER }}>
              {sec.items.map((item, i) => {
                const [hov, setHov] = useState(false);
                return (
                  <div key={i} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                    style={{ background: hov ? NAVY_CARD : NAVY_DEEP, padding: 36, transition: "all 0.3s", cursor: "default",
                      borderLeft: hov ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
                    <span style={{ ...s("s", 26, 400, ACCENT), opacity: 0.25 }}>{item.n}</span>
                    <h4 style={{ ...s("s", 20, 500, TEXT), margin: "14px 0 10px" }}>{item.t}</h4>
                    <p style={{ ...s("b", 13, 300, TEXT_MUTED), lineHeight: 1.8 }}>{item.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TrackRecordPage({ setPage }) {
  const items = [
    { period: "2026", client: "Major Australian Family Office", type: "Fund Structuring · Financial Modelling · Investor Materials",
      detail: "Retained by the parent company of a national fitness franchise network to lead financial modelling and investment strategy for a new UK-based fund. Built the complete fund model — multi-jurisdiction vehicle structure with capital deployment logic, distribution waterfall mechanics, and scenario analysis. Produced the full Investment Memorandum, board-level presentation materials, and investor-facing documentation for an institutional equity raise targeting commercial assets." },
    { period: "2023 — 2025", client: "Early-Stage Venture Capital Fund", type: "Fund Operations · Due Diligence · Capital Raising",
      detail: "Founding hire alongside the Managing Partner at a Sydney-based venture fund. Sole-led due diligence and Investment Committee approvals. Managed LP communications, fund capital raising, and deal pipeline development. Deployed capital into multiple portfolio companies. End-to-end experience of the full fund lifecycle — from formation and fundraising through to deployment and wind-down." },
    { period: "2022", client: "ASX-Listed Technology Platform", type: "Corporate Development · Proptech Venture Investments",
      detail: "Evaluated and executed venture investments from Series A onwards across the proptech ecosystem. Supported corporate development strategy for one of Australia's largest property technology platforms during its time as a publicly listed company." },
    { period: "2019 — 2022", client: "Top-4 Australian Bank — Institutional Division", type: "M&A Advisory · Leveraged Finance · Venture Investments",
      detail: "Three years across the Institutional Bank spanning M&A advisory, leveraged finance — structuring and syndicating debt facilities for PE sponsors — and growth-stage venture investing through the bank's innovation arm. Contributed to multiple fintech transactions from Series A onwards." },
  ];
  return (
    <>
      <PhotoSection src={PHOTOS.track} overlay={0.86} style={{ padding: "140px 80px 80px" }}>
        <p className="fu d1" style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>Track Record</p>
        <h2 className="fu d2" style={{ ...s("s", 52, 400, TEXT), marginBottom: 12 }}>Select Engagements</h2>
        <Line style={{ marginBottom: 24 }} />
        <p className="fu d2" style={{ ...s("b", 15, 300, SILVER), lineHeight: 1.8, maxWidth: 600 }}>
          A selection of mandates across the capital stack. Details shared with discretion; further information available under NDA.
        </p>
      </PhotoSection>
      <div style={{ padding: "64px 80px 80px", background: NAVY_DEEP }}>
        <div style={{ maxWidth: 800 }}>
          {items.map((r, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={i} className={`fu d${i + 1}`}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ padding: "36px 24px", borderBottom: `1px solid ${NAVY_BORDER}`, transition: "background 0.3s",
                  background: hov ? NAVY_CARD : "transparent", marginLeft: -24, marginRight: -24, borderRadius: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <h3 style={{ ...s("s", 23, 500, TEXT), marginBottom: 4 }}>{r.client}</h3>
                    <p style={{ ...s("b", 11, 400, ACCENT, 1.5, "uppercase") }}>{r.type}</p>
                  </div>
                  <span style={{ ...s("b", 12, 300, TEXT_MUTED, 1.5), flexShrink: 0, marginLeft: 24, background: NAVY_CARD, padding: "4px 12px", border: `1px solid ${NAVY_BORDER}` }}>{r.period}</span>
                </div>
                <p style={{ ...s("b", 14, 300, TEXT_MUTED), lineHeight: 1.85, marginTop: 14 }}>{r.detail}</p>
              </div>
            );
          })}
        </div>
        <div className="fu d5" style={{ marginTop: 48, background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: "32px 40px", maxWidth: 800 }}>
          <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 12 }}>Independent Advisory Clients</p>
          <p style={{ ...s("b", 14, 300, TEXT_MUTED), lineHeight: 1.8 }}>
            I also work with early-stage founders across legaltech, sports technology, building & construction, and beauty — helping with financial modelling, pitch decks, investor readiness, and operational strategy. Details available on request.
          </p>
        </div>
        <div className="fu d6" style={{ marginTop: 16, background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: "32px 40px", display: "flex", gap: 36, alignItems: "center", maxWidth: 800 }}>
          <div style={{ ...s("s", 34, 400, SILVER_LIGHT), flexShrink: 0, opacity: 0.7 }}>NDA</div>
          <div>
            <p style={{ ...s("b", 13.5, 300, TEXT), lineHeight: 1.7, marginBottom: 10 }}>
              Detailed case studies, model samples, and client references available under mutual non-disclosure.
            </p>
            <Btn primary onClick={() => setPage("Contact")} style={{ padding: "9px 22px" }}>Request Access</Btn>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactPage() {
  return (
    <PhotoSection src={PHOTOS.contact} overlay={0.88} style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div style={{ padding: "140px 80px 80px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <p className="fu d1" style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>Contact</p>
            <h2 className="fu d2" style={{ ...s("s", 48, 400, TEXT), marginBottom: 12 }}>Start a Conversation</h2>
            <Line style={{ marginBottom: 40 }} />
            <p className="fu d3" style={{ ...s("b", 15.5, 300, SILVER), lineHeight: 1.8, marginBottom: 48 }}>
              I work with a small number of clients at any given time to ensure depth of engagement. Whether you're a founder preparing for your first raise or a family office navigating a complex transaction — I'd welcome the conversation.
            </p>
            <div className="fu d4" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                ["Email", "amar.kashyap095@gmail.com"],
                ["LinkedIn", "linkedin.com/in/amarkashyap"],
                ["Based In", "Sydney, Australia"],
              ].map(([label, val]) => (
                <div key={label}>
                  <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 4 }}>{label}</p>
                  <p style={{ ...s("b", 15, 300, TEXT) }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="fu d4" style={{ display: "flex", flexDirection: "column", gap: 18, justifyContent: "center" }}>
            <div style={{ background: "rgba(14,26,46,0.8)", backdropFilter: "blur(16px)", border: `1px solid ${NAVY_BORDER}`, padding: 40 }}>
              <p style={{ ...s("s", 20, 400, TEXT), lineHeight: 1.65, fontStyle: "italic", marginBottom: 18 }}>
                "The quality of your preparation is the signal investors read before they ever open your deck."
              </p>
              <div style={{ height: 1, background: NAVY_BORDER, marginBottom: 18 }} />
              <p style={{ ...s("b", 11, 400, TEXT_MUTED, 2, "uppercase") }}>Amar Kashyap · Founder</p>
            </div>
            <div style={{ background: "rgba(14,26,46,0.8)", backdropFilter: "blur(16px)", border: `1px solid ${NAVY_BORDER}`, padding: 40 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Typical Engagement</p>
              {[
                "Initial scoping call — no charge",
                "Retainer or project-based fee structure",
                "Deliverable-focused with clear milestones",
                "NDA executed before any sensitive exchange",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 10 : 0 }}>
                  <span style={{ color: ACCENT, fontSize: 13, marginTop: 1 }}>→</span>
                  <p style={{ ...s("b", 13, 300, TEXT_MUTED), lineHeight: 1.55 }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(14,26,46,0.6)", backdropFilter: "blur(16px)", border: `1px solid ${NAVY_BORDER}`, padding: 20, opacity: 0.7 }}>
              <p style={{ ...s("b", 11, 300, TEXT_MUTED), lineHeight: 1.6, fontStyle: "italic" }}>
                Evara Advisory provides commercial and strategic advisory services only. We do not provide financial product advice or hold an AFSL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhotoSection>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "28px 80px", borderTop: `1px solid ${NAVY_BORDER}`, display: "flex", justifyContent: "space-between", background: NAVY_DEEP }}>
      <span style={{ ...s("b", 11, 300, TEXT_MUTED, 0.5) }}>© 2026 Evara Advisory. All rights reserved.</span>
      <span style={{ ...s("b", 11, 300, TEXT_MUTED, 0.5) }}>Sydney, Australia</span>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [key, setKey] = useState(0);
  const nav = (p) => { setPage(p); setKey(k => k + 1); window.scrollTo({ top: 0, behavior: "instant" }); };
  const pages = {
    Home: <HomePage setPage={nav} />,
    About: <AboutPage />,
    Services: <ServicesPage />,
    "Track Record": <TrackRecordPage setPage={nav} />,
    Contact: <ContactPage />,
  };
  return (
    <div style={{ background: NAVY_DEEP, color: TEXT, minHeight: "100vh" }}>
      <div className="grain" />
      <Nav page={page} setPage={nav} />
      <div key={key} className="fi">{pages[page]}</div>
      <Footer />
    </div>
  );
}
