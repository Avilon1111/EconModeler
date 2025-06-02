import "./constants/constants.js";
import "./constants/var_initialisation.js";
import "./constants/graph_initialisation.js";

import "./canvas/control_panel.js";
import "./canvas/drawAxis.js";
import "./canvas/drawCurve.js";
import "./canvas/drawGraph.js";
import "./canvas/drawAllMarkets.js";

window.drawAllMarkets();
window.renderControlsPanel(
  window.econGraphConfig,
  "#controls-panel",
  window.drawAllMarkets
);
