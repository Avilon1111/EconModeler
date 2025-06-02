import "./constants/constants.js";
import "./constants/var_initialisation.js";
import "./constants/graph_initialisation.js";

import "./control_panel/control_panel.js";
import "./canvas/graphs/drawAxis.js";
import "./canvas/graphs/drawCurve.js";
import "./canvas/drawAllMarkets.js";
import "./canvas/econCanvas/drawEconFlow.js";

import "./canvas/logic/findEquilibrium.js";
import "./canvas/logic/equilibriumPoint.js";

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

// Рисуем рынки
window.drawAllMarkets();
window.renderControlsPanel(
  window.econGraphConfig,
  "#controls-panel",
  window.drawAllMarkets
);

// Сохраняем базовые значения для подсветки
setTimeout(() => {
  window.baseY = window.equilibrium?.Y ?? 0;
  window.basei = window.equilibrium?.i ?? 0;
}, 100);
