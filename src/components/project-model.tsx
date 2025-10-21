import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconX, IconExternalLink, IconBrandGithub } from "@tabler/icons-react";
import type { Project } from "../types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      >
        {/* Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg"
        />
        
        {/* Modal */}
        <motion.div
          ref={modalRef} 
          layoutId={`project-${project.id}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.4
          }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/20 shadow-2xl custom-scrollbar"
        >
          {/* Custom Scrollbar Styles */}
          <style>{`
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(168, 85, 247, 0.5) rgba(30, 41, 59, 0.3);
            }
            
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(30, 41, 59, 0.3);
              border-radius: 0 8px 8px 0;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, rgba(168, 85, 247, 0.7), rgba(192, 132, 252, 0.7));
              border-radius: 8px;
              border: 1px solid rgba(168, 85, 247, 0.3);
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, rgba(168, 85, 247, 0.9), rgba(192, 132, 252, 0.9));
            }
            
            .custom-scrollbar::-webkit-scrollbar-corner {
              background: rgba(30, 41, 59, 0.3);
            }
          `}</style>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="sticky top-4 right-4 z-20 ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors float-right m-4"
          >
            <IconX className="h-6 w-6 text-white" />
          </motion.button>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="p-6 md:p-10 -mt-20 relative z-10">
            {/* Title & Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                      {project.category}
                    </span>
                    <span className={`text-sm px-3 py-1 rounded-full border ${
                      project.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  >
                    <IconExternalLink size={18} />
                    Live Demo
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    <IconBrandGithub size={18} />
                    View Code
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold text-white mb-3">About Project</h3>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">
                {project.longDescription || project.description}
              </p>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string, index: number) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-white font-medium text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 text-white/70 text-sm md:text-base"
                    >
                      <span className="text-purple-400 mt-1 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};