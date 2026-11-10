import { SectionHeading } from "../components/common/SectionHeading";
import { ScrollReveal } from "../utils/animation";

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "5,000+", label: "Happy Smiles" },
  { value: "98%", label: "Patient Satisfaction" },
  { value: "15+", label: "Dental Treatments" },
];

export function TrustStrip() {
  return (
    <section className="section-pad" style={{ background: "var(--surface)", borderTop: "1px solid var(--border-line)", borderBottom: "1px solid var(--border-line)" }}>
      <div className="container-narrow">
        <ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.05}>
                <div className="card-premium" style={{ padding: "1.25rem 1rem", textAlign: "center", background: "linear-gradient(180deg, #fff, #f8fbff)" }}>
                  <div className="font-playfair" style={{ fontSize: "clamp(1.7rem, 3vw, 2.15rem)", fontWeight: 700, color: "var(--petra-burgundy)", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ marginTop: "0.35rem", color: "var(--slate)", fontSize: "0.875rem", fontWeight: 600 }}>{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p style={{ marginTop: "0.9rem", textAlign: "center", fontSize: "0.78rem", color: "#8A7772" }}>Fictional demo statistics — replace with verified clinic data.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
