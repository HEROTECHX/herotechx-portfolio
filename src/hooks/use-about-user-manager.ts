import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot,
  query,
  limit,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { AboutUser, CreateAboutUserData } from '@/types';

export function useAboutUserManager() {
  const [aboutUser, setAboutUser] = useState<AboutUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Real-time listener for about user data
  useEffect(() => {
    console.log('🔄 Setting up real-time listener for about user...');
    
    const aboutUserQuery = query(
      collection(db, 'aboutUser'),
      limit(1)
    );

    const unsubscribe = onSnapshot(
      aboutUserQuery,
      (snapshot) => {
        console.log('📊 Snapshot received, documents count:', snapshot.size);
        
        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          const data = docSnap.data();
          console.log('📄 About User Document:', docSnap.id, data);
          
          setAboutUser({
            id: docSnap.id,
            name: data.name || '',
            title: data.title || '',
            resume: data.resume || '',
            resumeSummary: data.resumeSummary || '',
            bio: data.bio || '',
            quote: data.quote || '',
            userImg: data.userImg || '',
            skillCategories: data.skillCategories || [],
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
          });
        } else {
          console.log('ℹ️ No about user document found');
          setAboutUser(null);
        }
        
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
  }, []);

  const saveAboutUser = async (userData: CreateAboutUserData) => {
    try {
      console.log('🚀 Saving about user data:', userData);
      setError(null);
      
      // Validate required fields
      if (!userData.name || userData.name.trim() === '') {
        throw new Error('Name is required');
      }

      const docData = {
        ...userData,
        updatedAt: serverTimestamp(),
      };

      // Check if document exists
      const aboutUserQuery = query(collection(db, 'aboutUser'), limit(1));
      const snapshot = await getDocs(aboutUserQuery);

      if (!snapshot.empty) {
        // Update existing document
        const docRef = doc(db, 'aboutUser', snapshot.docs[0].id);
        console.log('📝 Updating existing document:', snapshot.docs[0].id);
        await updateDoc(docRef, docData);
        console.log('✅ About user updated successfully');
      } else {
        // Create new document
        console.log('📝 Creating new about user document');
        const newDocData = {
          ...docData,
          createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, 'aboutUser'), newDocData);
        console.log('✅ About user created successfully with ID:', docRef.id);
        return docRef.id;
      }
    } catch (err: any) {
      console.error('❌ Error saving about user:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      
      // Provide more specific error messages
      if (err.code === 'permission-denied') {
        const errorMsg = 'Permission denied. Check your Firestore security rules.';
        setError(errorMsg);
        throw new Error(errorMsg);
      } else if (err.code === 'unavailable') {
        const errorMsg = 'Firebase is unavailable. Check your internet connection.';
        setError(errorMsg);
        throw new Error(errorMsg);
      } else {
        setError(err.message);
        throw err;
      }
    }
  };

  return {
    aboutUser,
    loading,
    error,
    saveAboutUser,
  };
}