import { useState, useEffect } from 'react'
import { Edit2, User, Save, X, Plus, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAboutUserManager } from '@/hooks/use-about-user-manager'
import type { CreateAboutUserData } from '@/types'

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

  const [isEditing, setIsEditing] = useState(false)
  const [newSkillCategory, setNewSkillCategory] = useState('')
  const [newSkill, setNewSkill] = useState('')
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
    } catch (error) {
      console.error('Error saving about user:', error)
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-80 rounded-2xl p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <User className="h-8 w-8" />
          About Me Manager
        </h1>
        
        {/* Preview Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Preview</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              {formData.userImg ? (
                <img
                  src={formData.userImg} 
                  alt={formData.name || 'User'} 
                  width={160} 
                  height={160} 
                  className='rounded-2xl object-cover'
                />
              ) : (
                <div className="w-40 h-40 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="w-20 h-20 text-white/50" />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-semibold text-white">{formData.name || 'Your Name'}</h3>
                <p className="text-white/60 text-lg">{formData.title || 'Your Title'}</p>
              </div>
            </div>
            
            {formData.resumeSummary && (
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                <h4 className="text-sm font-semibold text-white/80 mb-2">Professional Summary</h4>
                <p className="text-white/70 leading-relaxed">{formData.resumeSummary}</p>
              </div>
            )}

            {formData.resume ? (
              <div className="mb-4">
                <a 
                  href={formData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
                >
                  📄 Download Full Resume (PDF)
                </a>
              </div>
            ) : (
              <div className="mb-4">
                <span className="text-white/50 italic">No resume uploaded</span>
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">About Me</h4>
              <p className="text-white/70 leading-relaxed">{formData.bio || 'Your bio will appear here...'}</p>
            </div>
            
            {formData.skillCategories && formData.skillCategories.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Skills & Expertise</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.skillCategories.map(category => (
                    <div key={category.id} className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/50">
                      <h5 className="text-white/90 font-medium mb-3">{category.title}</h5>
                      <ul className="text-sm text-white/60 space-y-1">
                        {category.skills.map(skill => (
                          <li key={skill.id}>• {skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {formData.quote && (
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
                <p className="text-white/70 italic text-center text-lg">&quot;{formData.quote}&quot;</p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Edit Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={saveMainData}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Basic Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white mb-2 text-sm font-medium">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white mb-2 text-sm font-medium">Profile Image URL</label>
              <input
                type="text"
                value={formData.userImg}
                onChange={(e) => handleInputChange('userImg', e.target.value)}
                disabled={!isEditing}
                placeholder="https://example.com/your-image.jpg"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white mb-2 text-sm font-medium">Resume Summary (Optional)</label>
              <textarea
                value={formData.resumeSummary || ''}
                onChange={(e) => handleInputChange('resumeSummary', e.target.value)}
                disabled={!isEditing}
                rows={3}
                placeholder="Brief professional summary or key highlights..."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white mb-2 text-sm font-medium">Resume PDF URL</label>
              <input
                type="text"
                value={formData.resume}
                onChange={(e) => handleInputChange('resume', e.target.value)}
                disabled={!isEditing}
                placeholder="https://example.com/your-resume.pdf"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white mb-2 text-sm font-medium">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                rows={5}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-white mb-2 text-sm font-medium">Favorite Quote</label>
              <textarea
                value={formData.quote || ''}
                onChange={(e) => handleInputChange('quote', e.target.value)}
                disabled={!isEditing}
                rows={2}
                placeholder="Your inspirational quote..."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Skills Management */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-white">Skills Management</h2>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
                placeholder="New category name"
                className="flex-1 sm:flex-none px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && addSkillCategory()}
              />
              <button
                onClick={addSkillCategory}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors whitespace-nowrap"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {formData.skillCategories?.map(category => (
              <div key={category.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                <div className="flex justify-between items-center mb-4">
                  {editingSkillCategory === category.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        defaultValue={category.title}
                        onBlur={(e) => updateSkillCategory(category.id, e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && updateSkillCategory(category.id, e.currentTarget.value)}
                        className="px-3 py-1 bg-slate-600 border border-slate-500 rounded text-white focus:ring-2 focus:ring-purple-500"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <h3
                      className="text-lg font-medium text-white cursor-pointer hover:text-purple-300 transition-colors"
                      onClick={() => setEditingSkillCategory(category.id)}
                    >
                      {category.title}
                    </h3>
                  )}
                  <button
                    onClick={() => deleteSkillCategory(category.id)}
                    className="text-red-400 hover:text-red-300 p-1 transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  {category.skills.map(skill => (
                    <div key={skill.id} className="flex justify-between items-center bg-slate-600/20 rounded px-3 py-2">
                      {editingSkill === skill.id ? (
                        <input
                          type="text"
                          defaultValue={skill.name}
                          onBlur={(e) => updateSkill(category.id, skill.id, e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && updateSkill(category.id, skill.id, e.currentTarget.value)}
                          className="flex-1 px-2 py-1 bg-slate-500 border border-slate-400 rounded text-white text-sm focus:ring-2 focus:ring-purple-500"
                          autoFocus
                        />
                      ) : (
                        <span
                          className="text-white/80 cursor-pointer hover:text-white text-sm transition-colors"
                          onClick={() => setEditingSkill(skill.id)}
                        >
                          • {skill.name}
                        </span>
                      )}
                      <button
                        onClick={() => deleteSkill(category.id, skill.id)}
                        className="text-red-400 hover:text-red-300 p-1 ml-2 transition-colors"
                        title="Delete skill"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                    className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addSkillToCategory(category.id)}
                  />
                  <button
                    onClick={() => addSkillToCategory(category.id)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm transition-colors"
                    title="Add skill"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {(!formData.skillCategories || formData.skillCategories.length === 0) && (
              <div className="text-center py-8 text-white/50">
                No skill categories yet. Add one to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}