import React, { useState } from 'react'
import type { FeaturedProject, CreateProjectData } from '@/types'
import { IconBrandGithub } from '@tabler/icons-react'
import { LabelInputContainer, Label, Input, TextArea } from '@/components/index'
import { motion, AnimatePresence } from 'motion/react'
import { useFeaturedProjectManager } from '@/hooks/use-featured-project-manager'

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

  const [isCreating, setIsCreating] = useState(false)
  const [editingProject, setEditingProject] = useState<FeaturedProject | null>(null)
  const [formData, setFormData] = useState<CreateProjectData>(defaultProjectData)
  const [tempTech, setTempTech] = useState('')
  const [tempFeature, setTempFeature] = useState('')
  const [tempResult, setTempResult] = useState('')

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
      const projectData = {
        ...formData,
      }
      
      if (editingProject) {
        await updateProject(editingProject.id, projectData)
        setEditingProject(null)
      } else {
        await createProject(projectData)
        setIsCreating(false)
      }
      
      resetForm()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project. Please try again.')
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
      } catch (error) {
        console.error('Error deleting project:', error)
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl lg:text-2xl font-bold">Featured Projects Manager</h1>
        {!isCreating && !editingProject && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 text-xs hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Add Project
          </button>
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
            className="bg-slate-950/55 hover:bg-slate-950/40 p-6 rounded-lg shadow-md mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="title" className='capitalize text-gray-700'>project title</Label>
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

                <LabelInputContainer className="mb-4 capitalize">
                  <Label htmlFor="category">category</Label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border bg-zinc-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="design">Design</option>
                    <option value="other">Other</option>
                  </select>
                </LabelInputContainer>
              </div>

              <LabelInputContainer className="mb-4 capitalize">
                <Label htmlFor="description">description</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="mt-1 block bg-zinc-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </LabelInputContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image URL Input */}
                <LabelInputContainer>
                  <Label htmlFor="image" className='capitalize text-gray-700'>project image URL</Label>
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

                <LabelInputContainer className="mb-4 capitalize">
                  <Label htmlFor="status">status</Label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border bg-zinc-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                  </select>
                </LabelInputContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor="liveUrl" className='capitalize text-gray-700'>Live URL</Label>
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
                  <Label htmlFor="githubUrl" className='capitalize text-gray-700'>GitHub URL</Label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Technologies</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={tempTech}
                    onChange={(e) => setTempTech(e.target.value)}
                    placeholder="Add technology"
                    className="flex-1 px-3 py-2 border bg-zinc-800 text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleArrayInput('technologies', tempTech)
                        setTempTech('')
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleArrayInput('technologies', tempTech)
                      setTempTech('')
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeArrayItem('technologies', index)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={tempFeature}
                    onChange={(e) => setTempFeature(e.target.value)}
                    placeholder="Add feature"
                    className="flex-1 px-3 py-2 border bg-zinc-800 text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleArrayInput('features', tempFeature)
                        setTempFeature('')
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleArrayInput('features', tempFeature)
                      setTempFeature('')
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center">
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeArrayItem('features', index)}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Results/Achievements</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={tempResult}
                    onChange={(e) => setTempResult(e.target.value)}
                    placeholder="Add result"
                    className="flex-1 px-3 py-2 border bg-zinc-800 text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleArrayInput('results', tempResult)
                        setTempResult('')
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleArrayInput('results', tempResult)
                      setTempResult('')
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.results.map((result, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm flex items-center">
                      {result}
                      <button
                        type="button"
                        onClick={() => removeArrayItem('results', index)}
                        className="ml-1 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-700">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      {!isCreating && !editingProject && (
        <>
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {projects.map((project: FeaturedProject) => (
            <motion.div 
              key={project.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              layout
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {project.image && (
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center gap-1"
                    >
                      <IconBrandGithub size={16} />
                      GitHub
                    </a>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {projects.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500 bg-gray-800 rounded-lg"
          >
            <p className="text-lg mb-2">No featured projects yet</p>
            <p className="text-sm">Create your first project to get started!</p>
          </motion.div>
        )}
        </>
      )}

    </div>
  )
}