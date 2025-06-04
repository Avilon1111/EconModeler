import { MODEL_DESCRIPTION } from "../constants/model_description.js";

export function setupModelInfoButton() {
  const header = document.querySelector('.controller-header');
  if (!header) return;

  // Если есть кнопка, то не вызываем
  if (document.getElementById("about-model-btn")) return;

  // Создаём кнопку
  const btn = document.createElement('button');
  btn.id = "about-model-btn";
  btn.className = "about-model-btn";
  btn.title = "Описание модели";
  btn.innerHTML = `<span class="model-info-q">?</span>`;
  header.appendChild(btn);

  // Панель описания
  function createModelDescriptionOverlay() {
    if (document.getElementById("model-desc-overlay")) return;
    const overlay = document.createElement("div");
    overlay.className = "model-description-overlay";
    overlay.id = "model-desc-overlay";
    overlay.innerHTML = `
      <button class="model-description-close" title="Закрыть">&times;</button>
      <div class="model-description-content">${MODEL_DESCRIPTION}</div>
    `;
    document.body.appendChild(overlay);

    // Кнопка закрытия
    overlay.querySelector(".model-description-close").onclick = function() {
      overlay.remove();
    };
  }

  // Обработчик
  btn.onclick = createModelDescriptionOverlay;

  return createModelDescriptionOverlay;
}
