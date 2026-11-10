import { Link } from "react-router-dom";
import { clinicData } from "../../data/clinic";

export function Footer() {
  const col = { display: "grid", gap: "0.45rem", color: "rgba(243,224,220,.82)", fontSize: "0.92rem" };
  const link = { color: "rgba(243,224,220,.9)", textDecoration: "none" };
  const h = { fontWeight: 700, marginBottom: "0.75rem", color: "#fff", fontSize: "1rem" };
  return (
    <footer style={{ paddingTop: "4rem", paddingBottom: "2rem", background: "linear-gradient(180deg, #4b1a13, var(--petra-burgundy))", borderTop: "1px solid rgba(212,165,154,.18)" }}>
      <div className="container-narrow">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginBottom: "2.25rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "0.7rem" }}>
              <span aria-hidden="true" style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,.12)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--petra-blush)", fontSize: "0.95rem" }}>✦</span>
              <span className="font-playfair" style={{ fontSize: "1.45rem", fontWeight: 700, color: "#fff" }}>DENTORA</span>
            </div>
            <p style={{ color: "rgba(243,224,220,.82)", lineHeight: 1.75, fontSize: "0.95rem", maxWidth: 320 }}>
              Premium dental care with advanced technology, thoughtful clinicians, and a calm, patient-first experience.
            </p>
          </div>
          <div>
            <h4 className="font-playfair" style={h}>Explore</h4>
            <div style={col}>
              <Link to="/" style={link}>Home</Link>
              <Link to="/about" style={link}>About</Link>
              <Link to="/treatments" style={link}>Treatments</Link>
              <Link to="/doctors" style={link}>Doctors</Link>
              <Link to="/transformations" style={link}>Transformations</Link>
              <Link to="/contact" style={link}>Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-playfair" style={h}>Treatments</h4>
            <div style={col}>
              <Link to="/treatments" style={link}>Dental Implants</Link>
              <Link to="/treatments" style={link}>Teeth Whitening</Link>
              <Link to="/treatments" style={link}>Orthodontics</Link>
              <Link to="/treatments" style={link}>Cosmetic Dentistry</Link>
              <Link to="/treatments" style={link}>Root Canal Care</Link>
            </div>
          </div>
          <div>
            <h4 className="font-playfair" style={h}>Contact</h4>
            <div style={col}>
              <span>{clinicData.phone}</span>
              <span>{clinicData.email}</span>
              <span>{clinicData.address}</span>
              <Link to="/appointment" style={{ ...link, color: "var(--petra-dusty)", fontWeight: 700, marginTop: "0.25rem" }}>Book an appointment →</Link>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "1.25rem", borderTop: "1px solid rgba(212,165,154,.18)", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <p style={{ color: "rgba(243,224,220,.68)", fontSize: "0.875rem" }}>© 2026 DENTORA Premium Dental Clinic. All rights reserved. Demo content/figures shown.</p>
          <Link to="/privacy" style={{ color: "rgba(243,224,220,.78)", fontSize: "0.875rem", textDecoration: "none" }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}


