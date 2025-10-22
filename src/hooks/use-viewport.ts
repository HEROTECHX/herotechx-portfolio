import { useEffect, useRef, useState, type RefObject } from "react";

interface UseInViewportOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

interface UseInViewportReturn<T extends Element> {
  ref: RefObject<T | null>;
  isInView: boolean;
}

export const useInViewport = <T extends Element = HTMLDivElement>(
  options: UseInViewportOptions = {}
): UseInViewportReturn<T> => {
  const {
    threshold = 0.5,
    once = true,
    rootMargin = "0px"
  } = options;

  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const hasTriggered = useRef<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (once && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldTrigger = entry.isIntersecting;

        if (shouldTrigger) {
          setIsInView(true);
          hasTriggered.current = true;

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, rootMargin]);

  return { ref, isInView } as UseInViewportReturn<T>;
};