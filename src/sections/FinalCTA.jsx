import { Link } from "react-router-dom";
import { ScrollReveal } from "../utils/animation";

export function FinalCTA() {
  return (
    <section className="section-pad" style={{ background: "var(--brand-gradient)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 15% 20%, rgba(243,224,220,.14), transparent 40%), radial-gradient(circle at 85% 70%, rgba(188,70,57,.22), transparent 35%)" }} />
      <div className="container-narrow" style={{ position: "relative", textAlign: "center" }}>
        <ScrollReveal>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--petra-dusty)", marginBottom: "0.7rem" }}>Begin today</div>
          <h2 className="font-playfair" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Your Journey to a Healthier Smile Starts Here.
          </h2>
          <p style={{ color: "rgba(243,224,220,.9)", fontSize: "1.05rem", maxWidth: 680, margin: "0 auto 1.5rem", lineHeight: 1.75 }}>
            Schedule a consultation and receive a clear, personalized plan built around your comfort, goals, and long-term oral health.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.85rem", flexWrap: "wrap" }}>
            <Link to="/appointment" className="focus-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 52, padding: "0 28px", borderRadius: 999, background: "var(--petra-terracotta)", color: "#fff", fontWeight: 800, textDecoration: "none", boxShadow: "0 14px 28px -14px rgba(188,70,57,.55)" }}>Schedule Your Appointment</Link>
            <Link to="/contact" className="focus-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 52, padding: "0 26px", borderRadius: 999, border: "1.5px solid rgba(243,224,220,.34)", color: "#fff", fontWeight: 700, textDecoration: "none", background: "rgba(255,255,255,.08)" }}>Contact Us</Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
