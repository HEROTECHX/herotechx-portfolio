import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
      const { currentTarget, clientX, clientY } = event;
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              #3b89f6,
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/textarea rounded-lg p-[2px] transition duration-300"
      >
        <textarea
          className={cn(
            `shadow-input placeholder-text-neutral-200 flex min-h-[80px] w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-white transition duration-400 group-hover/textarea:shadow-none resize-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  },
);
TextArea.displayName = "TextArea";

export { TextArea };