import { motion, AnimatePresence } from "motion/react";
import { useFeaturedProject } from "../hooks/use-featured-project";
import type { Project, ProjectCardProps } from "../types";
import { useRef, useState, useEffect } from "react";
import { IconBrandGithub, IconX, IconExternalLink } from "@tabler/icons-react";
import { SplitTextFive, SplitTextTwo, SplitTextOne } from "./split-text";
import { cn } from "../lib/utils";

export function FeaturedProject() {
  const { projects, loading, error, isOnline, usingCache, refetch } = useFeaturedProject();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleModalClose = () => {
    setSelectedProject(null);
  };

  return (
    <div className="space-y-4 cursor-default sm:space-y-6 px-4 sm:px-0">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs sm:text-sm text-white/60">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Error/Cache Status Banner */}
      {(error || usingCache) && (
        <div className={`rounded-lg p-3 border ${
          error && !usingCache 
            ? 'bg-red-500/10 border-red-500/20' 
            : 'bg-yellow-500/10 border-yellow-500/20'
        }`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {!isOnline && (
                <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
              <p className={`text-xs sm:text-sm truncate ${error && !usingCache ? 'text-red-400' : 'text-yellow-400'}`}>
                {error || (usingCache ? 'Showing cached data' : '')}
              </p>
            </div>
            
            {isOnline && (
              <button
                onClick={refetch}
                className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded text-white transition-colors flex-shrink-0"
              >
                Refresh
              </button>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div ref={contentRef} className={cn(
        "transition-all duration-300",
        selectedProject && "opacity-30 blur-sm pointer-events-none"
      )}>
        {/* Projects Grid */}
        {projects.length > 0 && (
          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {projects.map((project) => (
                <div key={project.id}>
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    category={project.category}
                    status={project.status}
                    features={project.features}
                    onSelect={() => handleProjectSelect(project)}
                    isSelected={selectedProject?.id === project.id}
                  />
                </div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {projects.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center cursor-default py-12"
          >
            <div className="text-white/40 mb-4">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-base sm:text-lg text-white/60 font-rampart text-3d-classic mb-2">
              No projects available
            </p>
            {!isOnline && (
              <p className="text-white/40 text-xs sm:text-sm mt-2">
                You're offline and no cached data is available
              </p>
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <p className="text-white/30 text-sm italic">
                Check back soon for exciting projects!
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Quote Section */}
        <motion.div 
          className="quote-section bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
          whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)" }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <p className="text-white/70 hover:text-white text-[7px] sm:text-xs lg:text-base font-rampart italic text-center relative px-6 sm:px-8 py-2 capitalize">
              <SplitTextTwo text="Constantly learning and adapting to new technologies. The journey of a developer never ends!" whileInView delay={1} stagger={0.1}/>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal
            project={selectedProject} 
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies,
  liveUrl,
  githubUrl,
  category,
  status,
  onSelect,
  isSelected,
}: ProjectCardProps & { 
  onSelect: () => void;
  isSelected: boolean;
  longDescription?: string;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  const truncateText = (text: string, wordLimit: number = 15): string => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const displayDescription = isExpanded ? description : truncateText(description, 15);
  const shouldShowReadMore = description.split(' ').length > 15;

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (shouldShowReadMore && !isExpanded) {
      setIsExpanded(true);
    } else {
      onSelect();
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only trigger project selection if not clicking on read more or links
    if (!(e.target as HTMLElement).closest('button, a')) {
      onSelect();
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={handleCardClick}
      className={cn(
        "group overflow-hidden relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl border transition-all duration-300 hover:shadow-xl h-full flex flex-col cursor-pointer",
        isSelected 
          ? "border-purple-500/70 bg-purple-500/10 shadow-2xl shadow-purple-500/20" 
          : "border-white/10 hover:border-purple-500/50 hover:shadow-purple-500/20"
      )}
    >
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
              status === 'completed' || status === 'Completed'
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
            {category}
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
        <div className="space-y-2 flex-1">
          <p className={'text-white/60 font-aboreto text-effect-60 text-[12px] sm:text-sm lg:text-xs leading-relaxed'}>
            <SplitTextTwo text={displayDescription}/>
          </p>
          
          {shouldShowReadMore && (
            <motion.button
              onClick={handleReadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[10px] sm:text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium flex items-center gap-1"
            >
              {isExpanded ? 'More Details' : 'Read More'}
              <svg 
                className={cn("w-3 h-3 transition-transform", isExpanded ? "rotate-180" : "")} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
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
              <IconExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
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
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transition-opacity duration-300",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )} />
      </div>
    </motion.div>
  );
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Prevent background scroll
    document.body.style.overflow = "hidden";
    
    // Add event listeners
    document.addEventListener('keydown', handleEscape);

    return () => {
      // Restore background scroll
      document.body.style.overflow = "auto";
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Completely prevent wheel events on the backdrop
  const handleBackdropWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle wheel events on the modal content
  const handleContentWheel = (e: React.WheelEvent) => {
    const content = contentRef.current;
    if (!content) return;

    const { scrollTop, scrollHeight, clientHeight } = content;
    const isAtTop = scrollTop === 0;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

    // If we're at the top and scrolling up, or at the bottom and scrolling down, prevent default
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={handleBackdropClick}
        onWheel={handleBackdropWheel} // Completely prevent wheel on backdrop
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />
        
        {/* Modal - Grid Layout with Testimonial-like Borders */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.4
          }}
          className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-neutral-800/50 backdrop-blur-lg rounded-xl border border-neutral-700/50 shadow-2xl overflow-hidden"
          onWheel={(e) => e.stopPropagation()} // Prevent wheel on modal container
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-700/50 bg-neutral-800/30 sticky top-0 z-10">
            <h2 className="text-xl font-bold font-rampart text-white">
              <SplitTextOne text="Project Details" />
            </h2>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700/50 hover:bg-neutral-700/70 transition-colors border border-neutral-600/50"
            >
              <IconX className="h-4 w-4 text-white" />
            </motion.button>
          </div>

          {/* Scrollable Content with Wheel Prevention */}
          <div 
            ref={contentRef}
            className="overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar"
            onWheel={handleContentWheel}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column - Image & Basic Info */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Project Image */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-lg border border-neutral-700/50 overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  </motion.div>

                  {/* Basic Info Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-lg border border-neutral-700/50 bg-neutral-800/30 p-4 space-y-4"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 font-rampart">
                        <SplitTextOne text="Project Info" />
                      </h3>
                      
                      {/* Status & Category */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-400">Status:</span>
                          <span className={`text-sm px-2 py-1 rounded ${
                            project.status === 'Completed' || project.status === 'completed'
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                              : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        {project.category && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-neutral-400">Category:</span>
                            <span className="text-sm text-white bg-purple-500/20 border border-purple-500/30 px-2 py-1 rounded">
                              {project.category}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">Links</h4>
                      <div className="flex flex-col gap-2">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded border border-purple-500/30 hover:border-purple-500/50 transition-colors text-sm"
                          >
                            <IconExternalLink size={16} />
                            Live Demo
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-3 py-2 bg-neutral-700/50 hover:bg-neutral-700/70 text-white rounded border border-neutral-600/50 transition-colors text-sm"
                          >
                            <IconBrandGithub size={16} />
                            View Code
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Title & Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-lg border border-neutral-700/50 bg-neutral-800/30 p-4"
                  >
                    <h1 className="text-2xl font-bold font-rampart text-white mb-4">
                      <SplitTextOne text={project.title} />
                    </h1>
                    <p className="text-white/70 leading-relaxed text-sm font-aboreto">
                      <SplitTextOne text={project.longDescription || project.description} whileInView />
                    </p>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-lg border border-neutral-700/50 bg-neutral-800/30 p-4"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3 font-rampart">
                      <SplitTextOne text="Technologies Used"/>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech: string, index: number) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded text-white font-medium text-sm"
                        >
                          <SplitTextOne text={tech} whileInView/>
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
                      className="rounded-lg border border-neutral-700/50 bg-neutral-800/30 p-4"
                    >
                      <h3 className="text-lg font-semibold text-white mb-3 font-rampart">
                        <SplitTextOne text="Key Features" />
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.features.map((feature: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-2 text-white/70 text-sm p-2 rounded border border-neutral-700/30 bg-neutral-800/20"
                          >
                            <span className="text-purple-400 mt-0.5 flex-shrink-0 text-xs">✓</span>
                            <span className="text-xs">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}