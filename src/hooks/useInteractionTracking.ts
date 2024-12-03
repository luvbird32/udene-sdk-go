import { useEffect, useRef } from 'react';
import { interactionTracker } from '../utils/interactionTracker';

export const useInteractionTracking = () => {
  const isTracking = useRef(false);

  useEffect(() => {
    if (isTracking.current) return;
    isTracking.current = true;

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

    // Cleanup
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