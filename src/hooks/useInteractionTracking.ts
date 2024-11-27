/**
 * Custom hook for tracking user interactions
 * Sets up event listeners for various user interactions and manages cleanup
 */
import { useEffect, useRef } from 'react';
import { interactionTracker } from '../utils/interactionTracker';

export const useInteractionTracking = () => {
  const isTracking = useRef(false);

  useEffect(() => {
    // Prevent duplicate event listeners
    if (isTracking.current) return;
    isTracking.current = true;

    // Event handler definitions
    const handleMouseMove = (e: MouseEvent) => interactionTracker.trackMouseMovement(e);
    const handleKeyPress = (e: KeyboardEvent) => interactionTracker.trackKeyPress(e);
    const handleScroll = (e: Event) => interactionTracker.trackScroll(e);
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      interactionTracker.trackCopyPaste('copy', target);
    };
    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      interactionTracker.trackCopyPaste('paste', target);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keypress', handleKeyPress);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);

    // Track form inputs
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        interactionTracker.trackFormInput(input as HTMLInputElement | HTMLTextAreaElement);
      });
    });

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      
      formInputs.forEach(input => {
        input.removeEventListener('input', () => {
          interactionTracker.trackFormInput(input as HTMLInputElement | HTMLTextAreaElement);
        });
      });
    };
  }, []);
};