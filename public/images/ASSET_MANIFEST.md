# DENTORA 2.0 — Asset Manifest

## Policy (followed)
- **No hotlinked thumbnails. No watermarked or unverifiable copyrighted assets.**
- **No fabricated image sources or licenses.** Where a download could not be completed, that is stated explicitly.
- **Fictional demo content is labeled in UI:** doctor profiles, testimonials, trust statistics, and transformation cases are demo/replaceable and marked as demo where displayed.
- **3D tooth:** original **procedural** model (Three.js/R3F, `MeshPhysicalMaterial`) — **no external GLB downloaded** (avoids unverified 3D license risk). Lightweight, optimized, reduced-motion/mobile-aware.

## Web image research (verified sources & licenses) — download status
I researched and opened original Wikimedia Commons file pages and verified relevance + license metadata. **Direct binary downloads from `upload.wikimedia.org` were blocked by Wikimedia rate-limiting (HTTP 429) in this execution environment**, so these specific JPEG files were **NOT downloaded** into `public/images/` and are **NOT used** by the app.

| Candidate (researched, verified) | Source page | License (verified on page) | Download status | Intended use (if later obtained legitimately) |
|---|---|---|---|---|
| Interior of Tandheelkundig Centrum Terbregge, Rotterdam (2022) | https://commons.wikimedia.org/wiki/File:Interior_of_the_Tandheelkundig_Centrum_Terbregge,_Terbregge,_Rotterdam_(2022)_02.jpg | **CC BY-SA 4.0** — Donald Trung Quoc Don | **NOT DOWNLOADED (429)** | Reception/clinic interior |
| Sollidens Tandläkarmottagning | https://commons.wikimedia.org/wiki/File:Sollidens_Tandl%C3%A4karmottagning.jpg | **CC BY-SA 4.0** — Alexandar Vujadinovic | **NOT DOWNLOADED (429)** | Treatment room |
| Dental chair, North Carolina | https://commons.wikimedia.org/wiki/File:A_dental_chair_in_a_dentist_clinic_in_North_Carolina,_United_States.jpg | **CC BY 4.0** — Harrison Keely | **NOT DOWNLOADED (429)** | Equipment/consultation |
| Behandlungsstuhl Ritter 002 | https://commons.wikimedia.org/wiki/File:Behandlungsstuhl_Ritter_002.JPG | **CC BY-SA 3.0** (verify exact terms on page before use) — Werneuchen | **NOT DOWNLOADED (429)** | Dental equipment |
| Dentist consultation, Hôpital Laquintinie de Douala | https://commons.wikimedia.org/wiki/File:Dentiste_A_l%27h%C3%B4pital_Laquintinie_de_Douala_17.jpg | **CC BY-SA 4.0** — Destiny Deffo | **NOT DOWNLOADED (429)** | Consultation/care |
| Dental care airflow | https://commons.wikimedia.org/wiki/File:Dental_care_airflow.jpg | **CC BY-SA 3.0** — Milenafoto / Wahroonga Family Dental Centre | **NOT DOWNLOADED (429)** | Treatment care |

**Unsplash:** results included **Unsplash+ (paid/subscription)** items — not used. **Getty/Vecteezy:** stock licensing/authorization not assumed — not used.

## Local assets actually integrated (present in `public/images/`)
All are **original, project-created SVG illustrative visuals** (no third-party photo copyright dependency, not watermarked). They replace placeholders with relevant dental/healthcare-themed visuals.

| Filename | Type | License / permission | Intended section |
|---|---|---|---|
| `clinic-reception.svg` | Original SVG illustration | Project-created; free to use in this project | Clinic reception / about / experience |
| `clinic-treatment.svg` | Original SVG illustration | Project-created | Treatment suite |
| `clinic-consultation.svg` | Original SVG illustration | Project-created | Consultation room |
| `clinic-equipment.svg` | Original SVG illustration | Project-created | Dental technology / equipment |
| `doctor-1.svg`–`doctor-5.svg` | Original SVG illustrative portraits | Project-created; **fictional demo professionals, not real people** | Doctor cards/profiles |
| `treatment-implants.svg`, `treatment-whitening.svg`, `treatment-orthodontics.svg`, `treatment-root-canal.svg`, `treatment-cosmetic.svg`, `treatment-crowns.svg`, `treatment-gum.svg`, `treatment-pediatric.svg` | Original SVG treatment visuals | Project-created | Treatment cards/pages (8 treatments) |
| `treatment-aligners.svg`, `treatment-anatomy.svg` | Original SVG visuals | Project-created | Technology/aligner/anatomy supporting visuals |
| `transform-demo-1.svg`–`transform-demo-4.svg` | Original SVG before/after demo frames | Project-created; **fictional demo, not real patient results** | Transformations / smile gallery |

## Implementation note
- Images are stored locally under `public/images/` and referenced by path (no hotlinking).
- `src/utils/images.js` provides `imgOnError` fallback so missing/blocked assets degrade gracefully to an on-brand SVG (no empty grey boxes). For Wikimedia JPEGs to be used, download them **manually/legitimately** per the verified licenses above, place into `public/images/` with the manifest filenames, and keep attribution.
