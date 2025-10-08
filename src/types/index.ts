import type { HTMLAttributes, ReactNode } from "react";

export interface CardContextType {
  onCardClose: () => void;
  currentIndex: number | null;
}

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export interface BentoData {
  title: string;
  description: ReactNode;
  header: ReactNode;
  className: string;
  icon: ReactNode;
  content: ReactNode;
}

export interface ExpandableCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  className?: string;
  title: string;
  description: ReactNode;
  header: ReactNode;
  content: ReactNode;
  icon: ReactNode;
}

export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, role?: 'admin' | 'user') => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}


export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  results: string[];
  category: "web" | "mobile" | "design" | "other";
  status: "completed" | "in-progress";
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateProjectData = Omit<FeaturedProject, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectData = Partial<CreateProjectData>;


export interface Link {
  label: string;
  icon: React.ReactNode;
  content?: React.ReactNode;
  onClick?: () => void;
}

export interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

export interface UseProjectsReturn {
  projects: FeaturedProject[];
  loading: boolean;
  error: string | null;
  isOnline: boolean;
  usingCache: boolean;
  refetch: () => void;
}


export interface CachedData {
  data: AboutUser | null;
  timestamp: number;
}

export interface EditFormData {
  clientName: string;
  company: string;
  role: string;
  project: string;
  message: string;
  rating: number;
}


export interface SidebarLinkProps {
  link: Link;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: string;
}


// Define types for form data
export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define types for form errors
export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export interface AboutUser {
  id: string;
  name: string;
  title: string;
  resume: string;
  resumeSummary?: string;
  bio: string;
  quote?: string;
  userImg: string;
  skillCategories?: SkillCategory[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateAboutUserData {
  name: string;
  title: string;
  resume: string;
  resumeSummary?: string;
  bio: string;
  quote?: string;
  userImg: string;
  skillCategories?: SkillCategory[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  role?: string;
  project?: string;
  message: string;
  rating?: number;
}

export interface FormspreeError {
  field: string;
  code: string;
  message: string;
}
export type NetworkStrength = 'excellent' | 'good' | 'fair' | 'poor' | 'offline'

export interface NetworkStatus {
  isOnline: boolean
  strength: NetworkStrength
  effectiveType: string | null
  downlink: number | null
  rtt: number | null
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  role?: string;
  project?: string;
  message: string;
  rating?: number;
  image?: string;
  approved?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTestimonialData {
  clientName: string;
  company?: string;
  role?: string;
  project?: string;
  message: string;
  rating?: number;
  image?: string;
}

export interface ToastOptions {
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

export interface ToastMessage {
  title?: string;
  description?: string;
  type?: "success" | "error" | "info" | "warning";
}
