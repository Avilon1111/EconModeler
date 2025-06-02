import { findEquilibriumISLM } from "../logic/findEquilibrium.js";
import { drawEquilibriumPointOnGraph } from "../logic/equilibriumPoint.js";
import { EquilibriumPoint } from "../../constants/constants.js";

export function drawEquilibriumIfGrid(config, graphName, canvas, axes) {
  const IS = config.curves.find(
    (c) => c.graph === "IS_LM_BP" && c.name === "IS"
  );
  const LM = config.curves.find(
    (c) => c.graph === "IS_LM_BP" && c.name === "LM"
  );
  const isChanged = IS.variables.some(
    (key) => window.graphVarState[key] != IS.initial[key]
  );
  const lmChanged = LM.variables.some(
    (key) => window.graphVarState[key] != LM.initial[key]
  );

  // Формируем два набора переменных:
  const ISVars = {};
  IS.variables.forEach((key) => {
    ISVars[key] = isChanged ? window.graphVarState[key] : IS.initial[key];
  });
  const LMVars = {};
  LM.variables.forEach((key) => {
    LMVars[key] = lmChanged ? window.graphVarState[key] : LM.initial[key];
  });

  const equilibrium = findEquilibriumISLM(IS, LM, ISVars, LMVars);
  window.equilibrium = equilibrium;

  if (!window.econShowGrid) {
    return;
  }
  if (equilibrium) {
    // Равновесие на IS_LM_BP
    if (graphName === "IS_LM_BP") {
      drawEquilibriumPointOnGraph({
        canvas,
        axes,
        x: equilibrium.Y,
        y: equilibrium.i,
        color: "#111",
        show: true,
        pointRadius: EquilibriumPoint.POINT_RADIOUS,
      });
    }
    if (graphName === "Money Market") {
      // Равновесие на Money Market
      const Ms = window.graphVarState["Ms"];
      const P = window.graphVarState["P"];
      const M = Ms / P;
      drawEquilibriumPointOnGraph({
        canvas,
        axes,
        x: M,
        y: equilibrium.i,
        color: "#111",
        show: true,
        pointRadius: EquilibriumPoint.POINT_RADIOUS,
      });
    }
    if (graphName === "Goods Market") {
      // Равновесиие на Goods Market
      drawEquilibriumPointOnGraph({
        canvas,
        axes,
        x: equilibrium.Y,
        y: equilibrium.Y,
        color: "#111",
        show: true,
        pointRadius: EquilibriumPoint.POINT_RADIOUS,
      });
    }
  }
}
