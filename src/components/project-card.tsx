import type { ProjectCardProps } from "../types";
import { IconBrandGithub } from "@tabler/icons-react";

export function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies,
  liveUrl,
  githubUrl,
  status 
}: ProjectCardProps) {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
      
      <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-white font-semibold text-lg line-clamp-1">{title}</h4>
          {status && (
            <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
              status === 'completed' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {status}
            </span>
          )}
        </div>

        <p className="text-white/60 text-sm line-clamp-2">{description}</p>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, 3).map((tech, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-1 bg-purple-500/10 text-purple-300 rounded border border-purple-500/20"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs px-2 py-1 text-white/40">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-2 pt-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-sm rounded transition-colors text-center"
            >
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center gap-1"
                                >
                                  <IconBrandGithub size={16} />
                                  GitHub
                                </a>
          )}
        </div>
      </div>
    </div>
  );
}
