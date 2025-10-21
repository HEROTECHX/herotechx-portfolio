import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
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
import { SplitTextFive, SplitTextOne, SplitTextSix, SplitTextTwelve } from "./split-text";

export function Testimonials() {
  const [showReview, setShowReview] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { successToast, errorToast } = useToast();
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    role: '',
    project: '',
    message: '',
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { testimonials, loading, createTestimonial } = useTestimonials(true);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = '';
      if (files.length > 0) {
        // TODO: Upload file to Firebase Storage
        imageUrl = '';
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

      setFormData({
        clientName: '', company: '', role: '', project: '', message: '', rating: 5
      });
      setFiles([]);
      
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
      clientName: '', company: '', role: '', project: '', message: '', rating: 5
    });
    setFiles([]);
    setShowReview(false);
  };

  return (
    <div className="relative min-h-[500px] px-3 sm:px-4 md:px-6 lg:px-0 w-full">
      <AnimatePresence mode="wait">
        {!showReview ? (
          <motion.div
            key="testimonials-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6 w-full"
          >
            {/* Header Section - Improved Mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-rampart text-effect-8 capitalize text-center sm:text-left"
              >
                <SplitTextSix text={"Client Testimonials"} />              
              </motion.h2>
              
              <motion.button
                onClick={() => setShowReview(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 font-rampart uppercase tracking-wide whitespace-nowrap"
              >
                ✍️ Write a Review
              </motion.button>
            </div>
            
            <div ref={contentRef} className="grid gap-3 sm:gap-4 md:gap-6 w-full">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                    <p className="text-xs sm:text-sm text-white/60 font-rampart">Loading testimonials...</p>
                  </div>
                </div>
              ) : testimonials.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 sm:py-12 bg-neutral-800/30 rounded-lg sm:rounded-xl border border-neutral-700/50"
                >
                  <div className="mb-3 sm:mb-4">
                    <Star className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto text-yellow-500/30" />
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-neutral-400 font-rampart text-effect-6 mb-2 px-4">
                    No testimonials yet
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 px-4">
                    Be the first to leave a review!
                  </p>
                </motion.div>
              ) : (
                <>
                  {testimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      className="rounded-lg sm:rounded-xl border overflow-auto border-neutral-700 bg-neutral-800/50 p-3 xs:p-4 sm:p-5 hover:border-purple-500/40 hover:bg-neutral-800/70 transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-start gap-2 xs:gap-3 sm:gap-4 mb-3">
                        {testimonial.image ? (
                          <motion.img 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            src={testimonial.image} 
                            alt={testimonial.clientName}
                            className="h-9 w-9 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0 border-2 border-purple-500/30"
                          />
                        ) : (
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="h-9 w-9 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 shrink-0 border-2 border-purple-500/30"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1.5 sm:gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-neutral-100 font-rampart text-effect-1 truncate">
                                  <SplitTextSix text={testimonial.clientName} />
                                </h4>
                                {testimonial.role && testimonial.company && (
                                  <p className="text-[10px] xs:text-xs text-neutral-400 truncate font-aboreto">
                                    <SplitTextSix text={testimonial.role} /> at <SplitTextFive text={testimonial.company} />
                                  </p>
                                )}
                              </div>
                              {testimonial.rating && (
                                <div className="flex gap-0.5 shrink-0">
                                  {[...Array(5)].map((_, idx) => (
                                    <Star
                                      key={idx}
                                      className={cn(
                                        "h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4",
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
                              <p className="text-[10px] xs:text-xs text-purple-400/70 font-aboreto">
                                <SplitTextTwelve text={`Project: ${testimonial.project}`} />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <motion.p 
                        whileHover={{ x: 5 }}
                        className="text-xs font-aboreto sm:text-sm text-white leading-relaxed pl-0 xs:pl-11 sm:pl-16 italic"
                      >
                        <SplitTextOne text={`"${testimonial.message}"`} />
                      </motion.p>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="review-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="shadow-input mx-auto w-full max-w-2xl rounded-xl sm:rounded-2xl bg-neutral-900/50 border border-neutral-800 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-white font-rampart text-effect-4">
                  Leave a Review
                </h3>
                <motion.button
                  onClick={handleCancel}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <Label htmlFor="clientImage" className="mb-2 block font-rampart text-effect-10 text-xs sm:text-sm">
                    Client Image (Optional)
                  </Label>
                  <CompactFileUpload onChange={handleFileUpload} />
                </div>

                <LabelInputContainer>
                  <Label htmlFor="clientName" className="font-rampart text-effect-10 text-xs sm:text-sm">
                    Your Name *
                  </Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    placeholder="John Doe"
                    type="text"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="text-xs sm:text-sm"
                    required
                  />
                </LabelInputContainer>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <LabelInputContainer>
                    <Label htmlFor="company" className="font-rampart text-effect-10 text-xs sm:text-sm">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="text-xs sm:text-sm"
                    />
                  </LabelInputContainer>

                  <LabelInputContainer>
                    <Label htmlFor="role" className="font-rampart text-effect-10 text-xs sm:text-sm">
                      Role
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="CEO"
                      type="text"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="text-xs sm:text-sm"
                    />
                  </LabelInputContainer>
                </div>

                <LabelInputContainer>
                  <Label htmlFor="project" className="font-rampart text-effect-10 text-xs sm:text-sm">
                    Project (Optional)
                  </Label>
                  <Input
                    id="project"
                    name="project"
                    placeholder="E-commerce Website"
                    type="text"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="text-xs sm:text-sm"
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="rating" className="font-rampart text-effect-10 text-xs sm:text-sm">
                    Rating
                  </Label>
                  <StarRating
                    rating={formData.rating}
                    onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label htmlFor="message" className="font-rampart text-effect-10 text-xs sm:text-sm">
                    Your Review *
                  </Label>
                  <TextArea
                    id="message"
                    name="message"
                    placeholder="What was your experience working with me?"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={cn(
                      "flex w-full border-none bg-zinc-800 text-white shadow-input rounded-md px-3 py-2 text-xs sm:text-sm",
                      "placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                      "disabled:cursor-not-allowed disabled:opacity-50 resize-none transition duration-400"
                    )}
                    required
                  />
                </LabelInputContainer>

                <div className="flex flex-row gap-5 sm:gap-3 pt-2 sm:pt-4">
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 h-10 sm:h-12 rounded-md font-medium text-white border border-neutral-700 hover:bg-neutral-800 transition-colors font-rampart text-xs sm:text-sm"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "group/btn relative flex-1 h-10 sm:h-12 rounded-md font-medium text-white font-rampart text-xs sm:text-sm",
                      "shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]",
                      "bg-gradient-to-br from-black/30 to-neutral-600 hover:shadow-lg transition-all duration-200",
                      submitting && "opacity-50 cursor-not-allowed"
                    )}
                    type="submit"
                    disabled={submitting}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>{submitting ? <Loading /> : 'Submit Review'}</span>
                    </span>
                    <BottomGradient />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Quote Section - Improved Mobile */}
      
      <motion.div 
  className="quote-section my-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
  whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)" }}
>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
                >
                
                <p className="text-white/70 hover:text-white text-[8px] sm:text-xs lg:text-base font-rampart italic text-center relative px-6 sm:px-8 py-2 capitalize">
                <SplitTextFive text="Transformed our vision into reality with exceptional skill!" whileInView />
                 </p>
              </motion.div>
            </motion.div>
    </div>
  );
}