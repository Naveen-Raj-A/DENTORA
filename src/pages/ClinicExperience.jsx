import { SectionHeading } from "../components/common/SectionHeading";
import { imgOnError, CLINIC_IMAGES } from "../utils/images";

export const ClinicExperience = () => (
  <section className="section-pad" style={{ background: "var(--ice-white)" }}>
    <div className="container-narrow">
      <SectionHeading eyebrow="Our Facility" title="Clinic Experience" subtitle="A premium dental environment designed for comfort, clarity, and modern care." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.15rem" }}>
        {[
          { title: "Reception", text: "A warm welcome in a modern reception area designed for comfort and ease.", img: CLINIC_IMAGES.reception, alt: "DENTORA reception" },
          { title: "Consultation Rooms", text: "Private spaces to discuss treatment options and personalized care plans.", img: CLINIC_IMAGES.consultation, alt: "Dental consultation room" },
          { title: "Treatment Rooms", text: "State-of-the-art rooms equipped for comfortable, efficient procedures.", img: CLINIC_IMAGES.treatment, alt: "Dental treatment room" },
          { title: "Advanced Equipment", text: "Modern dental technology supporting precise diagnosis and treatment.", img: CLINIC_IMAGES.equipment, alt: "Modern dental equipment" },
          { title: "Sterilization & Hygiene", text: "Strict infection-control protocols and rigorous cleaning procedures.", img: CLINIC_IMAGES.technology, alt: "Dental technology and hygiene systems" },
        ].map((it) => (
          <article key={it.title} className="card-premium" style={{ overflow: "hidden", background: "#fff" }}>
            <img src={it.img} alt={it.alt} loading="lazy" onError={imgOnError} style={{ width: "100%", height: 180, objectFit: "cover", display: "block", background: "var(--petra-blush)" }} />
            <div style={{ padding: "1.05rem 1.1rem 1.15rem" }}>
              <h3 style={{ fontSize: "1.02rem", fontWeight: 700, marginBottom: "0.25rem", color: "var(--midnight)" }}>{it.title}</h3>
              <p style={{ color: "var(--slate)", lineHeight: 1.65 }}>{it.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
