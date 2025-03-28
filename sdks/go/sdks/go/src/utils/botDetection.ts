import { throttle } from 'lodash';
import type { BotIndicators } from '@/types/bot-detection';

class BotDetectionService {
  private mousePositions: Array<{ x: number; y: number; timestamp: number }> = [];
  private keyPressTimings: number[] = [];
  private scrollTimings: number[] = [];
  private lastActivity: number = Date.now();
  
  constructor() {
    this.trackMouseMovement = throttle(this.trackMouseMovement.bind(this), 50);
  }

  private trackMouseMovement(event: MouseEvent) {
    this.mousePositions.push({
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now()
    });

    // Keep only last 100 positions
    if (this.mousePositions.length > 100) {
      this.mousePositions.shift();
    }
  }

  private trackKeyPress() {
    const now = Date.now();
    this.keyPressTimings.push(now);

    // Keep only last 50 timings
    if (this.keyPressTimings.length > 50) {
      this.keyPressTimings.shift();
    }
  }

  private trackScroll() {
    const now = Date.now();
    this.scrollTimings.push(now);

    // Keep only last 50 timings
    if (this.scrollTimings.length > 50) {
      this.scrollTimings.shift();
    }
  }

  private detectLinearMouseMovement(): boolean {
    if (this.mousePositions.length < 3) return false;

    let linearMovementCount = 0;
    for (let i = 2; i < this.mousePositions.length; i++) {
      const p1 = this.mousePositions[i - 2];
      const p2 = this.mousePositions[i - 1];
      const p3 = this.mousePositions[i];

      // Calculate slopes
      const slope1 = (p2.y - p1.y) / (p2.x - p1.x);
      const slope2 = (p3.y - p2.y) / (p3.x - p2.x);

      // If slopes are very similar (linear movement)
      if (Math.abs(slope1 - slope2) < 0.1) {
        linearMovementCount++;
      }
    }

    return linearMovementCount > this.mousePositions.length * 0.8;
  }

  private detectConsistentTiming(): boolean {
    const timings = [...this.keyPressTimings, ...this.scrollTimings];
    if (timings.length < 5) return false;

    const intervals = [];
    for (let i = 1; i < timings.length; i++) {
      intervals.push(timings[i] - timings[i - 1]);
    }

    // Calculate standard deviation of intervals
    const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);

    // If standard deviation is very low, timing is suspiciously consistent
    return stdDev < 50; // 50ms threshold
  }

  public analyze(): BotIndicators {
    const now = Date.now();
    const timeSinceLastActivity = now - this.lastActivity;
    this.lastActivity = now;

    return {
      unnaturalSpeed: timeSinceLastActivity < 50, // Too fast for human
      linearMovement: this.detectLinearMouseMovement(),
      consistentTiming: this.detectConsistentTiming(),
      noHumanErrors: this.keyPressTimings.length > 10 && !this.detectTypingErrors(),
      suspiciousPatterns: this.detectSuspiciousPatterns()
    };
  }

  private detectTypingErrors(): boolean {
    // Humans typically make typing errors (backspace usage)
    return document.querySelectorAll('input').length > 0 && 
           this.keyPressTimings.length > 10;
  }

  private detectSuspiciousPatterns(): boolean {
    // Check for suspicious patterns like:
    // 1. Too many actions in a short time
    const actionsPerSecond = (this.keyPressTimings.length + this.mousePositions.length + this.scrollTimings.length) / 
                            ((Date.now() - this.lastActivity) / 1000);
    
    // 2. Perfect precision in mouse movements
    const tooAccurate = this.mousePositions.length > 10 && this.detectLinearMouseMovement();
    
    return actionsPerSecond > 20 || tooAccurate;
  }

  public attachEventListeners() {
    document.addEventListener('mousemove', this.trackMouseMovement);
    document.addEventListener('keypress', () => this.trackKeyPress());
    document.addEventListener('scroll', () => this.trackScroll());
  }

  public detachEventListeners() {
    document.removeEventListener('mousemove', this.trackMouseMovement);
    document.removeEventListener('keypress', () => this.trackKeyPress());
    document.removeEventListener('scroll', () => this.trackScroll());
  }
}

export const botDetectionService = new BotDetectionService();
