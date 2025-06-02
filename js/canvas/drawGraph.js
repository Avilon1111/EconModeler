import { drawAxis } from "./drawAxis.js";
import { drawCurve } from "./drawCurve.js";
import { graphType } from "../constants/constants.js";

// --- Основная функция отрисовки ---
export function drawCurvesOnCanvas({ canvasId, graphName }) {
  const config = window.econGraphConfig;
  window.graphVarState = window.graphVarState || {};
  (config.variables || []).forEach((v) => {
    if (window.graphVarState[v.key] === undefined)
      window.graphVarState[v.key] = v.value;
  });

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawAxis({ canvasId, graphName });
  // Оси
  const axes = config.axes[graphName]
      ? config.axes[graphName]
      : config.axis;
  // --- Кривые ---
  const curvesForThis = config.curves.filter((c) => c.graph === graphName);

  curvesForThis.forEach((curve) => {
    // Получаем функцию формулы
    let formulaFn = eval("(" + curve.formula + ")");

    // --- Кривая 1 - начальные переменные ---
    ctx.save();
    drawCurve({
      ctx,
      curve,
      formulaFn,
      canvas,
      axes,
      type: graphType.GRAPH_DEFAULT,
    });
    ctx.restore();


    // --- Кривая 2 - изменённые переменные ---
    let changed = curve.variables.some(
      (key) => window.graphVarState[key] != curve.initial[key]
    );

    if (changed) {
      ctx.save();
      drawCurve({
        ctx,
        curve,
        formulaFn,
        canvas,
        axes,
        type: graphType.GRAPH_NEW,
      });
      ctx.restore();
    }
  });
}
