import "./constants/constants.js";
import "./constants/var_initialisation.js";
import "./constants/graph_initialisation.js";

import "./canvas/control_panel.js";
import "./canvas/drawAxis.js";
import "./canvas/drawCurve.js";
import "./canvas/drawGraph.js";
import "./canvas/drawAllMarkets.js";

import "./logic/findEquilibrium.js";
import "./logic/equilibriumPoint.js";

// === Динамически загружаем MathJax ===
window.MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
  svg: { fontCache: "global" },
};

const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
script.async = true;
document.head.appendChild(script);

window.drawAllMarkets();
window.renderControlsPanel(
  window.econGraphConfig,
  "#controls-panel",
  window.drawAllMarkets
);
