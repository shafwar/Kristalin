import { useState, useLayoutEffect, useEffect } from "react";
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function useLcpSafeMicroMotion() {
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      setReady(true);
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) {
      return;
    }
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setReady(true);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);
  return ready;
}
export {
  useLcpSafeMicroMotion as u
};
