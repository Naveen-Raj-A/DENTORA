import { Component, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ToothScene = lazy(() =>
  import("../3d/ToothScene").then((mod) => ({ default: mod.ToothScene || mod.default }))
);

class SceneBoundary extends Component {
  constructor(props) { super(props); this.state = { error: false }; }
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", padding: "1.25rem", color: "var(--petra-blush)" }}>
          <div>
            <div style={{ fontWeight: 700, color: "#fff", marginBottom: "0.35rem" }}>3D Dental Arch Preview</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(243,224,220,.82)", lineHeight: 1.55 }}>The interactive 3D model could not be loaded. Booking and treatment information remain available below.</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function Hero() {
  const { reducedMotion } = useReducedMotion();
  const reveal = (d = 0) =>
    reducedMotion
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.68, delay: d, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section
      aria-label="DENTORA hero"
      style={{
        position: "relative",
        minHeight: "calc(100vh - var(--nav-height))",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--hero-gradient)",
        color: "#fff",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-8%", right: "-4%", width: "min(52vw, 620px)", height: "min(52vw, 620px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(188,70,57,.5), rgba(188,70,57,0) 68%)" }} />
        <div style={{ position: "absolute", bottom: "-18%", left: "-8%", width: "min(44vw, 520px)", height: "min(44vw, 520px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,165,154,.2), rgba(212,165,154,0) 70%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,.03), rgba(0,0,0,.06))" }} />
      </div>

      <div className="container-narrow" style={{ position: "relative", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "clamp(1.5rem, 4vw, 3.25rem)", alignItems: "center", padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2rem)" }}>
        <div style={{ zIndex: 2, maxWidth: 620 }}>
          <motion.div {...reveal(0)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.9rem", borderRadius: 999, background: "rgba(255,255,255,.1)", border: "1px solid rgba(243,224,220,.22)", color: "var(--petra-blush)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "1.2rem" }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 99, background: "var(--petra-dusty)" }} />
            PREMIUM DENTAL CARE
          </motion.div>

          <motion.h1 {...reveal(0.06)} className="font-playfair" style={{ fontSize: "clamp(2.5rem, 5.4vw, 4rem)", fontWeight: 700, color: "#fff", lineHeight: 1.06, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            A Healthier Smile. A Happier You.
          </motion.h1>

          <motion.p {...reveal(0.12)} style={{ fontSize: "clamp(1rem, 1.8vw, 1.125rem)", color: "rgba(243,224,220,.9)", maxWidth: 560, marginBottom: "1.75rem", lineHeight: 1.75 }}>
            Experience modern dentistry in a calm, welcoming environment. DENTORA combines advanced technology, compassionate clinicians, and personalized care to help you smile with confidence.
          </motion.p>

          <motion.div {...reveal(0.18)} style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <Link to="/appointment" className="focus-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 52, padding: "0 28px", borderRadius: 999, background: "var(--petra-terracotta)", color: "#fff", fontWeight: 700, textDecoration: "none", boxShadow: "0 16px 30px -14px rgba(188,70,57,.65)", border: "1px solid rgba(255,255,255,.08)" }}>
              Book Your Visit
            </Link>
            <Link to="/treatments" className="focus-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 52, padding: "0 28px", borderRadius: 999, background: "rgba(255,255,255,.08)", color: "#fff", fontWeight: 600, textDecoration: "none", border: "1.5px solid rgba(243,224,220,.28)" }}>
              Explore Treatments
            </Link>
          </motion.div>

          <motion.div {...reveal(0.24)} style={{ display: "flex", gap: "1rem 1.5rem", flexWrap: "wrap", color: "rgba(243,224,220,.88)", fontSize: "0.9rem" }}>
            <span><strong style={{ color: "#fff" }}>10+ Years</strong> of Experience</span>
            <span style={{ opacity: 0.45 }} aria-hidden="true">•</span>
            <span><strong style={{ color: "#fff" }}>5,000+</strong> Happy Smiles</span>
            <span style={{ opacity: 0.45 }} aria-hidden="true">•</span>
            <span><strong style={{ color: "#fff" }}>98%</strong> Patient Satisfaction</span>
          </motion.div>
          <p style={{ marginTop: "0.7rem", fontSize: "0.72rem", color: "rgba(243,224,220,.62)" }}>Statistics shown are demo figures for this design.</p>
        </div>

        <motion.div {...reveal(0.14)} style={{ position: "relative", minHeight: "clamp(380px, 48vw, 580px)", zIndex: 1 }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: "4% 2% 6% 4%", borderRadius: 28, background: "radial-gradient(circle at 50% 42%, rgba(243,224,220,.14), rgba(188,70,57,.06) 42%, rgba(67,22,15,0) 74%)", boxShadow: "inset 0 0 0 1px rgba(243,224,220,.08)" }} />
          <Suspense fallback={<div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--petra-dusty)", fontSize: "0.9rem" }}>Loading 3D dental arch…</div>}>
            <SceneBoundary>
              <ToothScene reducedMotion={reducedMotion} style={{ position: "absolute", inset: 0, minHeight: "inherit" }} />
            </SceneBoundary>
          </Suspense>
          <div style={{ position: "absolute", left: 12, bottom: 12, zIndex: 2, display: "flex", gap: "0.5rem", flexWrap: "wrap", pointerEvents: "none", maxWidth: "calc(100% - 24px)" }}>
            {["Upper & Lower Arches", "Drag to Rotate", "Zoom & Reset"].map((t) => (
              <span key={t} style={{ padding: "0.36rem 0.68rem", borderRadius: 999, background: "rgba(92,32,24,.34)", border: "1px solid rgba(243,224,220,.18)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, backdropFilter: "blur(6px)" }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
