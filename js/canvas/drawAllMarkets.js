import { drawCurvesOnCanvas } from "./graphs/drawGraph.js";
window.addEventListener("resize", window.drawAllMarkets);
window.drawAllMarkets = function () {
  drawCurvesOnCanvas({
    canvasId: "econ-graph-main",
    graphName: "IS_LM_BP",
  });
  drawCurvesOnCanvas({
    canvasId: "econ-graph-money",
    graphName: "Money Market",
  });
  drawCurvesOnCanvas({
    canvasId: "econ-graph-goods",
    graphName: "Goods Market",
  });

  window.drawEconFlow();
};
