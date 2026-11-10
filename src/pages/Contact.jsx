import { useState } from "react";
import { clinicData } from "../data/clinic";
import { SectionHeading } from "../components/common/SectionHeading";
import { imgOnError } from "../utils/images";

function buildWhatsAppUrl(formState) {
  const number = (clinicData?.whatsapp || "").replace(/[^\d]/g, "");
  const text = [
      "Appointment Inquiry — DENTORA",
    formState.name ? `Name: ${formState.name}` : null,
    formState.phone ? `Phone: ${formState.phone}` : null,
    formState.email ? `Email: ${formState.email}` : null,
    formState.subject ? `Subject: ${formState.subject}` : null,
    formState.message ? `Message: ${formState.message}` : null,
  ].filter(Boolean).join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export const Contact = () => {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", subject: "", message: "", submitting: false, success: false, error: "" });
  const handleChange = (e) => setFormState((p) => ({ ...p, [e.target.name]: e.target.value, error: "" }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormState((p) => ({ ...p, error: "Please provide your name, email, and message." }));
      return;
    }
    setFormState((p) => ({ ...p, submitting: true }));
    setTimeout(() => setFormState({ name: "", email: "", phone: "", subject: "", message: "", submitting: false, success: true, error: "" }), 600);
  };
  const field = { width: "100%", border: "1px solid var(--border-line)", borderRadius: "0.75rem", padding: "0.75rem 0.9rem", font: "inherit", color: "var(--midnight)" };
  const label = { display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--slate)" };

  return (
    <section className="section-pad" style={{ background: "var(--surface)" }}>
      <div className="container-narrow">
          <SectionHeading eyebrow="Contact" title="Contact DENTORA" subtitle="Get in touch with our team — we’re here to help." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
          <div>
            <div className="card-premium" style={{ overflow: "hidden", marginBottom: "1rem" }}>
              <img src="/assets/images/clinic-reception.jpg" alt="DENTORA clinic reception" loading="lazy" onError={imgOnError} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
            </div>
            <div className="card-premium" style={{ padding: "1.2rem" }}>
              <h3 className="font-playfair" style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--midnight)" }}>Visit Us</h3>
              <p style={{ color: "var(--slate)", lineHeight: 1.7, marginBottom: "0.4rem" }}><strong style={{ color: "var(--midnight)" }}>Address:</strong> {clinicData?.address}</p>
              <p style={{ color: "var(--slate)", lineHeight: 1.7, marginBottom: "0.4rem" }}><strong style={{ color: "var(--midnight)" }}>Phone:</strong> {clinicData?.phone}</p>
              <p style={{ color: "var(--slate)", lineHeight: 1.7, marginBottom: "0.4rem" }}><strong style={{ color: "var(--midnight)" }}>Email:</strong> {clinicData?.email}</p>
              <p style={{ color: "var(--slate)", lineHeight: 1.7 }}><strong style={{ color: "var(--midnight)" }}>Hours:</strong> {clinicData?.openingHours} Â· {clinicData?.closed}</p>
              <a href={buildWhatsAppUrl(formState)} target="_blank" rel="noopener noreferrer" className="focus-outline" style={{ display: "inline-flex", marginTop: "1rem", alignItems: "center", justifyContent: "center", height: 42, padding: "0 18px", borderRadius: 999, background: "rgba(188,70,57,.12)", color: "var(--petra-burgundy)", fontWeight: 700, textDecoration: "none" }}>Message on WhatsApp</a>
            </div>
          </div>
          <div className="card-premium" style={{ padding: "1.25rem" }}>
            <h3 className="font-playfair" style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--midnight)" }}>Send a Message</h3>
            {formState.success && <p style={{ color: "#065f46", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "0.75rem", padding: "0.75rem", marginBottom: "0.75rem", fontWeight: 600 }}>Message sent successfully. We'll respond within 24 hours.</p>}
            {formState.error && <p style={{ color: "#b91c1c", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{formState.error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }} noValidate>
              <div><label style={label} htmlFor="cname">Full Name</label><input id="cname" style={field} name="name" value={formState.name} onChange={handleChange} required /></div>
              <div><label style={label} htmlFor="cemail">Email</label><input id="cemail" style={field} type="email" name="email" value={formState.email} onChange={handleChange} required /></div>
              <div><label style={label} htmlFor="cphone">Phone</label><input id="cphone" style={field} name="phone" value={formState.phone} onChange={handleChange} /></div>
              <div><label style={label} htmlFor="csubject">Subject</label>
                <select id="csubject" style={field} name="subject" value={formState.subject} onChange={handleChange}>
                  <option value="">Select a subject</option><option value="Appointment">Appointment Request</option><option value="General">General Inquiry</option><option value="Treatment">Treatment Question</option>
                </select>
              </div>
              <div><label style={label} htmlFor="cmessage">Message</label><textarea id="cmessage" style={field} rows={4} name="message" value={formState.message} onChange={handleChange} required /></div>
                <button type="submit" disabled={formState.submitting} className="focus-outline" style={{ height: 46, borderRadius: 999, border: "none", background: "var(--petra-terracotta)", color: "#fff", fontWeight: 800, cursor: "pointer" }}>{formState.submitting ? "Sending..." : "Send Message"}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
