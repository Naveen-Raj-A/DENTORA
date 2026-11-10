import { Link, useParams } from "react-router-dom";
import { doctorsData } from "../data/doctors";
import { imgOnError } from "../utils/images";

export default function DoctorDetails() {
  const { id } = useParams();
  const doctor = doctorsData.find((d) => String(d.id) === String(id));

  if (!doctor) {
    return (
      <section style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1 className="font-playfair" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Doctor not found</h1>
        <Link to="/doctors" style={{ color: "var(--petra-burgundy)", fontWeight: 700 }}>Back to Doctors</Link>
      </section>
    );
  }

  const { name, specialty, qualification, experience, bio, areas = [], image, demo } = doctor;

  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow">
        <Link to="/doctors" className="focus-outline" style={{ color: "var(--petra-burgundy)", fontWeight: 700, display: "inline-block", marginBottom: "1.25rem" }}>← Back to Doctors</Link>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem", alignItems: "start" }}>
          <div className="card-premium" style={{ overflow: "hidden", position: "relative" }}>
            <img src={image} alt={`${name} (demo stock portrait)`} loading="lazy" onError={imgOnError} style={{ width: "100%", aspectRatio: "4/5", maxHeight: 460, objectFit: "cover", display: "block" }} />
            {demo && <span style={{ position: "absolute", left: 12, top: 12, fontSize: "0.72rem", fontWeight: 800, color: "#fff", background: "rgba(188,70,57,.95)", padding: "0.22rem 0.55rem", borderRadius: 999 }}>DEMO PROFILE</span>}
          </div>
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--petra-terracotta)", marginBottom: "0.35rem" }}>{specialty}</div>
            <h1 className="font-playfair" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, marginBottom: "0.35rem", color: "var(--midnight)" }}>{name}</h1>
            <p style={{ color: "var(--slate)", fontSize: "1.02rem", marginBottom: "1rem" }}>{qualification} · {experience} experience</p>
            {demo && <p style={{ color: "#8A7772", fontSize: "0.85rem", marginBottom: "1rem" }}>This profile uses fictional demo data and an illustrative portrait.</p>}
            {bio && <div className="card-premium" style={{ padding: "1.15rem", marginBottom: "1rem" }}><p style={{ color: "var(--slate)", lineHeight: 1.75 }}>{bio}</p></div>}
            {areas.length > 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--petra-burgundy)", marginBottom: "0.5rem" }}>Areas of Practice</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {areas.map((a) => <span key={a} style={{ border: "1px solid rgba(92,32,24,.18)", color: "var(--petra-burgundy)", background: "#fff", borderRadius: "999px", padding: "0.3rem 0.8rem", fontSize: "0.875rem", fontWeight: 600 }}>{a}</span>)}
                </div>
              </div>
            )}
            <Link to="/appointment" className="focus-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 48, padding: "0 24px", borderRadius: 999, background: "var(--petra-terracotta)", color: "#fff", fontWeight: 800, textDecoration: "none" }}>Book Your Visit</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
