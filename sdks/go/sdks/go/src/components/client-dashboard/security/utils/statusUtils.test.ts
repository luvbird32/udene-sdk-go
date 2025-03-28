import { getStatusColor, getPriorityBadge } from './statusUtils';
import { describe, it, expect } from 'vitest';

describe('statusUtils', () => {
  describe('getStatusColor', () => {
    it('returns correct color for active status', () => {
      expect(getStatusColor('active')).toBe('bg-green-500/10 text-green-500');
    });

    it('returns correct color for pending status', () => {
      expect(getStatusColor('pending')).toBe('bg-yellow-500/10 text-yellow-500');
    });

    it('returns correct color for inactive status', () => {
      expect(getStatusColor('inactive')).toBe('bg-red-500/10 text-red-500');
    });

    it('returns default color for unknown status', () => {
      expect(getStatusColor('unknown')).toBe('bg-gray-500/10 text-gray-500');
    });
  });

  describe('getPriorityBadge', () => {
    it('returns correct variant for high priority', () => {
      expect(getPriorityBadge('high')).toBe('destructive');
    });

    it('returns correct variant for medium priority', () => {
      expect(getPriorityBadge('medium')).toBe('warning');
    });

    it('returns correct variant for low priority', () => {
      expect(getPriorityBadge('low')).toBe('secondary');
    });

    it('returns undefined for unknown priority', () => {
      expect(getPriorityBadge('unknown')).toBeUndefined();
    });
  });
});