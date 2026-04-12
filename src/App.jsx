import { useState, useEffect, useRef } from "react";

const NAVY = "#121D2E";
const NAVY_DEEP = "#0D1520";
const NAVY_CARD = "#182840";
const NAVY_BORDER = "#213350";
const SILVER = "#B8C4D0";
const SILVER_LIGHT = "#DAE0E8";
const TEXT = "#EDF0F4";
const TEXT_MUTED = "#8494A7";
const ACCENT = "#96ABBE";
const GREEN = "#4ADE80";
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
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Manrope:wght@200;300;400;500&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const styleEl = document.createElement("style");
styleEl.textContent = `
  * { margin: 0; padding: 0; box-sizing: border-box; cursor: none; }
  body { background: ${NAVY_DEEP}; overflow-x: hidden; }
  ::selection { background: ${SILVER}; color: ${NAVY_DEEP}; }
  html { scroll-behavior: smooth; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes lineGrow { from { width: 0; } to { width: 56px; } }
  @keyframes panSlow { 0% { transform: scale(1.06) translate(0,0); } 100% { transform: scale(1.06) translate(-0.8%,-0.5%); } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes menuSlide { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes monogramIn { 0% { opacity: 0; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1); } 100% { opacity: 1; transform: scale(1); } }
  @keyframes preloaderOut { from { opacity: 1; } to { opacity: 0; pointer-events: none; } }
  @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

  .fu { animation: fadeUp 0.8s ease forwards; opacity: 0; }
  .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
  .d4{animation-delay:.4s}.d5{animation-delay:.5s}.d6{animation-delay:.6s}
  .d7{animation-delay:.7s}.d8{animation-delay:.8s}

  .photo-bg { position: absolute; inset: 0; background-size: cover; background-position: center;
    animation: panSlow 25s ease-in-out infinite alternate; }

  .grain { position: fixed; inset: -4px; pointer-events: none; z-index: 9999; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat; background-size: 256px;
    animation: grainShift 0.5s steps(3) infinite; }
  @keyframes grainShift { 0% { transform: translate(0,0); } 33% { transform: translate(-3px,2px); } 66% { transform: translate(2px,-2px); } 100% { transform: translate(-1px,3px); } }

  .scroll-progress { position: fixed; top: 0; left: 0; height: 2px; z-index: 101;
    background: linear-gradient(90deg, ${ACCENT}, ${SILVER_LIGHT}); transition: width 0.05s linear; }

  .custom-cursor { position: fixed; width: 20px; height: 20px; border-radius: 50%;
    border: 1px solid rgba(150,171,190,0.35); pointer-events: none; z-index: 10001;
    transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    transform: translate(-50%, -50%); }
  .custom-cursor.hovering { width: 48px; height: 48px; border-color: rgba(150,171,190,0.5);
    background: rgba(150,171,190,0.05); }

  input, textarea, select { font-family: 'Manrope', sans-serif; }
  input:focus, textarea:focus, select:focus { outline: none; border-color: ${ACCENT} !important; }

  .scroll-reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

  .card-glow { transition: all 0.4s ease; position: relative; }
  .card-glow:hover { box-shadow: 0 0 40px rgba(150,171,190,0.06), 0 8px 32px rgba(0,0,0,0.2); transform: translateY(-2px); }

  .tag { transition: all 0.3s ease; cursor: default; }
  .tag:hover { border-color: ${ACCENT} !important; color: ${TEXT} !important; }

  .page-enter { animation: fadeUp 0.5s ease forwards; }

  .nav-link { position: relative; }
  .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 50%; width: 0; height: 1px; background: ${SILVER}; transition: all 0.3s ease; transform: translateX(-50%); }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active::after { width: 100%; opacity: 0.6; }

  .preloader { position: fixed; inset: 0; z-index: 10000; background: ${NAVY_DEEP}; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; }
  .preloader.done { animation: preloaderOut 0.8s ease forwards; animation-delay: 0.2s; }
  .preloader .mono { animation: monogramIn 1.2s ease forwards; }

  .back-to-top { position: fixed; bottom: 24px; right: 24px; z-index: 90; width: 44px; height: 44px;
    border-radius: 50%; border: 1px solid ${NAVY_BORDER}; background: rgba(18,29,46,0.9);
    backdrop-filter: blur(12px); cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.3s ease; opacity: 0; transform: translateY(10px); pointer-events: none; }
  .back-to-top.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .back-to-top:hover { border-color: ${ACCENT}; transform: translateY(-2px); }

  .nav-mono { transition: all 0.4s ease; }
  .nav-mono:hover { box-shadow: 0 0 20px rgba(150,171,190,0.15); border-color: ${SILVER_LIGHT} !important; }

  .marquee-wrap { overflow: hidden; white-space: nowrap; }
  .marquee-inner { display: inline-block; animation: marquee 35s linear infinite; }

  a { color: inherit; }

  .desktop-only { display: flex; }
  .mobile-only { display: none; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; }
  .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1px; }
  .grid-about { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; }
  .grid-contact { display: grid; grid-template-columns: 1fr 1.3fr; gap: 80px; }
  .grid-footer { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 48px; }
  .grid-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .stats-bar { display: flex; }
  .testimonial-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  .social-proof { display: flex; gap: 40px; align-items: center; justify-content: center; }
  .tabs-row { display: flex; gap: 0; overflow-x: auto; }
  .tabs-row::-webkit-scrollbar { display: none; }
  .section-pad { padding: 80px 100px; }
  .section-pad-top { padding: 170px 100px 100px; }
  .hero-pad { padding: 180px 100px 0; }
  .hero-title { font-size: 84px; }
  .logo-bar { display: flex; align-items: center; justify-content: center; gap: 64px; flex-wrap: wrap; }
  .process-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 0; max-width: 900px; margin: 0 auto; }

  @media (max-width: 1024px) {
    .grid-3 { grid-template-columns: 1fr 1fr; }
    .grid-4 { grid-template-columns: 1fr 1fr; }
    .process-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .section-pad { padding: 64px 60px; }
    .section-pad-top { padding: 150px 60px 80px; }
    .hero-pad { padding: 150px 60px 0; }
  }

  @media (max-width: 768px) {
    .desktop-only { display: none !important; }
    .mobile-only { display: flex !important; }
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    .grid-about { grid-template-columns: 1fr; gap: 40px; }
    .grid-contact { grid-template-columns: 1fr; gap: 40px; }
    .grid-footer { grid-template-columns: 1fr; gap: 32px; }
    .grid-form-row { grid-template-columns: 1fr; }
    .stats-bar { flex-direction: column; gap: 20px; }
    .stats-bar > div { border-right: none !important; padding-right: 0; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 16px; }
    .stats-bar > div:last-child { border-bottom: none; padding-bottom: 0; }
    .testimonial-grid { grid-template-columns: 1fr; }
    .social-proof { flex-direction: column; gap: 20px; }
    .social-proof > div[style*="width: 1px"] { width: 40px !important; height: 1px !important; }
    .section-pad { padding: 48px 24px; }
    .section-pad-top { padding: 120px 24px 56px; }
    .hero-pad { padding: 120px 24px 0; }
    .hero-title { font-size: 48px; }
    .logo-bar { gap: 24px; }
    .logo-bar > div[style*="width: 1px"] { display: none; }
    .process-grid { grid-template-columns: 1fr; gap: 32px; }
    .card-glow:hover { transform: none; }
    .custom-cursor { display: none !important; }
    * { cursor: auto !important; }
  }
`;
document.head.appendChild(styleEl);

const h = (fam, sz, wt, col, ls, tt) => ({
  fontFamily: fam === "s" ? "'Cormorant Garamond', serif" : "'Manrope', sans-serif",
  fontSize: sz, fontWeight: wt, color: col, letterSpacing: ls || 0, textTransform: tt || "none",
});

function useIsMobile() {
  const [m, setM] = useState(window.innerWidth <= 768);
  useEffect(() => { const fn = () => setM(window.innerWidth <= 768); window.addEventListener("resize", fn); return () => window.removeEventListener("resize", fn); }, []);
  return m;
}

// Particle Network - interactive constellation on hero
function ParticleNetwork({ style }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const mob = useIsMobile();
  useEffect(() => {
    if (mob) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, ht, particles, raf;
    const resize = () => { w = canvas.width = canvas.offsetWidth; ht = canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const count = 120;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * ht,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
    }));
    const move = (e) => { const r = canvas.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    canvas.addEventListener("mousemove", move);
    const draw = () => {
      ctx.clearRect(0, 0, w, ht);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > ht) p.vy *= -1;
        // cursor repulsion
        const dx = p.x - mouse.current.x, dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) { p.x += dx * 0.005; p.y += dy * 0.005; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,171,190,0.15)"; ctx.fill();
      });
      // connections
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(150,171,190,${0.06 * (1 - dist / 200)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); canvas.removeEventListener("mousemove", move); };
  }, [mob]);
  if (mob) return null;
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "auto", ...style }} />;
}

// Custom Cursor
function CustomCursor() {
  const ref = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const mob = useIsMobile();
  useEffect(() => {
    if (mob) return;
    const move = (e) => { target.current = { x: e.clientX, y: e.clientY }; };
    const over = () => ref.current?.classList.add("hovering");
    const out = () => ref.current?.classList.remove("hovering");
    window.addEventListener("mousemove", move);
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (ref.current) { ref.current.style.left = pos.current.x + "px"; ref.current.style.top = pos.current.y + "px"; }
      requestAnimationFrame(loop);
    };
    loop();
    const addHover = () => {
      document.querySelectorAll("button, a, .card-glow, .tag, .nav-link, .nav-mono").forEach(el => {
        el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out);
      });
    };
    addHover();
    const obs = new MutationObserver(addHover);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("mousemove", move); obs.disconnect(); };
  }, [mob]);
  if (mob) return null;
  return <div ref={ref} className="custom-cursor" />;
}

// Scroll Progress Bar
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const fn = () => {
      const st = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(h > 0 ? (st / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

// Tilt Card - 3D perspective on hover
function TiltCard({ children, className, style: sx }) {
  const ref = useRef(null);
  const mob = useIsMobile();
  const handleMove = (e) => {
    if (mob) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  };
  return (
    <div ref={ref} className={className} style={{ ...sx, transition: "transform 0.3s ease, box-shadow 0.4s ease", transformStyle: "preserve-3d" }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []); return ref;
}

function SR({ children, delay = 0, style }) {
  const ref = useScrollReveal();
  return <div ref={ref} className="scroll-reveal" style={{ transitionDelay: `${delay}s`, ...style }}>{children}</div>;
}

function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0); const ref = useRef(null); const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) { started.current = true; const st = Date.now();
        const tick = () => { const p = Math.min((Date.now() - st) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end)); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick); }
    }, { threshold: 0.5 }); obs.observe(el); return () => obs.disconnect();
  }, [end, duration]); return <span ref={ref}>{count}{suffix}</span>;
}

function PhotoSection({ src, overlay = 0.82, children, style: sx }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...sx }}>
      <div className="photo-bg" style={{ backgroundImage: `url(${src})` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(13,21,32,${overlay}) 0%, rgba(13,21,32,${Math.min(overlay + 0.1, 0.96)}) 100%)` }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function Line({ style }) { return <div style={{ height: 1, background: `linear-gradient(90deg, ${SILVER}, transparent)`, animation: "lineGrow 1s ease forwards", width: 56, opacity: 0.4, ...style }} />; }

function Btn({ children, primary, onClick, style: bsx, type, disabled }) {
  const [hv, setHv] = useState(false);
  const base = primary
    ? { background: hv && !disabled ? SILVER_LIGHT : SILVER, border: `1px solid ${SILVER}`, color: NAVY_DEEP, boxShadow: hv ? "0 4px 20px rgba(180,188,200,0.2)" : "none" }
    : { background: hv ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)", border: `1px solid ${hv ? SILVER : "rgba(255,255,255,0.3)"}`, color: SILVER_LIGHT };
  return (
    <button type={type} disabled={disabled} onClick={onClick} onMouseEnter={() => setHv(true)} onMouseLeave={() => setHv(false)}
      style={{ ...base, padding: "15px 36px", ...h("b", 10.5, 500, null, 3, "uppercase"), cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.35s", backdropFilter: "blur(4px)", opacity: disabled ? 0.5 : 1, ...bsx }}>
      {children}
    </button>
  );
}

function Preloader({ done }) {
  return (
    <div className={`preloader ${done ? "done" : ""}`}>
      <div className="mono" style={{ width: 64, height: 64, border: `1px solid ${SILVER}`, display: "flex", alignItems: "center", justifyContent: "center", ...h("s", 32, 400, SILVER, 2) }}>E</div>
      <div style={{ ...h("b", 10, 400, TEXT_MUTED, 4, "uppercase"), animation: "pulse 2s ease infinite" }}>Evara Advisory</div>
    </div>
  );
}

function Marquee() {
  const items = "Capital Strategy · Fund Structuring · Investor Materials · Transaction Support · Due Diligence · Commercial Agreements · Financial Modelling · Board Reporting · ";
  return (
    <div className="marquee-wrap" style={{ padding: "16px 0", borderTop: `1px solid rgba(255,255,255,0.04)`, borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
      <div className="marquee-inner">
        <span style={{ ...h("b", 11, 300, TEXT_MUTED, 3, "uppercase"), opacity: 0.35 }}>{items}{items}{items}{items}</span>
      </div>
    </div>
  );
}

function AvailabilityBadge() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: `1px solid rgba(74,222,128,0.2)`, borderRadius: 20, background: "rgba(74,222,128,0.04)" }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, boxShadow: `0 0 8px rgba(74,222,128,0.4)`, animation: "pulse 2s ease infinite" }} />
      <span style={{ ...h("b", 10, 400, GREEN, 2, "uppercase"), opacity: 0.8 }}>Accepting select engagements</span>
    </div>
  );
}

function Nav({ page, setPage }) {
  const [sc, setSc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mob = useIsMobile();
  useEffect(() => { const fn = () => setSc(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { setMenuOpen(false); }, [page]);
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: mob ? "0 20px" : "0 48px", height: 74,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: sc || menuOpen ? "rgba(13,21,32,0.95)" : "transparent",
        backdropFilter: sc || menuOpen ? "blur(24px) saturate(1.2)" : "none",
        borderBottom: `1px solid ${sc || menuOpen ? NAVY_BORDER : "transparent"}`,
        transition: "all 0.4s", animation: "slideDown 0.8s ease forwards",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }} onClick={() => setPage("Home")}>
          <div className="nav-mono" style={{ width: 38, height: 38, border: `1px solid ${SILVER}`, display: "flex", alignItems: "center", justifyContent: "center", ...h("s", 18, 400, SILVER, 1) }}>E</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ ...h("b", 10.5, 500, TEXT, 4, "uppercase") }}>Evara</span>
            <span style={{ ...h("b", 8, 300, TEXT_MUTED, 3, "uppercase") }}>Advisory</span>
          </div>
        </div>
        <div className="desktop-only" style={{ gap: 36 }}>
          {PAGES.map(p => (
            <button key={p} onClick={() => setPage(p)} className={`nav-link ${page === p ? "active" : ""}`} style={{
              background: "none", border: "none", cursor: "pointer",
              ...h("b", 10, 500, page === p ? SILVER_LIGHT : TEXT_MUTED, 3, "uppercase"),
              transition: "color 0.3s", padding: "4px 0",
            }}>{p}</button>
          ))}
        </div>
        <button className="mobile-only" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5,
        }}>
          <div style={{ width: 22, height: 1.5, background: SILVER, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <div style={{ width: 22, height: 1.5, background: SILVER, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 22, height: 1.5, background: SILVER, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </nav>
      {mob && menuOpen && (
        <div style={{ position: "fixed", top: 74, left: 0, right: 0, zIndex: 99, background: "rgba(13,21,32,0.98)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${NAVY_BORDER}`, padding: "16px 24px", animation: "menuSlide 0.3s ease forwards" }}>
          {PAGES.map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", ...h("b", 13, 400, page === p ? SILVER_LIGHT : TEXT_MUTED, 2, "uppercase"), padding: "14px 0", borderBottom: `1px solid ${NAVY_BORDER}` }}>{p}</button>
          ))}
        </div>
      )}
    </>
  );
}

function HomePage({ setPage }) {
  return (
    <PhotoSection src={PHOTOS.hero} overlay={0.76}>
      <div className="hero-pad" style={{ maxWidth: 780 }}>
        <p className="fu d1" style={{ ...h("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 28 }}>Advisory · Modelling · Capital Strategy</p>
        <h1 className="fu d3 hero-title" style={{ ...h("s", 84, 300, TEXT), lineHeight: 1.0, marginBottom: 10 }}>
          Evara<br />Advisory
        </h1>
        <p className="fu d3" style={{ ...h("b", 12, 300, TEXT_MUTED, 0.5), marginTop: 10, marginBottom: 14 }}>Founded by Amar Kashyap</p>
        <Line style={{ marginBottom: 36 }} />
        <p className="fu d4" style={{ ...h("b", 16, 300, SILVER), lineHeight: 1.85, maxWidth: 520, marginBottom: 20 }}>
          Strategic advisory and transaction support for founders raising capital and private capital groups deploying it.
        </p>
        <p className="fu d5" style={{ ...h("s", 16, 400, TEXT_MUTED), lineHeight: 1.75, maxWidth: 540, marginBottom: 52, fontStyle: "italic", opacity: 0.5 }}>
          Institutional banking · Venture capital · Private equity
        </p>
        <div className="fu d6" style={{ display: "flex", gap: 16, marginBottom: 80, flexWrap: "wrap" }}>
          <Btn primary onClick={() => setPage("Contact")}>Get in Touch</Btn>
          <Btn primary onClick={() => setPage("Services")}>View Services</Btn>
        </div>
      </div>
      <div className="fu d7 stats-bar" style={{ padding: "40px 100px 36px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {[[7, "+", "Years in Private Markets"], [null, "Early Stage → Enterprise", "Across the Business Lifecycle"], [null, "Modelling · Strategy · Capital", "Core Competencies"], [null, "Sydney", "Australia"]].map(([num, big, small], i) => (
          <div key={i} style={{ flex: 1, borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", paddingRight: 28 }}>
            <div style={{ ...h("s", 24, 300, SILVER_LIGHT), marginBottom: 8 }}>{num !== null ? <Counter end={num} suffix={big} /> : big}</div>
            <div style={{ ...h("b", 9, 300, TEXT_MUTED, 2, "uppercase") }}>{small}</div>
          </div>
        ))}
      </div>
      <Marquee />
      <div className="fu d8 social-proof" style={{ padding: "28px 100px 56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ ...h("s", 28, 300, ACCENT), opacity: 0.3 }}>"</div>
          <p style={{ ...h("s", 15, 400, TEXT_MUTED), fontStyle: "italic", maxWidth: 340 }}>A key part of our team feeling confident approaching investors.</p>
          <span style={{ ...h("b", 9, 300, ACCENT, 2, "uppercase"), opacity: 0.5 }}>— Founder & CEO</span>
        </div>
        <div style={{ width: 1, height: 24, background: NAVY_BORDER }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ ...h("s", 28, 300, ACCENT), opacity: 0.3 }}>"</div>
          <p style={{ ...h("s", 15, 400, TEXT_MUTED), fontStyle: "italic", maxWidth: 340 }}>Understood our business quickly and delivered exactly what we needed.</p>
          <span style={{ ...h("b", 9, 300, ACCENT, 2, "uppercase"), opacity: 0.5 }}>— Legaltech Founder</span>
        </div>

      </div>
    </PhotoSection>
  );
}

function AboutPage() {
  const timeline = [
    { year: "2019", role: "Institutional Banking", org: "ANZ", desc: "M&A advisory and leveraged finance — structuring and syndicating facilities for PE sponsors. Moved into the bank's venture arm, deploying capital into growth-stage fintech from Series A." },
    { year: "2022", role: "Corporate Development", org: "PEXA Group", desc: "Proptech venture investments and corporate development strategy for a major ASX-listed technology platform." },
    { year: "2023", role: "Founding Hire", org: "Early-Stage Venture Fund", desc: "Sole-led due diligence and IC approvals. Managed LP communications and fund capital raising. Deployed over $10M in equity capital across multiple portfolio companies." },
    { year: "2026", role: "Founder", org: "Evara Advisory", desc: "Independent advisory practice. Three mandates in the first quarter — fund structuring, investor readiness, and strategic advisory." },
  ];
  return (
    <>
      {/* Hero */}
      <PhotoSection src={PHOTOS.about} overlay={0.86}>
        <div className="section-pad-top">
          <div className="grid-about" style={{ alignItems: "end" }}>
            <div>
              <SR><p style={{ ...h("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>About</p></SR>
              <SR delay={0.1}><h2 style={{ ...h("s", 56, 300, TEXT), marginBottom: 10, lineHeight: 1.05 }}>The Principal</h2></SR>
              <SR delay={0.2}><p style={{ ...h("s", 20, 400, SILVER), lineHeight: 1.7, maxWidth: 500, marginTop: 20, fontStyle: "italic" }}>
                Evara Advisory was founded to deliver institutional-quality advisory and transaction support directly to founders and capital allocators — without the overhead of a large firm.
              </p></SR>
            </div>
            <SR delay={0.3}><div style={{ textAlign: "right" }}>
              <div style={{ ...h("s", 120, 300, ACCENT), lineHeight: 1, opacity: 0.12 }}>7+</div>
              <p style={{ ...h("b", 10, 500, TEXT_MUTED, 3, "uppercase"), marginTop: -8 }}>Years in Private Markets</p>
            </div></SR>
          </div>
        </div>
      </PhotoSection>

      {/* Intro — two column with pull quote */}
      <div className="section-pad" style={{ background: NAVY_DEEP, borderBottom: `1px solid ${NAVY_BORDER}` }}>
        <div className="grid-about">
          <div>
            <SR><p style={{ ...h("b", 15, 300, TEXT_MUTED), lineHeight: 1.95, marginBottom: 28 }}>
              The firm is led by Amar Kashyap, drawing on seven years across institutional banking, venture capital, corporate development, and family office advisory. Transaction execution, capital strategy, fund structuring, due diligence, and investor materials — from Series A through to complex multi-jurisdictional mandates.
            </p></SR>
            <SR delay={0.1}><p style={{ ...h("b", 15, 300, TEXT_MUTED), lineHeight: 1.95, marginBottom: 28 }}>
              Established in early 2026 and based in Sydney, Evara Advisory operates with limited capacity by design. A deliberately small client list ensures every engagement receives full attention and institutional-grade delivery.
            </p></SR>
            <SR delay={0.2}><p style={{ ...h("b", 15, 300, TEXT_MUTED), lineHeight: 1.95 }}>
              The firm leverages advanced AI tooling across its workflow — compressing timelines and deepening analysis in ways that traditional advisory models cannot replicate.
            </p></SR>
          </div>
          <SR delay={0.2}><div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: 32, opacity: 0.8 }}>
              <p style={{ ...h("s", 26, 400, TEXT), lineHeight: 1.6, fontStyle: "italic", marginBottom: 16 }}>
                "Institutional rigour. Boutique delivery."
              </p>
              <p style={{ ...h("b", 10, 500, ACCENT, 2.5, "uppercase") }}>— Amar Kashyap</p>
            </div>
          </div></SR>
        </div>
      </div>

      {/* Career Timeline — visual */}
      <div className="section-pad" style={{ background: NAVY }}>
        <SR><p style={{ ...h("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 14, textAlign: "center" }}>Career</p></SR>
        <SR delay={0.1}><h3 style={{ ...h("s", 34, 300, TEXT), textAlign: "center", marginBottom: 64 }}>Principal Background</h3></SR>
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 1, background: `linear-gradient(180deg, ${ACCENT}, ${NAVY_BORDER})`, opacity: 0.3 }} />
          {timeline.map((t, i) => (
            <SR key={i} delay={i * 0.12}>
              <div style={{ display: "flex", gap: 36, marginBottom: i < timeline.length - 1 ? 48 : 0, position: "relative" }}>
                {/* Dot */}
                <div style={{ flexShrink: 0, width: 32, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: i === timeline.length - 1 ? GREEN : ACCENT, border: `2px solid ${NAVY}`, boxShadow: i === timeline.length - 1 ? `0 0 12px rgba(74,222,128,0.4)` : `0 0 8px rgba(150,171,190,0.2)`, position: "relative", zIndex: 1 }} />
                </div>
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ ...h("s", 28, 300, i === timeline.length - 1 ? GREEN : SILVER_LIGHT), opacity: i === timeline.length - 1 ? 0.9 : 0.6 }}>{t.year}</span>
                    <span style={{ ...h("b", 10, 500, ACCENT, 2, "uppercase") }}>{t.role}</span>
                  </div>
                  <p style={{ ...h("s", 20, 500, TEXT), marginBottom: 8 }}>{t.org}</p>
                  <p style={{ ...h("b", 13.5, 300, TEXT_MUTED), lineHeight: 1.8 }}>{t.desc}</p>
                </div>
              </div>
            </SR>
          ))}
        </div>
      </div>

      {/* Credential cards — 3 column dynamic */}
      <div className="section-pad" style={{ background: NAVY_DEEP }}>
        <div className="grid-2" style={{ gap: 18, background: "transparent" }}>
          <SR><div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 36 }}>
            <p style={{ ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 18 }}>Career Heritage</p>
            {["ANZ — M&A & Leveraged Finance", "Bank Venture Arm — Growth-Stage Tech Investments", "PEXA Group — Corporate Development", "Venture Capital Fund — Founding Hire & Fund Operations", "Family Office — Fund Structuring & Investment Strategy"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 4 ? 14 : 0 }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                <p style={{ ...h("b", 12.5, 300, TEXT_MUTED), lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div></SR>
          <SR delay={0.1}><div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 36 }}>
            <p style={{ ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 18 }}>Education</p>
            <p style={{ ...h("s", 18, 500, TEXT), marginBottom: 2 }}>UNSW Sydney</p>
            <p style={{ ...h("b", 12, 300, TEXT_MUTED), lineHeight: 1.5, marginBottom: 4 }}>B.Commerce / B.Information Systems</p>
            <p style={{ ...h("b", 12, 400, SILVER_LIGHT), marginBottom: 20 }}>Graduated with Distinction</p>
            <div style={{ borderTop: `1px solid ${NAVY_BORDER}`, paddingTop: 16 }}>
              <p style={{ ...h("s", 16, 500, TEXT), marginBottom: 2 }}>University of Illinois</p>
              <p style={{ ...h("b", 11, 300, TEXT_MUTED), lineHeight: 1.5 }}>12-month international exchange, 2016</p>
              <p style={{ ...h("b", 12, 400, SILVER_LIGHT), marginTop: 2 }}>4.0 GPA</p>
            </div>
          </div></SR>
          <SR delay={0.15}><div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 36 }}>
            <p style={{ ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 18 }}>Who I Work With</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {["Family Offices", "PE-Backed Platforms", "Seed & Series A Founders", "Franchise Groups", "SMB Operators", "Established Businesses"].map(item => (
                <span key={item} className="tag" style={{ ...h("b", 10.5, 300, TEXT_MUTED, 0.5), padding: "8px 16px", border: `1px solid ${NAVY_BORDER}` }}>{item}</span>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${NAVY_BORDER}`, paddingTop: 20 }}>
              <p style={{ ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 14 }}>Sector Exposure</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Fintech", "Proptech", "Health & Wellness", "Sports Technology", "Franchising", "Legaltech", "Building & Construction", "Beauty & Retail"].map(item => (
                  <span key={item} className="tag" style={{ ...h("b", 10.5, 300, TEXT_MUTED, 0.5), padding: "8px 16px", border: `1px solid ${NAVY_BORDER}` }}>{item}</span>
                ))}
              </div>
            </div>
          </div></SR>
          <SR delay={0.2}><div className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 36 }}>
            <p style={{ ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 18 }}>Approach</p>
            {["Institutional rigour, boutique delivery", "AI-enhanced speed & depth", "Outcome-scoped, no ambiguity", "NDA-first on sensitive work"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 3 ? 14 : 0 }}>
                <span style={{ color: ACCENT, fontSize: 11 }}>→</span>
                <p style={{ ...h("b", 12.5, 300, TEXT_MUTED), lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div></SR>
        </div>
      </div>
    </>
  );
}

function ServiceCard({ item, i, activeTab }) {
  const [hov, setHov] = useState(false);
  return (
    <TiltCard className="card-glow"
      style={{ background: hov ? NAVY_CARD : NAVY_DEEP, padding: 40, cursor: "default", border: `1px solid ${NAVY_BORDER}`, borderLeft: hov ? `2px solid ${ACCENT}` : `1px solid ${NAVY_BORDER}` }}
    >
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ height: "100%" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", ...h("b", 10, 400, ACCENT), marginBottom: 18, opacity: 0.4 }}>{String(i + 1).padStart(2, "0")}</div>
        <h4 style={{ ...h("s", 21, 500, TEXT), marginBottom: 12 }}>{item.t}</h4>
        <p style={{ ...h("b", 13, 300, TEXT_MUTED), lineHeight: 1.85 }}>{item.d}</p>
      </div>
    </TiltCard>
  );
}

function ServicesPage() {
  const segments = [
    { id: "foundations", label: "Building Foundations", sub: "Getting the structure right before you go to market — equity, agreements, and the commercial backbone of your business.",
      items: [
        { t: "Equity Structuring & Co-Founder Alignment", d: "Designing fair, defensible equity splits and vesting frameworks that protect all parties and hold up as the business scales. Getting this right early avoids the disputes that derail companies later." },
        { t: "Shareholder & Commercial Agreements", d: "Drafting shareholder agreements, ESOP frameworks, key commercial contracts, and partnership terms. Structured to protect founders while remaining investor-friendly when the time comes." },
        { t: "First Financial Model & Business Plan", d: "A clean, credible model that maps your revenue logic, unit economics, and cash runway — the baseline document every serious conversation will reference." },
        { t: "Entity Structuring", d: "Guidance on company setup, holding structures, and jurisdictional considerations — ensuring your corporate architecture supports future fundraising and growth." },
        { t: "Product Prototyping & MVPs", d: "Functional prototypes, landing pages, and interactive demos to validate your concept with early customers or support initial investor conversations." },
      ] },
    { id: "raising", label: "Raising Capital", sub: "End-to-end preparation for founders and fund managers raising institutional or private capital.",
      items: [
        { t: "Financial Models & Valuation Frameworks", d: "Unit economics, revenue forecasts, scenario analysis, cash runway, and valuation frameworks. Built to withstand investor due diligence — not just for the spreadsheet, but for the conversation." },
        { t: "Pitch Decks & Investor Materials", d: "Compelling, structured decks, investment memoranda, one-pagers, and teasers. Built from scratch around your story and your numbers — not templates." },
        { t: "Data Room & Process Management", d: "Full data room build-out on DocSend, model stress-testing, investor shortlisting, narrative refinement, and end-to-end process management through to close." },
        { t: "Investor Readiness & Coaching", d: "Sharpen your narrative, pressure-test assumptions, and rehearse for the tough questions. Candid feedback from someone who has sat on both sides of the table." },
        { t: "Investor Targeting & Introductions", d: "Identifying the right investors for your stage and sector, warm introductions where possible, and strategic sequencing of your outreach." },
      ] },
    { id: "deploying", label: "Deploying Capital", sub: "Transaction support and fund operations for family offices, VC, and PE.",
      items: [
        { t: "Fund Structuring & Waterfall Modelling", d: "End-to-end fund architecture — vehicle design, capital deployment logic, GP/LP economics, distribution waterfalls, and cross-border structuring across multiple jurisdictions." },
        { t: "Due Diligence & IC Support", d: "Commercial due diligence workstreams, management presentation preparation, and IC memo drafting. Experience sole-leading DD from initial screening to Investment Committee approval." },
        { t: "Deal Documentation", d: "Information memoranda, confidential teasers, process letters, and data room structuring. Materials that accelerate deal execution and reduce back-and-forth." },
        { t: "LP Communications & Fund Reporting", d: "Quarterly LP reports, capital call notices, distribution notices, and fund performance reporting. Clear, professional communications that maintain investor confidence." },
        { t: "Portfolio Strategy & M&A Screening", d: "Revenue diversification planning, sector evaluation, bolt-on acquisition analysis, and strategic review for portfolio companies and multi-site operators." },
      ] },
    { id: "scaling", label: "Scaling Operations", sub: "Commercial tools, reporting, and strategic advisory for businesses ready to professionalise.",
      items: [
        { t: "Strategic & Commercial Advisory", d: "Market entry analysis, revenue model design, pricing strategy, and growth planning for established operators looking to expand or optimise their core business." },
        { t: "Board Packs & Stakeholder Reporting", d: "Structured board packs, quarterly updates, and management reporting frameworks. Decision-oriented documents that build confidence with investors and partners." },
        { t: "Financial Systems & Dashboards", d: "Custom Excel models, KPI dashboards, and operational reporting tools. Clean, powerful, and built to evolve with your business — at a fraction of enterprise software cost." },
        { t: "Operational Tooling", d: "Custom-built systems for pricing, estimating, forecasting, and workflows. For businesses that have outgrown spreadsheets but aren't ready for enterprise software." },
        { t: "Exit & Partner Readiness", d: "Whether you're bringing on a strategic partner, exploring private equity, or preparing for an eventual exit — getting your financials, story, and data room to the standard buyers expect." },
      ] },
  ];
  const process = [
    { step: "01", title: "Scoping Call", desc: "30-minute intro call to understand your situation, goals, and timeline. No charge." },
    { step: "02", title: "Proposal & Scope", desc: "Clear written scope with deliverables, timeline, and fixed fee or retainer." },
    { step: "03", title: "NDA & Kickoff", desc: "Mutual NDA executed. Access to materials. Structured kickoff." },
    { step: "04", title: "Delivery & Review", desc: "Iterative delivery with milestone check-ins. Institutional-standard output." },
  ];
  const [activeTab, setActiveTab] = useState("foundations");
  const active = segments.find(sg => sg.id === activeTab);
  return (
    <>
      <PhotoSection src={PHOTOS.services} overlay={0.88}>
        <div className="section-pad-top">
          <SR><p style={{ ...h("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>Services</p></SR>
          <SR delay={0.1}><h2 style={{ ...h("s", 52, 300, TEXT), marginBottom: 14 }}>How I Help</h2></SR>
          <SR delay={0.15}><Line style={{ marginBottom: 28 }} /></SR>
          <SR delay={0.2}><p style={{ ...h("b", 15, 300, SILVER), lineHeight: 1.85, maxWidth: 620, marginBottom: 14 }}>
            Scoped around outcomes, not hours. Select where you are below.
          </p></SR>
          <SR delay={0.25}><p style={{ ...h("b", 11, 300, TEXT_MUTED), lineHeight: 1.6, maxWidth: 580, fontStyle: "italic", opacity: 0.5 }}>
            Evara Advisory provides commercial and strategic advisory services. We do not provide financial product advice.
          </p></SR>
        </div>
      </PhotoSection>
      <div style={{ background: NAVY, borderBottom: `1px solid ${NAVY_BORDER}`, padding: "0 24px", overflowX: "auto" }}>
        <div className="tabs-row">
          {segments.map(sg => (
            <button key={sg.id} onClick={() => setActiveTab(sg.id)} style={{
              background: activeTab === sg.id ? NAVY_DEEP : "transparent",
              border: "none", borderBottom: activeTab === sg.id ? `2px solid ${ACCENT}` : "2px solid transparent",
              padding: "18px 24px", cursor: "pointer", transition: "all 0.3s",
              ...h("b", 10, 500, activeTab === sg.id ? SILVER_LIGHT : TEXT_MUTED, 2, "uppercase"),
              whiteSpace: "nowrap",
            }}>{sg.label}</button>
          ))}
        </div>
      </div>
      <div className="section-pad" style={{ background: NAVY_DEEP }} key={activeTab}>
        <div className="page-enter">
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ ...h("s", 30, 400, TEXT), marginBottom: 10 }}>{active.label}</h3>
            <p style={{ ...h("b", 14, 300, TEXT_MUTED), lineHeight: 1.75 }}>{active.sub}</p>
          </div>
          <div className={active.items.length > 4 ? "grid-3" : "grid-2"} style={{ background: "transparent", gap: 1 }}>
            {active.items.map((item, i) => (
              <ServiceCard key={`${activeTab}-${i}`} item={item} i={i} activeTab={activeTab} />
            ))}
          </div>
        </div>
      </div>
      {/* AI Section */}
      <div className="section-pad" style={{ background: NAVY, borderTop: `1px solid ${NAVY_BORDER}` }}>
        <SR><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", ...h("b", 16, 300, ACCENT), opacity: 0.5 }}>⚡</div>
          <h3 style={{ ...h("s", 28, 400, TEXT) }}>AI Adoption & Automation</h3>
        </div></SR>
        <SR delay={0.1}><p style={{ ...h("b", 14, 300, TEXT_MUTED), lineHeight: 1.85, maxWidth: 620, marginBottom: 40 }}>
          Embedded across all engagements. AI-augmented delivery that compresses timelines without compromising depth.
        </p></SR>
        <div className="grid-4" style={{ gap: "1px", background: NAVY_BORDER, alignItems: "stretch" }}>
          {[
            { t: "AI Strategy & Readiness", d: "Structured review of your operations to identify where AI delivers the highest impact. Practical roadmap, not buzzwords." },
            { t: "Custom Workflows & Automations", d: "Purpose-built AI workflows — automated reporting, document generation, data extraction, and client communications." },
            { t: "AI-Powered Tools & Apps", d: "Bespoke internal tools with AI at their core — dashboards, intelligent document search, proposal generators, pricing engines." },
            { t: "Process Automation", d: "Connecting your existing tools with AI — CRM workflows, invoice processing, lead qualification, content generation." },
          ].map((item, i) => (
            <SR key={i} delay={i * 0.1} style={{ display: "flex" }}><div className="card-glow" style={{ background: NAVY_DEEP, padding: 32, flex: 1 }}>
              <h4 style={{ ...h("s", 18, 500, TEXT), marginBottom: 12 }}>{item.t}</h4>
              <p style={{ ...h("b", 12.5, 300, TEXT_MUTED), lineHeight: 1.8 }}>{item.d}</p>
            </div></SR>
          ))}
        </div>
      </div>
      {/* Process */}
      <div className="section-pad" style={{ background: NAVY, borderTop: `1px solid ${NAVY_BORDER}` }}>
        <SR><p style={{ ...h("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16, textAlign: "center" }}>Process</p></SR>
        <SR delay={0.1}><h3 style={{ ...h("s", 32, 300, TEXT), textAlign: "center", marginBottom: 56 }}>How Engagements Work</h3></SR>
        <div className="process-grid">
          {process.map((p, i) => (
            <SR key={i} delay={i * 0.12}><div style={{ textAlign: "center", padding: "0 16px", position: "relative" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", ...h("b", 10, 400, ACCENT), margin: "0 auto 18px", background: NAVY, position: "relative", zIndex: 1 }}>{p.step}</div>
              <h4 style={{ ...h("s", 18, 500, TEXT), marginBottom: 10 }}>{p.title}</h4>
              <p style={{ ...h("b", 12, 300, TEXT_MUTED), lineHeight: 1.7 }}>{p.desc}</p>
            </div></SR>
          ))}
        </div>
      </div>
    </>
  );
}

function TrackRecordPage({ setPage }) {
  const recent = [
    { sector: "Health & Fitness", client: "Private Franchise Group", type: "Fund Structuring · Financial Modelling · Investor Materials", detail: "Managed initial legal structuring and fund establishment in coordination with external legal counsel. Developed the complete fund model — vehicle architecture, capital deployment logic, distribution waterfall mechanics, and scenario analysis. Produced the full Investment Memorandum and board-level presentation materials for an institutional equity raise." },
    { sector: "Beauty & Medical", client: "Consumer Business — Founder & CEO", type: "Commercial Agreements · Financial Model · Investor Deck", detail: "Building a comprehensive set of key commercial agreements, financial model, and investor deck to prepare the founder for capital raising conversations. End-to-end investor readiness support from narrative through to data room." },
    { sector: "Legal Technology", client: "Legaltech Platform — Founder", type: "Strategic Advisory · Financial Modelling · Investor Readiness", detail: "Advising the founder of an early-stage legaltech platform on commercial strategy, financial model architecture, and fundraising preparation. Scoping engagement with potential to expand into full investment memorandum and capital raising support." },
  ];
  const career = [
    { period: "2023 — 2025", client: "Early-Stage Venture Capital Fund", type: "Fund Operations · Due Diligence · Capital Raising", detail: "Founding hire alongside the Managing Partner at a Sydney-based venture fund. Sole-led due diligence and Investment Committee approvals. Managed LP communications, fund capital raising, and deal pipeline. Deployed over $10M in equity capital across multiple portfolio companies." },
    { period: "2022", client: "ASX-Listed Technology Platform", type: "Corporate Development · Proptech Venture Investments", detail: "Evaluated and executed venture investments from Series A onwards across the proptech ecosystem. Supported corporate development strategy during the company's time as a publicly listed business." },
    { period: "2019 — 2022", client: "Top-4 Australian Bank — Institutional Division", type: "M&A Advisory · Leveraged Finance · Venture Investments", detail: "Three years across the Institutional Bank spanning M&A advisory, leveraged finance — structuring debt facilities for PE sponsors — and growth-stage venture investing through the bank's innovation arm." },
  ];
  return (
    <>
      <PhotoSection src={PHOTOS.track} overlay={0.86}>
        <div className="section-pad-top">
          <SR><p style={{ ...h("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>Track Record</p></SR>
          <SR delay={0.1}><h2 style={{ ...h("s", 52, 300, TEXT), marginBottom: 14 }}>Select Engagements</h2></SR>
          <SR delay={0.15}><Line style={{ marginBottom: 28 }} /></SR>
          <SR delay={0.2}><p style={{ ...h("b", 15, 300, SILVER), lineHeight: 1.85, maxWidth: 600 }}>A selection of current and past mandates. Details shared with discretion; further information available under NDA.</p></SR>
        </div>
      </PhotoSection>
      {/* Current Engagements */}
      <div style={{ padding: "72px 24px", background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)` }}>
        <SR><div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ ...h("b", 11, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>2026</p>
          <h3 style={{ ...h("s", 34, 300, TEXT), marginBottom: 10 }}>Current & Recent Engagements</h3>
          <p style={{ ...h("b", 13, 300, TEXT_MUTED) }}>Three mandates executed in the first quarter of operations.</p>
        </div></SR>
        <div className="grid-3" style={{ maxWidth: 1000, margin: "0 auto", gap: 20, background: "transparent" }}>
          {recent.map((r, i) => (
            <SR key={i} delay={i * 0.12}>
              <TiltCard className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, borderTop: `2px solid ${ACCENT}`, padding: 36, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, boxShadow: `0 0 8px rgba(74,222,128,0.4)` }} />
                  <span style={{ ...h("b", 9, 500, GREEN, 2, "uppercase"), opacity: 0.8 }}>Active</span>
                </div>
                <p style={{ ...h("b", 9, 500, ACCENT, 2.5, "uppercase"), marginBottom: 10 }}>{r.sector}</p>
                <h4 style={{ ...h("s", 21, 500, TEXT), marginBottom: 8 }}>{r.client}</h4>
                <p style={{ ...h("b", 10, 300, ACCENT, 1.5, "uppercase"), marginBottom: 18 }}>{r.type}</p>
                <div style={{ width: 32, height: 1, background: NAVY_BORDER, marginBottom: 18 }} />
                <p style={{ ...h("b", 13, 300, TEXT_MUTED), lineHeight: 1.85 }}>{r.detail}</p>
              </TiltCard>
            </SR>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div style={{ padding: "72px 24px", background: NAVY, borderTop: `1px solid ${NAVY_BORDER}`, borderBottom: `1px solid ${NAVY_BORDER}` }}>
        <SR><p style={{ ...h("b", 11, 400, ACCENT, 3, "uppercase"), marginBottom: 14, textAlign: "center" }}>Client Feedback</p></SR>
        <SR delay={0.05}><h3 style={{ ...h("s", 34, 300, TEXT), textAlign: "center", marginBottom: 56 }}>What Clients Say</h3></SR>
        <div className="testimonial-grid" style={{ maxWidth: 900, margin: "0 auto" }}>
          <SR delay={0.1}><TiltCard className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 48, height: "100%", borderTop: `2px solid ${ACCENT}` }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: "#D4AA60", fontSize: 15 }}>★</span>)}</div>
            <p style={{ ...h("s", 20, 400, TEXT), lineHeight: 1.75, fontStyle: "italic", marginBottom: 28 }}>Amar built a robust set of key company agreements, financial model, and investor deck. He was a key part of our team feeling confident approaching investors and being fully prepared.</p>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginBottom: 18, opacity: 0.4 }} />
            <p style={{ ...h("b", 12, 500, SILVER_LIGHT, 1.5, "uppercase") }}>Founder & CEO</p>
            <p style={{ ...h("b", 11, 300, TEXT_MUTED), marginTop: 4 }}>Consumer Business, Medical Sector</p>
          </TiltCard></SR>
          <SR delay={0.2}><TiltCard className="card-glow" style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: 48, height: "100%", borderTop: `2px solid ${ACCENT}` }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: "#D4AA60", fontSize: 15 }}>★</span>)}</div>
            <p style={{ ...h("s", 20, 400, TEXT), lineHeight: 1.75, fontStyle: "italic", marginBottom: 28 }}>Amar's knowledge across commercial agreements and financial modelling gave us a real sense of confidence. He understood our business quickly and delivered exactly what we needed to move forward.</p>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, ${ACCENT}, transparent)`, marginBottom: 18, opacity: 0.4 }} />
            <p style={{ ...h("b", 12, 500, SILVER_LIGHT, 1.5, "uppercase") }}>Founder</p>
            <p style={{ ...h("b", 11, 300, TEXT_MUTED), marginTop: 4 }}>Legaltech Platform</p>
          </TiltCard></SR>
        </div>
      </div>
      {/* Logo Bar */}
      <div className="section-pad" style={{ background: NAVY_DEEP, borderBottom: `1px solid ${NAVY_BORDER}` }}>
        <SR><p style={{ ...h("b", 9, 500, TEXT_MUTED, 3, "uppercase"), marginBottom: 32, textAlign: "center" }}>Institutional Heritage</p></SR>
        <SR delay={0.1}><div className="logo-bar">
          {[["ANZ", "Institutional Bank", 0.7, "b"], ["PEXA", "ASX-Listed", 0.7, "b"], ["Venture Fund", "Private Client", 0.4, "s"], ["Family Office", "Private Client", 0.4, "s"], ["Founders", "Multiple Engagements", 0.4, "s"]].map(([name, sub, op, fam], i) => (
            <div key={i} style={{ display: "contents" }}>
              {i > 0 && <div style={{ width: 1, height: 40, background: NAVY_BORDER }} />}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: op }}>
                <div style={{ ...h(fam, fam === "b" ? 28 : 22, fam === "b" ? 500 : 400, SILVER_LIGHT, fam === "b" ? 6 : 1, fam === "b" ? "uppercase" : "none"), lineHeight: 1, fontStyle: fam === "s" ? "italic" : "normal" }}>{name}</div>
                <div style={{ ...h("b", 8, 300, TEXT_MUTED, 2.5, "uppercase") }}>{sub}</div>
              </div>
            </div>
          ))}
        </div></SR>
      </div>
      {/* Career History */}
      <div className="section-pad" style={{ background: NAVY_DEEP }}>
        <SR><div style={{ marginBottom: 44 }}>
          <p style={{ ...h("b", 11, 400, ACCENT, 3, "uppercase"), marginBottom: 14 }}>2019 — 2025</p>
          <h3 style={{ ...h("s", 30, 400, TEXT), marginBottom: 10 }}>Career History</h3>
          <p style={{ ...h("b", 13, 300, TEXT_MUTED) }}>Prior institutional and fund experience before launching Evara Advisory.</p>
        </div></SR>
        <div style={{ maxWidth: 800 }}>
          {career.map((r, i) => (
            <SR key={i} delay={i * 0.1}><div className="card-glow" style={{ padding: "40px 28px", borderBottom: `1px solid ${NAVY_BORDER}`, marginLeft: -28, marginRight: -28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <h3 style={{ ...h("s", 23, 500, TEXT), marginBottom: 6 }}>{r.client}</h3>
                  <p style={{ ...h("b", 10, 400, ACCENT, 2, "uppercase") }}>{r.type}</p>
                </div>
                <span style={{ ...h("b", 11, 300, TEXT_MUTED, 1.5), background: NAVY_CARD, padding: "5px 14px", border: `1px solid ${NAVY_BORDER}` }}>{r.period}</span>
              </div>
              <p style={{ ...h("b", 14, 300, TEXT_MUTED), lineHeight: 1.9, marginTop: 16 }}>{r.detail}</p>
            </div></SR>
          ))}
        </div>
        <SR delay={0.3}><div className="card-glow" style={{ marginTop: 56, background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, padding: "36px 44px", display: "flex", gap: 40, alignItems: "center", maxWidth: 800, flexWrap: "wrap" }}>
          <div style={{ ...h("s", 36, 300, SILVER_LIGHT), flexShrink: 0, opacity: 0.6 }}>NDA</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ ...h("b", 13, 300, TEXT), lineHeight: 1.75, marginBottom: 12 }}>Detailed case studies, model samples, and client references available under mutual non-disclosure.</p>
            <Btn primary onClick={() => setPage("Contact")} style={{ padding: "10px 24px" }}>Request Access</Btn>
          </div>
        </div></SR>
      </div>
    </>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", stage: "", service: "", budget: "", timeline: "", message: "" });
  const [status, setStatus] = useState("idle");
  const inputStyle = { width: "100%", padding: "13px 18px", background: "rgba(14,26,46,0.5)", border: `1px solid ${NAVY_BORDER}`, color: TEXT, ...h("b", 14, 300, TEXT), transition: "border-color 0.3s", borderRadius: 2 };
  const labelStyle = { ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 8, display: "block" };
  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", company: "", stage: "", service: "", budget: "", timeline: "", message: "" }); } else setStatus("error");
    } catch { setStatus("error"); }
  };
  return (
    <PhotoSection src={PHOTOS.contact} overlay={0.9} style={{ minHeight: "100vh" }}>
      <div className="section-pad-top">
        <div className="grid-contact">
          <div>
            <SR><p style={{ ...h("b", 11, 400, ACCENT, 4, "uppercase"), marginBottom: 16 }}>Contact</p></SR>
            <SR delay={0.1}><h2 style={{ ...h("s", 48, 300, TEXT), marginBottom: 14 }}>Start a Conversation</h2></SR>
            <SR delay={0.15}><Line style={{ marginBottom: 44 }} /></SR>
            <SR delay={0.2}><p style={{ ...h("b", 15, 300, SILVER), lineHeight: 1.85, marginBottom: 52 }}>
              Limited capacity by design. If you're preparing for a raise, structuring a fund, or need institutional-quality materials — reach out below and I'll respond within 24 hours.
            </p></SR>
            <SR delay={0.25}><div style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 52 }}>
              {[["LinkedIn", "linkedin.com/in/amar-kashyap", "https://www.linkedin.com/in/amar-kashyap"], ["Based In", "Sydney, Australia", null]].map(([label, val, href]) => (
                <div key={label}>
                  <p style={{ ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 5 }}>{label}</p>
                  {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ ...h("b", 15, 300, TEXT), textDecoration: "none" }}>{val}</a> : <p style={{ ...h("b", 15, 300, TEXT) }}>{val}</p>}
                </div>
              ))}
            </div></SR>
            <SR delay={0.3}><div className="card-glow" style={{ background: "rgba(14,26,46,0.6)", backdropFilter: "blur(16px)", border: `1px solid ${NAVY_BORDER}`, padding: 36 }}>
              <p style={{ ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 16 }}>Typical Engagement</p>
              {["Initial scoping call — no charge", "Retainer or project-based fee structure", "Deliverable-focused with clear milestones", "NDA executed before any sensitive exchange"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 3 ? 12 : 0 }}>
                  <span style={{ color: ACCENT, fontSize: 12, marginTop: 2 }}>→</span>
                  <p style={{ ...h("b", 13, 300, TEXT_MUTED), lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div></SR>
          </div>
          <SR delay={0.1}><div>
            {status === "sent" ? (
              <div style={{ background: "rgba(14,26,46,0.6)", backdropFilter: "blur(16px)", border: `1px solid ${NAVY_BORDER}`, padding: 64, textAlign: "center" }}>
                <div style={{ ...h("s", 48, 300, SILVER_LIGHT), marginBottom: 18 }}>✓</div>
                <h3 style={{ ...h("s", 28, 400, TEXT), marginBottom: 14 }}>Request Received</h3>
                <p style={{ ...h("b", 15, 300, TEXT_MUTED), lineHeight: 1.75 }}>Thank you. I'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <div className="card-glow" style={{ background: "rgba(14,26,46,0.6)", backdropFilter: "blur(16px)", border: `1px solid ${NAVY_BORDER}`, padding: "36px" }}>
                <p style={{ ...h("s", 24, 400, TEXT), marginBottom: 8 }}>Send a Request</p>
                <p style={{ ...h("b", 12, 300, TEXT_MUTED), marginBottom: 28 }}>All enquiries are treated as confidential.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div className="grid-form-row">
                    <div><label style={labelStyle}>Full Name *</label><input required style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></div>
                    <div><label style={labelStyle}>Email *</label><input required type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></div>
                  </div>
                  <div className="grid-form-row">
                    <div><label style={labelStyle}>Company / Venture</label><input style={inputStyle} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" /></div>
                    <div><label style={labelStyle}>Business Stage</label>
                      <select style={{ ...inputStyle, cursor: "pointer", appearance: "none" }} value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })}>
                        {["", "Pre-seed / Idea", "Seed", "Series A+", "Established SMB", "Family Office / PE", "Other"].map(v => <option key={v} value={v} style={{ background: NAVY_CARD }}>{v || "Select..."}</option>)}
                      </select></div>
                  </div>
                  <div className="grid-form-row">
                    <div><label style={labelStyle}>Service of Interest</label>
                      <select style={{ ...inputStyle, cursor: "pointer", appearance: "none" }} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                        {["", "Building Foundations (Structure, Agreements, First Model)", "Raising Capital (Models, Decks, Data Room, Coaching)", "Deploying Capital (Fund Structuring, DD, Deal Docs)", "Scaling Operations (Strategy, Reporting, Tooling)", "AI Adoption & Automation", "Other / Not Sure"].map(v => <option key={v} value={v} style={{ background: NAVY_CARD }}>{v || "Select..."}</option>)}
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
                    <textarea required rows={4} style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Brief overview of what you need help with..." /></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <Btn primary type="submit" disabled={status === "sending" || !form.name || !form.email || !form.message} onClick={handleSubmit} style={{ padding: "14px 40px" }}>
                      {status === "sending" ? "Sending..." : "Submit Request"}
                    </Btn>
                    {status === "error" && <p style={{ ...h("b", 13, 300, "#E07070") }}>Something went wrong. Please email directly.</p>}
                  </div>
                  <p style={{ ...h("b", 10, 300, TEXT_MUTED), lineHeight: 1.5, fontStyle: "italic", opacity: 0.45 }}>Your information will not be shared. I'll respond within one business day.</p>
                </div>
              </div>
            )}
            <div style={{ marginTop: 18, background: "rgba(14,26,46,0.4)", backdropFilter: "blur(8px)", border: `1px solid ${NAVY_BORDER}`, padding: 20, opacity: 0.5 }}>
              <p style={{ ...h("b", 10, 300, TEXT_MUTED), lineHeight: 1.6, fontStyle: "italic" }}>Evara Advisory provides commercial and strategic advisory services only. We do not provide financial product advice or hold an AFSL.</p>
            </div>
          </div></SR>
        </div>
      </div>
    </PhotoSection>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: `1px solid ${NAVY_BORDER}`, background: NAVY_DEEP }}>
      <div className="section-pad">
        <div className="grid-footer" style={{ marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 34, height: 34, border: `1px solid ${SILVER}`, display: "flex", alignItems: "center", justifyContent: "center", ...h("s", 16, 400, SILVER, 1) }}>E</div>
              <span style={{ ...h("b", 10, 500, TEXT, 4, "uppercase") }}>Evara Advisory</span>
            </div>
            <p style={{ ...h("b", 13, 300, TEXT_MUTED), lineHeight: 1.75, maxWidth: 320 }}>Strategic advisory and transaction support for founders and private capital groups. Founded by Amar Kashyap. Sydney, Australia.</p>
          </div>
          <div>
            <p style={{ ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 18 }}>Navigation</p>
            {PAGES.map(p => (
              <p key={p} onClick={() => setPage(p)} style={{ ...h("b", 13, 300, TEXT_MUTED), marginBottom: 10, cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = TEXT} onMouseLeave={e => e.target.style.color = TEXT_MUTED}>{p}</p>
            ))}
          </div>
          <div>
            <p style={{ ...h("b", 9, 500, ACCENT, 3, "uppercase"), marginBottom: 18 }}>Contact</p>
            <a href="https://www.linkedin.com/in/amar-kashyap" target="_blank" rel="noopener noreferrer" style={{ ...h("b", 13, 300, TEXT_MUTED), marginBottom: 10, display: "block", textDecoration: "none" }}>linkedin.com/in/amar-kashyap</a>
            <p style={{ ...h("b", 13, 300, TEXT_MUTED) }}>Sydney, Australia</p>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${NAVY_BORDER}`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ ...h("b", 10, 300, TEXT_MUTED, 0.5) }}>© 2026 Evara Advisory. All rights reserved.</span>
          <span style={{ ...h("b", 10, 300, TEXT_MUTED, 0.5), fontStyle: "italic" }}>Commercial advisory services only. Not financial product advice.</span>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const fn = () => setShow(window.scrollY > 400); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <button className={`back-to-top ${show ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round"><path d="M18 15l-6-6-6 6" /></svg>
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [key, setKey] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 1600); return () => clearTimeout(t); }, []);
  const nav = (p) => { setPage(p); setKey(k => k + 1); window.scrollTo({ top: 0, behavior: "instant" }); };
  const pages = { Home: <HomePage setPage={nav} />, About: <AboutPage />, Services: <ServicesPage />, "Track Record": <TrackRecordPage setPage={nav} />, Contact: <ContactPage /> };
  return (
    <div style={{ background: NAVY_DEEP, color: TEXT, minHeight: "100vh" }}>
      <Preloader done={loaded} />
      <div className="grain" />
      <CustomCursor />
      <ScrollProgress />
      <Nav page={page} setPage={nav} />
      <div key={key} className="page-enter">{pages[page]}</div>
      <Footer setPage={nav} />
      <BackToTop />
    </div>
  );
}
