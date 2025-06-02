import { graphPadding } from "../constants/constants.js";
export function drawEquilibriumPointOnGraph(opts) {
  // opts: { canvas, axes, x, y, color, show, xLabel, yLabel, pointRadius }

  if (!opts.show) return;
  const {
    canvas,
    axes,
    x,
    y,
    color = "#111",
    pointRadius = 9,
    xLabel,
    yLabel,
  } = opts;
  const ctx = canvas.getContext("2d");
  // Преобразуем x и y из системы координат графика в пиксели:
  const xMin = Number(axes.xMin);
  const xMax = Number(axes.xMax);
  const yMin = Number(axes.yMin);
  const yMax = Number(axes.yMax);

  const padX = canvas.width * graphPadding.PAD_X;
  const padY = canvas.height * graphPadding.PAD_Y;
  const graphLeft = padX;
  const graphTop = padY;
  const graphRight = canvas.width - padX;
  const graphBottom = canvas.height - padY;

  // Координаты точки:
  const px =
    graphLeft + ((x - xMin) / (xMax - xMin)) * (graphRight - graphLeft);
  const py =
    graphBottom - ((y - yMin) / (yMax - yMin)) * (graphBottom - graphTop);

  // --- Точка
  ctx.save();
  ctx.beginPath();
  ctx.arc(px, py, pointRadius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.shadowColor = "#333";
  ctx.shadowBlur = 3;
  ctx.fill();
  ctx.restore();

  //  Штриховые линии до осей
  ctx.save();
  ctx.strokeStyle = "#111";
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;
  // Вертикальная к оси X
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px, graphBottom);
  ctx.stroke();
  // Горизонтальная к оси Y
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(graphLeft, py);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // Подписи
  ctx.save();
  ctx.font = "bold 15px Arial";
  ctx.fillStyle = "#111";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  // X 
  ctx.fillText(
    typeof xLabel !== "undefined" ? xLabel : x.toFixed(2),
    px,
    graphBottom + 4
  );
  // Y 
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(
    typeof yLabel !== "undefined" ? yLabel : y.toFixed(2),
    graphLeft - 6,
    py
  );
  ctx.restore();
}
