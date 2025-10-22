import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { SplitTextOne, SplitTextTwelve } from "./split-text";
import type { ExpandableCardProps } from "../types";


export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  className,
  title,
  description,
  header,
  icon,
  content,
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
      // Prevent body scroll and add padding to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // Cleanup on unmount
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [open]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg"
              onClick={handleClose}
            />
            
            {/* Modal Container - scrollable */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              ref={containerRef}
              layoutId={`card-${title}`}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] min-h-[85vh] min-w-[300px] overflow-y-auto overflow-x-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-10"
              style={{
                scrollbarWidth: "none",
                scrollbarColor: "rgba(168, 85, 247, 0.5) rgba(255, 255, 255, 0.1)"
              }}
            >
              {/* Close Button */}
              <motion.button
                className="sticky top-0 right-0 z-50 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors mb-4"
                onClick={handleClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.27 }}
              >
                <IconX className="h-6 w-6 text-white" />
              </motion.button>

              {/* Title */}
              <motion.h2
                layoutId={`title-${title}`}
                className="font-bold font-rampart text-lg md:text-2xl lg:text-5xl  text-white capitalize mb-6"
                style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.95), 0 0 20px rgba(255,255,255,0.3)" }}
              >
                <SplitTextTwelve text={title} whileInView/>
              </motion.h2>

              {/* Content */}
              <div 
                className="text-white space-y-4"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.2)" }}
              >
                {content || (
                  <div className="space-y-4">
                    <p className="text-white/80 leading-relaxed">
                      This is the detailed content of {title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Card */}
      <motion.div
        layoutId={`card-${title}`}
        onClick={handleOpen}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={`rounded-xl overflow-hidden group/bento hover:shadow-xl transition duration-200 shadow-input p-4 justify-between flex flex-col space-y-4 cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 min-w-[250px] ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
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
            className="font-bold font-rampart text-sm sm:text-base md:text-xl lg:text-2xl uppercase text-neutral-200 mb-2 mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.3)" }}
          >
            <SplitTextTwelve text={title} delay={2.6} stagger={0.6} whileInView/>
          </motion.div>
          <motion.div 
            className="text-[8px] font-aboreto sm:text-xs md:text-xs lg:text-xs text-neutral-300"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(255,255,255,0.15)" }}
            whileHover={{
              y: [0, -2, 0],
              transition: { duration: 0.3 }
            }}
          >
            <SplitTextOne text={description} delay={1.3} whileInView />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
