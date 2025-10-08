import type { BentoData } from "../types";
import { IconBoxAlignRightFilled, IconSignature, IconTableColumn } from "@tabler/icons-react";
import { AboutMeSkeleton, ConnectSkeleton, FeaturedProjectSkeleton, TestimonialSkeleton } from "../components/skeleton";
import { Testimonials } from "./testimonials";
import { AboutUser } from "../components/about-user";
import { FeaturedProject } from "../components/featured-project";
import { ContactForm } from "../components/contact-form";

export const bentoData: BentoData[] = [
  {
    title: "featured projects",
    description: (
      <span>
        creative design & development
      </span>
    ),
    header: <FeaturedProjectSkeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-300" />,
    content: <FeaturedProject />
  },
  {
    title: "about me",
    description: (
      <span className="text-sm capitalize">
        want to know me more.
      </span>
    ),
    header: <AboutMeSkeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-300" />,
    content: <AboutUser />
  },
  {
    title: "testimonial",
    description: (
      <span className="text-sm capitalize">
        read what others say about me.
      </span>
    ),
    header: <TestimonialSkeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-300" />,
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
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-300" />,
    content: (
      <div className="space-y-6">  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactForm />
          <div className="space-y-4 grid-cols-2"> 
            <div className="space-y-4 mt-8">
              <h4 className="text-lg font-semibold text-white mb-10">What I Can Help With</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Full-stack web applications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Modern UI/UX design</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>3D web experiences</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Performance optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>  
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 mt-6">
          <p className="text-white/60 text-sm italic text-center">
            &quot;The best projects start with great conversations. Let&apos;s create something amazing together!"
          </p>
        </div>
      </div>
    )
  },
];