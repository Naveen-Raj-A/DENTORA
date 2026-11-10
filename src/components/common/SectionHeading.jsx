export const SectionHeading = ({ eyebrow, title, subtitle, align = "left", light = false }) => {
  const center = align === "center";
  return (
    <div style={{ marginBottom: "clamp(1.75rem, 3vw, 2.75rem)", textAlign: center ? "center" : "left", maxWidth: center ? 740 : 760, marginInline: center ? "auto" : undefined }}>
      {eyebrow && (
        <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: light ? "var(--petra-dusty)" : "var(--petra-terracotta)", marginBottom: "0.6rem" }}>
          {eyebrow}
        </div>
      )}
      <h2 className="font-playfair" style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.75rem)", fontWeight: 700, color: light ? "#fff" : "var(--dark-text)", letterSpacing: "-0.02em", marginBottom: subtitle ? "0.7rem" : 0 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: light ? "rgba(243,224,220,.88)" : "var(--muted-text)", fontSize: "1.02rem", lineHeight: 1.72 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
