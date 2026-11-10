import { Link } from "react-router-dom";
import { SectionHeading } from "../components/common/SectionHeading";
import { treatmentsData } from "../data/treatments";
import { ScrollReveal } from "../utils/animation";
import { treatmentImage, imgOnError } from "../utils/images";

export function TreatmentShowcase() {
  const items = treatmentsData.slice(0, 8);
  return (
    <section className="section-pad" style={{ background: "var(--surface)" }}>
      <div className="container-narrow">
        <SectionHeading eyebrow="Treatments" title="Comprehensive care for every smile" subtitle="Advanced, personalized treatments delivered with precision, comfort, and clear guidance at every step." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.15rem" }}>
          {items.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.04}>
              <article className="card-premium" style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: 168, background: "var(--petra-blush)" }}>
                  <img src={treatmentImage(t.name)} alt={`${t.name} treatment`} loading="lazy" onError={imgOnError} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", left: 12, bottom: 10, color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "rgba(92,32,24,.72)", padding: "0.22rem 0.5rem", borderRadius: 999, backdropFilter: "blur(4px)" }}>{t.category}</div>
                </div>
                <div style={{ padding: "1.15rem 1.15rem 1.2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "1.08rem", fontWeight: 600, color: "var(--midnight)", marginBottom: "0.35rem" }}>{t.name}</h3>
                  <p style={{ color: "var(--slate)", fontSize: "0.9375rem", lineHeight: 1.65, marginBottom: "1rem", flex: 1 }}>{t.description}</p>
                  <Link to={`/treatments/${t.id}`} className="focus-outline" style={{ color: "var(--petra-burgundy)", fontWeight: 700, fontSize: "0.9rem", alignSelf: "flex-start" }}>
                    Learn More →
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
