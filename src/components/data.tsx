import type { BentoData } from "../types";
import { IconBoxAlignRightFilled, IconSignature, IconTableColumn } from "@tabler/icons-react";
import { AboutMeSkeleton, ConnectSkeleton, FeaturedProjectSkeleton, TestimonialSkeleton } from "../components/skeleton";
import { Testimonials } from "./testimonials";
import { AboutUser } from "../components/about-user";
import { FeaturedProject } from "../components/featured-project";
import { Connect } from "./connect";

export const bentoData: BentoData[] = [
  {
    title: "featured projects",
    description: "creative design & development",
    header: <FeaturedProjectSkeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-white" />,
    content: <FeaturedProject />
  },
  {
    title: "about me",
    description: "want to know me more.",
    header: <AboutMeSkeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-white" />,
    content: <AboutUser />
  },
  {
    title: "testimonial",
    description: "know what others say about me.",
    header: <TestimonialSkeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-white" />,
    content: <Testimonials />
  },
  {
    title: "connect",
    description: "tell me more about your design and logic, let's connect",
    header: <ConnectSkeleton />,
    className: "md:col-span-2",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-white" />,
    content: <Connect />
  },
];