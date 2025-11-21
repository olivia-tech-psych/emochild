/**
 * Unit tests for storageService
 * Requirements: 5.1, 5.2, 5.4
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storageService } from './storageService';
import { EmotionLog, CreatureState } from '@/types';

describe('storageService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('saveLogs and loadLogs', () => {
    it('should save and load emotion logs', () => {
      const logs: EmotionLog[] = [
        {
          id: '123',
          text: 'Feeling happy',
          action: 'expressed',
          timestamp: Date.now(),
        },
      ];

      storageService.saveLogs(logs);
      const loaded = storageService.loadLogs();

      expect(loaded).toEqual(logs);
    });

    it('should return empty array when no logs exist', () => {
      const loaded = storageService.loadLogs();
      expect(loaded).toEqual([]);
    });

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('emotionagotchi_logs', 'invalid json');
      const loaded = storageService.loadLogs();
      expect(loaded).toEqual([]);
    });
  });

  describe('saveCreatureState and loadCreatureState', () => {
    it('should save and load creature state', () => {
      const state: CreatureState = {
        brightness: 75,
        size: 60,
        animation: 'grow',
      };

      storageService.saveCreatureState(state);
      const loaded = storageService.loadCreatureState();

      expect(loaded).toEqual(state);
    });

    it('should return null when no state exists', () => {
      const loaded = storageService.loadCreatureState();
      expect(loaded).toBeNull();
    });

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('emotionagotchi_creature', 'invalid json');
      const loaded = storageService.loadCreatureState();
      expect(loaded).toBeNull();
    });
  });

  describe('saveSafetyScore and loadSafetyScore', () => {
    it('should save and load safety score', () => {
      storageService.saveSafetyScore(42);
      const loaded = storageService.loadSafetyScore();

      expect(loaded).toBe(42);
    });

    it('should return 0 when no score exists', () => {
      const loaded = storageService.loadSafetyScore();
      expect(loaded).toBe(0);
    });

    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('emotionagotchi_safety', 'not a number');
      const loaded = storageService.loadSafetyScore();
      expect(loaded).toBe(0);
    });
  });

  describe('clearAll', () => {
    it('should clear all stored data', () => {
      const logs: EmotionLog[] = [
        {
          id: '123',
          text: 'Test',
          action: 'expressed',
          timestamp: Date.now(),
        },
      ];
      const state: CreatureState = {
        brightness: 50,
        size: 50,
        animation: 'idle',
      };

      storageService.saveLogs(logs);
      storageService.saveCreatureState(state);
      storageService.saveSafetyScore(10);

      storageService.clearAll();

      expect(storageService.loadLogs()).toEqual([]);
      expect(storageService.loadCreatureState()).toBeNull();
      expect(storageService.loadSafetyScore()).toBe(0);
    });
  });
});
