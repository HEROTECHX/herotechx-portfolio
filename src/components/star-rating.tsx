import { cn } from "../lib/utils";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function StarRating({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const displayRating = hoverRating || rating;
  
  return (
    <div 
      className="flex gap-2 py-5"
      onMouseLeave={() => setHoverRating(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= displayRating;
        const delay = isActive ? (star - 1) * 0.05 : (5 - star) * 0.05;
        
        return (
          <motion.button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            className="focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.95,
              }}
              transition={{
                duration: 0.2,
                delay: delay,
              }}
            >
              <Star
                className={cn(
                  "h-7 w-7 transition-all duration-200 cursor-pointer",
                  isActive
                    ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                    : "text-neutral-600"
                )}
                style={{
                  transition: `all 0.2s ease ${delay}s`,
                }}
              />
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}