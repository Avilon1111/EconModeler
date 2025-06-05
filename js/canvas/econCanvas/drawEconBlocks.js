export function DrawBlocks(ctx, Y, i, varState, initVars, baseY, basei) {
  // 1. Домохозяйства: C(Yd, i)
  const T = varState.T + varState.tY * Y;
  const Yd = Y - T;
  const C = varState.C + varState.mpc * Yd - varState.phi * i;
  const baseT = initVars.T + initVars.tY * baseY;
  const baseYd = baseY - baseT;
  const baseC = initVars.C + initVars.mpc * baseYd - initVars.phi * basei;

  // 2. Фирмы: I(i, Y)
  const I = varState.I - varState.bi * i + varState.bY * Y;
  const baseI = initVars.I - initVars.bi * basei + initVars.bY * baseY;

  // 3. Государство: T - G
  const G = varState.G;
  const baseG = initVars.G;
  const saldo = T - G;
  const baseSaldo = baseT - baseG;

  // 4. Иностранный сектор: Xn(Q, Y, Y*)
  const Xn =
    varState.Xn -
    varState.etaY * Y +
    varState.etaYstar * varState.Ystar +
    varState.etaQ * varState.Q;
  const baseXn =
    initVars.Xn -
    initVars.etaY * baseY +
    initVars.etaYstar * initVars.Ystar +
    initVars.etaQ * initVars.Q;

  // 5. Рынок товаров и услуг: Y (сравниваем с baseY)
  // 6. Финансовый рынок: i (сравниваем с basei, чем меньше - тем зеленее)
  const blocks = [
    {
      name: "Домохозяйства",
      rect: [60, 200, 160, 60],
      value: C,
      base: baseC,
      formula: "C(Yd, i)",
    },
    {
      name: "Фирмы",
      rect: [550, 200, 130, 60],
      value: I,
      base: baseI,
      formula: "I(i, Y)",
    },
    {
      name: "Государство",
      rect: [320, 170, 120, 50],
      value: saldo,
      base: baseSaldo,
      formula: "T-G",
    },
    {
      name: "Иностранный сектор",
      rect: [20, 20, 160, 50],
      value: Xn,
      base: baseXn,
      formula: "Xn(Q, Y, Y*)",
    },
    {
      name: "Рынок товаров и услуг",
      rect: [280, 90, 200, 50],
      value: Y,
      base: baseY, // начальный выпуск
      formula: "Y",
      ellipse: true,
    },
    {
      name: "Финансовый рынок",
      rect: [300, 250, 160, 50],
      value: i,
      base: basei, // Ставка стартовая
      formula: "i",
      invert: true,
      ellipse: true,
    },

    {
      name: "Рынок экономических ресурсов",
      rect: [270, 320, 250, 50],
      formula: "",
      invert: true,
      ellipse: true,
      changes: false,
    },
  ];

  // Перебор блоков
  blocks.forEach((b) => {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#222";
    ctx.fillStyle = getColor(b.value, b.base, b.invert);

    if (b.ellipse) {
      ctx.beginPath();
      ctx.ellipse(
        b.rect[0] + b.rect[2] / 2,
        b.rect[1] + b.rect[3] / 2,
        b.rect[2] / 2,
        b.rect[3] / 2,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.rect(...b.rect);
      ctx.fill();
      ctx.stroke();
    }

    
    // Текст блока
    let text_delta = 10;
    if (b.changes == false) {
      text_delta = 0;
    }
    ctx.fillStyle = "#111";
    ctx.font = "bold 15px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      b.name,
      b.rect[0] + b.rect[2] / 2,
      b.rect[1] + b.rect[3] / 2 - text_delta
    );
    ctx.font = "italic 13px Arial";
    ctx.fillText(
      b.formula,
      b.rect[0] + b.rect[2] / 2,
      b.rect[1] + b.rect[3] / 2 + 14
    );
    ctx.restore();
  });
}
function lerpColor(t) {
  // t ∈ [-1, 1], -1=красный, 0=белый, 1=зелёный
  t = Math.max(-1, Math.min(1, t));
  if (t < 0) return `rgb(255,${255 + t * 255},${255 + t * 255})`;
  else return `rgb(${255 - t * 255},255,${255 - t * 255})`;
}

function getColor(value, base, invert = false) {
  if (!isFinite(value) || !isFinite(base)) return "#fff";
  let delta = (value - base) / (Math.abs(base) + 1e-5);
  delta = Math.max(Math.min(delta, 1), -1);
  if (invert) delta = -delta;
  return lerpColor(delta);
}
