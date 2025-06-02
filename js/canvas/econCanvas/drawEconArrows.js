import { ArrowsEnd } from "../../constants/constants.js";

export function DrawArrows(ctx) {
  function arrow(x0, y0, x1, y1, arrow_ends = ArrowsEnd.ARROW, color = "#222") {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    // Конец стрелки
    if (arrow_ends == ArrowsEnd.ARROW) {
      const ang = Math.atan2(y1 - y0, x1 - x0);
      const len = 10;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(
        x1 - len * Math.cos(ang - Math.PI / 8),
        y1 - len * Math.sin(ang - Math.PI / 8)
      );
      ctx.moveTo(x1, y1);
      ctx.lineTo(
        x1 - len * Math.cos(ang + Math.PI / 8),
        y1 - len * Math.sin(ang + Math.PI / 8)
      );
      ctx.stroke();
    }
    ctx.restore();
  }

  function labelArrow(text, x0, y0, x1, y1) {
    const xm = (x0 + x1) / 2;
    const ym = (y0 + y1) / 2;
    ctx.save();
    ctx.font = "13px Arial";
    ctx.fillStyle = "#222";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, xm, ym);
    ctx.restore();
  }

  // Иностранный -> рынок товаров и услуг
  arrow(180, 45, 370, 45, ArrowsEnd.NO_ARROW);
  arrow(370, 45, 370, 90, ArrowsEnd.ARROW);
  labelArrow("Чистый экспорт", 140, -20, 370, 90);

  // Иностранный -> финансовый
  arrow(40, 70, 40, 320, ArrowsEnd.NO_ARROW);
  arrow(40, 320, 300, 320, ArrowsEnd.NO_ARROW);
  labelArrow("Движение капитала", 80, 300, 300, 320, 0, 0);

  // Домохозяйства -> Товары и услуги
  arrow(120, 200, 120, 110, ArrowsEnd.NO_ARROW);
  arrow(120, 110, 280, 110, ArrowsEnd.ARROW);
  labelArrow("Потребительские расходы C", 120, 90, 280, 110);

  // Домохозяйства -> Финансовый рынок
  arrow(220, 250, 320, 250, ArrowsEnd.NO_ARROW);
  arrow(320, 250, 320, 310, ArrowsEnd.ARROW);
  labelArrow("Сбережения", 220, 160, 320, 310);

  //  Финансовый рынок->Домохозяйства
  arrow(120, 340, 120, 260, ArrowsEnd.ARROW);
  arrow(120, 340, 320, 340, ArrowsEnd.NO_ARROW);
  labelArrow("Доходы", 220, 390, 320, 310);

  // Государство -> Товары и услуги *Гоззакупки
  arrow(380, 180, 380, 140, ArrowsEnd.ARROW);
  labelArrow("Госзакупки", 450, 180, 380, 140);

  // Товары и услуги -> Фирмы
  arrow(460, 100, 650, 100, ArrowsEnd.NO_ARROW);
  arrow(650, 100, 650, 200, ArrowsEnd.ARROW);
  labelArrow("Выручка от продаж", 460, -20, 650, 200);

  // Фирмы -> Товары и услуги
  arrow(590, 130, 460, 130, ArrowsEnd.ARROW);
  arrow(590, 200, 590, 130, ArrowsEnd.NO_ARROW);
  labelArrow("Издержки", 590, 160, 460, 130, 0, 0);

  // Государство -> чистые налоги
  arrow(550, 220, 440, 220, ArrowsEnd.ARROW);
  labelArrow("Чистые налоги T", 440, 200, 550, 220);

  // Фирмы -> финансовый рынок
  arrow(640, 330, 460, 330, ArrowsEnd.ARROW);
  arrow(640, 260, 640, 330, ArrowsEnd.NO_ARROW);
  labelArrow("Инвестиционные средства", 640, 300, 460, 330);
}
