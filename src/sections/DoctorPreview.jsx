import { Link } from "react-router-dom";
import { SectionHeading } from "../components/common/SectionHeading";
import { doctorsData } from "../data/doctors";
import { ScrollReveal } from "../utils/animation";
import { imgOnError } from "../utils/images";

export function DoctorPreview() {
  const items = doctorsData.slice(0, 3);
  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow">
        <SectionHeading eyebrow="Our Team" title="Meet our dental professionals" subtitle="Experienced clinicians delivering thoughtful, evidence-based care in a calm setting. (Demo profiles)" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.15rem" }}>
          {items.map((d, i) => (
            <ScrollReveal key={d.id} delay={i * 0.05}>
              <article className="card-premium" style={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", background: "#fff" }}>
                <div style={{ position: "relative", aspectRatio: "4 / 5", maxHeight: 290, background: "var(--petra-blush)" }}>
                  <img src={d.image} alt={`${d.name}, ${d.specialty} (demo stock portrait)`} loading="lazy" onError={imgOnError} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", left: 10, bottom: 10, fontSize: "0.68rem", fontWeight: 700, color: "#fff", background: "rgba(42,23,20,.58)", padding: "0.2rem 0.45rem", borderRadius: 999 }}>DEMO PROFILE</div>
                </div>
                <div style={{ padding: "1.15rem 1.2rem 1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--midnight)", marginBottom: "0.15rem" }}>{d.name}</h3>
                  <p style={{ color: "var(--petra-terracotta)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.15rem" }}>{d.specialty}</p>
                  <p style={{ color: "var(--slate)", fontSize: "0.875rem", marginBottom: "0.9rem" }}>{d.experience} experience · {d.qualification}</p>
                  <Link to={`/doctors/${d.id}`} className="focus-outline" style={{ color: "var(--petra-burgundy)", fontWeight: 700, fontSize: "0.9rem", marginTop: "auto" }}>View Profile →</Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/doctors" className="focus-outline" style={{ color: "var(--petra-burgundy)", fontWeight: 700 }}>View all doctors →</Link>
        </div>
      </div>
    </section>
  );
}
