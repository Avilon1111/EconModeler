import { graphType, graphMode, graphPadding} from "../constants/constants.js";

export function drawCurve({ ctx, curve, formulaFn, canvas, axes, type }) {
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

  let formulaFnArgs = { ...curve.initial };
  let suffix = 1;
  if (type == graphType.GRAPH_DEFAULT) {
    ctx.strokeStyle = curve.color || "#222";
    ctx.lineWidth = curve.width || 2;
  } else {
    ctx.strokeStyle = curve.color || "#222";
    ctx.globalAlpha = 0.7;
    ctx.setLineDash([4, 2]);
    ctx.lineWidth = (curve.width || 2) + 1;
    formulaFnArgs = { ...curve.initial, ...window.graphVarState };
    suffix = 2;
  }
  if (curve.mode === graphMode.GRAPH_VERTICAL) {
    // Вертикальная линия: x = const
    const constX = formulaFn(formulaFnArgs);
    const px =
      graphLeft + ((constX - xMin) / (xMax - xMin)) * (graphRight - graphLeft);
    ctx.beginPath();
    ctx.moveTo(px, graphTop);
    ctx.lineTo(px, graphBottom);
    ctx.stroke();
    // Надпись
    drawCurveLabel(ctx, {
      mode: graphMode.GRAPH_VERTICAL,
      name: curve.name,
      color: curve.color,
      px: px,
      py: graphTop + 5,
      suffix: suffix,
    });
  } else {
    // x_to_y (или default)
    let lastCoord = null;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= graphRight - graphLeft; px++) {
      const X = xMin + (xMax - xMin) * (px / (graphRight - graphLeft));
      let Y;
      try {
        Y = formulaFn(X, formulaFnArgs);
        if (!isFinite(Y)) continue;
      } catch (e) {
        continue;
      }
      const py =
        graphBottom - ((Y - yMin) / (yMax - yMin)) * (graphBottom - graphTop);
      const cx = graphLeft + px;
      if (py >= graphTop && py <= graphBottom) {
        lastCoord = [cx, py];
        if (!started) {
          ctx.moveTo(cx, py);
          started = true;
        } else {
          ctx.lineTo(cx, py);
        }
      }
    }
    ctx.stroke();
    if (lastCoord) {
      drawCurveLabel(ctx, {
        mode: graphMode.GRAPH_DEFAULT,
        name: curve.name,
        color: curve.color,
        lastCoord: lastCoord,
        suffix: suffix,
      });
    }
  }
}


function drawCurveLabel(ctx, opts) {
  ctx.save();
  ctx.font = "bold 14px Arial";
  ctx.fillStyle = opts.color || "#222";

  if (opts.mode == graphMode.GRAPH_VERTICAL) {
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(
      opts.name + " " + (opts.suffix || "1"),
      opts.px,
      opts.py !== undefined ? opts.py : 0
    );
  } else {
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    if (opts.lastCoord) {
      ctx.fillText(
        opts.name + " " + (opts.suffix || "1"),
        opts.lastCoord[0] - 40,
        opts.lastCoord[1]
      );
    }
  }
  ctx.restore();
}