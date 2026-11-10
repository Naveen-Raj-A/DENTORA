import { Link } from "react-router-dom";
import { SectionHeading } from "../components/common/SectionHeading";
import { imgOnError } from "../utils/images";

export const About = () => {
  return (
    <section className="section-pad" style={{ background: "var(--surface)" }}>
      <div className="container-narrow">
        <SectionHeading eyebrow="About" title="About DENTORA" subtitle="A premium dental experience built on trust, technology, and compassionate care." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem", alignItems: "center" }}>
          <div>
            <h2 className="font-playfair" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, marginBottom: "0.85rem", color: "var(--midnight)" }}>Care built around your smile</h2>
            <p style={{ color: "var(--slate)", lineHeight: 1.75, marginBottom: "1rem", fontSize: "1.02rem" }}>
              DENTORA was founded to transform the dental experience by combining premium clinical expertise with compassionate, patient-centered care. Our clinic brings together modern technology, calming design, and a team dedicated to oral health.
            </p>
            <ul style={{ margin: "0 0 1.25rem", paddingLeft: "1.2rem", color: "var(--slate)", lineHeight: 1.9 }}>
              <li>10+ years serving the community (demo figure)</li>
              <li>5,000+ satisfied patients (demo figure)</li>
              <li>15+ dental specialties under one roof (demo figure)</li>
            </ul>
              <Link to="/appointment" className="focus-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 46, padding: "0 22px", borderRadius: 999, background: "var(--petra-terracotta)", color: "#fff", fontWeight: 800, textDecoration: "none" }}>Book a Visit</Link>
          </div>
          <div className="card-premium" style={{ overflow: "hidden" }}>
            <img src="/assets/images/clinic-reception.jpg" alt="DENTORA clinic environment" loading="lazy" onError={imgOnError} style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </div>
    </section>
  );
};
