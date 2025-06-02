// --- Функция для рисования стрелки на концах осей ---
export function drawAxisArrow(ctx, x0, y0, x1, y1, size = 14, color = "#222") {
  const angle = Math.atan2(y1 - y0, x1 - x0);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(
    x1 - size * Math.cos(angle - Math.PI / 7),
    y1 - size * Math.sin(angle - Math.PI / 7)
  );
  ctx.lineTo(
    x1 - size * Math.cos(angle + Math.PI / 7),
    y1 - size * Math.sin(angle + Math.PI / 7)
  );
  ctx.lineTo(x1, y1);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGrid({ ctx, canvas, axes, config}) {
  const xMin = Number(axes.xMin);
  const xMax = Number(axes.xMax);
  const yMin = Number(axes.yMin);
  const yMax = Number(axes.yMax);
  const xLabel = axes.xLabel;
  const yLabel = axes.yLabel;

  const padX = canvas.width * 0.05;
  const padY = canvas.height * 0.05;
  const graphLeft = padX;
  const graphTop = padY;
  const graphRight = canvas.width - padX;
  const graphBottom = canvas.height - padY;

  const steps = Number(config.grid?.steps) || 10;
  let showGrid = window.econShowGrid !== undefined
      ? window.econShowGrid
      : !!config.grid?.enabled;
  if (
    showGrid &&
    isFinite(xMin) &&
    isFinite(xMax) &&
    isFinite(yMin) &&
    isFinite(yMax)
  ) {
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    ctx.font = "14px Arial";
    ctx.fillStyle = "#555";
    // Вертикальные линии и подписи X
    for (let i = 0; i <= steps; ++i) {
      let x = graphLeft + (i * (graphRight - graphLeft)) / steps;
      ctx.beginPath();
      ctx.moveTo(x, graphTop);
      ctx.lineTo(x, graphBottom);
      ctx.stroke();
      let xVal = xMin + (i * (xMax - xMin)) / steps;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(xVal.toFixed(1), x, graphBottom + 2);
    }
    // Горизонтальные линии и подписи Y
    for (let i = 0; i <= steps; ++i) {
      let y = graphBottom - (i * (graphBottom - graphTop)) / steps;
      ctx.beginPath();
      ctx.moveTo(graphLeft, y);
      ctx.lineTo(graphRight, y);
      ctx.stroke();
      let yVal = yMin + (i * (yMax - yMin)) / steps;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(yVal.toFixed(1), graphLeft - 6, y);
    }
  }

  ctx.font = "18px Arial";
  ctx.fillStyle = "#222";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(yLabel || "Y", graphLeft + 5, graphTop + 2);
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText(xLabel || "X", graphRight - 5, graphBottom - 5);
}

export function drawAxis({ canvasId, graphName }) {
  const config = window.econGraphConfig;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const axes =
    config.axes && config.axes[graphName]
      ? config.axes[graphName]
      : config.axis;

  const padX = canvas.width * 0.05;
  const padY = canvas.height * 0.05;
  const graphLeft = padX;
  const graphTop = padY;
  const graphRight = canvas.width - padX;
  const graphBottom = canvas.height - padY;

  const ctx = canvas.getContext("2d");
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#222";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(graphLeft, graphBottom);
  ctx.lineTo(graphRight, graphBottom);
  ctx.moveTo(graphLeft, graphBottom);
  ctx.lineTo(graphLeft, graphTop);
  ctx.stroke();

  drawAxisArrow(
    ctx,
    graphRight - 28,
    graphBottom,
    graphRight,
    graphBottom,
    12,
    "#222"
  );
  drawAxisArrow(ctx, graphLeft, graphTop + 28, graphLeft, graphTop, 12, "#222");

  drawGrid({ ctx, canvas, axes, config});
}
