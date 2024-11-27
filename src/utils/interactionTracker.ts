/**
 * InteractionTracker Class
 * Tracks and analyzes user interactions with the application for fraud detection.
 * Implements buffering and throttling for optimal performance.
 */
import { throttle } from 'lodash';

interface InteractionData {
  timestamp: number;
  type: string;
  data: Record<string, any>;
}

class InteractionTracker {
  private buffer: InteractionData[] = [];
  private readonly bufferSize: number = 100;
  private readonly flushInterval: number = 5000; // 5 seconds
  
  constructor() {
    this.setupFlushInterval();
    // Throttle mouse movement tracking to prevent excessive events
    this.trackMouseMovement = throttle(this.trackMouseMovement.bind(this), 100);
  }

  /**
   * Sets up periodic buffer flushing to prevent memory overflow
   * @private
   */
  private setupFlushInterval(): void {
    setInterval(() => this.flushBuffer(), this.flushInterval);
  }

  /**
   * Adds interaction data to buffer and flushes if full
   * @param data - The interaction data to buffer
   * @private
   */
  private addToBuffer(data: InteractionData): void {
    this.buffer.push(data);
    if (this.buffer.length >= this.bufferSize) {
      this.flushBuffer();
    }
  }

  /**
   * Sends buffered interaction data to the server
   * @private
   */
  private async flushBuffer(): Promise<void> {
    if (this.buffer.length === 0) return;

    try {
      await fetch('/api/v1/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interactions: this.buffer,
          deviceInfo: this.getDeviceInfo(),
        }),
      });
      this.buffer = [];
    } catch (error) {
      console.error('Failed to send interaction data:', error);
    }
  }

  /**
   * Collects device information for fraud analysis
   * @returns Object containing device-specific information
   * @private
   */
  private getDeviceInfo(): Record<string, any> {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      colorDepth: window.screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      touchSupport: 'ontouchstart' in window,
    };
  }

  /**
   * Tracks mouse movement patterns
   * @param event - Mouse event containing movement data
   */
  public trackMouseMovement(event: MouseEvent): void {
    this.addToBuffer({
      timestamp: Date.now(),
      type: 'mouseMove',
      data: {
        x: event.clientX,
        y: event.clientY,
        movementX: event.movementX,
        movementY: event.movementY,
      },
    });
  }

  /**
   * Tracks keyboard interactions
   * @param event - Keyboard event data
   */
  public trackKeyPress(event: KeyboardEvent): void {
    this.addToBuffer({
      timestamp: Date.now(),
      type: 'keyPress',
      data: {
        key: event.key,
        timeStamp: event.timeStamp,
        repeat: event.repeat,
      },
    });
  }

  /**
   * Tracks scroll behavior
   * @param event - Scroll event data
   */
  public trackScroll(event: Event): void {
    this.addToBuffer({
      timestamp: Date.now(),
      type: 'scroll',
      data: {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      },
    });
  }

  /**
   * Tracks form input patterns
   * @param element - Form input element being tracked
   */
  public trackFormInput(element: HTMLInputElement | HTMLTextAreaElement): void {
    this.addToBuffer({
      timestamp: Date.now(),
      type: 'formInput',
      data: {
        elementId: element.id,
        elementType: element.type,
        value: element.type === 'password' ? '[REDACTED]' : element.value,
        inputLength: element.value.length,
      },
    });
  }

  /**
   * Tracks copy/paste actions
   * @param action - Type of action (copy/paste)
   * @param element - Element where action occurred
   */
  public trackCopyPaste(action: 'copy' | 'paste', element?: HTMLElement): void {
    this.addToBuffer({
      timestamp: Date.now(),
      type: action,
      data: {
        elementId: element?.id,
        elementType: element?.tagName.toLowerCase(),
      },
    });
  }
}

export const interactionTracker = new InteractionTracker();