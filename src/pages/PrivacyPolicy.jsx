export const PrivacyPolicy = () => (
  <section className="section-pad" style={{ background: "var(--ice-white)" }}>
    <div className="container-narrow" style={{ maxWidth: "56rem" }}>
      <div className="card-premium" style={{ padding: "clamp(1.25rem,3vw,2rem)", background: "#fff" }}>
        <h1 className="font-playfair" style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: "1rem", color: "var(--midnight)" }}>Privacy Policy</h1>
        <p style={{ color: "var(--slate)", lineHeight: 1.75, marginBottom: "1rem" }}>
          DENTORA respects your privacy. This demo website may collect contact and appointment request details you submit so the clinic can respond to inquiries and schedule visits.
        </p>
        <p style={{ color: "var(--slate)", lineHeight: 1.75, marginBottom: "1rem" }}>
          Information submitted through forms on this site is used only for appointment coordination and communication. Do not submit sensitive medical information through unsecured demo forms.
        </p>
        <p style={{ color: "var(--slate)", lineHeight: 1.75 }}>
          For privacy questions, contact <a href="mailto:info@dentora.com" style={{ color: "var(--petra-burgundy)", fontWeight: 700 }}>info@dentora.com</a>.
        </p>
      </div>
    </div>
  </section>
);
