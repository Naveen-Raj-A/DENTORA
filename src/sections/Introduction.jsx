import { Link } from "react-router-dom";
import { SectionHeading } from "../components/common/SectionHeading";
import { ScrollReveal } from "../utils/animation";
import { imgOnError } from "../utils/images";

export function Introduction() {
  const points = [
    "State-of-the-art technology and precise digital planning",
    "Patient-first approach with personalized care plans",
    "Comfort-focused environment with clear explanations",
    "Transparent outcomes and long-term oral health support",
  ];
  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "clamp(2rem, 4vw, 3.5rem)", alignItems: "center" }}>
          <ScrollReveal>
            <div>
              <SectionHeading eyebrow="About DENTORA" title="Where advanced dentistry meets compassionate care." subtitle="We combine premium clinical expertise with a calm, patient-centered experience—so every treatment supports your health, comfort, and confidence." />
              <ul style={{ display: "grid", gap: "0.65rem", margin: "0 0 1.5rem" }}>
                {points.map((p) => (
                  <li key={p} style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start", color: "var(--slate)", fontSize: "0.98rem" }}>
                    <span aria-hidden="true" style={{ marginTop: 7, width: 8, height: 8, borderRadius: 99, background: "var(--petra-terracotta)", flex: "0 0 auto" }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link to="/appointment" className="focus-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 46, padding: "0 22px", borderRadius: 999, background: "var(--petra-burgundy)", color: "#fff", fontWeight: 700, textDecoration: "none" }}>Schedule Your Consultation</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08} direction="left">
            <div className="card-premium" style={{ overflow: "hidden", position: "relative" }}>
              <img src="/assets/images/clinic-reception.jpg" alt="Modern dental clinic reception area" loading="lazy" onError={imgOnError} style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", left: 14, bottom: 14, background: "rgba(255,255,255,.88)", border: "1px solid rgba(92,32,24,.1)", color: "var(--petra-burgundy)", padding: "0.4rem 0.7rem", borderRadius: 999, fontSize: "0.8rem", fontWeight: 700, backdropFilter: "blur(6px)" }}>Patient-first clinic experience</div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
