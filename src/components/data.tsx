import { motion } from "motion/react";
import type { BentoData } from "../types";
import { IconBoxAlignRightFilled, IconSignature, IconTableColumn } from "@tabler/icons-react";
import { AboutMeSkeleton, ConnectSkeleton, FeaturedProjectSkeleton, TestimonialSkeleton } from "../components/skeleton";
import { Testimonials } from "./testimonials";
import { AboutUser } from "../components/about-user";
import { FeaturedProject } from "../components/featured-project";
import { ContactForm } from "../components/contact-form";
import { SplitTextSix } from "./split-text";

export const bentoData: BentoData[] = [
  {
    title: "featured projects",
    description: (
      <span className="text-sm capitalize">
        creative design & development
      </span>
    ),
    header: <FeaturedProjectSkeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-white" />,
    content: <FeaturedProject />
  },
  {
    title: "about me",
    description: (
      <span className="text-sm  capitalize">
        want to know me more.
      </span>
    ),
    header: <AboutMeSkeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-white" />,
    content: <AboutUser />
  },
  {
    title: "testimonial",
    description: (
      <span className="text-sm capitalize">
        know what others say about me.
      </span>
    ),
    header: <TestimonialSkeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-white" />,
    content: <Testimonials />
  },
  {
    title: "connect",
    description: (
      <span className="text-sm capitalize">
        tell me more about your design and logic, let&apos;s connect
      </span>
    ),
    header: <ConnectSkeleton />,
    className: "md:col-span-2",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-white" />,
    content: (
      <div className="space-y-6">  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactForm />
          <div className="space-y-4 grid-cols-2"> 
            <div className="space-y-4 mt-8">
              <h4 className="text-lg font-semibold font-rampart text-effect-2 text-white mb-10">What I Can Help With</h4>
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
                  &quot;
                  {/* <SplitTextSix text={`"The best projects start with great conversations. Let's create something amazing together!"`} /> */}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error ratione natus est.
                </p>
              </motion.div>
            </motion.div>
      </div>
    )
  },
];