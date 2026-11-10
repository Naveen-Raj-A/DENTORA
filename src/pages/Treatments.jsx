import { Link } from "react-router-dom";
import { treatmentsData } from "../data/treatments";
import { SectionHeading } from "../components/common/SectionHeading";
import { treatmentImage, imgOnError } from "../utils/images";

export const Treatments = () => {
  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow">
        <SectionHeading eyebrow="Treatments" title="Our Treatments" subtitle="Comprehensive dental care for every smile — delivered with precision and comfort." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.15rem" }}>
          {treatmentsData.map((treatment) => (
            <article key={treatment.id} className="card-premium" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", height: 172 }}>
                <img src={treatmentImage(treatment.name)} alt={`${treatment.name}`} loading="lazy" onError={imgOnError} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <span style={{ position: "absolute", left: 12, bottom: 10, color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "rgba(92,32,24,.72)", padding: "0.22rem 0.5rem", borderRadius: 999 }}>{treatment.category}</span>
              </div>
              <div style={{ padding: "1.15rem 1.15rem 1.2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.35rem", color: "var(--midnight)" }}>{treatment.name}</h3>
                <p style={{ color: "var(--slate)", lineHeight: 1.65, marginBottom: "1rem", flex: 1 }}>{treatment.description}</p>
                <Link to={`/treatments/${treatment.id}`} className="focus-outline" style={{ color: "var(--petra-burgundy)", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>Learn More →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
