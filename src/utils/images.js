// Local Petra image helpers: local assets, graceful fallback (no empty/grey placeholders).
export function imgOnError(e) {
  const t = e?.currentTarget;
  if (!t || t.dataset.fallbackApplied) return;
  t.dataset.fallbackApplied = "1";
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
      <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='#F3E0DC'/><stop offset='1' stop-color='#D4A59A'/></linearGradient></defs>
      <rect width='1200' height='800' fill='url(#g)'/>
      <text x='600' y='410' text-anchor='middle' font-family='DM Sans,Arial,sans-serif' font-size='28' fill='#5C2018'>DENTORA — image unavailable</text>
    </svg>`
  );
  t.src = `data:image/svg+xml;charset=utf-8,${svg}`;
}

export const TREATMENT_IMAGES = {
  "Dental Implants": "/assets/images/treatment-implant.jpg",
  "Teeth Whitening": "/assets/images/treatment-whitening.jpg",
  "Orthodontics": "/assets/images/treatment-orthodontics.jpg",
  "Root Canal Treatment": "/assets/images/treatment-checkup.jpg",
  "Cosmetic Dentistry": "/assets/images/treatment-cosmetic.jpg",
  "Dental Crowns": "/assets/images/clinic-treatment-room.jpg",
  "Gum Treatment": "/assets/images/dental-equipment.jpg",
  "Pediatric Dentistry": "/assets/images/treatment-pediatric.jpg",
};

export function treatmentImage(name) {
  return TREATMENT_IMAGES[name] || "/assets/images/treatment-cosmetic.jpg";
}

export const CLINIC_IMAGES = {
  reception: "/assets/images/clinic-reception.jpg",
  consultation: "/assets/images/clinic-consultation.jpg",
  treatment: "/assets/images/clinic-treatment-room.jpg",
  equipment: "/assets/images/dental-equipment.jpg",
  technology: "/assets/images/technology-scan.jpg",
  smile: "/assets/images/smile-patient.jpg",
};
