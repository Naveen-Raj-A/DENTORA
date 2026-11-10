import { SectionHeading } from "../components/common/SectionHeading";
import { ScrollReveal } from "../utils/animation";
import { imgOnError, CLINIC_IMAGES } from "../utils/images";

const features = [
  { title: "Experienced Professionals", description: "Specialists with years of expertise, continuous education, and meticulous clinical standards.", icon: "◎" },
  { title: "Modern Technology", description: "Digital imaging and advanced equipment for precise, predictable, and comfortable care.", icon: "▣" },
  { title: "Personalized Care", description: "Treatment plans tailored to your needs, goals, timeline, and comfort level.", icon: "✦" },
  { title: "Comfortable Environment", description: "A calm, welcoming atmosphere designed to ease anxiety and support relaxation.", icon: "◌" },
  { title: "Transparent Treatment Planning", description: "Clear explanations of procedures, options, costs, and expected outcomes before treatment.", icon: "▤" },
  { title: "Patient-Focused Service", description: "Your wellbeing guides every decision—from consultation to follow-up care.", icon: "♡" },
];

export function WhyChooseUs() {
  return (
    <section className="section-pad" style={{ background: "var(--surface)" }}>
      <div className="container-narrow">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem", alignItems: "start" }}>
          <div>
            <SectionHeading eyebrow="Why DENTORA" title="Premium care with a personal touch" subtitle="A refined experience that balances clinical excellence with genuine compassion." />
            <div className="card-premium" style={{ overflow: "hidden", background: "#fff" }}>
              <img src={CLINIC_IMAGES.treatment} alt="Modern dental treatment room at DENTORA" loading="lazy" onError={imgOnError} style={{ width: "100%", height: 230, objectFit: "cover", display: "block" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.04}>
                <div className="card-premium" style={{ padding: "1.15rem 1.1rem", height: "100%", background: "#fff" }}>
                  <div aria-hidden="true" style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(188,70,57,.12)", color: "var(--petra-terracotta)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.05rem", marginBottom: "0.75rem" }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, marginBottom: "0.3rem", color: "var(--midnight)" }}>{f.title}</h3>
                  <p style={{ color: "var(--slate)", fontSize: "0.92rem", lineHeight: 1.65 }}>{f.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
