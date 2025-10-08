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
  Timestamp,
  FirestoreError
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { FeaturedProject, CreateProjectData, UpdateProjectData } from '../types';

interface ProjectManagerState {
  projects: FeaturedProject[];
  loading: boolean;
  error: string | null;
}

export function useFeaturedProjectManager() {
  const [state, setState] = useState<ProjectManagerState>({
    projects: [],
    loading: true,
    error: null
  });

  // Real-time listener for projects
  useEffect(() => {
    console.log('🔄 Setting up real-time listener for projects...');
    
    const projectsQuery = query(
      collection(db, 'featuredProjects'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        console.log('📊 Snapshot received, documents count:', snapshot.size);
        const projectsData: FeaturedProject[] = [];
        
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          console.log('📄 Document:', docSnap.id, data);
          
          projectsData.push({
            id: docSnap.id,
            title: data.title || '',
            description: data.description || '',
            image: data.image || '',
            technologies: Array.isArray(data.technologies) ? data.technologies : [],
            liveUrl: data.liveUrl || '',
            githubUrl: data.githubUrl || '',
            features: Array.isArray(data.features) ? data.features : [],
            results: Array.isArray(data.results) ? data.results : [],
            category: data.category || 'web',
            status: data.status || 'completed',
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
            updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined,
          });
        });
        
        console.log('✅ Projects loaded:', projectsData.length);
        setState({
          projects: projectsData,
          loading: false,
          error: null
        });
      },
      (err: FirestoreError) => {
        console.error('❌ Error in snapshot listener:', err);
        setState(prev => ({
          ...prev,
          error: err.message,
          loading: false
        }));
      }
    );

    return () => {
      console.log('🛑 Cleaning up listener');
      unsubscribe();
    };
  }, []);

  const createProject = async (projectData: CreateProjectData): Promise<string> => {
    try {
      console.log('🚀 Creating project with data:', projectData);
      setState(prev => ({ ...prev, error: null }));
      
      // Validate required fields
      if (!projectData.title || projectData.title.trim() === '') {
        throw new Error('Title is required');
      }
      
      if (!projectData.description || projectData.description.trim() === '') {
        throw new Error('Description is required');
      }

      if (!projectData.image || projectData.image.trim() === '') {
        throw new Error('Image is required');
      }

      const docData = {
        title: projectData.title.trim(),
        description: projectData.description.trim(),
        image: projectData.image.trim(),
        technologies: projectData.technologies || [],
        liveUrl: projectData.liveUrl?.trim() || '',
        githubUrl: projectData.githubUrl?.trim() || '',
        features: projectData.features || [],
        results: projectData.results || [],
        category: projectData.category || 'web',
        status: projectData.status || 'completed',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      console.log('📝 Document data to be created:', docData);
      
      const docRef = await addDoc(collection(db, 'featuredProjects'), docData);
      
      console.log('✅ Project created successfully with ID:', docRef.id);
      return docRef.id;
    } catch (err) {
      console.error('❌ Error creating project:', err);
      
      const error = err as FirestoreError;
      
      // Provide more specific error messages
      let errorMessage = 'Failed to create project';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Check your Firestore security rules.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Firebase is unavailable. Check your internet connection.';
      } else if (error.code === 'unauthenticated') {
        errorMessage = 'You must be authenticated to create projects.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setState(prev => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    }
  };

  const updateProject = async (projectId: string, projectData: UpdateProjectData): Promise<void> => {
    try {
      console.log('📝 Updating project:', projectId, projectData);
      setState(prev => ({ ...prev, error: null }));
      
      if (!projectId) {
        throw new Error('Project ID is required');
      }

      // Validate data
      if (projectData.title !== undefined && projectData.title.trim() === '') {
        throw new Error('Title cannot be empty');
      }

      if (projectData.description !== undefined && projectData.description.trim() === '') {
        throw new Error('Description cannot be empty');
      }
      
      const projectRef = doc(db, 'featuredProjects', projectId);
      
      // Only include defined fields in the update
      const updateData: Record<string, unknown> = {
        updatedAt: serverTimestamp(),
      };

      if (projectData.title !== undefined) updateData.title = projectData.title.trim();
      if (projectData.description !== undefined) updateData.description = projectData.description.trim();
      if (projectData.image !== undefined) updateData.image = projectData.image.trim();
      if (projectData.technologies !== undefined) updateData.technologies = projectData.technologies;
      if (projectData.liveUrl !== undefined) updateData.liveUrl = projectData.liveUrl.trim();
      if (projectData.githubUrl !== undefined) updateData.githubUrl = projectData.githubUrl.trim();
      if (projectData.features !== undefined) updateData.features = projectData.features;
      if (projectData.results !== undefined) updateData.results = projectData.results;
      if (projectData.category !== undefined) updateData.category = projectData.category;
      if (projectData.status !== undefined) updateData.status = projectData.status;
      
      await updateDoc(projectRef, updateData);
      console.log('✅ Project updated successfully');
    } catch (err) {
      console.error('❌ Error updating project:', err);
      
      const error = err as FirestoreError;
      let errorMessage = 'Failed to update project';
      
      if (error.code === 'not-found') {
        errorMessage = 'Project not found';
      } else if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Check your Firestore security rules.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setState(prev => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    }
  };

  const deleteProject = async (projectId: string): Promise<void> => {
    try {
      console.log('🗑️ Deleting project:', projectId);
      setState(prev => ({ ...prev, error: null }));
      
      if (!projectId) {
        throw new Error('Project ID is required');
      }
      
      await deleteDoc(doc(db, 'featuredProjects', projectId));
      console.log('✅ Project deleted successfully');
    } catch (err) {
      console.error('❌ Error deleting project:', err);
      
      const error = err as FirestoreError;
      let errorMessage = 'Failed to delete project';
      
      if (error.code === 'not-found') {
        errorMessage = 'Project not found';
      } else if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Check your Firestore security rules.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setState(prev => ({ ...prev, error: errorMessage }));
      throw new Error(errorMessage);
    }
  };

  return {
    projects: state.projects,
    loading: state.loading,
    error: state.error,
    createProject,
    updateProject,
    deleteProject,
  };
}