# Petra asset integration notes

- Real web-sourced stock photos were downloaded from Pexels CDN URLs into `public/assets/images/` and are served locally by Vite as `/assets/images/*`.
- Pexels license: photos are presented by Pexels as free to use; verify current terms at https://www.pexels.com/license/ before commercial redistribution. Direct license-page fetch from this environment returned HTTP 403, so the license was not re-crawled during this session; source pages/URLs are recorded below and in `public/assets/images/README.md`.
- No hotlinking is used in the app. Images use local paths, `object-fit: cover`, descriptive alt text, lazy loading below the fold where applicable, and `imgOnError` fallbacks.
- Dentist portraits and transformation visuals are **fictional demo content** (stock/illustrative) and must not be presented as real clinic staff or real patient outcomes.

## Integrated local assets
| File | Usage | Source page |
|---|---|---|
| clinic-reception.jpg | reception/hero-adjacent clinic visuals | https://www.pexels.com/photo/6812561/ |
| clinic-treatment-room.jpg | treatment/crown/gum context | https://www.pexels.com/photo/3845810/ |
| dental-equipment.jpg | equipment/safety context | https://www.pexels.com/photo/4269694/ |
| clinic-consultation.jpg | consultation spaces | https://www.pexels.com/photo/3779709/ |
| technology-scan.jpg | technology showcase/clinic tech | https://www.pexels.com/photo/5355838/ |
| dentist-portrait-1..5.jpg | demo doctor profiles | 6627534, 8460094, 5327585, 6627476, 6627536 |
| treatment-implant.jpg | implants/treatment visuals | https://www.pexels.com/photo/3845653/ |
| treatment-whitening.jpg | whitening visuals | https://www.pexels.com/photo/6528908/ |
| treatment-orthodontics.jpg | orthodontics visuals | https://www.pexels.com/photo/6528864/ |
| treatment-checkup.jpg | root canal/checkup visual | https://www.pexels.com/photo/3779705/ |
| treatment-cosmetic.jpg | cosmetic/default treatment | https://www.pexels.com/photo/5355897/ |
| treatment-pediatric.jpg | pediatric treatment | https://www.pexels.com/photo/3845625/ |
| smile-patient.jpg | demo transformation visual | https://www.pexels.com/photo/4687360/ |
| transformation-smile-demo.jpg | demo transformation visual | https://www.pexels.com/photo/3762453/ |
