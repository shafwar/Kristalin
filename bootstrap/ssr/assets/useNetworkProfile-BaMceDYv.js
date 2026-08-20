import { useState, useEffect } from "react";
function readNetworkHints() {
  var _a;
  if (typeof window === "undefined") {
    return { imageTier: "full", deferWelcomeBelowFold: false };
  }
  if ((_a = window.matchMedia) == null ? void 0 : _a.call(window, "(prefers-reduced-data: reduce)").matches) {
    return { imageTier: "minimal", deferWelcomeBelowFold: true };
  }
  const conn = navigator.connection;
  if (!conn) {
    return { imageTier: "full", deferWelcomeBelowFold: false };
  }
  const saveData = conn.saveData === true;
  const et = conn.effectiveType ?? "4g";
  if (saveData || et === "slow-2g" || et === "2g") {
    return { imageTier: "minimal", deferWelcomeBelowFold: true };
  }
  if (et === "3g") {
    return { imageTier: "conserve", deferWelcomeBelowFold: true };
  }
  const downlink = typeof conn.downlink === "number" ? conn.downlink : void 0;
  if (downlink !== void 0) {
    if (downlink < 0.45) {
      return { imageTier: "minimal", deferWelcomeBelowFold: true };
    }
    if (downlink < 1.6) {
      return { imageTier: "conserve", deferWelcomeBelowFold: true };
    }
  }
  return { imageTier: "full", deferWelcomeBelowFold: false };
}
function useNetworkProfile() {
  const [state, setState] = useState(readNetworkHints);
  useEffect(() => {
    var _a;
    const compute = () => setState(readNetworkHints());
    compute();
    const conn = navigator.connection;
    conn == null ? void 0 : conn.addEventListener("change", compute);
    const mq = (_a = window.matchMedia) == null ? void 0 : _a.call(window, "(prefers-reduced-data: reduce)");
    mq == null ? void 0 : mq.addEventListener("change", compute);
    return () => {
      conn == null ? void 0 : conn.removeEventListener("change", compute);
      mq == null ? void 0 : mq.removeEventListener("change", compute);
    };
  }, []);
  return state;
}
export {
  useNetworkProfile as u
};
