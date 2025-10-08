import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { LabelInputContainer } from "../components/ui/label-input-container";
import { Input } from "../components/ui/input";
import { BottomGradient } from "../components/ui/bottom-gradient";
import { Loading } from "../components/loading";
import { Label } from "../components/ui/label";
import { StarRating } from "../components/star-rating";
import { TextArea } from "../components/ui/textarea";

import { X, Star } from "lucide-react";
import { useTestimonials } from "../hooks/use-testimonials";
import { useToast } from "../hooks/use-toast";
import { CompactFileUpload } from "./compact-file-upload";

export function Testimonials() {
  const [showReview, setShowReview] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const {successToast, errorToast} = useToast();
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    role: '',
    project: '',
    message: '',
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);
  
  const { testimonials, loading, createTestimonial } = useTestimonials(true);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // In a real app, you'd upload the file to storage and get the URL
      let imageUrl = '';
      if (files.length > 0) {
        // TODO: Upload file to Firebase Storage
        imageUrl = ''; // URL from storage
      }

      await createTestimonial({
        clientName: formData.clientName,
        company: formData.company,
        role: formData.role,
        project: formData.project,
        message: formData.message,
        rating: formData.rating,
        image: imageUrl,
      });

      // Reset form
      setFormData({
        clientName: '',
        company: '',
        role: '',
        project: '',
        message: '',
        rating: 5
      });
      setFiles([]);
      
      // Show success message or switch back to testimonials view
      successToast('Thank you for your review! It will be visible after approval.');
      setShowReview(false);
    } catch (error) {
      const err = error as { message: string };
      errorToast('Error submitting review: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      clientName: '',
      company: '',
      role: '',
      project: '',
      message: '',
      rating: 5
    });
    setFiles([]);
    setShowReview(false);
  };

  return (
    <div className="relative min-h-[500px]">
      <AnimatePresence mode="wait">
        {!showReview ? (
          <motion.div
            key="testimonials-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <motion.button
              onClick={() => setShowReview(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="ml-5 px-4 py-2 text-sm rounded-xl bg-gradient-to-br from-green-500 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Write a Review
            </motion.button>
            
            <div className="grid gap-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                  </div>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="text-center py-8 text-neutral-400">
                  No testimonials yet. Be the first to leave a review!
                </div>
              ) : (
                testimonials.map((testimonial, i) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 hover:border-neutral-600 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {testimonial.image ? (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.clientName}
                          className="h-10 w-10 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-neutral-100">
                              {testimonial.clientName}
                            </h4>
                            {testimonial.role && testimonial.company && (
                              <p className="text-xs text-neutral-400">
                                {testimonial.role} at {testimonial.company}
                              </p>
                            )}
                          </div>
                          {testimonial.rating && (
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, idx) => (
                                <Star
                                  key={idx}
                                  className={cn(
                                    "h-4 w-4",
                                    idx < testimonial.rating! 
                                      ? "fill-yellow-400 text-yellow-400" 
                                      : "text-neutral-600"
                                  )}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        {testimonial.project && (
                          <p className="text-xs text-neutral-500 mt-1">
                            Project: {testimonial.project}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      "{testimonial.message}"
                    </p>
                  </motion.div>
                ))
              )}

              {/* Quote */}
                     <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.9 }}
                              whileHover={{ scale: 1.01 }}
                              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                            >
                              <motion.p 
                                className="text-white/60 italic text-center relative"
                                whileHover={{ scale: 1.02 }}
                                >
                                "Transformed our vision into reality with exceptional skill!"
                              </motion.p>
                            </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="review-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="shadow-input mx-auto w-full rounded-2xl bg-neutral-900/50 border border-neutral-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Leave a Review</h3>
                <button
                  onClick={handleCancel}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="clientImage" className="mb-2 block">Client Image (Optional)</Label>
                  <CompactFileUpload onChange={handleFileUpload} />
                </div>

                <LabelInputContainer>
                  <Label htmlFor="clientName">Your Name *</Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    placeholder="John Doe"
                    type="text"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                  />
                </LabelInputContainer>

                <div className="grid grid-cols-2 gap-4">
                  <LabelInputContainer>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </LabelInputContainer>

                  <LabelInputContainer>
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="CEO"
                      type="text"
                      value={formData.role}
                      onChange={handleInputChange}
                    />
                  </LabelInputContainer>
                </div>

                <LabelInputContainer>
                  <Label htmlFor="project">Project (Optional)</Label>
                  <Input
                    id="project"
                    name="project"
                    placeholder="E-commerce Website"
                    type="text"
                    value={formData.project}
                    onChange={handleInputChange}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="rating">Rating</Label>
                  <StarRating
                    rating={formData.rating}
                    onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="message">Your Review *</Label>
                  <TextArea
                    id="message"
                    name="message"
                    placeholder="What was your experience working with me?"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={cn(
                      "flex w-full border-none bg-zinc-800 text-white shadow-input rounded-md px-3 py-2 text-sm",
                      "placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
                      "disabled:cursor-not-allowed disabled:opacity-50 resize-none transition duration-400"
                    )}
                    required
                  />
                </LabelInputContainer>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 h-12 rounded-md font-medium text-neutral-300 border border-neutral-700 hover:bg-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    className={cn(
                      "group/btn relative flex-1 h-12 rounded-md font-medium text-white",
                      "shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]",
                      "bg-gradient-to-br from-black/30 to-neutral-600 hover:shadow-lg transition-all duration-200",
                      submitting && "opacity-50 cursor-not-allowed"
                    )}
                    type="button"
                    disabled={submitting}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      {/* <Send className="h-4 w-4" /> */}
                      <span>{submitting ? <Loading /> : 'Submit Review'}</span>
                    </span>
                    <BottomGradient />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}