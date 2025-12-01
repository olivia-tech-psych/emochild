/**
 * Storage Service for EmoChild
 * Handles all localStorage operations with error handling
 * Requirements: 5.1, 5.2, 5.4
 */

import { EmotionLog, CreatureState, CreatureCustomization } from '@/types';

// Storage keys
const STORAGE_KEYS = {
  LOGS: 'emochild_logs',
  CREATURE: 'emochild_creature',
  SAFETY: 'emochild_safety',
  CUSTOMIZATION: 'emochild_customization',
  MICRO_INDEX: 'emochild_micro_index',
  TEXT_COLOR_PREF: 'emochild_text_color_pref',
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
  saveCustomization(customization: CreatureCustomization): StorageResult;
  loadCustomization(): CreatureCustomization | null;
  saveMicroSentenceIndex(index: number): StorageResult;
  loadMicroSentenceIndex(): number;
  saveTextColorPreference(color: string): StorageResult;
  loadTextColorPreference(): string;
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
 * Requirement 4.3: Save textColor and quickEmotion fields
 * Requirement 8.3: Handle new fields in logs
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
 * Requirement 8.3: Migrate existing logs without new fields
 * Requirement 8.4: Default textColor to white for existing logs
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
    
    // Requirement 8.3, 8.4: Migrate existing logs without new fields
    const migratedLogs = logs.map((log: any) => {
      // Ensure textColor defaults to 'white' if not present
      if (!log.textColor) {
        log.textColor = 'white';
      }
      // quickEmotion remains undefined if not present (optional field)
      return log as EmotionLog;
    });
    
    return migratedLogs;
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
 * Save creature customization to localStorage
 * Requirement 2.6: Save creature name and color
 * Requirement 8.1: Save customization settings
 * Requirement 8.4: Persist customization on completion
 * Requirement 8.5: Update localStorage immediately on any setting change
 */
function saveCustomization(customization: CreatureCustomization): StorageResult {
  try {
    if (!isLocalStorageAvailable()) {
      lastError = 'Storage is not available - data won\'t persist between sessions';
      console.error('localStorage is not available');
      return { success: false, error: lastError };
    }
    
    const serialized = JSON.stringify(customization);
    localStorage.setItem(STORAGE_KEYS.CUSTOMIZATION, serialized);
    lastError = null;
    return { success: true };
  } catch (error) {
    // Requirement 5.4: Handle localStorage failures
    lastError = 'Failed to save customization';
    console.error('Failed to save customization to localStorage:', error);
    return { success: false, error: lastError };
  }
}

/**
 * Load creature customization from localStorage
 * Requirement 8.4: Restore customization settings on load
 */
function loadCustomization(): CreatureCustomization | null {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return null;
    }
    
    const serialized = localStorage.getItem(STORAGE_KEYS.CUSTOMIZATION);
    
    if (!serialized) {
      return null;
    }
    
    const customization = JSON.parse(serialized);
    
    // Basic validation
    if (typeof customization.name !== 'string' || 
        typeof customization.color !== 'string' || 
        typeof customization.hasBow !== 'boolean') {
      console.error('Invalid customization data in localStorage');
      return null;
    }
    
    return customization;
  } catch (error) {
    // Requirement 5.4: Handle corrupted data
    console.error('Failed to load customization from localStorage:', error);
    return null;
  }
}

/**
 * Save micro-sentence index to localStorage
 * Requirement 8.1: Persist micro-sentence index
 */
function saveMicroSentenceIndex(index: number): StorageResult {
  try {
    if (!isLocalStorageAvailable()) {
      lastError = 'Storage is not available - data won\'t persist between sessions';
      console.error('localStorage is not available');
      return { success: false, error: lastError };
    }
    
    localStorage.setItem(STORAGE_KEYS.MICRO_INDEX, index.toString());
    lastError = null;
    return { success: true };
  } catch (error) {
    // Requirement 5.4: Handle localStorage failures
    lastError = 'Failed to save micro-sentence index';
    console.error('Failed to save micro-sentence index to localStorage:', error);
    return { success: false, error: lastError };
  }
}

/**
 * Load micro-sentence index from localStorage
 * Requirement 8.4: Restore micro-sentence index on load
 */
function loadMicroSentenceIndex(): number {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return 0;
    }
    
    const serialized = localStorage.getItem(STORAGE_KEYS.MICRO_INDEX);
    
    if (!serialized) {
      return 0;
    }
    
    const index = parseInt(serialized, 10);
    
    if (isNaN(index)) {
      console.error('Invalid micro-sentence index in localStorage');
      return 0;
    }
    
    return index;
  } catch (error) {
    // Requirement 5.4: Handle corrupted data
    console.error('Failed to load micro-sentence index from localStorage:', error);
    return 0;
  }
}

/**
 * Save text color preference to localStorage
 * Requirement 8.2: Remember text color preference for next log
 * Requirement 8.5: Update localStorage immediately on any setting change
 */
function saveTextColorPreference(color: string): StorageResult {
  try {
    if (!isLocalStorageAvailable()) {
      lastError = 'Storage is not available - data won\'t persist between sessions';
      console.error('localStorage is not available');
      return { success: false, error: lastError };
    }
    
    localStorage.setItem(STORAGE_KEYS.TEXT_COLOR_PREF, color);
    lastError = null;
    return { success: true };
  } catch (error) {
    // Requirement 5.4: Handle localStorage failures
    lastError = 'Failed to save text color preference';
    console.error('Failed to save text color preference to localStorage:', error);
    return { success: false, error: lastError };
  }
}

/**
 * Load text color preference from localStorage
 * Requirement 8.2: Restore text color preference on load
 * Default to 'white' if no preference exists
 */
function loadTextColorPreference(): string {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage is not available');
      return 'white';
    }
    
    const color = localStorage.getItem(STORAGE_KEYS.TEXT_COLOR_PREF);
    
    if (!color) {
      return 'white';
    }
    
    return color;
  } catch (error) {
    // Requirement 5.4: Handle corrupted data
    console.error('Failed to load text color preference from localStorage:', error);
    return 'white';
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
    localStorage.removeItem(STORAGE_KEYS.CUSTOMIZATION);
    localStorage.removeItem(STORAGE_KEYS.MICRO_INDEX);
    localStorage.removeItem(STORAGE_KEYS.TEXT_COLOR_PREF);
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
  saveCustomization,
  loadCustomization,
  saveMicroSentenceIndex,
  loadMicroSentenceIndex,
  saveTextColorPreference,
  loadTextColorPreference,
  clearAll,
  getLastError,
};
