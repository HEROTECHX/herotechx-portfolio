import { useState, useEffect, useRef } from 'react'
import { Edit2, User, Save, X, Plus, Trash2, FileText, Quote } from 'lucide-react'
import { useToast } from '../hooks/use-toast'
import { useAboutUserManager } from '../hooks/use-about-user-manager'
import type { CreateAboutUserData } from '../types'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { Input } from './ui/input'

export function AboutUserManager() {
  const { aboutUser, loading, error, saveAboutUser } = useAboutUserManager()
  const [formData, setFormData] = useState<CreateAboutUserData>({
    name: '',
    title: '',
    resume: '',
    resumeSummary: '',
    bio: '',
    quote: '',
    userImg: '',
    skillCategories: []
  })

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newSkillCategory, setNewSkillCategory] = useState<string>('')
  const [newSkill, setNewSkill] = useState<string>('')
  const [editingSkillCategory, setEditingSkillCategory] = useState<string | null>(null)
  const [editingSkill, setEditingSkill] = useState<string | null>(null)
  const [originalFormData, setOriginalFormData] = useState<CreateAboutUserData>({
    name: '',
    title: '',
    resume: '',
    resumeSummary: '',
    bio: '',
    quote: '',
    userImg: '',
    skillCategories: []
  })
  const { successToast, errorToast } = useToast()
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (aboutUser) {
      const userData = {
        name: aboutUser.name || '',
        title: aboutUser.title || '',
        resume: aboutUser.resume || '',
        resumeSummary: aboutUser.resumeSummary || '',
        bio: aboutUser.bio || '',
        quote: aboutUser.quote || '',
        userImg: aboutUser.userImg || '',
        skillCategories: aboutUser.skillCategories || []
      }
      setFormData(userData)
      setOriginalFormData(userData)
    }
  }, [aboutUser])

  // GSAP animation for skill categories
  useEffect(() => {
    if (formData.skillCategories && formData.skillCategories.length > 0 && skillsRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.skill-category-card',
          {
            opacity: 0,
            y: 20,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
          }
        )
      }, skillsRef)

      return () => ctx.revert()
    }
  }, [formData.skillCategories?.length])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const saveMainData = async () => {
    try {
      await saveAboutUser(formData)
      setOriginalFormData(formData)
      setIsEditing(false)
      successToast('About user info saved successfully!')
    } catch (err) {
      console.error('Error saving about user:', err)
      errorToast('Failed to save about user info')
    }
  }

  const cancelEdit = () => {
    setFormData(originalFormData)
    setIsEditing(false)
  }

  const addSkillCategory = () => {
    if (!newSkillCategory.trim()) return
    
    setFormData(prev => ({
      ...prev,
      skillCategories: [
        ...(prev.skillCategories || []),
        { id: Date.now().toString(), title: newSkillCategory, skills: [] }
      ]
    }))
    setNewSkillCategory('')
  }

  const updateSkillCategory = (categoryId: string, title: string) => {
    setFormData(prev => ({
      ...prev,
      skillCategories: prev.skillCategories?.map(cat =>
        cat.id === categoryId ? { ...cat, title } : cat
      ) || []
    }))
    setEditingSkillCategory(null)
  }

  const deleteSkillCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      skillCategories: prev.skillCategories?.filter(cat => cat.id !== categoryId) || []
    }))
  }

  const addSkillToCategory = (categoryId: string) => {
    if (!newSkill.trim()) return
    
    setFormData(prev => ({
      ...prev,
      skillCategories: prev.skillCategories?.map(cat =>
        cat.id === categoryId
          ? { ...cat, skills: [...cat.skills, { id: Date.now().toString(), name: newSkill }] }
          : cat
      ) || []
    }))
    setNewSkill('')
  }

  const updateSkill = (categoryId: string, skillId: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      skillCategories: prev.skillCategories?.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.map(skill =>
                skill.id === skillId ? { ...skill, name } : skill
              )
            }
          : cat
      ) || []
    }))
    setEditingSkill(null)
  }

  const deleteSkill = (categoryId: string, skillId: string) => {
    setFormData(prev => ({
      ...prev,
      skillCategories: prev.skillCategories?.map(cat =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter(skill => skill.id !== skillId) }
          : cat
      ) || []
    }))
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-white/60 font-rampart">Loading profile data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-red-400 text-base sm:text-xl font-rampart text-effect-39">
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent rounded-2xl p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-rampart text-3d-gold capitalize">
              About Me Manager
            </h1>
          </div>
        </motion.div>
        
        {/* Preview Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border border-neutral-800"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 font-rampart text-effect-36 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Preview
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {formData.userImg ? (
                <motion.img
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  src={formData.userImg} 
                  alt={formData.name || 'User'} 
                  className='w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-purple-500/30'
                />
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                  <User className="w-16 h-16 sm:w-20 sm:h-20 text-white/50" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-white font-rampart text-effect-32">
                  {formData.name || 'Your Name'}
                </h3>
                <p className="text-white/60 text-base sm:text-lg font-rampart">
                  {formData.title || 'Your Title'}
                </p>
              </div>
            </div>
            
            {formData.resumeSummary && (
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-neutral-800/50 rounded-lg p-3 sm:p-4 border border-neutral-700"
              >
                <h4 className="text-xs sm:text-sm font-semibold text-white/80 mb-2 font-rampart text-effect-60">
                  Professional Summary
                </h4>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  {formData.resumeSummary}
                </p>
              </motion.div>
            )}

            {formData.resume ? (
              <motion.a 
                href={formData.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-all text-sm sm:text-base"
              >
                📄 Download Full Resume (PDF)
              </motion.a>
            ) : (
              <span className="text-white/50 italic text-sm">No resume uploaded</span>
            )}

            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2 font-rampart text-effect-60">
                About Me
              </h4>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                {formData.bio || 'Your bio will appear here...'}
              </p>
            </div>
            
            {formData.skillCategories && formData.skillCategories.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-base sm:text-lg font-semibold text-white font-rampart text-effect-60">
                  Skills & Expertise
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {formData.skillCategories.map(category => (
                    <motion.div 
                      key={category.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-neutral-800/30 rounded-lg p-3 sm:p-4 border border-neutral-700/50"
                    >
                      <h5 className="text-white/90 font-medium mb-3 text-sm sm:text-base font-rampart text-effect-32">
                        {category.title}
                      </h5>
                      <ul className="text-xs sm:text-sm text-white/60 space-y-1">
                        {category.skills.map(skill => (
                          <li key={skill.id}>• {skill.name}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {formData.quote && (
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 sm:p-6 border border-purple-500/20"
              >
                <div className="flex items-start gap-2">
                  <Quote className="w-5 h-5 text-purple-400 shrink-0" />
                  <p className="text-white/70 italic text-sm sm:text-base lg:text-lg">
                    &quot;{formData.quote}&quot;
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border border-neutral-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white font-rampart text-3d-neon">
              Edit Information
            </h2>
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.button
                  key="edit"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-all text-sm w-full sm:w-auto justify-center"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </motion.button>
              ) : (
                <motion.div 
                  key="actions"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex gap-2 w-full sm:w-auto"
                >
                  <motion.button
                    onClick={saveMainData}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-all text-sm"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </motion.button>
                  <motion.button
                    onClick={cancelEdit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-all text-sm"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Basic Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <label className="block text-white mb-2 text-xs sm:text-sm font-medium font-rampart text-effect-60">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-zinc-800 border border-neutral-700 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-xs sm:text-sm font-medium font-rampart text-effect-60">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-zinc-800 border border-neutral-700 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white mb-2 text-xs sm:text-sm font-medium font-rampart text-effect-60">
                Profile Image URL
              </label>
              <input
                type="text"
                value={formData.userImg}
                onChange={(e) => handleInputChange('userImg', e.target.value)}
                disabled={!isEditing}
                placeholder="https://example.com/your-image.jpg"
                className="w-full px-3 py-2 bg-zinc-800 border border-neutral-700 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white mb-2 text-xs sm:text-sm font-medium font-rampart text-effect-60">
                Resume Summary (Optional)
              </label>
              <textarea
                value={formData.resumeSummary || ''}
                onChange={(e) => handleInputChange('resumeSummary', e.target.value)}
                disabled={!isEditing}
                rows={3}
                placeholder="Brief professional summary or key highlights..."
                className="w-full px-3 py-2 bg-zinc-800 border border-neutral-700 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white mb-2 text-xs sm:text-sm font-medium font-rampart text-effect-60">
                Resume PDF URL
              </label>
              <input
                type="text"
                value={formData.resume}
                onChange={(e) => handleInputChange('resume', e.target.value)}
                disabled={!isEditing}
                placeholder="https://example.com/your-resume.pdf"
                className="w-full px-3 py-2 bg-zinc-800 border border-neutral-700 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-white mb-2 text-xs sm:text-sm font-medium font-rampart text-effect-60">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                rows={5}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 bg-zinc-800 border border-neutral-700 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-xs sm:text-sm font-medium font-rampart text-effect-60">
                Favorite Quote
              </label>
              <textarea
                value={formData.quote || ''}
                onChange={(e) => handleInputChange('quote', e.target.value)}
                disabled={!isEditing}
                rows={2}
                placeholder="Your inspirational quote..."
                className="w-full px-3 py-2 bg-zinc-800 border border-neutral-700 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all text-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Skills Management */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border border-neutral-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white font-rampart text-3d-neon">
              Skills Management
            </h2>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                placeholder="New category name"
                className="flex-1 sm:flex-none px-3 py-2 bg-zinc-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                onKeyPress={(e) => e.key === 'Enter' && addSkillCategory()}
              />
              <motion.button
                onClick={addSkillCategory}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-all whitespace-nowrap text-sm"
              >
                <Plus className="h-4 w-4" />
                Add
              </motion.button>
            </div>
          </div>

          <div ref={skillsRef} className="space-y-4 sm:space-y-6">
            {formData.skillCategories?.map(category => (
              <div key={category.id} className="skill-category-card bg-neutral-800/50 rounded-lg p-3 sm:p-4 border border-neutral-700">
                <div className="flex justify-between items-center mb-4">
                  {editingSkillCategory === category.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        defaultValue={category.title}
                        onBlur={(e) => updateSkillCategory(category.id, e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && updateSkillCategory(category.id, e.currentTarget.value)}
                        className="px-3 py-1 bg-zinc-700 border border-neutral-600 rounded text-white focus:ring-2 focus:ring-purple-500 text-sm flex-1"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <h3
                      className="text-base sm:text-lg font-medium text-white cursor-pointer hover:text-purple-300 transition-colors font-rampart text-effect-32"
                      onClick={() => setEditingSkillCategory(category.id)}
                    >
                      {category.title}
                    </h3>
                  )}
                  <motion.button
                    onClick={() => deleteSkillCategory(category.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-400 hover:text-red-300 p-1 transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="space-y-2 mb-4">
                  {category.skills.map(skill => (
                    <motion.div 
                      key={skill.id}
                      whileHover={{ x: 5 }}
                      className="flex justify-between items-center bg-neutral-700/30 rounded px-3 py-2"
                    >
                      {editingSkill === skill.id ? (
                        <input
                          type="text"
                          defaultValue={skill.name}
                          onBlur={(e) => updateSkill(category.id, skill.id, e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && updateSkill(category.id, skill.id, e.currentTarget.value)}
                          className="flex-1 px-2 py-1 bg-zinc-600 border border-neutral-500 rounded text-white text-xs sm:text-sm focus:ring-2 focus:ring-purple-500"
                          autoFocus
                        />
                      ) : (
                        <span
                          className="text-white/80 cursor-pointer hover:text-white text-xs sm:text-sm transition-colors"
                          onClick={() => setEditingSkill(skill.id)}
                        >
                          • {skill.name}
                        </span>
                      )}
                      <motion.button
                        onClick={() => deleteSkill(category.id, skill.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-400 hover:text-red-300 p-1 ml-2 transition-colors"
                        title="Delete skill"
                      >
                        <Trash2 className="h-3 w-3" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                    className="flex-1 px-3 py-2 bg-zinc-700 border border-neutral-600 rounded text-white text-xs sm:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && addSkillToCategory(category.id)}
                  />
                  <motion.button
                    onClick={() => addSkillToCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-xs sm:text-sm transition-all flex items-center justify-center gap-1"
                    title="Add skill"
                  >
                    <Plus className="h-4 w-4" />
                    Add Skill
                  </motion.button>
                </div>
              </div>
            ))}

            {(!formData.skillCategories || formData.skillCategories.length === 0) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12 text-white/50 bg-neutral-800/30 rounded-xl border border-neutral-700"
              >
                <Plus className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-purple-500/30" />
                <p className="text-sm sm:text-base font-rampart text-effect-36">
                  No skill categories yet
                </p>
                <p className="text-xs sm:text-sm text-white/40 mt-2">
                  Add one to get started!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}


