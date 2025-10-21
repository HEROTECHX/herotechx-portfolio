/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { IconX } from "@tabler/icons-react";
import { cn } from "../lib/utils";
import type { ExpandableCardProps } from "../types";
import { SplitTextThree, SplitTextTwelve } from "./split-text";

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  className,
  title,
  description,
  header,
  icon,
  content,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, handleClose);

  // Filter out conflicting event handlers between React DOM and Framer Motion
  const {
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onDrag,
    onDragEnd,
    onDragStart,
    ...filteredProps
  } = props;

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed left-0 inset-0 z-50 px-4 w-full h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              ref={containerRef}
              layoutId={`card-${title}`}
              className="relative z-[60] mx-auto my-4 md:my-10 h-fit max-w-5xl rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-4 font-sans md:p-10"
            >
              <motion.button
                className="sticky z-50 top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={handleClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconX className="h-6 w-6 text-white" />
              </motion.button>
              <motion.p
                layoutId={`title-${title}`}
                className="mt-4 font-rampart text-2xl md:text-5xl font-semibold uppercase text-white"
                style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.95), 0 0 20px rgba(255,255,255,0.3)" }}
              >
                <SplitTextThree text={title} />
              </motion.p>
              <div className="py-4 md:py-10 text-white" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.2)" }}>
          
                  {content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <motion.div
        layoutId={`card-${title}`}
        onClick={handleOpen}
        initial={{ opacity: 1, y: 500, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1, // Stagger delay
          ease: [0.4, 0, 0.2, 1]
        }}
        className={cn(
          "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input p-4 justify-between flex flex-col space-y-4 cursor-pointer",
          "bg-white/10 backdrop-blur-md border border-white/20",
          "hover:bg-white/20",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...filteredProps}
      >
        {header}
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <motion.div 
            layoutId={`title-${title}`}
            className="font-bold font-rampart text-lg sm:text-base md:text-xl lg:text-2xl uppercase text-neutral-200 mb-2 mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.3)" }}
          >
            <SplitTextTwelve text={title} />
          </motion.div>
          <motion.div 
            className="font-aboreto text-xs sm:text-xs md:text-xs lg:text-xl text-neutral-300"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(255,255,255,0.15)" }}
            whileHover={{
              y: [0, -2, 0],
              transition: { duration: 0.3 }
            }}
          >
            
            {description}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
