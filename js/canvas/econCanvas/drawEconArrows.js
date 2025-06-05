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
  arrow(40, 70, 40, 280, ArrowsEnd.NO_ARROW);
  arrow(40, 280, 300, 280, ArrowsEnd.NO_ARROW);
  labelArrow("Движение капитала", 120, 260, 300, 320, 0, 0);

  // Домохозяйства -> Товары и услуги
  arrow(120, 200, 120, 110, ArrowsEnd.NO_ARROW);
  arrow(120, 110, 280, 110, ArrowsEnd.ARROW);
  labelArrow("Потребительские расходы C", 120, 90, 280, 110);

  // Домохозяйства -> Финансовый рынок
  arrow(220, 240, 320, 240, ArrowsEnd.NO_ARROW);
  arrow(320, 240, 320, 260, ArrowsEnd.ARROW);
  labelArrow("Сбережения", 220, 150, 320, 310);

  //  Финансовый рынок->Домохозяйства
  arrow(120, 340, 120, 260, ArrowsEnd.ARROW);
  arrow(120, 340, 270, 340, ArrowsEnd.NO_ARROW);
  labelArrow("Доходы", 80, 390, 320, 310);

  // Государство -> Товары и услуги *Гоззакупки
  arrow(380, 170, 380, 140, ArrowsEnd.ARROW);
  labelArrow("Госзакупки", 460, 170, 380, 140);

  // Финансовый рынок -> Государство 
  arrow(380, 250, 380, 220, ArrowsEnd.NO_ARROW);
  // labelArrow("Займ при дефиците", 450, 190, 380, 280);

  // Товары и услуги -> Фирмы
  arrow(460, 100, 650, 100, ArrowsEnd.NO_ARROW);
  arrow(650, 100, 650, 200, ArrowsEnd.ARROW);
  labelArrow("Выручка от продаж", 460, -20, 650, 200);

  // Фирмы -> Товары и услуги
  arrow(590, 130, 460, 130, ArrowsEnd.ARROW);
  arrow(590, 200, 590, 130, ArrowsEnd.NO_ARROW);
  labelArrow("Инвест. расходы", 590, 160, 460, 130, 0, 0);

  // ДХ -> Государство
  arrow(220, 210, 320, 210, ArrowsEnd.ARROW);
  labelArrow("Чистые налоги T", 0, 180, 540, 220);

  // Фирмы -> Рынок экономических ресурсов
  arrow(640, 340, 518, 340, ArrowsEnd.ARROW);
  arrow(640, 260, 640, 340, ArrowsEnd.NO_ARROW);
  labelArrow("Издержки", 640, 330, 520, 330);

  //  Финансовый рынок -> Фирмы
  arrow(460, 275, 580, 275, ArrowsEnd.NO_ARROW);
  arrow(580, 275, 580, 260, ArrowsEnd.ARROW);
  labelArrow("Инвестиции", 440, 275, 580, 260);
}
