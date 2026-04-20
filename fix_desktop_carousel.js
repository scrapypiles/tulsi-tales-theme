const fs = require('fs');

const cssPath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

const desktopCarousel = `

/* =========================================================
   DESKTOP CAROUSEL STYLES
   ========================================================= */
.tt-horizontal-carousel {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  gap: 30px;
  padding-bottom: 30px;
  margin: 0 -40px;
  padding-left: 40px;
  padding-right: 40px;
  scrollbar-width: none;
}

.tt-horizontal-carousel::-webkit-scrollbar {
  display: none;
}

.tt-horizontal-carousel .tt-carousel-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 0 0 auto;
  width: calc(25% - 22.5px);
  min-width: 260px;
  max-width: 320px;
  scroll-snap-align: start;
  border: none;
  background: transparent;
}
`;

if (!css.includes("DESKTOP CAROUSEL STYLES")) {
  // Insert before the MOBILE RESPONSIVENESS PATCH so mobile overrides it
  css = css.replace("/* =========================================================", desktopCarousel + "\n/* =========================================================");
  fs.writeFileSync(cssPath, css);
  console.log("Desktop carousel styles added.");
}
