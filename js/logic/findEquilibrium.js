export function findEquilibriumISLM(IS, LM, ISVars, LMVars) {
  const IS_fn = eval("(" + IS.formula + ")");
  const LM_fn = eval("(" + LM.formula + ")");
  function diff(Y) {
    return IS_fn(Y, ISVars) - LM_fn(Y, LMVars);
  }
  let left = 0, right = 1e5, mid, iter = 0, maxIter = 100;
  while (iter++ < maxIter) {
    mid = (left + right) / 2;
    if (Math.abs(diff(mid)) < 1e-4) break;
    if (diff(left) * diff(mid) < 0) {
      right = mid;
    } else {
      left = mid;
    }
  }
  const Ystar = mid;
  const iStar = IS_fn(Ystar, ISVars);
  return { Y: Ystar, i: iStar };
}
