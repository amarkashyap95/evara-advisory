import { useState, useEffect, useRef, useCallback } from "react";

const NAVY = "#121D2E";
const NAVY_DEEP = "#0D1520";
const NAVY_CARD = "#182840";
const NAVY_BORDER = "#213350";
const SILVER = "#B8C4D0";
const SILVER_LIGHT = "#DAE0E8";
const TEXT = "#EDF0F4";
const TEXT_MUTED = "#8494A7";
const ACCENT = "#96ABBE";
const PAGES = ["Home", "About", "Services", "Track Record", "Contact"];
const FORMSPREE_URL = "https://formspree.io/f/xbdpvgwj";

const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
  about: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1920&q=80",
  services: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
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
  html { scroll-behavior: smooth; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes lineGrow { from { width: 0; } to { width: 56px; } }
  @keyframes panSlow { 0% { transform: scale(1.06) translate(0,0); } 100% { transform: scale(1.06) translate(-0.8%,-0.5%); } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
  @keyframes preloaderFade { from { opacity: 1; } to { opacity: 0; pointer-events: none; } }
  @keyframes letterReveal { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

  .fu { animation: fadeUp 0.8s ease forwards; opacity: 0; }
  .fi { animation: fadeIn 0.6s ease forwards; opacity: 0; }
  .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
  .d4{animation-delay:.4s}.d5{animation-delay:.5s}.d6{animation-delay:.6s}
  .d7{animation-delay:.7s}.d8{animation-delay:.8s}

  .photo-bg { position: absolute; inset: 0; background-size: cover; background-position: center;
    animation: panSlow 25s ease-in-out infinite alternate; }

  .grain { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat; background-size: 200px; }

  input, textarea, select { font-family: 'DM Sans', sans-serif; }
  input:focus, textarea:focus, select:focus { outline: none; border-color: ${ACCENT} !important; }

  .scroll-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

  .card-glow { transition: all 0.4s ease; position: relative; }
  .card-glow:hover { box-shadow: 0 0 40px rgba(150,171,190,0.08), 0 8px 32px rgba(0,0,0,0.25); transform: translateY(-2px); }

  .tag { transition: all 0.3s ease; cursor: default; }
  .tag:hover { border-color: ${ACCENT} !important; color: ${TEXT} !important; }

  .page-enter { animation: pageIn 0.5s ease forwards; }
  @keyframes pageIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .back-to-top { position: fixed; bottom: 32px; right: 32px; z-index: 90; width: 44px; height: 44px;
    border-radius: 50%; border: 1px solid ${NAVY_BORDER}; background: rgba(18,29,46,0.9);
    backdrop-filter: blur(12px); cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.3s ease; opacity: 0; transform: translateY(10px); pointer-events: none; }
  .back-to-top.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .back-to-top:hover { border-color: ${ACCENT}; background: rgba(18,29,46,1); transform: translateY(-2px); }

  a { color: inherit; }

  .nav-link { position: relative; }
  .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 50%; width: 0; height: 1px; background: ${SILVER}; transition: all 0.3s ease; transform: translateX(-50%); }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active::after { width: 100%; opacity: 0.6; }

  .preloader { position: fixed; inset: 0; z-index: 10000; background: ${NAVY_DEEP}; display: flex; align-items: center; justify-content: center; }
  .preloader.done { animation: preloaderFade 0.6s ease forwards; animation-delay: 0.3s; }

  .gradient-text { background: linear-gradient(135deg, ${SILVER_LIGHT} 0%, ${ACCENT} 50%, ${SILVER_LIGHT} 100%);
    background-size: 200% 200%; animation: gradientShift 6s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
`;
document.head.appendChild(styleEl);

const s = (fam, sz, wt, col, ls, tt) => ({
  fontFamily: fam === "s" ? "'EB Garamond', serif" : "'DM Sans', sans-serif",
  fontSize: sz, fontWeight: wt, color: col, letterSpacing: ls || 0, textTransform: tt || "none",
});

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function SR({ children, delay = 0, style }) {
  const ref = useScrollReveal();
  return <div ref={ref} className="scroll-reveal" style={{ transitionDelay: `${delay}s`, ...style }}>{children}</div>;
}

// Animated counter
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(eased * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

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

function Btn({ children, primary, onClick, style: bsx, type, disabled }) {
  const [h, setH] = useState(false);
  const base = primary
    ? { background: h && !disabled ? SILVER_LIGHT : SILVER, border: `1px solid ${SILVER}`, color: NAVY_DEEP, boxShadow: h ? `0 4px 20px rgba(180,188,200,0.25)` : "none" }
    : { background: h ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)", border: `1px solid ${h ? SILVER : "rgba(255,255,255,0.35)"}`, color: SILVER_LIGHT };
  return (
    <button type={type} disabled={disabled} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...base, padding: "14px 34px", ...s("b", 11, 400, null, 2.5, "uppercase"), cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.35s ease", backdropFilter: "blur(4px)", opacity: disabled ? 0.5 : 1, ...bsx }}>
      {children}
    </button>
  );
}

// Preloader
function Preloader({ done }) {
  return (
    <div className={`preloader ${done ? "done" : ""}`}>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...s("s", 28, 500, SILVER, 2), marginBottom: 12, animation: "letterReveal 0.6s ease forwards" }}>Evara Advisory</div>
        <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${SILVER}, transparent)`, margin: "0 auto", animation: "pulse 1.5s ease infinite" }} />
      </div>
    </div>
  );
}

function Nav({ page, setPage }) {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 48px", height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: sc ? "rgba(6,15,28,0.92)" : "transparent",
      backdropFilter: sc ? "blur(24px) saturate(1.2)" : "none",
      borderBottom: `1px solid ${sc ? NAVY_BORDER : "transparent"}`,
      transition: "all 0.4s", animation: "slideDown 0.8s ease forwards",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={() => setPage("Home")}>
        <div style={{ width: 36, height: 36, border: `1px solid ${SILVER}`, display: "flex", alignItems: "center", justifyContent: "center", ...s("s", 17, 500, SILVER, 1), backdropFilter: "blur(8px)", transition: "all 0.3s" }}>E</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ ...s("b", 11, 500, TEXT, 3.5, "uppercase") }}>Evara</span>
          <span style={{ ...s("b", 8.5, 300, TEXT_MUTED, 2.5, "uppercase") }}>Advisory</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {PAGES.map(p => (
          <button key={p} onClick={() => setPage(p)} className={`nav-link ${page === p ? "active" : ""}`} style={{
            background: "none", border: "none", cursor: "pointer",
            ...s("b", 10.5, 400, page === p ? SILVER_LIGHT : TEXT_MUTED, 2.5, "uppercase"),
            transition: "color 0.3s", padding: "4px 0",
          }}>{p}</button>
        ))}
      </div>
    </nav>
  );
}

function HomePage({ setPage }) {
  return (
    <PhotoSection src={PHOTOS.hero} overlay={0.76}>
      <div style={{ padding: "160px 80px 0", maxWidth: 780 }}>
        <p className="fu d1" style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 28 }}>
          Advisory · Modelling · Capital Strategy
        </p>
        <h1 className="fu d2" style={{ ...s("s", 80, 400, TEXT), lineHeight: 1.02, marginBottom: 8 }}>
          <span className="gradient-text">Evara</span><br />Advisory
        </h1>
        <p className="fu d3" style={{ ...s("b", 13, 300, TEXT_MUTED, 0.5), marginTop: 8, marginBottom: 12 }}>
          Founded by Amar Kashyap
        </p>
        <Line style={{ marginBottom: 32 }} />
        <p className="fu d4" style={{ ...s("b", 17.5, 300, SILVER), lineHeight: 1.8, maxWidth: 520, marginBottom: 18 }}>
          Strategic advisory, financial modelling, and capital raising support for businesses at every stage — from founders preparing for their first raise to established groups navigating complex growth.
        </p>
        <p className="fu d5" style={{ ...s("s", 15, 400, TEXT_MUTED), lineHeight: 1.75, maxWidth: 540, marginBottom: 48, fontStyle: "italic", opacity: 0.55 }}>
          Background in institutional banking, venture capital, and private equity.
        </p>
        <div className="fu d6" style={{ display: "flex", gap: 14, marginBottom: 80 }}>
          <Btn primary onClick={() => setPage("Contact")}>Get in Touch</Btn>
          <Btn primary onClick={() => setPage("Services")}>View Services</Btn>
        </div>
      </div>
      <div className="fu d7" style={{ padding: "36px 80px 52px", borderTop: `1px solid rgba(255,255,255,0.08)`, display: "flex" }}>
        {[
          [7, "+", "Years in Private Markets"],
          [null, "Early Stage → Enterprise", "Across the Business Lifecycle"],
          [null, "Modelling · Strategy · Capital", "Core Competencies"],
          [null, "Sydney", "Australia"],
        ].map(([num, big, small], i) => (
          <div key={i} style={{ flex: 1, borderRight: i < 3 ? `1px solid rgba(255,255,255,0.06)` : "none", paddingRight: 24 }}>
            <div style={{ ...s("s", 24, 400, SILVER_LIGHT), marginBottom: 6 }}>
              {num !== null ? <Counter end={num} suffix={big} /> : big}
            </div>
            <div style={{ ...s("b", 10, 300, TEXT_MUTED, 1.5, "uppercase") }}>{small}</div>
          </div>
        ))}
      </div>
      {/* Social proof teaser */}
      <div className="fu d8" style={{ padding: "32px 80px 48px", display: "flex", gap: 40, alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ ...s("s", 24, 300, ACCENT), opacity: 0.4 }}>"</div>
          <p style={{ ...s("s", 15, 400, TEXT_MUTED), fontStyle: "italic", maxWidth: 340 }}>
            A key part of our team feeling confident approaching investors.
          </p>
          <span style={{ ...s("b", 10, 300, ACCENT, 1.5, "uppercase"), opacity: 0.6 }}>— Founder & CEO</span>
        </div>
        <div style={{ width: 1, height: 24, background: NAVY_BORDER }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ ...s("s", 24, 300, ACCENT), opacity: 0.4 }}>"</div>
          <p style={{ ...s("s", 15, 400, TEXT_MUTED), fontStyle: "italic", maxWidth: 340 }}>
            Modelling skills of a very high quality with powerful supporting documents.
          </p>
          <span style={{ ...s("b", 10, 300, ACCENT, 1.5, "uppercase"), opacity: 0.6 }}>— Family Office</span>
        </div>
      </div>
    </PhotoSection>
  );
}

function AboutPage() {
  return (
    <>
      <PhotoSection src={PHOTOS.about} overlay={0.88} style={{ padding: "150px 80px 80px" }}>
        <SR><p style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>About</p></SR>
        <SR delay={0.1}><h2 style={{ ...s("s", 52, 400, TEXT), marginBottom: 6 }}>The Principal</h2></SR>
        <SR delay={0.2}><p style={{ ...s("s", 22, 400, SILVER), lineHeight: 1.65, maxWidth: 600, marginTop: 20, fontStyle: "italic" }}>
          I've spent my career on both sides of the table — working with institutions deploying capital and founders raising it.
        </p></SR>
      </PhotoSection>
      <div style={{ padding: "64px 80px 80px", background: NAVY_DEEP }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 72 }}>
          <div>
            <SR><p style={{ ...s("b", 15, 300, TEXT_MUTED), lineHeight: 1.85, marginBottom: 22 }}>
              My career started in one of Australia's largest institutional banks, working across M&A advisory and leveraged finance — structuring debt facilities for private equity sponsors and advising on complex transactions. I transitioned into the bank's venture investment arm, gaining direct exposure to high-growth technology companies from Series A onwards across the fintech ecosystem.
            </p></SR>
            <SR delay={0.1}><p style={{ ...s("b", 15, 300, TEXT_MUTED), lineHeight: 1.85, marginBottom: 22 }}>
              From there I joined a major ASX-listed technology platform, evaluating proptech venture investments and supporting corporate development strategy. I then became the founding hire at an early-stage venture fund — sole-leading due diligence, managing Investment Committee approvals, and driving fund capital raising and operations.
            </p></SR>
            <SR delay={0.2}><p style={{ ...s("b", 15, 300, TEXT_MUTED), lineHeight: 1.85, marginBottom: 22 }}>
              Since launching Evara Advisory in early 2026, I've partnered with family offices on fund structuring and institutional-grade modelling, worked with early-stage founders on investor readiness, and helped established SMBs build the commercial tools and frameworks they need to scale. The firm is new, but the experience behind it isn't — I bring every engagement the same institutional rigour built over seven years in private markets. I also leverage advanced AI tooling to deliver work at a speed and depth that traditional advisory firms can't match.
            </p></SR>
            <SR delay={0.3}><p style={{ ...s("b", 15, 300, TEXT_MUTED), lineHeight: 1.85 }}>
              I'm selective about engagements because depth matters more than volume. Every client gets the same rigour I'd apply to a transaction on an institutional desk.
            </p></SR>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SR delay={0.1}><div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 32 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Education</p>
              <p style={{ ...s("s", 19, 500, TEXT), marginBottom: 3 }}>University of New South Wales</p>
              <p style={{ ...s("b", 13, 300, TEXT_MUTED) }}>Bachelor of Commerce — Finance & Information Systems</p>
            </div></SR>
            <SR delay={0.2}><div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 32 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Career Heritage</p>
              {["Major Australian Bank — M&A Advisory & Leveraged Finance", "Bank Venture Arm — Growth-Stage Technology Investments", "ASX-Listed Technology Platform — Corp Dev & Proptech VC", "Early-Stage Venture Fund — Founding Hire & Fund Operations", "Family Office — Fund Structuring & Investment Strategy"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < 4 ? 12 : 0 }}>
                  <div style={{ width: 3, height: 3, borderRadius: "50%", background: ACCENT, marginTop: 8, flexShrink: 0 }} />
                  <p style={{ ...s("b", 12.5, 300, TEXT_MUTED), lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div></SR>
            <SR delay={0.3}><div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 32 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Who I Work With</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Family Offices", "PE-Backed Platforms", "Seed & Series A Founders", "Franchise Groups", "SMB Operators", "Established Businesses"].map(item => (
                  <span key={item} style={{ ...s("b", 10.5, 300, TEXT_MUTED, 0.5), padding: "6px 12px", border: `1px solid ${NAVY_BORDER}` }} className="tag">{item}</span>
                ))}
              </div>
            </div></SR>
            <SR delay={0.4}><div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 32 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Sector Exposure</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Fintech", "Proptech", "Health & Wellness", "Sports Technology", "Franchising", "Legaltech", "Building & Construction", "Beauty & Retail"].map(item => (
                  <span key={item} style={{ ...s("b", 10.5, 300, TEXT_MUTED, 0.5), padding: "6px 12px", border: `1px solid ${NAVY_BORDER}` }} className="tag">{item}</span>
                ))}
              </div>
            </div></SR>
          </div>
        </div>
      </div>
      {/* Client Testimonials */}
      <div style={{ padding: "80px 80px", background: NAVY, borderTop: `1px solid ${NAVY_BORDER}`, borderBottom: `1px solid ${NAVY_BORDER}` }}>
        <SR>
          <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 40, textAlign: "center" }}>What Clients Say</p>
        </SR>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 900, margin: "0 auto" }}>
          <SR delay={0.1}>
            <div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 40, height: "100%" }}>
              <div style={{ ...s("s", 40, 300, ACCENT), marginBottom: 12, opacity: 0.3 }}>"</div>
              <p style={{ ...s("s", 19, 400, TEXT), lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>
                Amar's modelling skills were of a very high quality. He built a powerful set of supporting documents that gave us real confidence going to market.
              </p>
              <div style={{ width: 32, height: 1, background: ACCENT, marginBottom: 14, opacity: 0.4 }} />
              <p style={{ ...s("b", 12, 400, SILVER_LIGHT, 1, "uppercase") }}>Family Office</p>
              <p style={{ ...s("b", 11, 300, TEXT_MUTED), marginTop: 2 }}>Health & Fitness Sector</p>
            </div>
          </SR>
          <SR delay={0.2}>
            <div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 40, height: "100%" }}>
              <div style={{ ...s("s", 40, 300, ACCENT), marginBottom: 12, opacity: 0.3 }}>"</div>
              <p style={{ ...s("s", 19, 400, TEXT), lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>
                Amar built a robust set of key company agreements, financial model, and investor deck. He was a key part of our team feeling confident approaching investors and being fully prepared.
              </p>
              <div style={{ width: 32, height: 1, background: ACCENT, marginBottom: 14, opacity: 0.4 }} />
              <p style={{ ...s("b", 12, 400, SILVER_LIGHT, 1, "uppercase") }}>Founder & CEO</p>
              <p style={{ ...s("b", 11, 300, TEXT_MUTED), marginTop: 2 }}>Consumer Business, Medical Sector</p>
            </div>
          </SR>
        </div>
      </div>
    </>
  );
}

function ServicesPage() {
  const segments = [
    { id: "founders", label: "Early-Stage Companies", sub: "Pre-seed through Series A+ — building the foundations investors need to see.",
      items: [
        { t: "Financial Modelling", d: "Unit economics, revenue forecasts, scenario analysis, and cash runway planning. Built to withstand VC due diligence and answer the questions investors will actually ask." },
        { t: "Pitch Decks & Investor Materials", d: "Compelling, structured decks, one-pagers, and investment teasers that communicate your opportunity with clarity. Built from scratch around your story — not templates." },
        { t: "Capital Raising Preparation", d: "End-to-end fundraising readiness — data room build-out on DocSend, model stress-testing, investor shortlisting, narrative refinement, and process management through to close." },
        { t: "Commercial Agreements", d: "Shareholder agreements, ESOP frameworks, key commercial contracts, and term sheet review support. Structured to protect founders while remaining investor-friendly." },
        { t: "Product Prototyping & MVPs", d: "Functional product prototypes, landing pages, and interactive demos to support investor conversations and early customer validation — built fast with AI-assisted development." },
      ] },
    { id: "ceo", label: "Bespoke Founder & CEO Support", sub: "A strategic thought partner for founders navigating high-stakes decisions.",
      items: [
        { t: "Investor Readiness Coaching", d: "Sharpen your narrative, pressure-test assumptions, and rehearse for tough questions. Candid, structured feedback from someone who has sat on both sides of the table." },
        { t: "Board & Stakeholder Reporting", d: "Structured board packs, quarterly investor updates, and management reporting frameworks. Decision-oriented documents that build confidence with your stakeholders." },
        { t: "Strategic Planning & Scenario Analysis", d: "Help thinking through growth options, market entry, pricing strategy, competitive positioning, and key commercial decisions — grounded in financial reality, not theory." },
        { t: "Operational Tooling", d: "Custom-built Excel systems for pricing, estimating, forecasting, and operational workflows. For businesses that have outgrown spreadsheets but aren't ready for enterprise software." },
      ] },
    { id: "family", label: "Family Offices", sub: "Institutional-grade modelling and strategy for private capital groups.",
      items: [
        { t: "Fund Structuring & Modelling", d: "End-to-end fund architecture — vehicle design, capital deployment logic, GP/LP economics, distribution waterfalls, and cross-border structuring across Australian and international jurisdictions." },
        { t: "Investment Memoranda & Fundraising Materials", d: "Institutional-quality IMs, investor presentations, and supporting documentation to the standard expected by sophisticated LPs and co-investors." },
        { t: "Portfolio Strategy & Diversification", d: "Revenue diversification planning, new sector evaluation, and strategic analysis to help family offices expand beyond core operations into new verticals or asset classes." },
        { t: "Operational Strategy", d: "M&A screening, bolt-on acquisition analysis, and operational efficiency reviews for portfolio companies and multi-site operating businesses including franchise models." },
      ] },
    { id: "invest", label: "Investment Firms & Transaction Support", sub: "Experienced support across the deal lifecycle.",
      items: [
        { t: "Financial Model Build & Audit", d: "LBO models, DCF valuations, comparable analysis, and returns modelling. Built to institutional standards with fully documented assumptions and auditable outputs." },
        { t: "Due Diligence Support", d: "Commercial due diligence workstreams, management presentation preparation, and IC memo drafting. Experience sole-leading DD processes from initial screening to Investment Committee approval." },
        { t: "Deal Documentation", d: "Information memoranda, confidential teasers, process letters, and data room structuring. Supporting materials that accelerate deal execution and reduce back-and-forth." },
        { t: "LP Communications & Reporting", d: "Quarterly LP reports, capital call notices, distribution notices, and fund performance reporting. Clear, professional communications that maintain investor confidence." },
      ] },
    { id: "smb", label: "Established Businesses & SMBs", sub: "Practical commercial tools and frameworks for businesses ready to scale.",
      items: [
        { t: "Commercial Strategy", d: "Market entry analysis, revenue model design, pricing strategy, and growth planning for established operators looking to expand or optimise their core business." },
        { t: "Financial Systems & Dashboards", d: "Custom Excel models, KPI dashboards, and management reporting tools. Clean, powerful, and built to evolve with your business — delivered at a fraction of the cost of enterprise software." },
        { t: "Investor & Partner Readiness", d: "Whether you're bringing on a strategic partner, exploring private equity, or preparing for an eventual exit — getting your financials, story, and data room to the standard buyers expect." },
        { t: "AI-Assisted Research & Analysis", d: "Leveraging advanced AI to compress weeks of market research, competitive analysis, and data synthesis into days — without sacrificing depth or accuracy." },
      ] },
  ];
  const process = [
    { step: "01", title: "Scoping Call", desc: "30-minute introductory call to understand your situation, goals, and timeline. No charge, no obligation." },
    { step: "02", title: "Proposal & Scope", desc: "A clear written scope with deliverables, timeline, and fixed fee or retainer structure. No ambiguity." },
    { step: "03", title: "NDA & Kickoff", desc: "Mutual NDA executed. Access to relevant materials. Engagement begins with a structured kickoff." },
    { step: "04", title: "Delivery & Review", desc: "Iterative delivery with milestone check-ins. Final output to institutional standard, ready for its audience." },
  ];
  const [activeTab, setActiveTab] = useState("founders");
  const active = segments.find(sg => sg.id === activeTab);
  return (
    <>
      <PhotoSection src={PHOTOS.services} overlay={0.88} style={{ padding: "150px 80px 80px" }}>
        <SR><p style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>Services</p></SR>
        <SR delay={0.1}><h2 style={{ ...s("s", 52, 400, TEXT), marginBottom: 12 }}>How I Help</h2></SR>
        <SR delay={0.15}><Line style={{ marginBottom: 24 }} /></SR>
        <SR delay={0.2}><p style={{ ...s("b", 16, 300, SILVER), lineHeight: 1.8, maxWidth: 620, marginBottom: 12 }}>
          I work across the full business lifecycle — from first-time founders building their pitch to family offices structuring multi-jurisdictional funds. Select your profile below.
        </p></SR>
        <SR delay={0.25}><p style={{ ...s("b", 12, 300, TEXT_MUTED), lineHeight: 1.6, maxWidth: 580, fontStyle: "italic", opacity: 0.6 }}>
          Evara Advisory provides commercial and strategic advisory services. We do not provide financial product advice.
        </p></SR>
      </PhotoSection>

      {/* Client Segment Tabs */}
      <div style={{ background: NAVY, borderBottom: `1px solid ${NAVY_BORDER}`, padding: "0 80px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 0 }}>
          {segments.map(sg => (
            <button key={sg.id} onClick={() => setActiveTab(sg.id)} style={{
              background: activeTab === sg.id ? NAVY_DEEP : "transparent",
              border: "none", borderBottom: activeTab === sg.id ? `2px solid ${ACCENT}` : "2px solid transparent",
              padding: "18px 28px", cursor: "pointer", transition: "all 0.3s",
              ...s("b", 11, 400, activeTab === sg.id ? SILVER_LIGHT : TEXT_MUTED, 1.5, "uppercase"),
              whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { if (activeTab !== sg.id) e.target.style.color = TEXT; }}
              onMouseLeave={e => { if (activeTab !== sg.id) e.target.style.color = TEXT_MUTED; }}
            >{sg.label}</button>
          ))}
        </div>
      </div>

      {/* Active Segment Content */}
      <div style={{ padding: "56px 80px 48px", background: NAVY_DEEP }} key={activeTab}>
        <div className="page-enter">
          <div style={{ marginBottom: 36 }}>
            <h3 style={{ ...s("s", 30, 500, TEXT), marginBottom: 8 }}>{active.label}</h3>
            <p style={{ ...s("b", 14, 300, TEXT_MUTED), lineHeight: 1.7 }}>{active.sub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: active.items.length > 4 ? "1fr 1fr 1fr" : "1fr 1fr", gap: 1, background: NAVY_BORDER }}>
            {active.items.map((item, i) => {
              const [hov, setHov] = useState(false);
              return (
                <div key={`${activeTab}-${i}`} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  className="card-glow"
                  style={{ background: hov ? NAVY_CARD : NAVY_DEEP, padding: 36, cursor: "default",
                    borderLeft: hov ? `2px solid ${ACCENT}` : "2px solid transparent", transition: "all 0.3s" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", ...s("b", 10, 400, ACCENT), marginBottom: 16, opacity: 0.5 }}>{String(i + 1).padStart(2, "0")}</div>
                  <h4 style={{ ...s("s", 20, 500, TEXT), marginBottom: 10 }}>{item.t}</h4>
                  <p style={{ ...s("b", 13, 300, TEXT_MUTED), lineHeight: 1.8 }}>{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Adoption & Automation - across all clients */}
      <div style={{ padding: "64px 80px", background: NAVY, borderTop: `1px solid ${NAVY_BORDER}` }}>
        <SR><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", ...s("b", 16, 300, ACCENT), opacity: 0.6 }}>⚡</div>
          <h3 style={{ ...s("s", 28, 500, TEXT) }}>AI Adoption & Automation</h3>
        </div></SR>
        <SR delay={0.1}><p style={{ ...s("b", 14, 300, TEXT_MUTED), lineHeight: 1.8, maxWidth: 620, marginBottom: 36 }}>
          Available across all engagements. I help businesses harness AI to work faster, smarter, and leaner — without the enterprise price tag.
        </p></SR>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1, background: NAVY_BORDER }}>
          {[
            { t: "AI Strategy & Readiness", d: "Structured review of your operations to identify where AI delivers the highest impact. Practical roadmap, not buzzwords." },
            { t: "Custom Workflows & Automations", d: "Purpose-built AI workflows — automated reporting, document generation, data extraction, and client communications. Designed around how your team works." },
            { t: "AI-Powered Tools & Apps", d: "Bespoke internal tools with AI at their core — dashboards, intelligent document search, proposal generators, pricing engines. Fast to deploy, tailored to you." },
            { t: "Process Automation & Integration", d: "Connecting your existing tools with AI — CRM workflows, invoice processing, lead qualification, content generation. Less manual work, more growth." },
          ].map((item, i) => (
            <SR key={i} delay={i * 0.1}>
              <div className="card-glow" style={{ background: NAVY_DEEP, padding: 32, transition: "all 0.3s" }}>
                <h4 style={{ ...s("s", 18, 500, TEXT), marginBottom: 10 }}>{item.t}</h4>
                <p style={{ ...s("b", 12.5, 300, TEXT_MUTED), lineHeight: 1.75 }}>{item.d}</p>
              </div>
            </SR>
          ))}
        </div>
      </div>

      {/* Process Timeline */}
      <div style={{ padding: "80px 80px", background: NAVY, borderTop: `1px solid ${NAVY_BORDER}` }}>
        <SR><p style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16, textAlign: "center" }}>Process</p></SR>
        <SR delay={0.1}><h3 style={{ ...s("s", 32, 400, TEXT), textAlign: "center", marginBottom: 56 }}>How Engagements Work</h3></SR>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, maxWidth: 900, margin: "0 auto" }}>
          {process.map((p, i) => (
            <SR key={i} delay={i * 0.12}>
              <div style={{ textAlign: "center", padding: "0 20px", position: "relative" }}>
                {i < 3 && <div style={{ position: "absolute", top: 18, right: 0, width: "100%", height: 1, background: `linear-gradient(90deg, transparent 20%, ${NAVY_BORDER} 50%, transparent 80%)` }} />}
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", ...s("b", 11, 400, ACCENT), margin: "0 auto 16px", background: NAVY, position: "relative", zIndex: 1 }}>{p.step}</div>
                <h4 style={{ ...s("s", 18, 500, TEXT), marginBottom: 8 }}>{p.title}</h4>
                <p style={{ ...s("b", 12, 300, TEXT_MUTED), lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            </SR>
          ))}
        </div>
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
      <PhotoSection src={PHOTOS.track} overlay={0.86} style={{ padding: "150px 80px 80px" }}>
        <SR><p style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>Track Record</p></SR>
        <SR delay={0.1}><h2 style={{ ...s("s", 52, 400, TEXT), marginBottom: 12 }}>Select Engagements</h2></SR>
        <SR delay={0.15}><Line style={{ marginBottom: 24 }} /></SR>
        <SR delay={0.2}><p style={{ ...s("b", 15, 300, SILVER), lineHeight: 1.8, maxWidth: 600 }}>
          A selection of mandates across the capital stack. Details shared with discretion; further information available under NDA.
        </p></SR>
      </PhotoSection>

      {/* Logo Bar */}
      <div style={{ padding: "48px 80px", background: NAVY, borderBottom: `1px solid ${NAVY_BORDER}`, overflow: "hidden" }}>
        <SR><p style={{ ...s("b", 10, 400, TEXT_MUTED, 3, "uppercase"), marginBottom: 28, textAlign: "center" }}>Institutional Heritage</p></SR>
        <SR delay={0.1}><div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.7 }}>
            <div style={{ ...s("b", 28, 500, SILVER_LIGHT, 6, "uppercase"), lineHeight: 1 }}>ANZ</div>
            <div style={{ ...s("b", 9, 300, TEXT_MUTED, 2, "uppercase") }}>Institutional Bank</div>
          </div>
          <div style={{ width: 1, height: 40, background: NAVY_BORDER }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.7 }}>
            <div style={{ ...s("b", 28, 500, SILVER_LIGHT, 4, "uppercase"), lineHeight: 1 }}>PEXA</div>
            <div style={{ ...s("b", 9, 300, TEXT_MUTED, 2, "uppercase") }}>ASX-Listed</div>
          </div>
          <div style={{ width: 1, height: 40, background: NAVY_BORDER }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.45 }}>
            <div style={{ ...s("s", 22, 400, SILVER, 1), lineHeight: 1, fontStyle: "italic" }}>Venture Fund</div>
            <div style={{ ...s("b", 9, 300, TEXT_MUTED, 2, "uppercase") }}>Private Client</div>
          </div>
          <div style={{ width: 1, height: 40, background: NAVY_BORDER }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.45 }}>
            <div style={{ ...s("s", 22, 400, SILVER, 1), lineHeight: 1, fontStyle: "italic" }}>Family Office</div>
            <div style={{ ...s("b", 9, 300, TEXT_MUTED, 2, "uppercase") }}>Private Client</div>
          </div>
          <div style={{ width: 1, height: 40, background: NAVY_BORDER }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.45 }}>
            <div style={{ ...s("s", 22, 400, SILVER, 1), lineHeight: 1, fontStyle: "italic" }}>Founders</div>
            <div style={{ ...s("b", 9, 300, TEXT_MUTED, 2, "uppercase") }}>Multiple Engagements</div>
          </div>
        </div></SR>
      </div>

      <div style={{ padding: "64px 80px 80px", background: NAVY_DEEP }}>
        <div style={{ maxWidth: 800 }}>
          {items.map((r, i) => (
            <SR key={i} delay={i * 0.1}>
              <div className="card-glow" style={{ padding: "36px 24px", borderBottom: `1px solid ${NAVY_BORDER}`, marginLeft: -24, marginRight: -24, borderRadius: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <h3 style={{ ...s("s", 23, 500, TEXT), marginBottom: 4 }}>{r.client}</h3>
                    <p style={{ ...s("b", 11, 400, ACCENT, 1.5, "uppercase") }}>{r.type}</p>
                  </div>
                  <span style={{ ...s("b", 12, 300, TEXT_MUTED, 1.5), flexShrink: 0, marginLeft: 24, background: NAVY_CARD, padding: "4px 12px", border: `1px solid ${NAVY_BORDER}` }}>{r.period}</span>
                </div>
                <p style={{ ...s("b", 14, 300, TEXT_MUTED), lineHeight: 1.85, marginTop: 14 }}>{r.detail}</p>
              </div>
            </SR>
          ))}
        </div>
        <SR delay={0.3}><div className="card-glow" style={{ marginTop: 48, background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: "32px 40px", maxWidth: 800 }}>
          <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 12 }}>Independent Advisory Clients</p>
          <p style={{ ...s("b", 14, 300, TEXT_MUTED), lineHeight: 1.8 }}>
            I also work with early-stage founders across legaltech, sports technology, building & construction, and beauty — helping with financial modelling, pitch decks, investor readiness, and operational strategy. Details available on request.
          </p>
        </div></SR>
        <SR delay={0.4}><div className="card-glow" style={{ marginTop: 16, background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: "32px 40px", display: "flex", gap: 36, alignItems: "center", maxWidth: 800 }}>
          <div style={{ ...s("s", 34, 400, SILVER_LIGHT), flexShrink: 0, opacity: 0.7 }}>NDA</div>
          <div>
            <p style={{ ...s("b", 13.5, 300, TEXT), lineHeight: 1.7, marginBottom: 10 }}>
              Detailed case studies, model samples, and client references available under mutual non-disclosure.
            </p>
            <Btn primary onClick={() => setPage("Contact")} style={{ padding: "9px 22px" }}>Request Access</Btn>
          </div>
        </div></SR>
      </div>
    </>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", stage: "", service: "", budget: "", timeline: "", message: "" });
  const [status, setStatus] = useState("idle");
  const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(14,26,46,0.6)", border: `1px solid ${NAVY_BORDER}`, color: TEXT, ...s("b", 14, 300, TEXT), transition: "border-color 0.3s", borderRadius: 2 };
  const labelStyle = { ...s("b", 10, 400, ACCENT, 2.5, "uppercase"), marginBottom: 6, display: "block" };
  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", company: "", stage: "", service: "", budget: "", timeline: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };
  return (
    <PhotoSection src={PHOTOS.contact} overlay={0.9} style={{ minHeight: "100vh" }}>
      <div style={{ padding: "150px 80px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 72 }}>
          <div>
            <SR><p style={{ ...s("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>Contact</p></SR>
            <SR delay={0.1}><h2 style={{ ...s("s", 48, 400, TEXT), marginBottom: 12 }}>Start a Conversation</h2></SR>
            <SR delay={0.15}><Line style={{ marginBottom: 40 }} /></SR>
            <SR delay={0.2}><p style={{ ...s("b", 15.5, 300, SILVER), lineHeight: 1.8, marginBottom: 48 }}>
              I work with a small number of clients at any given time. Whether you need help with strategy, modelling, investor materials, or preparing for a raise — fill out the form and I'll be in touch within 24 hours.
            </p></SR>
            <SR delay={0.25}><div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
              {[["Email", "amar.kashyap095@gmail.com", "mailto:amar.kashyap095@gmail.com"], ["LinkedIn", "linkedin.com/in/amar-kashyap", "https://www.linkedin.com/in/amar-kashyap"], ["Based In", "Sydney, Australia", null]].map(([label, val, href]) => (
                <div key={label}>
                  <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 4 }}>{label}</p>
                  {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ ...s("b", 15, 300, TEXT), textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = ACCENT} onMouseLeave={e => e.target.style.color = TEXT}>{val}</a> : <p style={{ ...s("b", 15, 300, TEXT) }}>{val}</p>}
                </div>
              ))}
            </div></SR>
            <SR delay={0.3}><div className="card-glow" style={{ background: "rgba(14,26,46,0.7)", backdropFilter: "blur(16px)", border: `1px solid ${NAVY_BORDER}`, padding: 32 }}>
              <p style={{ ...s("b", 10, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Typical Engagement</p>
              {["Initial scoping call — no charge", "Retainer or project-based fee structure", "Deliverable-focused with clear milestones", "NDA executed before any sensitive exchange"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 10 : 0 }}>
                  <span style={{ color: ACCENT, fontSize: 13, marginTop: 1 }}>→</span>
                  <p style={{ ...s("b", 13, 300, TEXT_MUTED), lineHeight: 1.55 }}>{item}</p>
                </div>
              ))}
            </div></SR>
          </div>
          <SR delay={0.1}>
            <div>
              {status === "sent" ? (
                <div style={{ background: "rgba(14,26,46,0.7)", backdropFilter: "blur(16px)", border: `1px solid ${NAVY_BORDER}`, padding: 56, textAlign: "center" }}>
                  <div style={{ ...s("s", 48, 400, SILVER_LIGHT), marginBottom: 16 }}>✓</div>
                  <h3 style={{ ...s("s", 28, 500, TEXT), marginBottom: 12 }}>Request Received</h3>
                  <p style={{ ...s("b", 15, 300, TEXT_MUTED), lineHeight: 1.7 }}>Thank you for your interest. I'll review your enquiry and be in touch within 24 hours.</p>
                </div>
              ) : (
                <div className="card-glow" style={{ background: "rgba(14,26,46,0.7)", backdropFilter: "blur(16px)", border: `1px solid ${NAVY_BORDER}`, padding: 40 }}>
                  <p style={{ ...s("s", 22, 500, TEXT), marginBottom: 6 }}>Send a Request</p>
                  <p style={{ ...s("b", 13, 300, TEXT_MUTED), marginBottom: 28 }}>All enquiries are treated as confidential.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div><label style={labelStyle}>Full Name *</label><input required style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></div>
                      <div><label style={labelStyle}>Email *</label><input required type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div><label style={labelStyle}>Company / Venture</label><input style={inputStyle} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" /></div>
                      <div><label style={labelStyle}>Business Stage</label>
                        <select style={{ ...inputStyle, cursor: "pointer", appearance: "none" }} value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })}>
                          {["", "Pre-seed / Idea", "Seed", "Series A+", "Established SMB", "Family Office / PE", "Other"].map(v => <option key={v} value={v} style={{ background: NAVY_CARD }}>{v || "Select..."}</option>)}
                        </select></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div><label style={labelStyle}>Service of Interest</label>
                        <select style={{ ...inputStyle, cursor: "pointer", appearance: "none" }} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                          {["", "Financial Modelling", "Pitch Deck / Investor Materials", "Capital Raising Preparation", "Fund Structuring", "Strategic Advisory", "Board Reporting", "Operational Tooling", "MVP / Prototyping", "Other / Not Sure"].map(v => <option key={v} value={v} style={{ background: NAVY_CARD }}>{v || "Select..."}</option>)}
                        </select></div>
                      <div><label style={labelStyle}>Indicative Budget</label>
                        <select style={{ ...inputStyle, cursor: "pointer", appearance: "none" }} value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                          {["", "Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Retainer / Ongoing", "Not sure yet"].map(v => <option key={v} value={v} style={{ background: NAVY_CARD }}>{v || "Select..."}</option>)}
                        </select></div>
                    </div>
                    <div><label style={labelStyle}>Timeline</label>
                      <select style={{ ...inputStyle, cursor: "pointer", appearance: "none" }} value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })}>
                        {["", "Urgent — this week", "Within 2 weeks", "Within a month", "Flexible / Just exploring"].map(v => <option key={v} value={v} style={{ background: NAVY_CARD }}>{v || "Select..."}</option>)}
                      </select></div>
                    <div><label style={labelStyle}>Tell me about your project *</label>
                      <textarea required rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Brief overview of what you need help with..." /></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <Btn primary type="submit" disabled={status === "sending" || !form.name || !form.email || !form.message} onClick={handleSubmit} style={{ padding: "14px 40px" }}>
                        {status === "sending" ? "Sending..." : "Submit Request"}
                      </Btn>
                      {status === "error" && <p style={{ ...s("b", 13, 300, "#E07070") }}>Something went wrong. Please email directly.</p>}
                    </div>
                    <p style={{ ...s("b", 11, 300, TEXT_MUTED), lineHeight: 1.5, fontStyle: "italic", opacity: 0.5 }}>Your information will not be shared. I'll respond within one business day.</p>
                  </div>
                </div>
              )}
              <div style={{ marginTop: 16, background: "rgba(14,26,46,0.5)", backdropFilter: "blur(8px)", border: `1px solid ${NAVY_BORDER}`, padding: 18, opacity: 0.6 }}>
                <p style={{ ...s("b", 11, 300, TEXT_MUTED), lineHeight: 1.6, fontStyle: "italic" }}>
                  Evara Advisory provides commercial and strategic advisory services only. We do not provide financial product advice or hold an AFSL.
                </p>
              </div>
            </div>
          </SR>
        </div>
      </div>
    </PhotoSection>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ padding: "48px 80px 32px", borderTop: `1px solid ${NAVY_BORDER}`, background: NAVY_DEEP }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, border: `1px solid ${SILVER}`, display: "flex", alignItems: "center", justifyContent: "center", ...s("s", 15, 500, SILVER, 1) }}>E</div>
            <span style={{ ...s("b", 11, 500, TEXT, 3.5, "uppercase") }}>Evara Advisory</span>
          </div>
          <p style={{ ...s("b", 13, 300, TEXT_MUTED), lineHeight: 1.7, maxWidth: 320 }}>
            Strategic advisory, financial modelling, and capital raising support for founders and private capital groups. Founded by Amar Kashyap. Sydney, Australia.
          </p>
        </div>
        <div>
          <p style={{ ...s("b", 10, 400, ACCENT, 2.5, "uppercase"), marginBottom: 16 }}>Navigation</p>
          {PAGES.map(p => (
            <p key={p} onClick={() => setPage(p)} style={{ ...s("b", 13, 300, TEXT_MUTED), marginBottom: 8, cursor: "pointer", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = TEXT} onMouseLeave={e => e.target.style.color = TEXT_MUTED}>{p}</p>
          ))}
        </div>
        <div>
          <p style={{ ...s("b", 10, 400, ACCENT, 2.5, "uppercase"), marginBottom: 16 }}>Contact</p>
          <a href="mailto:amar.kashyap095@gmail.com" style={{ ...s("b", 13, 300, TEXT_MUTED), marginBottom: 8, display: "block", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = TEXT} onMouseLeave={e => e.target.style.color = TEXT_MUTED}>amar.kashyap095@gmail.com</a>
          <a href="https://www.linkedin.com/in/amar-kashyap" target="_blank" rel="noopener noreferrer" style={{ ...s("b", 13, 300, TEXT_MUTED), marginBottom: 8, display: "block", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = TEXT} onMouseLeave={e => e.target.style.color = TEXT_MUTED}>linkedin.com/in/amar-kashyap</a>
          <p style={{ ...s("b", 13, 300, TEXT_MUTED) }}>Sydney, Australia</p>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${NAVY_BORDER}`, paddingTop: 20, display: "flex", justifyContent: "space-between" }}>
        <span style={{ ...s("b", 11, 300, TEXT_MUTED, 0.5) }}>© 2026 Evara Advisory. All rights reserved.</span>
        <span style={{ ...s("b", 11, 300, TEXT_MUTED, 0.5), fontStyle: "italic" }}>Commercial advisory services only. Not financial product advice.</span>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const h = () => setShow(window.scrollY > 400); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <button className={`back-to-top ${show ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [key, setKey] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 1200); return () => clearTimeout(t); }, []);
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
      <Preloader done={loaded} />
      <div className="grain" />
      <Nav page={page} setPage={nav} />
      <div key={key} className="page-enter">{pages[page]}</div>
      <Footer setPage={nav} />
      <BackToTop />
    </div>
  );
}
