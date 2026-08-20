import { useRef, useState, useEffect } from "react";
const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))";
function useLazySectionBackground(imageUrl, rootMargin = "450px") {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [imageUrl, active, rootMargin]);
  return {
    ref,
    backgroundImage: active ? `${OVERLAY}, url('${imageUrl}')` : OVERLAY
  };
}
export {
  useLazySectionBackground as u
};
