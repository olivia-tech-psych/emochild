/**
 * Storage Service for EmoChild
 * Handles all localStorage operations with error handling
 * Requirements: 5.1, 5.2, 5.4
 */

import { EmotionLog, CreatureState } from '@/types';

// Storage keys
const STORAGE_KEYS = {
  LOGS: 'emochild_logs',
  CREATURE: 'emochild_creature',
  SAFETY: 'emochild_safety',
} as const;

// Track last error for error handling
let lastError: string | null = null;

/**
 * Storage operation result
 */
export interface StorageResult {
  success: boolean;
  error?: string;
}

/**
 * Storage service interface
 */
export interface StorageService {
  saveLogs(logs: EmotionLog[]): StorageResult;
  loadLogs(): EmotionLog[];
  saveCreatureState(state: CreatureState): StorageResult;
  loadCreatureState(): CreatureState | null;
  saveSafetyScore(score: number): StorageResult;
  loadSafetyScore(): number;
  clearAll(): void;
  getLastError(): string | null;
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
 * Requirement 5.4: Handle localStorage failures
 */
function saveLogs(logs: EmotionLog[]): StorageResult {
  try {
    if (!isLocalStorageAvailable()) {
      lastError = 'Storage is not available - data won\'t persist between sessions';
      console.error('localStorage is not available');
      return { success: false, error: lastError };
    }
    
    const serialized = JSON.stringify(logs);
    localStorage.setItem(STORAGE_KEYS.LOGS, serialized);
    lastError = null;
    return { success: true };
  } catch (error) {
    // Requirement 5.4: Handle localStorage failures
    console.error('Failed to save logs to localStorage:', error);
    
    // Check if quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      lastError = 'Storage full - some logs may not save';
      console.error('localStorage quota exceeded');
    } else {
      lastError = 'Failed to save data - changes may not persist';
    }
    
    return { success: false, error: lastError };
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
 * Requirement 5.4: Handle localStorage failures
 */
function saveCreatureState(state: CreatureState): StorageResult {
  try {
    if (!isLocalStorageAvailable()) {
      lastError = 'Storage is not available - data won\'t persist between sessions';
      console.error('localStorage is not available');
      return { success: false, error: lastError };
    }
    
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEYS.CREATURE, serialized);
    lastError = null;
    return { success: true };
  } catch (error) {
    // Requirement 5.4: Handle localStorage failures
    lastError = 'Failed to save creature state';
    console.error('Failed to save creature state to localStorage:', error);
    return { success: false, error: lastError };
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
 * Requirement 5.4: Handle localStorage failures
 */
function saveSafetyScore(score: number): StorageResult {
  try {
    if (!isLocalStorageAvailable()) {
      lastError = 'Storage is not available - data won\'t persist between sessions';
      console.error('localStorage is not available');
      return { success: false, error: lastError };
    }
    
    localStorage.setItem(STORAGE_KEYS.SAFETY, score.toString());
    lastError = null;
    return { success: true };
  } catch (error) {
    // Requirement 5.4: Handle localStorage failures
    lastError = 'Failed to save safety score';
    console.error('Failed to save safety score to localStorage:', error);
    return { success: false, error: lastError };
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
 * Get the last error that occurred
 */
function getLastError(): string | null {
  return lastError;
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
  getLastError,
};
