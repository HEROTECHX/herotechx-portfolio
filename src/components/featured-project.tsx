import { useFeaturedProject } from "../hooks/use-featured-project";
import { ProjectCard } from "../components/project-card";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { ProjectModal } from "./project-model";
import type { Project } from "../types";

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
      {!loading && (
        <div ref={contentRef}>
          {/* Projects Grid */}
          {projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
              {projects.map((project) => (
                <motion.div 
                  key={project.id} 
                  className=""
                  layoutId={`project-container-${project.id}`}
                > 
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
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Modal */}
          <AnimatePresence mode="wait">
            {selectedProject && (
              <ProjectModal 
                project={selectedProject} 
                onClose={handleModalClose}
              />
            )}
          </AnimatePresence>

          {/* Empty State */}
          {projects.length === 0 && (
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
        </div>
      )}

      <motion.div 
        className="quote-section bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
        whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)" }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <p className="text-white/70 hover:text-white text-[8px] sm:text-xs lg:text-base font-rampart italic text-center relative px-6 sm:px-8 py-2 capitalize">
            Constantly learning and adapting to new technologies. The journey of a developer never ends!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}