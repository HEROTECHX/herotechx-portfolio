// hooks/use-projects.ts
import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { FeaturedProject, UseProjectsReturn } from '../types';

// Cache key for localStorage
const CACHE_KEY = 'featured_projects_cache';
const CACHE_TIMESTAMP_KEY = 'featured_projects_cache_timestamp';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export function useFeaturedProject(): UseProjectsReturn {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [usingCache, setUsingCache] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Connection restored');
      setIsOnline(true);
      setError(null);
    };

    const handleOffline = () => {
      console.log('📴 Connection lost');
      setIsOnline(false);
      setError('You are currently offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load from cache
  const loadFromCache = (): FeaturedProject[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (!cached || !timestamp) {
        console.log('📦 No cache found');
        return null;
      }

      const cacheAge = Date.now() - parseInt(timestamp);
      
      if (cacheAge > CACHE_DURATION) {
        console.log('⏰ Cache expired');
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        return null;
      }

      console.log('✅ Loading from cache');
      return JSON.parse(cached);
    } catch (err) {
      console.error('❌ Error loading cache:', err);
      return null;
    }
  };

  // Save to cache
  const saveToCache = (data: FeaturedProject[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      console.log('💾 Data cached successfully');
    } catch (err) {
      console.error('❌ Error saving to cache:', err);
    }
  };

  // Fetch projects from Firestore
  useEffect(() => {
    console.log('🔄 Setting up projects listener...');
    
    // If offline, try to load from cache immediately
    if (!isOnline) {
      const cachedData = loadFromCache();
      if (cachedData) {
        setProjects(cachedData);
        setUsingCache(true);
        setLoading(false);
        return;
      } else {
        setError('You are offline and no cached data is available');
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);

    const projectsQuery = query(
      collection(db, 'featuredProjects'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        console.log('📊 Snapshot received, documents:', snapshot.size);
        
        const projectsData: FeaturedProject[] = [];
        
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          projectsData.push({
            id: docSnap.id,
            title: data.title || '',
            description: data.description || '',
            image: data.image || '',
            technologies: data.technologies || [],
            liveUrl: data.liveUrl || '',
            githubUrl: data.githubUrl || '',
            features: data.features || [],
            results: data.results || [],
            category: data.category || 'web',
            status: data.status || 'completed',
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
          });
        });
        
        console.log('✅ Projects loaded:', projectsData.length);
        
        // Save to cache
        saveToCache(projectsData);
        
        setProjects(projectsData);
        setUsingCache(false);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('❌ Error fetching projects:', err);
        
        // Try to load from cache on error
        const cachedData = loadFromCache();
        if (cachedData) {
          console.log('📦 Falling back to cache');
          setProjects(cachedData);
          setUsingCache(true);
          setError('Unable to fetch latest data. Showing cached version.');
        } else {
          setError(err.message);
          setProjects([]);
        }
        
        setLoading(false);
      }
    );

    return () => {
      console.log('🛑 Cleaning up listener');
      unsubscribe();
    };
  }, [isOnline, refetchTrigger]);

  // Refetch function
  const refetch = () => {
    console.log('🔄 Manual refetch triggered');
    setRefetchTrigger(prev => prev + 1);
  };

  return {
    projects,
    loading,
    error,
    isOnline,
    usingCache,
    refetch,
  };
}