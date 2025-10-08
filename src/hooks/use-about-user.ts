import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  onSnapshot,
  query,
  limit
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { AboutUser, CachedData } from '@/types';

const CACHE_KEY = 'aboutUser_cache';
const CACHE_TIMESTAMP_KEY = 'aboutUser_cache_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export function useAboutUser() {
  const [aboutUser, setAboutUser] = useState<AboutUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [usingCache, setUsingCache] = useState(false);

  // Check if cached data is still valid
  const getCachedData = useCallback((): AboutUser | null => {
    try {
      const cachedDataStr = localStorage.getItem(CACHE_KEY);
      const cachedTimestampStr = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (!cachedDataStr || !cachedTimestampStr) {
        return null;
      }

      const cachedTimestamp = parseInt(cachedTimestampStr, 10);
      const now = Date.now();
      
      // Check if cache is still valid
      if (now - cachedTimestamp > CACHE_DURATION) {
        // Cache expired, clear it
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        return null;
      }

      const cachedData: CachedData = JSON.parse(cachedDataStr);
      console.log('📦 Using cached about user data');
      return cachedData.data;
    } catch (err) {
      console.error('Error reading cache:', err);
      return null;
    }
  }, []);

  // Save data to cache
  const setCachedData = useCallback((data: AboutUser | null) => {
    try {
      const cacheData: CachedData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      console.log('💾 Cached about user data');
    } catch (err) {
      console.error('Error saving to cache:', err);
    }
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Back online');
      setIsOnline(true);
      setError(null);
    };

    const handleOffline = () => {
      console.log('📴 Gone offline');
      setIsOnline(false);
      setError('You are currently offline');
      
      // Try to load from cache when offline
      const cached = getCachedData();
      if (cached) {
        setAboutUser(cached);
        setUsingCache(true);
      }
    };

    // Set initial online status
    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [getCachedData]);

  // Real-time listener for about user data
  useEffect(() => {
    console.log('🔄 Setting up real-time listener for public about user...');
    
    // Try to load from cache first for instant display
    const cached = getCachedData();
    if (cached) {
      setAboutUser(cached);
      setUsingCache(true);
      setLoading(false);
    }

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
          
          const userData: AboutUser = {
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
          };

          setAboutUser(userData);
          setCachedData(userData); // Cache the fresh data
          setUsingCache(false);
          setError(null);
        } else {
          console.log('ℹ️ No about user document found');
          if (!cached) {
            setAboutUser(null);
          }
        }
        
        setLoading(false);
      },
      (err) => {
        console.error('❌ Error in snapshot listener:', err);
        
        // Handle specific Firebase errors
        if (err.code === 'permission-denied') {
          setError('Permission denied. Check Firestore security rules.');
        } else if (err.code === 'unavailable') {
          setError('Firebase is unavailable. Using cached data if available.');
          
          // Try to use cache on error
          const cached = getCachedData();
          if (cached) {
            setAboutUser(cached);
            setUsingCache(true);
          }
        } else {
          setError(err.message);
        }
        
        setLoading(false);
      }
    );

    return () => {
      console.log('🛑 Cleaning up listener');
      unsubscribe();
    };
  }, [getCachedData, setCachedData]);

  // Manual refetch function
  const refetch = useCallback(() => {
    if (!isOnline) {
      console.log('⚠️ Cannot refetch while offline');
      return;
    }

    console.log('🔄 Manual refetch triggered');
    setLoading(true);
    setError(null);
    
    // The listener will automatically get the latest data
    // We just need to clear the cache flag
    setUsingCache(false);
  }, [isOnline]);

  return {
    aboutUser,
    loading,
    error,
    isOnline,
    usingCache,
    refetch,
  };
}