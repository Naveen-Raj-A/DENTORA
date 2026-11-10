import { useState } from "react";
import { SectionHeading } from "../components/common/SectionHeading";
import { transformationsData } from "../data/transformations";
import { ScrollReveal } from "../utils/animation";
import { imgOnError } from "../utils/images";

function BeforeAfter({ item }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="card-premium" style={{ overflow: "hidden", height: "100%", background: "#fff" }}>
      <div style={{ position: "relative", aspectRatio: "16 / 10", background: "var(--petra-blush)", touchAction: "pan-y" }}>
        <img src={item.image} alt={`${item.category} demo after visual (illustrative)`} loading="lazy" onError={imgOnError} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.02) contrast(1.02)" }} />
        <div style={{ position: "absolute", inset: 0, width: `${pos}%`, overflow: "hidden", borderRight: "3px solid rgba(255,255,255,.95)" }}>
          <img src={item.image} alt="" aria-hidden="true" loading="lazy" onError={imgOnError} style={{ position: "absolute", inset: 0, width: `${10000 / Math.max(pos, 1)}%`, maxWidth: "none", height: "100%", objectFit: "cover", filter: "grayscale(.22) sepia(.08) brightness(.95)" }} />
        </div>
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "#fff", background: "var(--petra-terracotta)", padding: "0.2rem 0.5rem", borderRadius: 999 }}>DEMO</span>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#fff", background: "rgba(92,32,24,.72)", padding: "0.2rem 0.5rem", borderRadius: 999 }}>{item.category}</span>
        </div>
        <div style={{ position: "absolute", top: 10, right: 10, fontSize: "0.68rem", fontWeight: 700, color: "#fff", background: "rgba(42,23,20,.55)", padding: "0.2rem 0.45rem", borderRadius: 999 }}>Before / After</div>
        <label style={{ position: "absolute", left: 12, right: 12, bottom: 10, display: "grid", gap: 4 }}>
          <span style={{ fontSize: "0.72rem", color: "#2A1714", fontWeight: 700, textShadow: "0 1px 0 rgba(255,255,255,.7)" }}>Drag to compare (illustrative demo)</span>
          <input type="range" min={5} max={95} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label={`Compare before and after for ${item.category}`} style={{ width: "100%" }} />
        </label>
      </div>
      <div style={{ padding: "1.1rem 1.15rem 1.2rem" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--midnight)", marginBottom: "0.3rem" }}>{item.title}</h3>
        <p style={{ color: "var(--slate)", fontSize: "0.92rem", lineHeight: 1.6 }}>{item.description}</p>
        <p style={{ marginTop: "0.6rem", fontSize: "0.78rem", color: "#8A7772", fontWeight: 600 }}>Fictional demo / licensed illustrative visual — not an actual patient result.</p>
      </div>
    </div>
  );
}

export function TransformationPreview() {
  const items = (transformationsData || []).slice(0, 4);
  return (
    <section className="section-pad" style={{ background: "var(--surface)" }}>
      <div className="container-narrow">
        <SectionHeading eyebrow="Patient Stories" title="Smile transformations" subtitle="Interactive before-and-after comparisons illustrating treatment goals. All examples shown are fictional demo content." align="center" />
        <div className="transformation-grid">
          {items.map((t, i) => (
            <ScrollReveal key={t.id || i} delay={i * 0.05} style={{ width: "100%", minWidth: 0, height: "100%" }}>
              <BeforeAfter item={t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
