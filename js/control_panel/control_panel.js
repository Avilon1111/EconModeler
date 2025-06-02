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

    // Синхронизируем синхоронизируем клау
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
