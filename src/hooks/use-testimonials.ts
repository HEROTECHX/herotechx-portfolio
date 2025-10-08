import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { CreateTestimonialData, Testimonial } from '../types';


export interface UpdateTestimonialData extends Partial<CreateTestimonialData> {
  approved?: boolean;
}

export function useTestimonials(onlyApproved: boolean = true) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 Setting up real-time listener for testimonials...');
    
    const testimonialsQuery = query(
      collection(db, 'testimonials'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      testimonialsQuery,
      (snapshot) => {
        console.log('📊 Snapshot received, documents count:', snapshot.size);
        const testimonialsData: Testimonial[] = [];
        
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          
          // Filter by approval status if needed
          if (onlyApproved && !data.approved) {
            return;
          }
          
          testimonialsData.push({
            id: docSnap.id,
            clientName: data.clientName || '',
            company: data.company || '',
            role: data.role || '',
            project: data.project || '',
            message: data.message || '',
            rating: data.rating || 5,
            image: data.image || '',
            approved: data.approved || false,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
            updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined,
          });
        });
        
        console.log('✅ Testimonials loaded:', testimonialsData.length);
        setTestimonials(testimonialsData);
        setLoading(false);
      },
      (err) => {
        console.error('❌ Error in snapshot listener:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      console.log('🛑 Cleaning up listener');
      unsubscribe();
    };
  }, [onlyApproved]);

  const createTestimonial = async (testimonialData: CreateTestimonialData) => {
    try {
      console.log('🚀 Creating testimonial with data:', testimonialData);
      setError(null);
      
      if (!testimonialData.clientName || testimonialData.clientName.trim() === '') {
        throw new Error('Client name is required');
      }
      
      if (!testimonialData.message || testimonialData.message.trim() === '') {
        throw new Error('Message is required');
      }

      const docData = {
        clientName: testimonialData.clientName.trim(),
        company: testimonialData.company?.trim() || '',
        role: testimonialData.role?.trim() || '',
        project: testimonialData.project?.trim() || '',
        message: testimonialData.message.trim(),
        rating: testimonialData.rating || 5,
        image: testimonialData.image?.trim() || '',
        approved: false, // New testimonials need approval
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(db, 'testimonials'), docData);
      console.log('✅ Testimonial created successfully with ID:', docRef.id);
      return docRef.id;
    } catch (err) {
      const error = err as { code?: string; message: string };
      console.error('❌ Error creating testimonial:', error);
      
      if (error.code === 'permission-denied') {
        const errorMsg = 'Permission denied. Check your Firestore security rules.';
        setError(errorMsg);
        throw new Error(errorMsg);
      } else {
        setError(error.message);
        throw error;
      }
    }
  };

  const updateTestimonial = async (testimonialId: string, testimonialData: UpdateTestimonialData) => {
    try {
      console.log('📝 Updating testimonial:', testimonialId, testimonialData);
      setError(null);
      
      if (!testimonialId) {
        throw new Error('Testimonial ID is required');
      }

      const testimonialRef = doc(db, 'testimonials', testimonialId);
      
      const updateData: Partial<{
        clientName: string;
        company: string;
        role: string;
        project: string;
        message: string;
        rating: number;
        image: string;
        approved: boolean;
        updatedAt: ReturnType<typeof serverTimestamp>;
      }> = {
        updatedAt: serverTimestamp(),
      };

      if (testimonialData.clientName !== undefined) updateData.clientName = testimonialData.clientName.trim();
      if (testimonialData.company !== undefined) updateData.company = testimonialData.company.trim();
      if (testimonialData.role !== undefined) updateData.role = testimonialData.role.trim();
      if (testimonialData.project !== undefined) updateData.project = testimonialData.project.trim();
      if (testimonialData.message !== undefined) updateData.message = testimonialData.message.trim();
      if (testimonialData.rating !== undefined) updateData.rating = testimonialData.rating;
      if (testimonialData.image !== undefined) updateData.image = testimonialData.image.trim();
      if (testimonialData.approved !== undefined) updateData.approved = testimonialData.approved;
      
      await updateDoc(testimonialRef, updateData);
      console.log('✅ Testimonial updated successfully');
    } catch (err) {
      const error = err as { message: string };
      console.error('❌ Error updating testimonial:', error);
      setError(error.message);
      throw error;
    }
  };

  const deleteTestimonial = async (testimonialId: string) => {
    try {
      console.log('🗑️ Deleting testimonial:', testimonialId);
      setError(null);
      
      if (!testimonialId) {
        throw new Error('Testimonial ID is required');
      }
      
      await deleteDoc(doc(db, 'testimonials', testimonialId));
      console.log('✅ Testimonial deleted successfully');
    } catch (err) {
      const error = err as { message: string };
      console.error('❌ Error deleting testimonial:', error);
      setError(error.message);
      throw error;
    }
  };

  return {
    testimonials,
    loading,
    error,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
}
