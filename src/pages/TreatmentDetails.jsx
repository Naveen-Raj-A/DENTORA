import { Link, useParams } from "react-router-dom";
import { treatmentsData } from "../data/treatments";
import { treatmentImage, imgOnError } from "../utils/images";

export default function TreatmentDetails() {
  const { id } = useParams();
  const treatment = treatmentsData.find((t) => String(t.id) === String(id));

  if (!treatment) {
    return (
      <section style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1 className="font-playfair" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Treatment not found</h1>
        <Link to="/treatments" style={{ color: "var(--petra-burgundy)", fontWeight: 700 }}>Back to Treatments</Link>
      </section>
    );
  }

  const { name, category, description, duration, benefits = [], faqs = [], related = [] } = treatment;

  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow">
        <Link to="/treatments" className="focus-outline" style={{ color: "var(--petra-burgundy)", fontWeight: 700, display: "inline-block", marginBottom: "1.25rem" }}>← Back to Treatments</Link>
        <div className="card-premium" style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
          <img src={treatmentImage(name)} alt={name} loading="lazy" onError={imgOnError} style={{ width: "100%", height: "clamp(220px, 32vw, 360px)", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--petra-terracotta)", marginBottom: "0.4rem" }}>{category}</div>
        <h1 className="font-playfair" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, marginBottom: "0.75rem", color: "var(--midnight)" }}>{name}</h1>
        <div className="card-premium" style={{ padding: "1.35rem", marginBottom: "1.25rem" }}>
          <p style={{ color: "var(--slate)", lineHeight: 1.75, fontSize: "1.02rem" }}>{description}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
          <div className="card-premium" style={{ padding: "1.2rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--petra-burgundy)", marginBottom: "0.4rem" }}>Duration</h3>
            <p style={{ color: "var(--slate)" }}>{duration}</p>
          </div>
          <div className="card-premium" style={{ padding: "1.2rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--petra-burgundy)", marginBottom: "0.4rem" }}>Benefits</h3>
            <ul style={{ margin: 0, paddingLeft: "1.15rem", color: "var(--slate)", lineHeight: 1.8 }}>
              {benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>
        {faqs.length > 0 && (
          <div className="card-premium" style={{ padding: "1.2rem", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--petra-burgundy)", marginBottom: "0.75rem" }}>Frequently Asked Questions</h3>
            <div style={{ display: "grid", gap: "0.65rem" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: "var(--ice-white)", border: "1px solid var(--border-line)", borderRadius: "0.75rem", padding: "0.9rem" }}>
                  <p style={{ fontWeight: 600, color: "var(--midnight)" }}>{typeof faq === "string" ? faq : faq.q}</p>
                  {typeof faq === "object" && faq.a && <p style={{ color: "var(--slate)", marginTop: "0.25rem" }}>{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {related.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--petra-burgundy)", marginBottom: "0.6rem" }}>Related Treatments</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {related.map((r) => <span key={r} style={{ background: "#fff", border: "1px solid var(--border-line)", borderRadius: "999px", padding: "0.4rem 0.9rem", fontSize: "0.875rem", color: "var(--slate)" }}>{r}</span>)}
            </div>
          </div>
        )}
        <Link to="/appointment" className="focus-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 48, padding: "0 24px", borderRadius: 999, background: "var(--petra-terracotta)", color: "#fff", fontWeight: 800, textDecoration: "none" }}>Book Your Visit</Link>
      </div>
    </section>
  );
}
