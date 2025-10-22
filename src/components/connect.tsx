import { motion } from "motion/react"
import { ContactForm } from "./contact-form"
import { SplitTextOne, SplitTextSix } from "./split-text"

export function Connect() {
  return (
      <div className="space-y-6">  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactForm />
          <div className="space-y-4 grid-cols-2"> 
            <div className="space-y-4 mt-8">
              <h4 className="text-lg font-semibold font-rampart text-effect-2 text-white mb-10">
                <SplitTextOne text="What I Can Help With" />
              </h4>
              <ul className="space-y-2 font-rampart text-effect-6 text-white/70">
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <SplitTextSix text="Full-stack web applications" whileInView/>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <SplitTextSix text="Modern UI/UX design" whileInView/>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <SplitTextSix text="3D web experiences" whileInView/>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <SplitTextSix text="Performance optimization" whileInView />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Quote Section - Improved Mobile */}
        <motion.div 
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
          whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)" }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >    
            <p className="text-white/70 hover:text-white text-[8px] sm:text-xs lg:text-base font-rampart italic text-center relative px-6 sm:px-8 py-2 capitalize">
              <SplitTextSix 
                text={"the best projects start with great conversations. Let's create something amazing together!"} 
                delay={2.2}
                whileInView
              />
            </p>
              </motion.div>
            </motion.div>
      </div>
    )
}
