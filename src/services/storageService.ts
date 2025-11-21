/**
 * Storage Service for Emotionagotchi
 * Handles all localStorage operations with error handling
 * Requirements: 5.1, 5.2, 5.4
 */

import { EmotionLog, CreatureState } from '@/types';

// Storage keys
const STORAGE_KEYS = {
  LOGS: 'emotionagotchi_logs',
  CREATURE: 'emotionagotchi_creature',
  SAFETY: 'emotionagotchi_safety',
} as const;

/**
 * Storage service interface
 */
export interface StorageService {
  saveLogs(logs: EmotionLog[]): void;
  loadLogs(): EmotionLog[];
  saveCreatureState(state: CreatureState): void;
  loadCreatureState(): CreatureState | null;
  saveSafetyScore(score: number): void;
  loadSafetyScore(): number;
  clearAll(): void;
}

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Save emotion logs to localStorage
 * Requirement 5.1: Persist logs immediately
 */
function saveLogs(logs: EmotionLog[]): void {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return;
    }
    
    const serialized = JSON.stringify(logs);
    localStorage.setItem(STORAGE_KEYS.LOGS, serialized);
  } catch (error) {
    // Requirement 5.4: Handle localStorage failures
    console.error('Failed to save logs to localStorage:', error);
    
    // Check if quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
    }
  }
}

/**
 * Load emotion logs from localStorage
 * Requirement 5.2: Load previous logs on return
 */
function loadLogs(): EmotionLog[] {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return [];
    }
    
    const serialized = localStorage.getItem(STORAGE_KEYS.LOGS);
    
    if (!serialized) {
      return [];
    }
    
    const logs = JSON.parse(serialized);
    
    // Validate the loaded data
    if (!Array.isArray(logs)) {
      console.error('Invalid logs data in localStorage');
      return [];
    }
    
    return logs;
  } catch (error) {
    // Requirement 5.4: Handle corrupted data
    console.error('Failed to load logs from localStorage:', error);
    return [];
  }
}

/**
 * Save creature state to localStorage
 * Requirement 5.1: Persist state immediately
 */
function saveCreatureState(state: CreatureState): void {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return;
    }
    
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEYS.CREATURE, serialized);
  } catch (error) {
    // Requirement 5.4: Handle localStorage failures
    console.error('Failed to save creature state to localStorage:', error);
  }
}

/**
 * Load creature state from localStorage
 * Requirement 5.2: Load previous state on return
 */
function loadCreatureState(): CreatureState | null {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return null;
    }
    
    const serialized = localStorage.getItem(STORAGE_KEYS.CREATURE);
    
    if (!serialized) {
      return null;
    }
    
    const state = JSON.parse(serialized);
    
    // Basic validation
    if (typeof state.brightness !== 'number' || typeof state.size !== 'number') {
      console.error('Invalid creature state in localStorage');
      return null;
    }
    
    return state;
  } catch (error) {
    // Requirement 5.4: Handle corrupted data
    console.error('Failed to load creature state from localStorage:', error);
    return null;
  }
}

/**
 * Save safety score to localStorage
 * Requirement 5.1: Persist score immediately
 */
function saveSafetyScore(score: number): void {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return;
    }
    
    localStorage.setItem(STORAGE_KEYS.SAFETY, score.toString());
  } catch (error) {
    // Requirement 5.4: Handle localStorage failures
    console.error('Failed to save safety score to localStorage:', error);
  }
}

/**
 * Load safety score from localStorage
 * Requirement 5.2: Load previous score on return
 */
function loadSafetyScore(): number {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return 0;
    }
    
    const serialized = localStorage.getItem(STORAGE_KEYS.SAFETY);
    
    if (!serialized) {
      return 0;
    }
    
    const score = parseInt(serialized, 10);
    
    if (isNaN(score)) {
      console.error('Invalid safety score in localStorage');
      return 0;
    }
    
    return score;
  } catch (error) {
    // Requirement 5.4: Handle corrupted data
    console.error('Failed to load safety score from localStorage:', error);
    return 0;
  }
}

/**
 * Clear all stored data
 * Requirement 5.4: Data management
 */
function clearAll(): void {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return;
    }
    
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.CREATURE);
    localStorage.removeItem(STORAGE_KEYS.SAFETY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

/**
 * Export the storage service
 */
export const storageService: StorageService = {
  saveLogs,
  loadLogs,
  saveCreatureState,
  loadCreatureState,
  saveSafetyScore,
  loadSafetyScore,
  clearAll,
};
