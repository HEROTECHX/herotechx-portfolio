import { useState, useEffect, useRef, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { BottomGradient } from "../components/ui/bottom-gradient";
import { LabelInputContainer } from "../components/ui/label-input-container";
import { TextArea } from "../components/ui/textarea";
import { cn } from "../lib/utils";
import { Send, Copy, Check, Mail } from "lucide-react";
import { IconBrandFiverr, IconBrandGithub, IconBrandLinkedin, IconBrandUpwork } from "@tabler/icons-react";
import { useToast } from "../hooks/use-toast";
import type { FormData, FormErrors, FormspreeError } from "../types";
import { motion } from "motion/react";
import gsap from "gsap";
import { SplitTextEleven, SplitTextNine, SplitTextOne } from "./split-text";

export function ContactForm(): JSX.Element {
  const [state, handleSubmit] = useForm("mldwznve");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [emailCopied, setEmailCopied] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations on mount
  useEffect(() => {
    if (formRef.current) {
      const ctx = gsap.context(() => {
        // Animate form fields
        gsap.fromTo(
          '.form-field',
          {
            opacity: 0,
            x: -30,
            scale: 0.95
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
          }
        );

        // Animate title
        gsap.fromTo(
          '.form-title',
          {
            opacity: 0,
            y: -20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          }
        );

        // Animate submit button
        gsap.fromTo(
          '.submit-btn',
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
            ease: 'power2.out'
          }
        );
      }, formRef);

      return () => ctx.revert();
    }
  }, []);

  // Animate social icons
  useEffect(() => {
    if (socialRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.social-icon',
          {
            opacity: 0,
            scale: 0,
            rotation: -180
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.8,
            ease: 'back.out(1.7)'
          }
        );
      }, socialRef);

      return () => ctx.revert();
    }
  }, []);
  
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    
    return newErrors;
  };

  const hasFormspreeError = (fieldName: string): boolean => {
    return Array.isArray(state.errors) && 
      state.errors.some((error: FormspreeError) => error.field === fieldName);
  };

  const copyEmailToClipboard = async (): Promise<void> => {
    const email = "herotechx@gmail.com";
    
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      successToast('Email copied to clipboard!');
      
      setTimeout(() => {
        setEmailCopied(false);
      }, 2000);
    } catch (clipboardError) {
      console.error('Clipboard error:', clipboardError);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        setEmailCopied(true);
        successToast('Email copied to clipboard!');
      } catch (fallbackError) {
        console.error('Fallback copy error:', fallbackError);
        errorToast('Failed to copy email');
      } finally {
        document.body.removeChild(textArea);
        setTimeout(() => {
          setEmailCopied(false);
        }, 2000);
      }
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      errorToast("Please fix the errors below");
      return;
    }
    
    await handleSubmit(e);
    successToast('Successfully Sent');
  };

  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (Array.isArray(state.errors) && state.errors.length > 0) {
      errorToast("There was an error sending your message. Please try again.");
    }
  }, [state.errors, errorToast]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="space-y-4 px-4 sm:px-0" ref={formRef}>
      <div className="shadow-input mx-auto w-full max-w-2xl rounded-none sm:rounded-2xl p-4 sm:p-6 md:p-8 bg-neutral-900/50 border border-neutral-800">
        {/* Title with custom font */}
        <motion.h3 
          className="form-title text-xl sm:text-2xl lg:text-3xl font-rampart text-3d-retro mb-6 text-center capitalize"
          whileHover={{ scale: 1.05 }}
        >
          <SplitTextOne text="Let's Work Together" />
          
        </motion.h3>

        <form onSubmit={handleFormSubmit} className="my-6 sm:my-8 space-y-4 sm:space-y-6">
          {/* Name Field */}
          <LabelInputContainer className="form-field">
            <Label htmlFor="name" className="font-rampart text-effect-60 text-sm sm:text-base">
              Full Name

            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={cn(
                "transition-all duration-300",
                errors.name || hasFormspreeError('name') ? "border-red-500 focus-visible:ring-red-500" : ""
              )}
              required
            />
            {errors.name && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 mt-1 block"
              >
                {errors.name}
              </motion.span>
            )}
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
              className="text-xs text-red-500 mt-1"
            />
          </LabelInputContainer>

          {/* Email Field */}
          <LabelInputContainer className="form-field">
            <Label htmlFor="email" className="font-rampart text-effect-60 text-sm sm:text-base">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="john@example.com"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={cn(
                "transition-all duration-300",
                errors.email || hasFormspreeError('email') ? "border-red-500 focus-visible:ring-red-500" : ""
              )}
              required
            />
            {errors.email && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 mt-1 block"
              >
                {errors.email}
              </motion.span>
            )}
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
              className="text-xs text-red-500 mt-1"
            />
          </LabelInputContainer>

          {/* Subject Field */}
          <LabelInputContainer className="form-field">
            <Label htmlFor="subject" className="font-rampart text-effect-60 text-sm sm:text-base">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Project Inquiry"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              className={cn(
                "transition-all duration-300",
                errors.subject || hasFormspreeError('subject') ? "border-red-500 focus-visible:ring-red-500" : ""
              )}
              required
            />
            {errors.subject && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 mt-1 block"
              >
                {errors.subject}
              </motion.span>
            )}
            <ValidationError 
              prefix="Subject" 
              field="subject"
              errors={state.errors}
              className="text-xs text-red-500 mt-1"
            />
          </LabelInputContainer>

          {/* Message Field */}
          <LabelInputContainer className="form-field">
            <Label htmlFor="message" className="font-rampart text-effect-60 text-sm sm:text-base">
              Message
            </Label>
            <TextArea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className={cn(
                "flex w-full border-none bg-zinc-800 text-white shadow-input rounded-md px-3 py-2 text-sm",
                "placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                "disabled:cursor-not-allowed disabled:opacity-50 resize-none transition duration-400",
                errors.message || hasFormspreeError('message') ? "border border-red-500 focus-visible:ring-red-500" : ""
              )}
              required
            />
            {errors.message && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 mt-1 block"
              >
                {errors.message}
              </motion.span>
            )}
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
              className="text-xs text-red-500 mt-1"
            />
          </LabelInputContainer>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: state.submitting ? 1 : 1.02 }}
            whileTap={{ scale: state.submitting ? 1 : 0.98 }}
            className={cn(
              "submit-btn group/btn relative block h-12 w-full rounded-md font-medium text-white font-rampart",
              "shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]",
              "transition-all duration-200",
              state.submitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-br from-black to-neutral-600 hover:shadow-lg hover:shadow-purple-500/20"
            )}
            type="submit"
            disabled={state.submitting}
          >
            <span className="flex items-center justify-center space-x-2">
              {state.submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"/>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </span>
            <BottomGradient />
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-6 sm:my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* Email Section */}
        <div className="text-center space-y-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs sm:text-sm text-neutral-400 font-rampart text-effect-60"
          >
            <SplitTextNine text="Or reach out directly via email" />
          
          </motion.p>
          
          <motion.button
            onClick={copyEmailToClipboard}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(88, 28, 135, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center space-x-2 text-xs sm:text-sm p-3 sm:p-4 text-neutral-300 hover:text-white transition-all duration-200 cursor-pointer rounded-md border border-transparent hover:border-purple-500/30"
          >
            <Mail className="h-4 w-4 text-purple-400" />
            <SplitTextEleven text="herotechx@gmail.com" whileInView />
            {emailCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}
          </motion.button>

          {/* Social Icons */}
          <div ref={socialRef} className="flex justify-center items-center gap-4 sm:gap-6 mt-6">
            <motion.a 
              href="https://www.linkedin.com/in/nuhu-ibrahim-128565383"
              className="social-icon inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 hover:border-blue-600/50 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconBrandLinkedin size={20} className="text-blue-400" />
            </motion.a>
            
            <motion.a 
              href="https://github.com/herotechx-commits"
              className="social-icon inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-600/10 hover:bg-gray-600/20 border border-gray-600/30 hover:border-gray-600/50 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconBrandGithub size={20} className="text-gray-300" />
            </motion.a>
            
            <motion.a 
              href="https://fiverr.com/your-profile"
              className="social-icon inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600/10 hover:bg-green-600/20 border border-green-600/30 hover:border-green-600/50 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconBrandFiverr size={20} className="text-green-400" />
            </motion.a>
            
            <motion.a 
              href="https://upwork.com/freelancers/your-profile"
              className="social-icon inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600/10 hover:bg-green-600/20 border border-green-600/30 hover:border-green-600/50 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconBrandUpwork size={20} className="text-green-400" />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}