# Symbiont AgriTech Dashboard 🇳🇬

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-green?logo=typescript)](https://typescriptlang.org)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?logo=mit)](LICENSE)
[![Node](https://img.shields.io/badge/Node->%3E14-green?logo=node.js)](https://nodejs.org)

A breakthrough, no-build React + TS prototype for AI-driven farm symbiosis. Inspired by Nigeria's Project Symbiont, it simulates yield predictions, risk forecasting, and human-AI co-evolution for smallholder farmers. Offline-first, mobile-optimized—loads in <1s on 3G.

## Features
- Real-time metrics: Yield, blight risk, water savings (₦-formatted).
- Neural "hunch" adjustments with clamping (0-60 tons/ha).
- Dark mode auto-detection + toggle.
- IndexedDB persistence with error toasts (via react-hot-toast).
- Inline SVG charts; lazy-loaded for perf.
- Naija-localized: en-NG dates, WAT timezone.

## Setup
1. Clone the repo: `git clone https://github.com/idris81ahmad-cyber/symbiotic.agritech.git`
2. Navigate: `cd symbiotic.agritech`
3. Serve locally: `npx serve .` (or `python -m http.server 8000`)
4. Open `http://localhost:3000` (or 8000) in a modern browser (Chrome 89+, Firefox 108+).
5. Test offline: Adjust yields, refresh—data persists!

No build tools needed—ESM magic via esm.sh.

## Screenshots
![Main Dashboard](./screenshots/dashboard-light.png)  
*(Light mode: Metrics grid + evolve button)*

![Dark Mode](./screenshots/dashboard-dark.png)  
*(Auto-detected for night shifts in the fields)*

*(Add your own via phone: Capture on Android/iOS for real Naija vibes!)*

## Testing
- **Cross-Device**: Use BrowserStack for Android (e.g., Tecno Spark) / iOS Safari.
- **Beta Recruitment**: Share via WhatsApp farmer groups—track evolves with opt-in beacons.
- **Lighthouse**: Aim for 95+ scores (perf/accessibility).

## Evolution Roadmap
- **Week 1 PRs**: Voice mode (Web Speech), multi-farm tabs, xAI API stub.
- **Future**: Geolocation for micro-climates, USSD bridge for feature phones.

## License
MIT - Open-source for Africa's neural dawn. Contribute via PRs!

## Acknowledgments
Built with ❤️ in Lagos. Shoutout to xAI's Grok for co-evolving this code.

---
*Last Updated: November 07, 2025*  
