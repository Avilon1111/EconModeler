import { DrawArrows } from "./drawEconArrows.js";
import { DrawBlocks } from "./drawEconBlocks.js";

export function drawEconFlow({ Y, i, varState, initVars, baseY, basei }) {
  const canvas = document.getElementById("econ-model");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  DrawBlocks(ctx, Y, i, varState, initVars, baseY, basei);
  DrawArrows(ctx);
}

window.drawEconFlow = function () {
  drawEconFlow({
    Y: window.equilibrium?.Y ?? 0,
    i: window.equilibrium?.i ?? 0,
    varState: window.graphVarState,
    initVars: window.econGraphConfig.variables.reduce((acc, v) => {
      acc[v.key] = v.value;
      return acc;
    }, {}),
    baseY: window.baseY ?? window.equilibrium?.Y ?? 0,
    basei: window.basei ?? window.equilibrium?.i ?? 0,
  });
};
