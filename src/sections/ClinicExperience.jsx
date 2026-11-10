import { SectionHeading } from "../components/common/SectionHeading";
import { ScrollReveal } from "../utils/animation";
import { imgOnError, CLINIC_IMAGES } from "../utils/images";

export function ClinicExperience() {
  const items = [
    { title: "Reception & Welcome", desc: "A calm, modern arrival experience with attentive support and clear guidance.", img: CLINIC_IMAGES.reception, alt: "DENTORA reception and welcome area" },
    { title: "Consultation Spaces", desc: "Private rooms for thoughtful discussion, digital planning, and personalized options.", img: CLINIC_IMAGES.consultation, alt: "Dental consultation space" },
    { title: "Treatment Suites", desc: "Comfort-focused clinical spaces equipped for precise, efficient procedures.", img: CLINIC_IMAGES.treatment, alt: "Dental treatment room" },
    { title: "Advanced Equipment & Safety", desc: "Modern systems and rigorous hygiene protocols to protect every patient.", img: CLINIC_IMAGES.equipment, alt: "Modern dental equipment" },
  ];
  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow">
        <SectionHeading eyebrow="Clinic Experience" title="A space designed for comfort and confidence" subtitle="From your first visit to follow-up care, every detail supports a premium, reassuring dental experience." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.15rem" }}>
          {items.map((it, i) => (
            <ScrollReveal key={it.title} delay={i * 0.04}>
              <article className="card-premium" style={{ overflow: "hidden", height: "100%", background: "#fff" }}>
                <img src={it.img} alt={it.alt} loading="lazy" onError={imgOnError} style={{ width: "100%", height: 180, objectFit: "cover", display: "block", background: "var(--petra-blush)" }} />
                <div style={{ padding: "1.05rem 1.1rem 1.15rem" }}>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "var(--midnight)", marginBottom: "0.25rem" }}>{it.title}</h3>
                  <p style={{ color: "var(--slate)", fontSize: "0.92rem", lineHeight: 1.6 }}>{it.desc}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
