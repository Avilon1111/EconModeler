window.renderControlsPanel = function (config, controlsSelector, onChange) {
  const controlsPanel = document.querySelector(controlsSelector);
  if (!controlsPanel) return;
  controlsPanel.innerHTML = "";

  // Все перменные
  config.variables.forEach((variable) => {
    if (!variable.editable) return;
    const controlDiv = document.createElement("div");
    controlDiv.className = "control";
    const label = document.createElement("label");
    label.htmlFor = `${variable.key}-range`;
    label.textContent = `${variable.label} = `;

    const valueSpan = document.createElement("span");
    valueSpan.id = `${variable.key}-value`;
    valueSpan.textContent = window.graphVarState[variable.key];
    label.appendChild(valueSpan);
    controlDiv.appendChild(label);

    const range = document.createElement("input");
    range.type = "range";
    range.id = `${variable.key}-range`;
    range.min = variable.min !== undefined ? variable.min : 0;
    range.max = variable.max !== undefined ? variable.max : 200;
    range.step = variable.step !== undefined ? variable.step : 1;
    range.value = window.graphVarState[variable.key];

    range.addEventListener("input", function () {
      window.graphVarState[variable.key] = parseFloat(this.value);
      valueSpan.textContent = this.value;
      if (typeof onChange === "function") onChange();
    });

    controlDiv.appendChild(range);
    controlsPanel.appendChild(controlDiv);
  });

  // Сетка
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
  gridDiv.appendChild(gridCheck);
  const gridLabel = document.createElement("label");
  gridLabel.htmlFor = "grid-toggle";
  gridLabel.textContent = "Сетка";
  gridDiv.appendChild(gridLabel);
  controlsPanel.appendChild(gridDiv);
};
