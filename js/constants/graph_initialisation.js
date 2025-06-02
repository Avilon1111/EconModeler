import {graphMode } from "./constants.js";
import {init_variables, econVars} from "./var_initialisation.js"


window.econGraphConfig = {
  variables: econVars,
  grid: { enabled: false, steps: 10 },
  axes: {
    IS_LM_BP: {
      xMin: 0,
      xMax: 1000,
      yMin: 0,
      yMax: 15,
      xLabel: "Y",
      yLabel: "i",
    },
    "Money Market": {
      xMin: 0,
      xMax: 400,
      yMin: 0,
      yMax: 10,
      xLabel: "M",
      yLabel: "i",
    },
    "Goods Market": {
      xMin: 0,
      xMax: 200,
      yMin: 0,
      yMax: 500,
      xLabel: "E",
      yLabel: "Y",
    },
  },
  curves: [
    {
      graph: "IS_LM_BP",
      name: "IS",
      color: "#2f80ed",
      mode: graphMode.GRAPH_DEFAULT,

      width: 2,
      variables: [
        "C",
        "I",
        "G",
        "T",
        "Xn",
        "mpc",
        "tY",
        "bY",
        "etaY",
        "etaYstar",
        "Ystar",
        "etaQ",
        "Q",
        "phi",
        "bi",
      ],
      initial: init_variables,
      formula: `
        function(Y, vars) {
          const A = 1 - vars.mpc * (1 - vars.tY) - vars.bY + vars.etaY;
          const num = vars.C + vars.I + vars.G + vars.Xn - vars.mpc * vars.T + vars.etaYstar * vars.Ystar + vars.etaQ * vars.Q;
          const denom = vars.phi + vars.bi;
          return (num - A*Y) / denom;
        }
      `,
    },
    {
      graph: "IS_LM_BP",
      name: "LM",
      color: "#27ae60",
      mode: graphMode.GRAPH_DEFAULT,
      width: 2,
      variables: ["Ms", "P", "Lbar", "lambdaY", "lambdai"],
      initial: init_variables,
      formula: `
        function(Y, vars) {
          return (vars.lambdaY * Y - (vars.Ms/vars.P - vars.Lbar)) / vars.lambdai;
        }
      `,
    },
    {
      graph: "IS_LM_BP",
      name: "BP",
      color: "#eb5757",
      mode: graphMode.GRAPH_DEFAULT,
      width: 2,
      variables: [
        "Xn",
        "etaYstar",
        "Ystar",
        "etaQ",
        "Q",
        "c",
        "istar",
        "theta",
        "etaY",
      ],
      initial: init_variables,
      formula: `
        function(Y, vars) {
        if (vars.c == 0){
            return vars.istar;
        }
          const num = vars.Xn - vars.etaYstar * vars.Ystar + vars.etaQ * vars.Q - vars.c * (vars.istar + vars.theta);
          return (vars.etaY * Y - num) / vars.c;
        }
      `,
    },
    {
      graph: "Money Market",
      name: "L_s",
      color: "#eb5757",
      width: 2,
      mode: graphMode.GRAPH_VERTICAL,
      variables: ["Ms", "P"],
      initial: init_variables,
      formula: `
        function(vars) { return vars.Ms / vars.P; }
      `,
    },
    {
      graph: "Money Market",
      name: "L_d",
      color: "#2f80ed",
      width: 2,
      variables: [
        "Lbar",
        "lambdaY",
        "lambdai",
        "Cbar",
        "mpc",
        "phi",
        "Ibar",
        "b1",
        "b2",
        "Gbar",
        "Tbar",
        "tY",
        "Xnbar",
        "etaY",
        "etaYstar",
        "etaQ",
        "Q",
        "Ystar",
      ],
      initial: init_variables,
      formula: `
    function(M, vars) {
      let Y = (vars.Cbar || 0) +
        (vars.mpc || 0) * 100 +
        -(vars.phi || 0) * 1 +
        (vars.Ibar || 0) - (vars.b1 || 0) * 1 + (vars.b2 || 0) * 100 +
        (vars.Gbar || 0) +
        (vars.Xnbar || 0) - (vars.etaY || 0) * 100 + (vars.etaYstar || 0) * (vars.Ystar || 0) + (vars.etaQ || 0) * (vars.Q || 0);;
      return (vars.Lbar + vars.lambdaY * Y - M) / vars.lambdai;
    }
  `,
    },
  ],
};
