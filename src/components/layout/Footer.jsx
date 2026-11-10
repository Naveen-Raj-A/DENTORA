import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Calendar, ArrowRight } from "lucide-react";
import { clinicData } from "../../data/clinic";

const treatmentLinks = [
  { label: "Dental Implants", id: 1 },
  { label: "Teeth Whitening", id: 2 },
  { label: "Orthodontics", id: 3 },
  { label: "Cosmetic Dentistry", id: 5 },
  { label: "Root Canal Care", id: 4 },
  { label: "Gum Treatment", id: 7 },
];

// Configurable social URLs (update to real clinic profiles when available)
const socialLinks = [
  { key: "discord", label: "Discord", href: "https://discord.com", className: "social-btn-discord" },
  { key: "x", label: "X", href: "https://x.com", className: "social-btn-x" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com", className: "social-btn-linkedin" },
  { key: "youtube", label: "YouTube", href: "https://www.youtube.com", className: "social-btn-youtube" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com", className: "social-btn-instagram" },
];

function SocialIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, focusable: "false" };
  switch (name) {
    case "discord":
      return (
        <svg {...common}>
          <path d="M20.317 4.369A19.791 19.791 0 0 0 15.885 3c-.191.342-.414.804-.568 1.164a18.27 18.27 0 0 0-5.487 0A12.64 12.64 0 0 0 9.263 3a19.736 19.736 0 0 0-4.433 1.369C2.028 8.553 1.27 12.632 1.648 16.654A19.9 19.9 0 0 0 7.68 19.7c.486-.66.919-1.36 1.294-2.093a12.94 12.94 0 0 1-2.036-.98c.17-.125.337-.256.498-.39 3.927 1.838 8.197 1.838 12.078 0 .163.134.33.265.498.39-.65.383-1.33.71-2.038.981.375.732.807 1.433 1.294 2.092a19.86 19.86 0 0 0 6.034-3.046c.444-4.663-.759-8.705-3.182-12.285ZM8.02 14.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.953-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.953 2.419-2.156 2.419Zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.953-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M18.244 2H21.5l-7.116 8.134L22.75 22h-6.555l-5.134-6.708L5.186 22H1.928l7.612-8.701L1.25 2h6.72l4.64 6.134L18.244 2Zm-1.141 17.966h1.804L6.99 3.927H5.054l12.049 16.039Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.814 20.452H3.861V9h2.953v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.9 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const onSubscribe = (e) => {
    e.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ type: "success", message: "Thank you. Email validated for demo only (no subscription created)." });
    setEmail("");
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-shell">
        <div className="footer-grid-wrap" aria-label="DENTORA footer">
          {/* Row 1: 5-column main grid */}
          <div className="footer-main-grid">
            <section className="footer-cell" aria-labelledby="footer-explore">
              <h4 id="footer-explore" className="footer-heading font-playfair">Explore</h4>
              <nav className="footer-links" aria-label="Explore">
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/about" className="footer-link">About</Link>
                <Link to="/treatments" className="footer-link">Treatments</Link>
                <Link to="/doctors" className="footer-link">Doctors</Link>
                <Link to="/transformations" className="footer-link">Transformations</Link>
                <Link to="/contact" className="footer-link">Contact</Link>
              </nav>
            </section>

            <section className="footer-cell" aria-labelledby="footer-treatments">
              <h4 id="footer-treatments" className="footer-heading font-playfair">Treatments</h4>
              <nav className="footer-links" aria-label="Treatments">
                {treatmentLinks.map((t) => (
                  <Link key={t.id} to={`/treatments/${t.id}`} className="footer-link">{t.label}</Link>
                ))}
              </nav>
            </section>

            <section className="footer-cell" aria-labelledby="footer-resources">
              <h4 id="footer-resources" className="footer-heading font-playfair">Patient Resources</h4>
              <nav className="footer-links" aria-label="Patient resources">
                <Link to="/treatments" className="footer-link">Dental Care Guide</Link>
                <Link to="/treatments" className="footer-link">Frequently Asked Questions</Link>
                <Link to="/appointment" className="footer-link">Appointment Information</Link>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                <Link to="/privacy" className="footer-link">Terms &amp; Conditions</Link>
              </nav>
            </section>

            <section className="footer-cell" aria-labelledby="footer-contact">
              <h4 id="footer-contact" className="footer-heading font-playfair">Contact</h4>
              <div className="footer-contact-list">
                <a href={`tel:${clinicData.phone.replace(/[^\d+]/g, "")}`} className="footer-link footer-contact-item">
                  <Phone size={16} aria-hidden="true" />
                  <span>{clinicData.phone}</span>
                </a>
                <a href={`mailto:${clinicData.email}`} className="footer-link footer-contact-item">
                  <Mail size={16} aria-hidden="true" />
                  <span>{clinicData.email}</span>
                </a>
                <span className="footer-text footer-contact-item">
                  <MapPin size={16} aria-hidden="true" />
                  <span>{clinicData.address}</span>
                </span>
                <Link to="/appointment" className="footer-link footer-contact-item footer-appointment-link">
                  <Calendar size={16} aria-hidden="true" />
                  <span>Book an Appointment</span>
                </Link>
              </div>
            </section>

            <section className="footer-cell footer-newsletter-cell" aria-labelledby="footer-newsletter-heading">
              <h4 id="footer-newsletter-heading" className="footer-heading font-playfair footer-newsletter-heading">Stay Connected with DENTORA</h4>
              <p className="footer-newsletter-desc">Receive dental care tips, clinic updates and important announcements.</p>
              <form className="footer-newsletter-form" onSubmit={onSubscribe} noValidate>
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status.message) setStatus({ type: "", message: "" }); }}
                  className="footer-newsletter-input"
                  aria-describedby="footer-newsletter-note footer-newsletter-status"
                />
                <button type="submit" className="footer-newsletter-btn" aria-label="Submit email">
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </form>
              {status.message && (
                <p id="footer-newsletter-status" className={`footer-newsletter-status ${status.type === "error" ? "is-error" : "is-success"}`} role={status.type === "error" ? "alert" : "status"}>
                  {status.message}
                </p>
              )}
              <p id="footer-newsletter-note" className="footer-newsletter-note">We respect your privacy. No subscription is created without backend setup.</p>
            </section>
          </div>

          {/* Row 2: Branding */}
          <div className="footer-brand-row">
            <span className="footer-brand-line" aria-hidden="true" />
            <div className="footer-brand-center">
              <span className="footer-brand-mark font-playfair">DENTORA</span>
              <span className="footer-brand-tagline">PREMIUM DENTAL CARE</span>
            </div>
            <span className="footer-brand-line" aria-hidden="true" />
          </div>

          {/* Row 3: Socials + legal */}
          <div className="footer-bottom-grid">
            <div className="footer-cell footer-social-cell">
              <nav className="footer-socials" aria-label="Social media">
                {socialLinks.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`footer-social-btn ${s.className}`}
                    aria-label={s.label}
                  >
                    <SocialIcon name={s.key} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </nav>
            </div>
            <div className="footer-cell footer-legal-cell">
              <p className="footer-copyright">© 2026 DENTORA. All rights reserved.</p>
              <nav className="footer-legal-links" aria-label="Legal">
                <Link to="/privacy" className="footer-link footer-legal-link">Privacy Policy</Link>
                <Link to="/privacy" className="footer-link footer-legal-link">Terms &amp; Conditions</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


