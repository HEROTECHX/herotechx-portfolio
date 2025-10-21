import { cn } from "../lib/utils";
import type { BentoGridProps } from "../types/index";

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "grid auto-rows-[18rem] h-screen  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto py-16 px-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
