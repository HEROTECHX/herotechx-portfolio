import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react"

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "hi, i'm nuhu ibrahim",
    "a junior full stack engineer",
    "welcome to my portfolio"
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentText(1), 2000);
    const timer2 = setTimeout(() => setCurrentText(2), 4000);
    const timer3 = setTimeout(() => onComplete(), 6000);

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
      <div className="text-center space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-2xl capitalize md:text-4xl lg:text-6xl font-bold mb-4">
              {texts[currentText]}
            </h1>
            {currentText === 2 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};