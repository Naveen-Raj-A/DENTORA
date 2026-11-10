import { Link } from "react-router-dom";

export const NotFound = () => (
  <section className="section-pad" style={{ background: "var(--ice-white)", textAlign: "center" }}>
    <div className="container-narrow">
      <div className="card-premium" style={{ maxWidth: 560, margin: "0 auto", padding: "2rem", background: "#fff" }}>
        <h1 className="font-playfair" style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--petra-burgundy)" }}>404</h1>
        <p style={{ color: "var(--slate)", marginBottom: "1.25rem", lineHeight: 1.7 }}>The page you’re looking for could not be found.</p>
        <Link to="/" className="focus-outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 46, padding: "0 22px", borderRadius: 999, background: "var(--petra-terracotta)", color: "#fff", fontWeight: 700, textDecoration: "none" }}>Return Home</Link>
      </div>
    </div>
  </section>
);
