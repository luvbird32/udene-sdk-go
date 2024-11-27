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
    this.trackMouseMovement = throttle(this.trackMouseMovement.bind(this), 100);
  }

  private setupFlushInterval(): void {
    setInterval(() => this.flushBuffer(), this.flushInterval);
  }

  private addToBuffer(data: InteractionData): void {
    this.buffer.push(data);
    if (this.buffer.length >= this.bufferSize) {
      this.flushBuffer();
    }
  }

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