import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "var(--petra-burgundy)" : "var(--slate)",
    textDecoration: "none",
    fontWeight: isActive ? 700 : 600,
    fontSize: "0.92rem",
    padding: "0.35rem 0.1rem",
    borderBottom: isActive ? "2px solid var(--petra-terracotta)" : "2px solid transparent",
  });

  return (
    <nav aria-label="Primary" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, transition: "all .25s ease", background: scrolled || open ? "rgba(255,253,252,0.97)" : "rgba(255,253,252,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(92,32,24,0.08)", boxShadow: scrolled ? "0 10px 28px -22px rgba(92,32,24,.28)" : "none" }}>
      <div className="container-narrow" style={{ height: "var(--nav-height)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", textDecoration: "none" }}>
          <span aria-hidden="true" style={{ width: 34, height: 34, borderRadius: 10, background: "var(--brand-gradient)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1rem" }}>✦</span>
          <span className="font-playfair" style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--petra-burgundy)", letterSpacing: ".01em" }}>DENTORA</span>
        </Link>

        <div className="dentora-nav-links" style={{ alignItems: "center", gap: "1.25rem" }}>
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/about" style={linkStyle}>About</NavLink>
          <NavLink to="/treatments" style={linkStyle}>Treatments</NavLink>
          <NavLink to="/doctors" style={linkStyle}>Doctors</NavLink>
          <NavLink to="/transformations" style={linkStyle}>Transformations</NavLink>
          <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Link to="/appointment" className="focus-outline" style={{ background: "var(--petra-terracotta)", color: "#fff", padding: "0.68rem 1.15rem", borderRadius: 999, fontSize: "0.875rem", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 12px 24px -14px rgba(188,70,57,.55)" }}>
            Book Your Visit
          </Link>
          <button type="button" className="dentora-menu-btn focus-outline" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, border: "1px solid rgba(92,32,24,.12)", background: "#fff", color: "var(--petra-burgundy)" }}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid rgba(92,32,24,.08)", background: "#fff" }}>
          <div className="container-narrow" style={{ display: "grid", gap: "0.15rem", paddingTop: "0.75rem", paddingBottom: "1rem" }}>
            {[["/", "Home"], ["/about", "About"], ["/treatments", "Treatments"], ["/doctors", "Doctors"], ["/transformations", "Transformations"], ["/contact", "Contact"]].map(([to, label]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} style={({ isActive }) => ({ ...linkStyle({ isActive }), padding: "0.65rem 0.25rem", fontSize: "1rem", borderBottom: "none", background: isActive ? "rgba(92,32,24,.04)" : "transparent", borderRadius: 10 })}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
