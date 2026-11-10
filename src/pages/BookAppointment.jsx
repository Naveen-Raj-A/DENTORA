import { useState } from "react";
import { treatmentsData } from "../data/treatments";
import { doctorsData } from "../data/doctors";
import { storeAppointment } from "../utils/storage";
import { SectionHeading } from "../components/common/SectionHeading";

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

export default function BookAppointment() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", treatment: "", doctor: "", date: "", time: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.date || !form.time) {
      setError("Please fill in name, phone, date, and time.");
      return;
    }
    const ok = storeAppointment({ ...form, createdAt: new Date().toISOString() });
    if (ok === false) {
      setError("That time slot is already booked for the selected doctor. Please choose another time.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-pad" style={{ textAlign: "center", background: "var(--surface)" }}>
        <div className="container-narrow">
          <div className="card-premium" style={{ maxWidth: 620, margin: "0 auto", padding: "2rem" }}>
            <div aria-hidden="true" style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(16,185,129,.12)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.5rem", fontWeight: 800 }}>✓</div>
            <h1 className="font-playfair" style={{ fontSize: "2rem", marginBottom: "0.6rem", color: "var(--midnight)" }}>Appointment Request Received</h1>
            <p style={{ color: "var(--slate)", lineHeight: 1.7 }}>Thank you, <strong style={{ color: "var(--midnight)" }}>{form.name}</strong>. We will confirm your appointment shortly. (Demo — saved locally in your browser.)</p>
          </div>
        </div>
      </section>
    );
  }

  const field = { width: "100%", padding: "0.75rem 0.9rem", border: "1px solid var(--border-line)", borderRadius: "0.75rem", fontSize: "1rem", font: "inherit", color: "var(--midnight)" };
  const label = { display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--slate)" };

  return (
    <section className="section-pad" style={{ background: "var(--ice-white)" }}>
      <div className="container-narrow" style={{ maxWidth: 860 }}>
        <SectionHeading eyebrow="Appointment" title="Book Your Visit" subtitle="Schedule your consultation with our dental team. (Demo form — stored locally.)" />
        <form onSubmit={onSubmit} className="card-premium" style={{ display: "grid", gap: "1rem", padding: "clamp(1.25rem, 3vw, 1.75rem)" }}>
          {error && <p style={{ color: "#b91c1c", fontSize: "0.9rem", fontWeight: 600 }}>{error}</p>}
          <div><label style={label} htmlFor="name">Full Name *</label><input id="name" name="name" value={form.name} onChange={onChange} style={field} required /></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "1rem" }}>
            <div><label style={label} htmlFor="phone">Phone *</label><input id="phone" name="phone" value={form.phone} onChange={onChange} style={field} required /></div>
            <div><label style={label} htmlFor="email">Email</label><input id="email" name="email" type="email" value={form.email} onChange={onChange} style={field} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "1rem" }}>
            <div><label style={label} htmlFor="treatment">Treatment</label><select id="treatment" name="treatment" value={form.treatment} onChange={onChange} style={field}><option value="">Select treatment</option>{treatmentsData.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}</select></div>
            <div><label style={label} htmlFor="doctor">Doctor</label><select id="doctor" name="doctor" value={form.doctor} onChange={onChange} style={field}><option value="">Select doctor</option>{doctorsData.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}</select></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "1rem" }}>
            <div><label style={label} htmlFor="date">Date *</label><input id="date" name="date" type="date" value={form.date} onChange={onChange} style={field} required /></div>
            <div><label style={label} htmlFor="time">Time *</label><select id="time" name="time" value={form.time} onChange={onChange} style={field} required><option value="">Select time</option>{TIME_SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
          </div>
          <div><label style={label} htmlFor="message">Message (optional)</label><textarea id="message" name="message" rows={3} value={form.message} onChange={onChange} style={field} /></div>
            <button type="submit" className="focus-outline" style={{ height: 50, borderRadius: 999, border: "none", background: "var(--petra-terracotta)", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: "1rem" }}>Request Appointment</button>
        </form>
      </div>
    </section>
  );
}
