import { graphMode } from "./constants.js";
import { init_variables, econVars } from "./var_initialisation.js";

window.econGraphConfig = {
  variables: econVars,
  grid: { enabled: false, steps: 5 },
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
      // Меняем оси местами!
      xMin: 0,
      xMax: 1000, // Y — выпуск
      yMin: 0,
      yMax: 1000, // E — расходы
      xLabel: "Y",
      yLabel: "E",
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
        // "Y" убираем — будет использоваться равновесный Y из window.equilibrium
      ],
      initial: init_variables,
      // формула для i(Ld), где Ld — ось X
      formula: `
    function(Ld, vars) {
      // Используем равновесное Y
      const Yeq = window.equilibrium.Y;
      // Ld = Lbar + lambdaY * Yeq - lambdai * i
      // => i = (Lbar + lambdaY * Yeq - Ld) / lambdai
      return (vars.Lbar + vars.lambdaY * Yeq - Ld) / vars.lambdai;
    }
  `,
    },
    {
      graph: "Goods Market",
      name: "Y = E",
      color: "#27ae60",
      width: 2,
      variables: [],
      initial: {},
      formula: `
        function(Y, vars) {
          return Y; // E = Y
        }
      `,
    },
    {
      graph: "Goods Market",
      name: "E(Y, i^*)",
      showChanged: false, // Строчка, чтобы исходное значение кривой не рисовалось
      color: "#eb5757",
      width: 2,
      variables: [
        "C",
        "mpc",
        "phi",
        "I",
        "bi",
        "bY",
        "G",
        "T",
        "tY",
        "Xn",
        "etaY",
        "etaYstar",
        "Ystar",
        "etaQ",
        "Q",
        "i",
      ],
      initial: init_variables,
      formula: `
    function(Y, vars) {
      // Берём равновесное i
      const i_star = window.equilibrium.i;
      // T = T̄ + tY * Y
      const T = vars.T + vars.tY * Y;
      // Y_d = Y - T
      const Y_d = Y - T;
      // C(Y_d, i)
      const C = vars.C + vars.mpc * Y_d - vars.phi * i_star;
      // I(i, Y)
      const I = vars.I - vars.bi * i_star + vars.bY * Y;
      // G
      const G = vars.G;
      // Xn(Q, Y, Y*)
      const Xn = vars.Xn - vars.etaY * Y + vars.etaYstar * vars.Ystar + vars.etaQ * vars.Q;
      // E(Y, i)
      return C + I + G + Xn;
    }
  `,
    },

    ,
  ],
};
