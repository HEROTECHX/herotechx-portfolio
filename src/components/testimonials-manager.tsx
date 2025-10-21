import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Trash2, Edit2, Check, X, Star, Eye, EyeOff } from "lucide-react";
import { useTestimonials } from "../hooks/use-testimonials";
import { LabelInputContainer } from "./ui/label-input-container";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { EditFormData, Testimonial } from "../types";
import { useToast } from "../hooks/use-toast";
import { TextArea } from "./ui/textarea";


export function TestimonialsManager() {
  const { testimonials, loading, updateTestimonial, deleteTestimonial } = useTestimonials(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { successToast, errorToast } = useToast();

  const [editForm, setEditForm] = useState<EditFormData>({
    clientName: '',
    company: '',
    role: '',
    project: '',
    message: '',
    rating: 5
  });
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  const handleEdit = (testimonial: Testimonial) => {
    successToast(`${testimonial}`);
    setEditingId(testimonial.id);
    setEditForm({
      clientName: testimonial.clientName,
      company: testimonial.company || '',
      role: testimonial.role || '',
      project: testimonial.project || '',
      message: testimonial.message,
      rating: testimonial.rating || 5
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      clientName: '',
      company: '',
      role: '',
      project: '',
      message: '',
      rating: 5
    });
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateTestimonial(id, editForm);
      setEditingId(null);
      successToast('Testimonial updated successfully!');
    } catch (error) {
      const err = error as { message: string };
      errorToast('Error updating testimonial: ' + err.message);
    }
  };

  const handleApprove = async (id: string, currentStatus: boolean) => {
    try {
      await updateTestimonial(id, { approved: !currentStatus });
      successToast(`Testimonial ${!currentStatus ? 'approved' : 'unapproved'} successfully!`);
    } catch (error) {
      const err = error as { message: string };
      errorToast('Error updating approval status: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteTestimonial(id);
      successToast('Testimonial deleted successfully!');
    } catch (error) {
      const err = error as { message: string };
      errorToast('Error deleting testimonial: ' + err.message);
    }
  };

  const filteredTestimonials = testimonials.filter(t => {
    if (filter === 'approved') return t.approved;
    if (filter === 'pending') return !t.approved;
    return true;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          Testimonials Manager
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filter === 'all'
                ? "bg-blue-600 text-white"
                : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
            )}
          >
            All ({testimonials.length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filter === 'approved'
                ? "bg-green-600 text-white"
                : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
            )}
          >
            Approved ({testimonials.filter(t => t.approved).length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              filter === 'pending'
                ? "bg-yellow-600 text-white"
                : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
            )}
          >
            Pending ({testimonials.filter(t => !t.approved).length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        
      ) : filteredTestimonials.length === 0 ? (
        <div className="text-center py-12 text-neutral-400">
          No testimonials found.
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "rounded-lg border p-4",
                  testimonial.approved
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-yellow-500/30 bg-yellow-500/5"
                )}
              >
                {editingId === testimonial.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                        Editing Testimonial
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(testimonial.id)}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <LabelInputContainer>
                        <Label>Client Name</Label>
                        <Input
                          value={editForm.clientName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, clientName: e.target.value }))}
                        />
                      </LabelInputContainer>

                      <LabelInputContainer>
                        <Label>Company</Label>
                        <Input
                          value={editForm.company}
                          onChange={(e) => setEditForm(prev => ({ ...prev, company: e.target.value }))}
                        />
                      </LabelInputContainer>

                      <LabelInputContainer>
                        <Label>Role</Label>
                        <Input
                          value={editForm.role}
                          onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                        />
                      </LabelInputContainer>

                      <LabelInputContainer>
                        <Label>Project</Label>
                        <Input
                          value={editForm.project}
                          onChange={(e) => setEditForm(prev => ({ ...prev, project: e.target.value }))}
                        />
                      </LabelInputContainer>
                    </div>

                    <LabelInputContainer>
                      <Label>Rating</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setEditForm(prev => ({ ...prev, rating: star }))}
                          >
                            <Star
                              className={cn(
                                "h-6 w-6 transition-colors cursor-pointer",
                                star <= editForm.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-neutral-400"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </LabelInputContainer>

                    <LabelInputContainer>
                      <Label>Message</Label>
                      <TextArea
                        value={editForm.message}
                        onChange={(e) => setEditForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        className={cn(
                          "flex w-full border-none bg-zinc-800 text-white shadow-input rounded-md px-3 py-2 text-sm",
                          "placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
                          "resize-none transition duration-400"
                        )}
                      />
                    </LabelInputContainer>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.clientName}
                            className="h-12 w-12 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-neutral-800 dark:text-neutral-100">
                                {testimonial.clientName}
                              </h4>
                              {testimonial.role && testimonial.company && (
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                  {testimonial.role} at {testimonial.company}
                                </p>
                              )}
                              {testimonial.project && (
                                <p className="text-xs text-neutral-600 dark:text-neutral-500 mt-1">
                                  Project: {testimonial.project}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, idx) => (
                                <Star
                                  key={idx}
                                  className={cn(
                                    "h-4 w-4",
                                    idx < (testimonial.rating || 5)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-neutral-400"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                      "{testimonial.message}"
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center gap-2">
                        {testimonial.approved ? (
                          <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                            <Eye className="h-3 w-3" />
                            Approved
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                            <EyeOff className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                        {testimonial.createdAt && (
                          <span className="text-xs text-neutral-500">
                            • {testimonial.createdAt.toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApprove(testimonial.id, testimonial.approved || false)}
                          className={cn(
                            "p-2 rounded-lg transition-colors",
                            testimonial.approved
                              ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          )}
                          title={testimonial.approved ? "Unapprove" : "Approve"}
                        >
                          {testimonial.approved ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(testimonial)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(testimonial.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}