import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Utility functions for managing animation states
 */

/**
 * Clears all stored animation states from sessionStorage
 * Useful for testing or resetting animations
 */
export const clearAllAnimationStates = (): void => {
  try {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('animation-')) {
        sessionStorage.removeItem(key);
      }
    });
    console.log('All animation states cleared');
  } catch (error) {
    console.warn('Could not clear animation states:', error);
  }
};

/**
 * Clears a specific animation state
 * @param persistKey - The key used when creating the animation
 */
export const clearAnimationState = (persistKey: string): void => {
  try {
    sessionStorage.removeItem(`animation-${persistKey}`);
    console.log(`Animation state cleared for: ${persistKey}`);
  } catch (error) {
    console.warn('Could not clear animation state:', error);
  }
};

/**
 * Checks if an animation has been triggered before
 * @param persistKey - The key used when creating the animation
 * @returns boolean indicating if animation was triggered
 */
export const hasAnimationTriggered = (persistKey: string): boolean => {
  try {
    return sessionStorage.getItem(`animation-${persistKey}`) === 'triggered';
  } catch (error) {
    console.warn('Could not check animation state:', error);
    return false;
  }
};

/**
 * Lists all animation states currently stored
 * @returns Array of animation keys
 */
export const listAnimationStates = (): string[] => {
  try {
    const keys = Object.keys(sessionStorage);
    return keys
      .filter(key => key.startsWith('animation-'))
      .map(key => key.replace('animation-', ''));
  } catch (error) {
    console.warn('Could not list animation states:', error);
    return [];
  }
};

