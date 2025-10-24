import type { ProjectCardProps } from "../types";
import { IconBrandGithub } from "@tabler/icons-react";
import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { SplitTextFive, SplitTextTwo } from "./split-text";

export function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies,
  liveUrl,
  githubUrl,
  category,
  status,
  onSelect
}: ProjectCardProps & { onSelect: () => void }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  const truncateText = (text: string, wordLimit: number = 10): string => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const displayDescription = isExpanded ? description : truncateText(description, 10);
  const shouldShowReadMore = description.split(' ').length > 15;

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      // onClick={onSelect}
      className="group overflow-hidden relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 h-full flex flex-col cursor-pointer">
      {/* Image Section */}
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative">
        {image ? (
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40">
            <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Status Badge */}
        {status && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute top-2 right-2 text-[10px] sm:text-xs px-2 py-1 rounded-full backdrop-blur-sm font-medium ${
              status === 'completed' 
                ? 'bg-green-500/80 text-white' 
                : 'bg-yellow-500/80 text-white'
            }`}
          >
            {status}
          </motion.span>
        )}

        {category && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={'absolute bottom-2 left-2 text-[10px] sm:text-xs px-2 py-1 rounded-full backdrop-blur-sm font-medium bg-gray-500/80 text-white'}>
            {(category)}
          </motion.span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-1 flex flex-col">
        {/* Title */}
        <motion.h4 
          whileHover={{ x: 5 }}
          className="text-white/90 hover:text-white cursor-default font-rampart text-effect-57 text-base sm:text-lg lg:text-xl line-clamp-2"
        >
          <SplitTextFive text={title} />
        </motion.h4>

        {/* Description */}
        <div className="space-y-2">
          <p className={'text-white/60 font-aboreto text-effect-60 text-[12px] sm:text-sm lg:text-xs leading-relaxed line-clamp-4'}>
            <SplitTextTwo text={displayDescription}/>
          </p>
          
          {shouldShowReadMore && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
                onSelect()
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[10px] sm:text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium flex items-center gap-1"
            >
                  Read More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
            
            </motion.button>
          )}
        </div>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {technologies.slice(0, 3).map((tech, idx) => (
              <motion.span 
                key={idx}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 bg-purple-500/10 text-purple-300 rounded border border-purple-500/20 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
            {technologies.length > 3 && (
              <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 text-white/40">
                +{technologies.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-300 text-xs sm:text-sm rounded transition-all text-center font-medium flex items-center justify-center gap-1.5 border border-purple-500/20 hover:border-purple-500/40"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              Live Demo
            </motion.a>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(107, 114, 128, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 text-xs sm:text-sm rounded transition-all flex-1 font-medium border border-gray-500/20 hover:border-gray-500/40"
            >
              <IconBrandGithub size={16} className="w-3 h-3 sm:w-4 sm:h-4" />
              GitHub
            </motion.a>
          )}
        </div>

        {/* Bottom gradient effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}