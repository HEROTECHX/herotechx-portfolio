import { useEffect, useRef, useState, type RefObject } from "react";

interface UseInViewportOptions {
  threshold?: number; // 0 to 1, default 0.5 (50%)
  once?: boolean; // Trigger only once, default true
  rootMargin?: string; // Margin around root, default "0px"
  persistKey?: string; // Optional key to persist animation state across page navigations
}

interface UseInViewportReturn {
  ref: RefObject<HTMLDivElement | null>;
  isInView: boolean;
}

export const useInViewport = (options: UseInViewportOptions = {}): UseInViewportReturn => {
  const {
    threshold = 0.5, // 50% visibility by default
    once = true,
    rootMargin = "0px",
    persistKey
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const hasTriggered = useRef<boolean>(false);

  // Check if animation has already been triggered in a previous session
  useEffect(() => {
    if (persistKey && once) {
      try {
        const stored = sessionStorage.getItem(`animation-${persistKey}`);
        if (stored === 'triggered') {
          hasTriggered.current = true;
          setIsInView(true);
        }
      } catch (error) {
        // sessionStorage might not be available
        console.warn('sessionStorage not available:', error);
      }
    }
  }, [persistKey, once]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already triggered and once is true, don't observe again
    if (once && hasTriggered.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldTrigger = entry.isIntersecting;

        if (shouldTrigger && !hasTriggered.current) {
          setIsInView(true);
          hasTriggered.current = true;

          // Persist the animation state if persistKey is provided
          if (persistKey && once) {
            try {
              sessionStorage.setItem(`animation-${persistKey}`, 'triggered');
            } catch (error) {
              // sessionStorage might not be available
              console.warn('sessionStorage not available:', error);
            }
          }

          // If once is true, disconnect after first trigger
          if (once) {
            observer.disconnect();
          }
        } else if (!once && !shouldTrigger) {
          // Only reset if not "once" mode
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
  }, [threshold, once, rootMargin, persistKey]);

  return { ref, isInView };
};