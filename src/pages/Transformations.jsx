import { SectionHeading } from "../components/common/SectionHeading";
import { transformationsData } from "../data/transformations";
import { imgOnError } from "../utils/images";

export const Transformations = () => {
  const items = transformationsData || [];
  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow">
        <SectionHeading eyebrow="Patient Stories" title="Patient Transformations" subtitle="Illustrative before-and-after comparisons. All cases shown are fictional demo content — not real patient results." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.15rem" }}>
          {items.map((t, i) => (
            <article key={t.id || i} className="card-premium" style={{ overflow: "hidden" }}>
              <div style={{ position: "relative" }}>
                <img src={t.image} alt={`${t.category} demo transformation`} loading="lazy" onError={imgOnError} style={{ width: "100%", height: 210, objectFit: "cover", display: "block" }} />
                <span style={{ position: "absolute", left: 10, top: 10, fontSize: "0.68rem", fontWeight: 800, color: "#fff", background: "rgba(188,70,57,.95)", padding: "0.2rem 0.5rem", borderRadius: 999 }}>DEMO</span>
              </div>
              <div style={{ padding: "1.1rem 1.15rem 1.2rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--petra-terracotta)", marginBottom: "0.25rem" }}>{t.category}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.3rem", color: "var(--midnight)" }}>{t.title}</h3>
                <p style={{ color: "var(--slate)", fontSize: "0.92rem", lineHeight: 1.65 }}>{t.description}</p>
                <p style={{ marginTop: "0.55rem", fontSize: "0.78rem", color: "#8A7772", fontWeight: 600 }}>Fictional demo — not an actual patient result.</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
