import { SectionHeading } from "../components/common/SectionHeading";
import { testimonialsData } from "../data/testimonials";
import { ScrollReveal } from "../utils/animation";

function Stars({ n = 5 }) {
  return (
    <div aria-label={`${n} out of 5 stars`} style={{ color: "var(--petra-terracotta)", letterSpacing: 2, fontSize: "0.95rem", marginBottom: "0.6rem" }}>
      {"★★★★★".slice(0, Math.max(0, Math.min(5, n)))}
      <span style={{ color: "rgba(92,32,24,.12)" }}>{"★★★★★".slice(Math.max(0, Math.min(5, n)))}</span>
    </div>
  );
}

export function Testimonials() {
  const items = (testimonialsData || []).slice(0, 3);
  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow">
        <SectionHeading eyebrow="Testimonials" title="What our patients say" subtitle="Comfort, clarity, and confident results—shared experiences from our care philosophy. (Fictional demo testimonials)" align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.15rem" }}>
          {items.map((t, i) => (
            <ScrollReveal key={t.id || i} delay={i * 0.05}>
              <figure className="card-premium" style={{ margin: 0, padding: "1.3rem 1.25rem 1.25rem", height: "100%", display: "flex", flexDirection: "column" }}>
                <Stars n={t.rating || 5} />
                <blockquote style={{ margin: 0, color: "var(--slate)", lineHeight: 1.75, fontSize: "0.98rem", flex: 1 }}>
                  “{t.review || t.text || t.quote}”
                </blockquote>
                <figcaption style={{ marginTop: "1rem", paddingTop: "0.9rem", borderTop: "1px solid var(--border-line)", display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <div aria-hidden="true" style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(92,32,24,.08)", color: "var(--petra-burgundy)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem" }}>
                    {(t.name || "?").slice(0, 1)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--midnight)", fontSize: "0.95rem" }}>{t.name} <span style={{ fontWeight: 600, color: "#8A7772", fontSize: "0.75rem" }}>(demo)</span></div>
                    {t.treatment && <div style={{ color: "var(--slate)", fontSize: "0.82rem" }}>{t.treatment}</div>}
                  </div>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
