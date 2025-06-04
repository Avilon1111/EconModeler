import { PARAM_DESCRIPTIONS } from "../constants/var_initialisation.js";

function renderMath(labelElement) {
  if (window.MathJax && window.MathJax.typesetPromise) {
    MathJax.typesetPromise([labelElement]);
  }
}


window.renderControlsPanel = function (config, controlsSelector, onChange) {
  const controlsPanel = document.querySelector(controlsSelector);
  if (!controlsPanel) return;
  controlsPanel.innerHTML = "";

  // Переключатель сетки
  const gridDiv = document.createElement("div");
  gridDiv.className = "control grid-control";

  const gridCheck = document.createElement("input");
  gridCheck.type = "checkbox";
  gridCheck.id = "grid-toggle";
  gridCheck.checked = window.econShowGrid;
  gridCheck.addEventListener("input", function () {
    window.econShowGrid = this.checked;
    if (typeof onChange === "function") onChange();
  });

  const gridLabel = document.createElement("label");
  gridLabel.htmlFor = "grid-toggle";
  gridLabel.textContent = "Сетка";

  gridDiv.appendChild(gridLabel);
  gridDiv.appendChild(gridCheck);
  controlsPanel.appendChild(gridDiv);

  // Управление переменными
  config.variables.forEach((variable) => {
    if (!variable.editable) return;

    const controlDiv = document.createElement("div");
    controlDiv.className = "control";

    const label = document.createElement("label");
    label.htmlFor = `${variable.key}-range`;
    label.innerHTML = `${variable.label}`;
    renderMath(label);
    controlDiv.appendChild(label);

    // Добавляем описание для переменных
    const infoIcon = document.createElement("span");
    infoIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="11" stroke="#2979ff" stroke-width="2" fill="#fff"/>
  <text x="12" y="16" text-anchor="middle" font-size="12" fill="#2979ff" font-family="Arial" font-weight="bold">i</text>
</svg>`;
    infoIcon.style.cursor = "pointer";
    infoIcon.style.marginLeft = "8px";
    infoIcon.style.display = "inline-block";
    infoIcon.style.verticalAlign = "middle";
    infoIcon.className = "econ-tooltip-icon";

    const tooltipText = document.createElement("div");
    tooltipText.className = "econ-tooltip-text";
    tooltipText.textContent =
      PARAM_DESCRIPTIONS[variable.key] || "Нет описания";
    infoIcon.appendChild(tooltipText);

    controlDiv.appendChild(infoIcon);

    // Для ввода чисел с клавы
    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.min = variable.min !== undefined ? variable.min : 0;
    numberInput.max = variable.max !== undefined ? variable.max : 200;
    numberInput.step = variable.step !== undefined ? variable.step : 1;
    numberInput.value = window.graphVarState[variable.key];
    numberInput.style.width = "70px";

    // Через ползунок
    const range = document.createElement("input");
    range.type = "range";
    range.id = `${variable.key}-range`;
    range.min = numberInput.min;
    range.max = numberInput.max;
    range.step = numberInput.step;
    range.value = numberInput.value;

    // Синхронизируем ползунок
    range.addEventListener("input", function () {
      numberInput.value = this.value;
      window.graphVarState[variable.key] = parseFloat(this.value);
      if (typeof onChange === "function") onChange();
    });

    // Синхронизируем синхоронизируем клаву
    numberInput.addEventListener("input", function () {
      const val = parseFloat(this.value);
      window.graphVarState[variable.key] = val;
      range.value = val;
      if (typeof onChange === "function") onChange();
    });

    controlDiv.appendChild(numberInput);
    controlDiv.appendChild(range);

    controlsPanel.appendChild(controlDiv);
  });
};
