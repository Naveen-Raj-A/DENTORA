import { useState } from "react";
import { Link } from "react-router-dom";
import { clinicData } from "../../data/clinic";

const treatmentLinks = [
  { label: "Dental Implants", id: 1 },
  { label: "Teeth Whitening", id: 2 },
  { label: "Orthodontics", id: 3 },
  { label: "Cosmetic Dentistry", id: 5 },
  { label: "Root Canal Care", id: 4 },
  { label: "Gum Treatment", id: 7 },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const onSubscribe = (e) => {
    e.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setStatus({ type: "error", message: "Enter a valid email address." });
      return;
    }
    setStatus({ type: "success", message: "Thank you. Email captured for demo only (not subscribed or stored)." });
    setEmail("");
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner container-narrow">
        <div className="footer-grid" aria-label="Footer navigation">
          <section className="footer-cell footer-col" aria-labelledby="footer-explore">
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

          <section className="footer-cell footer-col" aria-labelledby="footer-treatments">
            <h4 id="footer-treatments" className="footer-heading font-playfair">Treatments</h4>
            <nav className="footer-links" aria-label="Treatments">
              {treatmentLinks.map((t) => (
                <Link key={t.id} to={`/treatments/${t.id}`} className="footer-link">{t.label}</Link>
              ))}
            </nav>
          </section>

          <section className="footer-cell footer-col" aria-labelledby="footer-resources">
            <h4 id="footer-resources" className="footer-heading font-playfair">Patient Resources</h4>
            <nav className="footer-links" aria-label="Patient resources">
              <Link to="/treatments" className="footer-link">Dental Care Guide</Link>
              <Link to="/treatments" className="footer-link">Frequently Asked Questions</Link>
              <Link to="/appointment" className="footer-link">Appointment Information</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </nav>
            <p className="footer-note">Additional policy pages will be linked here when available.</p>
          </section>

          <section className="footer-cell footer-col footer-col-contact" aria-labelledby="footer-contact">
            <h4 id="footer-contact" className="footer-heading font-playfair">Contact</h4>
            <div className="footer-contact-block">
              <a href={`tel:${clinicData.phone.replace(/[^\d+]/g, "")}`} className="footer-link footer-contact-line">{clinicData.phone}</a>
              <a href={`mailto:${clinicData.email}`} className="footer-link footer-contact-line">{clinicData.email}</a>
              <span className="footer-text footer-contact-line">{clinicData.address}</span>
              <Link to="/appointment" className="footer-link footer-cta-link">Book an Appointment</Link>
            </div>

            <div className="footer-newsletter" aria-labelledby="footer-newsletter-heading">
              <h5 id="footer-newsletter-heading" className="footer-newsletter-title font-playfair">Stay Connected with DENTORA</h5>
              <p className="footer-newsletter-desc">Receive dental care tips, clinic updates and important announcements.</p>
              <form className="footer-newsletter-form" onSubmit={onSubscribe} noValidate>
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status.message) setStatus({ type: "", message: "" }); }}
                  className="footer-newsletter-input"
                  aria-describedby={status.message ? "footer-newsletter-status" : undefined}
                />
                <button type="submit" className="footer-newsletter-btn" aria-label="Subscribe">
                  <span aria-hidden="true">→</span>
                </button>
              </form>
              {status.message && (
                <p id="footer-newsletter-status" className={`footer-newsletter-status ${status.type === "error" ? "is-error" : "is-success"}`} role={status.type === "error" ? "alert" : "status"}>
                  {status.message}
                </p>
              )}
              <p className="footer-newsletter-disclaimer">Frontend demo only — no emails are stored or subscribed.</p>
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 DENTORA. All rights reserved.</p>
          <nav className="footer-bottom-links" aria-label="Legal">
            <Link to="/privacy" className="footer-link footer-bottom-link">Privacy Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}


