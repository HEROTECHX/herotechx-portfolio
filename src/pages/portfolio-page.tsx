import { useState } from "react";
import { Preloader } from "../components/preloader";
import { bentoData } from "../components/data";
import { BentoGrid } from "../components/bento-grid";
import { ExpandableCard } from "../components/expandable-bento-card";
import { CardContext } from "../context/card-context";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "motion/react";

export function PortfolioPage() {
  const [showPreloader, setShowPreloader] = useState(true);
    const handlePreloaderComplete = () => {
      setShowPreloader(false);
    };
  return (
    <CardContext.Provider value={{ onCardClose: () => {}, currentIndex: null }}>
      <AnimatePresence>
        {showPreloader && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>
      {!showPreloader && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 min-h-screen flex items-center justify-center p-4"
        >
          <BentoGrid
            className="max-w-6xl mt-20 md:mt-56 mx-auto md:auto-rows-[20rem]"
          >
            {bentoData.map((data, idx) => (
              <ExpandableCard 
                key={idx}
                title={data.title}
                description={data.description}
                header={data.header}
                content={data.content}
                className={cn("[&>p:text-lg]", data.className)}
                icon={data.icon}
              />
            ))}
          </BentoGrid> 
        </motion.div>
      )}
      </CardContext.Provider>
  )
}
