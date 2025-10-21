import { useAboutUser } from '../hooks/use-about-user'
import { motion } from 'motion/react'
import { useRef } from 'react';
import { SplitTextFive, SplitTextFour, SplitTextOne, SplitTextSix } from './split-text';


export function AboutUser() {
  const { aboutUser, loading, error, isOnline, usingCache, refetch } = useAboutUser()
  const contentRef = useRef<HTMLDivElement>(null)

  
  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Online/Offline Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs sm:text-sm" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
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
              <p className={`text-xs sm:text-sm truncate ${error && !usingCache ? 'text-red-400' : 'text-yellow-400'}`} style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
                {error || (usingCache ? 'Showing cached data' : '')}
              </p>
            </div>
            
            {isOnline && (
              <motion.button
                onClick={refetch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded text-white transition-colors flex-shrink-0"
                style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
              >
                Refresh
              </motion.button>
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
      {!loading  && aboutUser && (
        <motion.div 
          ref={contentRef} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* User Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <motion.div
              initial={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                opacity: 1
              }}
              animate={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                opacity: 1,
                transition: {
                  duration: 1.2,
                  ease: [0.65, 0, 0.35, 1]
                }
              }}
              exit={{
                clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                opacity: 0,
                transition: {
                  duration: 0.6
                }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }

              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-50 h-50 sm:w-55 sm:h-55 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg overflow-hidden flex-shrink-0"
            >
              <img
                src={aboutUser?.userImg || '/default-avatar.png'} 
                alt={aboutUser?.name || 'User avatar'} 
                className='w-full h-full object-cover' 
              />
            </motion.div>
            
            <div className='flex-1 text-center sm:text-left py-2 sm:py-5 w-full'>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-10 items-center justify-center sm:justify-start">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-rampart text-white">
                  <SplitTextFour text={aboutUser.name}  />
                </h3>
                
                {aboutUser?.resume && (
                  <motion.a
                    href={aboutUser.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(251, 191, 36, 0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    
                    <div className="relative z-10 px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl border border-amber-400/50 backdrop-blur-sm">
                      <span className="uppercase text-red-500 font-medium text-xs sm:text-sm tracking-wider flex items-center gap-2" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.9)" }}>
                        <svg 
                          className="w-3 h-3 sm:w-4 sm:h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                          />
                        </svg>
                        resume
                      </span>
                    </div>
                  </motion.a>
                )}
              </div>
              
              <p className="font-rampart text-effect-6 text-sm sm:text-base lg:text-xl capitalize mt-2" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.2)" }}>
                <SplitTextSix text={aboutUser.title} delay={2.3} />
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="stagger-item">
            <p className="font-aboreto text-sm sm:text-base lg:text-xl text-white leading-relaxed " style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.2)" }}>
              
              <SplitTextOne  text={aboutUser?.bio}  delay={3.3} />
            </p>
          </div>
          
          {/* Skills & Expertise Section */}
          <div className="stagger-item space-y-4 capitalize">
            <h4 className="text-base sm:text-lg font-semibold font-rampart text-effect-2 text-white" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.95), 0 0 15px rgba(255,255,255,0.25)" }}>
                <SplitTextFour text={'Skills & Expertise'} whileInView/>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {aboutUser?.skillCategories?.map((cate) => (
                <motion.div 
                  key={cate.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <h5 className="text-white/80 font-medium mb-3 font-rampart text-effect-70 text-sm sm:text-base" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.2)" }}>
                    {cate.title}
                    <SplitTextFive text={cate.title} stagger={2.2} whileInView/>
                  </h5>
                  <div className="space-y-2">
                    {cate.skills?.map((skill) => (
                      <motion.div
                        key={skill.id}
                        className="skill-item text-white text-xs sm:text-sm font-rampart text-effect-31 hover:text-white/80 transition-colors duration-200 cursor-default"
                        style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(34,197,94,0.4)" }}
                        whileHover={{
                          x: [0, 3, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        <SplitTextFive text={`• ${skill.name}`} whileInView />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!aboutUser && !loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-white/40 mb-4">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-sm sm:text-base text-white/60" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>No profile information available</p>
          {!isOnline && (
            <p className="text-white/40 text-xs sm:text-sm mt-2" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>You're offline and no cached data is available</p>
          )}
        </motion.div>
      )}
      
      <motion.div 
        className="quote-section bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
        whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)" }}
      >
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <p className="text-white/70 hover:text-white text-[8px] sm:text-xs lg:text-base font-rampart italic text-center relative px-6 sm:px-8 py-2 capitalize" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.3)" }}>
            <SplitTextSix text={`"Code is poetry in motion, and I strive to write verses that both machines and humans can appreciate."`}  whileInView stagger={1.1}/>
            
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

