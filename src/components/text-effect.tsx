import { motion, useAnimation } from "motion/react";
import { type ReactNode, useState } from "react";
import type { TextEffectProps } from "../types";


const extractTextContent = (children: ReactNode): string => {
  if (children == null) return '';
  
  if (typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean') {
    return children.toString();
  }
  
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join('');
  }
  
  return '';
};

const AnimatedChar = ({ 
  char, 
  intensity, 
  duration 
}: { 
  char: string; 
  intensity: number; 
  duration: number;
}) => {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleHover = async () => {
    if (isAnimating) return; // Prevent re-triggering during animation
    
    setIsAnimating(true);

    // Generate random values
    const randomScaleX = 1 + (Math.random() * 0.6 - 0.3) * intensity;
    const randomScaleY = 1 + (Math.random() * 0.6 - 0.3) * intensity;
    const randomScaleZ = 1 + (Math.random() * 0.4 - 0.2) * intensity;
    const randomRotateX = (Math.random() - 0.5) * 25 * intensity;
    const randomRotateY = (Math.random() - 0.5) * 25 * intensity;
    const randomRotateZ = (Math.random() - 0.5) * 35 * intensity;

    // Start animation and wait for it to complete
    await controls.start({
      scaleX: [1, randomScaleX, 1, randomScaleX * 0.7, 1],
      scaleY: [1, randomScaleY, 1, randomScaleY * 0.8, 1],
      scaleZ: [1, randomScaleZ, 1, randomScaleZ * 0.85, 1],
      rotateX: [0, randomRotateX, 0, randomRotateX * -0.5, 0],
      rotateY: [0, randomRotateY, 0, randomRotateY * -0.6, 0],
      rotateZ: [0, randomRotateZ, 0, randomRotateZ * -0.4, 0],
      transition: {
        duration: duration,
        ease: [0.34, 1.56, 0.64, 1],
        times: [0, 0.3, 0.6, 0.8, 1]
      }
    });

    setIsAnimating(false);
  };

  return (
    <motion.span
      animate={controls}
      onMouseEnter={handleHover}
      initial={{
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0
      }}
      style={{
        display: "inline-block",
        transformStyle: "preserve-3d",
        whiteSpace: char === " " ? "pre" : "normal",
        cursor: "pointer"
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

export const TextEffect: React.FC<TextEffectProps> = ({ 
  children,
  className = "",
  intensity = 1,
  duration = 1.2
}) => {
  const textContent = extractTextContent(children);

  return (
    <span
      className={className}
      style={{ 
        display: "inline-block",
        perspective: "1000px"
      }}
    >
      {textContent.split("").map((char, index) => (
        <AnimatedChar
          key={index}
          char={char}
          intensity={intensity}
          duration={duration}
        />
      ))}
    </span>
  );
};
