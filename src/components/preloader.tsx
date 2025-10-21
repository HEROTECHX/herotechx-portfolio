import {AnimatePresence, motion} from "motion/react"
import { useEffect, useState } from "react";
import { TextEffect } from "./text-effect";

const SplitText: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");
  
  return (
    <div className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ 
            y: -500, 
            opacity: 1,
            rotate: Math.random() * -90 - 80 
          }}
          animate={{ 
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
            duration: 2.7,
            delay: i * 0.15,
            ease: [0.68, -0.55, 0.265, 1.55]
          }}
          className="inline-block font-rampart"
        >
          <TextEffect intensity={2.5} duration={12}>
            {word}
          </TextEffect>
        </motion.span>
      ))}
    </div>
  );
};

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Hi, I'm Nuhu Ibrahim",
    "Creative Developer & Engineer",
    "Welcome to My Portfolio"
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentText(1), 5000);
    const timer2 = setTimeout(() => setCurrentText(2), 15000);
    const timer3 = setTimeout(() => onComplete(), 25000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="text-center space-y-8 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4"
          >
            <SplitText text={texts[currentText]} />
            {currentText === 2 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2 }}
                className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-2"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};