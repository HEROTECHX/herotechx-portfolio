import React, { useState, useEffect, useRef } from 'react'
import type { FeaturedProject, CreateProjectData } from '../types'
import { IconBrandGithub } from '@tabler/icons-react'
import { motion, AnimatePresence } from 'motion/react'
import { useFeaturedProjectManager } from '../hooks/use-featured-project-manager'
import { useToast } from '../hooks/use-toast'
import { LabelInputContainer } from './ui/label-input-container'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { TextArea } from './ui/textarea'
import { Plus, Edit2, Trash2, ExternalLink, X } from 'lucide-react'
import gsap from 'gsap'

const defaultProjectData: CreateProjectData = {
  title: '',
  description: '',
  image: '',
  technologies: [],
  liveUrl: '',
  githubUrl: '',
  features: [],
  results: [],
  category: 'web',
  status: 'completed'
}

export function FeaturedProjectManager() {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useFeaturedProjectManager()

  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [editingProject, setEditingProject] = useState<FeaturedProject | null>(null)
  const [formData, setFormData] = useState<CreateProjectData>(defaultProjectData)
  const [tempTech, setTempTech] = useState<string>('')
  const [tempFeature, setTempFeature] = useState<string>('')
  const [tempResult, setTempResult] = useState<string>('')
  const { successToast, errorToast } = useToast()
  const gridRef = useRef<HTMLDivElement>(null)

  // GSAP animation for project cards
  useEffect(() => {
    if (!loading && projects.length > 0 && !isCreating && !editingProject && gridRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.project-card',
          {
            opacity: 0,
            y: 30,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
          }
        )
      }, gridRef)

      return () => ctx.revert()
    }
  }, [loading, projects, isCreating, editingProject])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleArrayInput = (field: 'technologies' | 'features' | 'results', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }))
    }
  }

  const removeArrayItem = (field: 'technologies' | 'features' | 'results', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const projectData = { ...formData }
      
      if (editingProject) {
        await updateProject(editingProject.id, projectData)
        setEditingProject(null)
        successToast(`Successfully update ${editingProject.title}`)
      } else {
        await createProject(projectData)
        successToast(`Successfully update ${projectData.title}`)
        setIsCreating(false)
      }
      
      resetForm()
    } catch (err) {
      console.error('Error saving project:', err)
      errorToast('Error saving project. Please try again.')
    }
  }

  const handleEdit = (project: FeaturedProject) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies,
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      features: project.features,
      results: project.results,
      category: project.category,
      status: project.status,
    })
    setIsCreating(false)
  }

  const handleDelete = async (project: FeaturedProject) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(project.id)
        successToast(`${project.title} deleted successfully!`)
      } catch (err) {
        console.error('Error deleting project:', err)
        errorToast('Error deleting project.')
      }
    }
  }

  const resetForm = () => {
    setFormData(defaultProjectData)
    setTempTech('')
    setTempFeature('')
    setTempResult('')
    setIsCreating(false)
    setEditingProject(null)
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        
      </div>
    )
  }
  
  if (error) return (
    <div className="text-red-400 text-center py-8 font-rampart text-effect-39">
      Error: {error}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold font-rampart text-3d-gold capitalize"
        >
          Featured Projects Manager
        </motion.h1>
        {!isCreating && !editingProject && (
          <motion.button
            onClick={() => setIsCreating(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Project
          </motion.button>
        )}
      </div>

      {/* Form */}
      <AnimatePresence mode='wait'>
        {(isCreating || editingProject) && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 hover:border-purple-500/30 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl mb-6 sm:mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold font-rampart text-3d-neon">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h2>
              <motion.button
                onClick={resetForm}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <LabelInputContainer>
                  <Label htmlFor="title" className='capitalize font-rampart text-effect-60'>
                    Project Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder='My Awesome Project'
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </LabelInputContainer>

                <LabelInputContainer className="capitalize">
                  <Label htmlFor="category" className='font-rampart text-effect-60'>
                    Category
                  </Label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                  </select>
                </LabelInputContainer>
              </div>

              <LabelInputContainer className="capitalize">
                <Label htmlFor="description" className='font-rampart text-effect-60'>
                  Description
                </Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="mt-1 block bg-zinc-800 text-white w-full px-3 py-2 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all"
                />
              </LabelInputContainer>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <LabelInputContainer>
                  <Label htmlFor="image" className='capitalize font-rampart text-effect-60'>
                    Project Image URL
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    placeholder='https://images.unsplash.com/photo-...'
                    type="url"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                  />
                </LabelInputContainer>

                <LabelInputContainer className="capitalize">
                  <Label htmlFor="status" className='font-rampart text-effect-60'>
                    Status
                  </Label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-zinc-800 text-white border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                  </select>
                </LabelInputContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <LabelInputContainer>
                  <Label htmlFor="liveUrl" className='capitalize font-rampart text-effect-60'>
                    Live URL
                  </Label>
                  <Input
                    id="liveUrl"
                    name="liveUrl"
                    placeholder='https://example.com'
                    type="url"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="githubUrl" className='capitalize font-rampart text-effect-60'>
                    GitHub URL
                  </Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    placeholder='https://github.com/username/repo'
                    type="url"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                  />
                </LabelInputContainer>
              </div>

              {/* Technologies */}
              <LabelInputContainer>
                <Label className="block text-sm font-medium text-white/80 font-rampart text-effect-60 mb-2">
                  Technologies
                </Label>
                <LabelInputContainer className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="text"
                    value={tempTech}
                    onChange={(e) => setTempTech(e.target.value)}
                    placeholder="Add technology (e.g., React)"
                    className="flex-1 px-3 py-2 border bg-zinc-800 text-white border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleArrayInput('technologies', tempTech)
                        setTempTech('')
                      }
                    }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => {
                      handleArrayInput('technologies', tempTech)
                      setTempTech('')
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                  >
                    Add
                  </motion.button>
                </LabelInputContainer>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.technologies.map((tech, index) => (
                    <motion.span 
                      key={index} 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-2 border border-blue-500/30"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeArrayItem('technologies', index)}
                        className="text-blue-400 hover:text-blue-200 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </LabelInputContainer>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-white/80 font-rampart text-effect-60 mb-2">
                  Features
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={tempFeature}
                    onChange={(e) => setTempFeature(e.target.value)}
                    placeholder="Add feature"
                    className="flex-1 px-3 py-2 border bg-zinc-800 text-white border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleArrayInput('features', tempFeature)
                        setTempFeature('')
                      }
                    }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => {
                      handleArrayInput('features', tempFeature)
                      setTempFeature('')
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                  >
                    Add
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.features.map((feature, index) => (
                    <motion.span 
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-2 border border-green-500/30"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeArrayItem('features', index)}
                        className="text-green-400 hover:text-green-200 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <label className="block text-sm font-medium text-white/80 font-rampart text-effect-60 mb-2">
                  Results/Achievements
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={tempResult}
                    onChange={(e) => setTempResult(e.target.value)}
                    placeholder="Add result"
                    className="flex-1 px-3 py-2 border bg-zinc-800 text-white border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleArrayInput('results', tempResult)
                        setTempResult('')
                      }
                    }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => {
                      handleArrayInput('results', tempResult)
                      setTempResult('')
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                  >
                    Add
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.results.map((result, index) => (
                    <motion.span 
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-2 border border-purple-500/30"
                    >
                      {result}
                      <button
                        type="button"
                        onClick={() => removeArrayItem('results', index)}
                        className="text-purple-400 hover:text-purple-200 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neutral-700">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={resetForm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 sm:flex-initial bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-lg transition-colors font-medium text-sm sm:text-base"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      {!isCreating && !editingProject && (
        <>
          <div ref={gridRef} className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: FeaturedProject) => (
              <motion.div 
                key={project.id} 
                className="project-card bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-xl shadow-lg overflow-hidden hover:border-purple-500/50 transition-all duration-300 flex flex-col"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)" }}
              >
                {project.image && (
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium backdrop-blur-sm ${
                        project.status === 'completed' 
                          ? 'bg-green-500/80 text-white' 
                          : 'bg-yellow-500/80 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-white font-rampart text-effect-32 line-clamp-2 flex-1">
                      {project.title}
                    </h3>
                    <span className="bg-blue-500/20 text-blue-300 text-[10px] sm:text-xs px-2 py-1 rounded border border-blue-500/30 shrink-0">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-white/60 text-xs sm:text-sm mb-3 line-clamp-3 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded text-[10px] sm:text-xs border border-purple-500/20">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-white/40 px-2 py-0.5 text-[10px] sm:text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-neutral-700">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-300 text-xs sm:text-sm font-medium flex items-center gap-1"
                      >
                        <IconBrandGithub size={14} />
                        GitHub
                      </a>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEdit(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 px-3 py-2 rounded-lg text-xs sm:text-sm transition-all border border-yellow-600/30 hover:border-yellow-600/50 flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 px-3 py-2 rounded-lg text-xs sm:text-sm transition-all border border-red-600/30 hover:border-red-600/50 flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {projects.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 sm:py-16 text-neutral-400 bg-neutral-900/50 rounded-xl border border-neutral-800"
            >
              <div className="mb-4">
                <Plus className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-purple-500/30" />
              </div>
              <p className="text-base sm:text-lg mb-2 font-rampart text-effect-36">
                No featured projects yet
              </p>
              <p className="text-xs sm:text-sm text-neutral-500">
                Create your first project to get started!
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}