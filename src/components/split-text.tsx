import type { SplitTextProps } from "../types";
import { TextEffect } from "./text-effect";
import { motion } from "motion/react";
import { useInViewport } from "../hooks/use-viewport"; // Import the hook

// Base animation configurations
const animationConfigs = {
  fadeInUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 }
  },
  fadeInDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  },
  fadeInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  },
  fadeInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },
  scaleIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
  },
  rotateIn: {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 }
  },
  bounceIn: {
    initial: { y: -500, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 500, opacity: 0 }
  },
  flipIn: {
    initial: { rotateX: -90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: 90, opacity: 0 }
  },
  slideIn: {
    initial: { x: -500, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 500, opacity: 0 }
  },
  zoomIn: {
    initial: { scale: 3, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
  }
};

const transitionConfigs = {
  gentle: { duration: 1.5, ease: "easeInOut" as const },
  bouncy: { 
    type: "spring" as const, 
    damping: 15, 
    stiffness: 150,
    duration: 1.5 
  },
  smooth: { duration: 1.5, ease: "easeOut" as const },
  quick: { duration: 1.5, ease: "easeInOut" as const },
  elastic: { 
    type: "spring" as const, 
    damping: 12, 
    stiffness: 150,
    duration: 1.5 
  }
};

// SplitTextOne with fixed viewport detection
export const SplitTextOne: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.15 
}) => {
  const words = text.split(" ");
  // Create a unique key based on the text content for persistence
  const persistKey = whileInView ? `splittext-one-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ 
            y: -500, 
            opacity: 0,
            rotate: Math.random() * -90 - 80 
          }}
          animate={whileInView ? (isInView ? { 
            y: 0, 
            opacity: 1, 
            rotate: 0 
          } : undefined) : { 
            y: 0, 
            opacity: 1, 
            rotate: 0 
          }}
          exit={{ 
            y: 100, 
            opacity: 0, 
            rotate: Math.random() * 160 - 80 
          }}
          transition={{
            duration: 1.5,
            delay: delay + (i * stagger),
            ease: "easeOut" as const
          }}
          className="inline-block"
        >
          <TextEffect intensity={2.5} duration={12}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

// SplitTextTwo with fixed viewport detection
export const SplitTextTwo: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.15 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-two-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ 
            x: -500, 
            opacity: 0.1,
            rotate: Math.random() * -90 - 80 
          }}
          animate={whileInView ? (isInView ? { 
            x: 0, 
            opacity: 1, 
            rotate: 0 
          } : undefined) : { 
            x: 0, 
            opacity: 1, 
            rotate: 0 
          }}
          exit={{ 
            x: 100, 
            opacity: 0, 
            rotate: Math.random() * 160 - 80 
          }}
          transition={{
            duration: 2.7,
            delay: delay + (i * stagger),
            ease: "easeOut" as const
          }}
          className="inline-block"
        >
          <TextEffect intensity={2.5} duration={12}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

// Apply same pattern to all other components
export const SplitTextThree: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.1 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-three-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={animationConfigs.fadeInUp.initial}
          animate={whileInView ? (isInView ? animationConfigs.fadeInUp.animate : undefined) : animationConfigs.fadeInUp.animate}
          exit={animationConfigs.fadeInUp.exit}
          transition={{
            ...transitionConfigs.bouncy,
            delay: delay + (i * stagger)
          }}
          className="inline-block"
        >
          <TextEffect intensity={1.8} duration={8}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const SplitTextFour: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.08 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-four-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={animationConfigs.scaleIn.initial}
          animate={whileInView ? (isInView ? animationConfigs.scaleIn.animate : undefined) : animationConfigs.scaleIn.animate}
          exit={animationConfigs.scaleIn.exit}
          transition={{
            ...transitionConfigs.elastic,
            delay: delay + (i * stagger)
          }}
          className="inline-block"
        >
          <TextEffect intensity={2.2} duration={10}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const SplitTextFive: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.12 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-five-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={animationConfigs.rotateIn.initial}
          animate={whileInView ? (isInView ? animationConfigs.rotateIn.animate : undefined) : animationConfigs.rotateIn.animate}
          exit={animationConfigs.rotateIn.exit}
          transition={{
            ...transitionConfigs.bouncy,
            delay: delay + (i * stagger)
          }}
          className="inline-block"
        >
          <TextEffect intensity={3} duration={15}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const SplitTextSix: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.2 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-six-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={animationConfigs.flipIn.initial}
          animate={whileInView ? (isInView ? animationConfigs.flipIn.animate : undefined) : animationConfigs.flipIn.animate}
          exit={animationConfigs.flipIn.exit}
          transition={{
            ...transitionConfigs.smooth,
            delay: delay + (i * stagger)
          }}
          className="inline-block"
        >
          <TextEffect intensity={1.5} duration={6}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const SplitTextSeven: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.07 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-seven-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={animationConfigs.bounceIn.initial}
          animate={whileInView ? (isInView ? animationConfigs.bounceIn.animate : undefined) : animationConfigs.bounceIn.animate}
          exit={animationConfigs.bounceIn.exit}
          transition={{
            ...transitionConfigs.elastic,
            delay: delay + (i * stagger)
          }}
          className="inline-block"
        >
          <TextEffect intensity={2.8} duration={14}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const SplitTextEight: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.15 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-eight-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ 
            ...animationConfigs.fadeInLeft.initial,
            scale: 0.5 
          }}
          animate={whileInView ? (isInView ? { 
            ...animationConfigs.fadeInLeft.animate,
            scale: 1 
          } : undefined) : { 
            ...animationConfigs.fadeInLeft.animate,
            scale: 1 
          }}
          exit={{ 
            ...animationConfigs.fadeInLeft.exit,
            scale: 0.5 
          }}
          transition={{
            ...transitionConfigs.gentle,
            delay: delay + (i * stagger)
          }}
          className="inline-block"
        >
          <TextEffect intensity={2} duration={9}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const SplitTextNine: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.09 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-nine-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={animationConfigs.zoomIn.initial}
          animate={whileInView ? (isInView ? animationConfigs.zoomIn.animate : undefined) : animationConfigs.zoomIn.animate}
          exit={animationConfigs.zoomIn.exit}
          transition={{
            ...transitionConfigs.quick,
            delay: delay + (i * stagger)
          }}
          className="inline-block"
        >
          <TextEffect intensity={1.2} duration={5}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const SplitTextTen: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.25 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-ten-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ 
            ...animationConfigs.fadeInRight.initial,
            y: -50 
          }}
          animate={whileInView ? (isInView ? { 
            ...animationConfigs.fadeInRight.animate,
            y: 0 
          } : undefined) : { 
            ...animationConfigs.fadeInRight.animate,
            y: 0 
          }}
          exit={{ 
            ...animationConfigs.fadeInRight.exit,
            y: 50 
          }}
          transition={{
            ...transitionConfigs.smooth,
            delay: delay + (i * stagger)
          }}
          className="inline-block"
        >
          <TextEffect intensity={3.5} duration={18}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const SplitTextEleven: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.05 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-eleven-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ 
            opacity: 0,
            filter: "blur(10px)"
          }}
          animate={whileInView ? (isInView ? { 
            opacity: 1,
            filter: "blur(0px)"
          } : undefined) : { 
            opacity: 1,
            filter: "blur(0px)"
          }}
          exit={{ 
            opacity: 0,
            filter: "blur(10px)"
          }}
          transition={{
            duration: 0.8,
            delay: delay + (i * stagger),
            ease: "easeOut" as const
          }}
          className="inline-block"
        >
          <TextEffect intensity={1.8} duration={7}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const SplitTextTwelve: React.FC<SplitTextProps> = ({ 
  text, 
  whileInView = false,
  delay = 0,
  stagger = 0.18 
}) => {
  const words = text.split(" ");
  const persistKey = whileInView ? `splittext-twelve-${text.slice(0, 30)}` : undefined;
  const { ref, isInView } = useInViewport({ threshold: 0.5, once: true, persistKey });
  
  return (
    <div ref={ref} className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ 
            ...animationConfigs.slideIn.initial,
            scale: 0.8 
          }}
          animate={whileInView ? (isInView ? { 
            ...animationConfigs.slideIn.animate,
            scale: 1 
          } : undefined) : { 
            ...animationConfigs.slideIn.animate,
            scale: 1 
          }}
          exit={{ 
            ...animationConfigs.slideIn.exit,
            scale: 0.8 
          }}
          transition={{
            ...transitionConfigs.bouncy,
            delay: delay + (i * stagger)
          }}
          className="inline-block"
        >
          <TextEffect>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};