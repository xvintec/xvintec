import { useEffect, useRef, useState } from "react";

// Tailwind's `md` breakpoint: below this we treat the viewport as a phone.
const MOBILE_QUERY = "(max-width: 767px)";

function useIntersectionAnimation(
  threshold = 0.2
): [React.RefObject<HTMLDivElement>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;

    if (!currentRef) {
      return;
    }

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    // Phones opt out of the scroll reveal entirely. A ratio threshold can never be
    // met by a section taller than the viewport, which left content stuck at
    // opacity 0 even after scrolling to it.
    const mobile = window.matchMedia(MOBILE_QUERY);

    if (mobile.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(currentRef);

    // Resizing down to a phone width must also reveal, so nothing is left hidden.
    const handleChange = () => {
      if (mobile.matches) {
        setIsVisible(true);
        observer.disconnect();
      }
    };

    mobile.addEventListener("change", handleChange);

    return () => {
      mobile.removeEventListener("change", handleChange);
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, isVisible];
}

/**
 * Fires once when the element scrolls into view, on every viewport including
 * phones. Use for behaviour that should still be triggered by scroll position
 * after `useIntersectionAnimation` opts mobile out of the fade-in reveal —
 * counters, for example, which look wrong if they run before they are seen.
 */
export function useInView(): [React.RefObject<HTMLDivElement>, boolean] {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;

    if (!currentRef) {
      return;
    }

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Any sliver counts, shifted up slightly so it triggers once the block is
      // properly on screen rather than the instant its first pixel appears.
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export default useIntersectionAnimation;
