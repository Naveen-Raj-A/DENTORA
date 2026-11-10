import { Link } from "react-router-dom";
import { doctorsData } from "../data/doctors";
import { SectionHeading } from "../components/common/SectionHeading";
import { imgOnError } from "../utils/images";

export default function Doctors() {
  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow">
        <SectionHeading eyebrow="Our Team" title="Meet Our Dental Professionals" subtitle="Experienced clinicians delivering thoughtful, evidence-based care. All profiles shown are demo/placeholder content." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.15rem" }}>
          {doctorsData.map((doctor) => (
            <article key={doctor.id} className="card-premium" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", aspectRatio: "4/5", maxHeight: 300, background: "var(--petra-blush)" }}>
                <img src={doctor.image} alt={`${doctor.name} (demo stock portrait)`} loading="lazy" onError={imgOnError} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                {doctor.demo && <span style={{ position: "absolute", left: 10, bottom: 10, fontSize: "0.68rem", fontWeight: 800, color: "#fff", background: "rgba(42,23,20,.58)", padding: "0.2rem 0.45rem", borderRadius: 999 }}>DEMO PROFILE</span>}
              </div>
              <div style={{ padding: "1.15rem 1.2rem 1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.15rem", color: "var(--midnight)" }}>{doctor.name}</h3>
                <p style={{ color: "var(--petra-burgundy)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.15rem" }}>{doctor.specialty}</p>
                <p style={{ fontSize: "0.875rem", color: "var(--slate)", marginBottom: "0.9rem" }}>{doctor.experience} experience</p>
                <Link to={`/doctors/${doctor.id}`} className="focus-outline" style={{ color: "var(--petra-burgundy)", fontWeight: 700, fontSize: "0.9rem", marginTop: "auto", textDecoration: "none" }}>View Profile →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
