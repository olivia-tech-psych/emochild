/**
 * EmotionContext - Global state management for EmoChild
 * Manages emotion logs, creature state, safety score, customization, and micro-sentences
 * Requirements: 2.2, 2.3, 2.6, 4.1, 4.3, 5.1, 5.2, 7.3, 7.5, 8.4
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { EmotionLog, EmotionAction, CreatureState, CreatureCustomization, PastelColor, QuickEmotion } from '@/types';
import { storageService } from '@/services/storageService';
import { calculateNewState, getInitialState } from '@/utils/creatureState';
import { getNextMicroSentence as getNextMicroSentenceUtil } from '@/utils/microSentences';
import { v4 as uuidv4 } from 'uuid';

/**
 * Context type definition
 * Requirements: 2.6, 4.3, 5.1, 5.2, 7.3, 7.5, 8.2, 8.4, 8.5
 */
interface EmotionContextType {
  logs: EmotionLog[];
  creatureState: CreatureState;
  safetyScore: number;
  customization: CreatureCustomization;
  microSentenceIndex: number;
  currentMicroSentence: string | null;
  textColorPreference: PastelColor | 'white';
  addLog: (text: string, action: EmotionAction, textColor?: PastelColor | 'white', quickEmotion?: QuickEmotion) => void;
  clearLogs: () => void;
  setCustomization: (customization: CreatureCustomization) => void;
  deleteLog: (logId: string) => void;
  editLog: (logId: string, newText: string) => void;
  getNextMicroSentence: () => string;
  setTextColorPreference: (color: PastelColor | 'white') => void;
}

/**
 * Create the context with undefined default
 */
const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

/**
 * Props for the EmotionProvider component
 */
interface EmotionProviderProps {
  children: React.ReactNode;
}

/**
 * EmotionProvider component
 * Provides global state for emotion logs, creature state, safety score, customization, and micro-sentences
 * 
 * Requirements:
 * - 2.2: Record emotion logs with timestamps
 * - 2.3: Record action type (expressed/suppressed)
 * - 2.6: Load and manage creature customization
 * - 4.1: Track safety score (count of expressed emotions)
 * - 4.3: Save textColor and quickEmotion with logs
 * - 5.1: Persist data to localStorage immediately
 * - 5.2: Load initial state from localStorage on mount
 * - 7.3: Delete logs with safety score recalculation
 * - 7.5: Update safety score when expressed logs are deleted
 * - 8.2: Store and restore text color preference
 * - 8.4: Load customization and micro-sentence index from localStorage
 */
export function EmotionProvider({ children }: EmotionProviderProps) {
  const [logs, setLogs] = useState<EmotionLog[]>([]);
  const [creatureState, setCreatureState] = useState<CreatureState>(getInitialState());
  const [safetyScore, setSafetyScore] = useState<number>(0);
  const [customization, setCustomizationState] = useState<CreatureCustomization>({
    name: '',
    color: 'orange',
    hasBow: false,
  });
  const [microSentenceIndex, setMicroSentenceIndex] = useState<number>(0);
  const [currentMicroSentence, setCurrentMicroSentence] = useState<string | null>(null);
  const [textColorPreference, setTextColorPreferenceState] = useState<PastelColor | 'white'>('white');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use a ref to track the current micro-sentence index for synchronous access
  const microSentenceIndexRef = useRef<number>(0);

  // Load initial state from localStorage on mount
  // Requirement 5.2: Load previous state on return
  // Requirement 8.2: Load text color preference
  // Requirement 8.4: Load customization and micro-sentence index
  useEffect(() => {
    const loadedLogs = storageService.loadLogs();
    const loadedCreatureState = storageService.loadCreatureState();
    const loadedSafetyScore = storageService.loadSafetyScore();
    const loadedCustomization = storageService.loadCustomization();
    const loadedMicroIndex = storageService.loadMicroSentenceIndex();
    const loadedTextColorPref = storageService.loadTextColorPreference();

    setLogs(loadedLogs);
    setCreatureState(loadedCreatureState || getInitialState());
    setSafetyScore(loadedSafetyScore);
    
    // Requirement 2.6, 8.4: Load customization from localStorage
    if (loadedCustomization) {
      setCustomizationState(loadedCustomization);
    }
    
    // Requirement 5.2, 8.4: Load micro-sentence index from localStorage
    setMicroSentenceIndex(loadedMicroIndex);
    microSentenceIndexRef.current = loadedMicroIndex;
    
    // Requirement 8.2: Load text color preference from localStorage
    setTextColorPreferenceState(loadedTextColorPref as PastelColor | 'white');
    
    setIsInitialized(true);
  }, []);

  /**
   * Add a new emotion log
   * 
   * This method:
   * 1. Creates a new log with UUID and timestamp
   * 2. Updates creature state based on action
   * 3. Updates safety score if action is "expressed"
   * 4. Displays micro-sentence if action is "expressed"
   * 5. Persists all changes to localStorage
   * 
   * Requirements:
   * - 2.2: Create log with timestamp
   * - 2.3: Record action type
   * - 4.1: Increment safety score for expressed emotions
   * - 4.3: Save textColor and quickEmotion with log
   * - 5.1: Persist to storage immediately
   * - 5.2: Display micro-sentence for expressed emotions
   */
  const addLog = useCallback((
    text: string, 
    action: EmotionAction, 
    textColor: PastelColor | 'white' = 'white',
    quickEmotion?: QuickEmotion
  ) => {
    // Create new log entry
    // Requirement 2.2, 2.3, 4.3: Record with timestamp, action type, textColor, and quickEmotion
    const newLog: EmotionLog = {
      id: uuidv4(),
      text,
      action,
      timestamp: Date.now(),
      textColor,
      quickEmotion,
    };

    // Update logs using functional update to avoid stale closure
    setLogs(prevLogs => {
      const updatedLogs = [...prevLogs, newLog];
      // Persist logs immediately
      storageService.saveLogs(updatedLogs);
      return updatedLogs;
    });

    // Calculate new creature state using functional update
    // Requirement 3.1, 3.2: Update creature based on action
    setCreatureState(prevState => {
      const newCreatureState = calculateNewState(prevState, action);
      // Persist creature state immediately
      storageService.saveCreatureState(newCreatureState);
      return newCreatureState;
    });

    // Update safety score if action is "expressed"
    // Requirement 4.1: Increment safety score for expressed emotions
    if (action === 'expressed') {
      setSafetyScore(prevScore => {
        const newSafetyScore = prevScore + 1;
        // Persist safety score immediately
        storageService.saveSafetyScore(newSafetyScore);
        return newSafetyScore;
      });
      
      // Requirement 5.1, 5.2: Display micro-sentence for expressed emotions
      const { sentence, nextIndex } = getNextMicroSentenceUtil(microSentenceIndexRef.current);
      setCurrentMicroSentence(sentence);
      setMicroSentenceIndex(nextIndex);
      microSentenceIndexRef.current = nextIndex;
      storageService.saveMicroSentenceIndex(nextIndex);
      
      // Clear micro-sentence after 2 seconds
      setTimeout(() => {
        setCurrentMicroSentence(null);
      }, 2000);
    }
  }, []);

  /**
   * Clear all logs and reset state
   */
  const clearLogs = useCallback(() => {
    setLogs([]);
    setCreatureState(getInitialState());
    setSafetyScore(0);
    storageService.clearAll();
  }, []);

  /**
   * Set creature customization
   * 
   * Requirements:
   * - 2.6: Save creature customization
   * - 8.4: Persist customization to localStorage immediately
   * - 8.5: Ensure all customization changes save immediately
   */
  const setCustomization = useCallback((newCustomization: CreatureCustomization) => {
    setCustomizationState(newCustomization);
    storageService.saveCustomization(newCustomization);
  }, []);

  /**
   * Delete a log entry
   * 
   * Requirements:
   * - 7.3: Remove log from storage and update display
   * - 7.5: Update safety score if deleted log was expressed
   */
  const deleteLog = useCallback((logId: string) => {
    setLogs(prevLogs => {
      const logToDelete = prevLogs.find(log => log.id === logId);
      
      if (!logToDelete) {
        return prevLogs;
      }

      // Remove log from array
      const updatedLogs = prevLogs.filter(log => log.id !== logId);
      
      // Requirement 7.5: Update safety score if deleted log was expressed
      if (logToDelete.action === 'expressed') {
        setSafetyScore(prevScore => {
          const newSafetyScore = Math.max(0, prevScore - 1);
          storageService.saveSafetyScore(newSafetyScore);
          return newSafetyScore;
        });
      }

      // Persist changes to localStorage
      storageService.saveLogs(updatedLogs);
      return updatedLogs;
    });
  }, []);

  /**
   * Edit an existing log
   * Updates the log text while preserving other properties
   */
  const editLog = useCallback((logId: string, newText: string) => {
    setLogs(prevLogs => {
      const updatedLogs = prevLogs.map(log => 
        log.id === logId ? { ...log, text: newText } : log
      );
      
      // Persist changes to localStorage
      storageService.saveLogs(updatedLogs);
      return updatedLogs;
    });
  }, []);

  /**
   * Get the next micro-sentence
   * 
   * Requirements:
   * - 5.1: Cycle through micro-sentences
   * - 5.2: Return next sentence in sequence
   */
  const getNextMicroSentence = useCallback((): string => {
    const { sentence, nextIndex } = getNextMicroSentenceUtil(microSentenceIndexRef.current);
    setMicroSentenceIndex(nextIndex);
    microSentenceIndexRef.current = nextIndex;
    storageService.saveMicroSentenceIndex(nextIndex);
    return sentence;
  }, []);

  /**
   * Set text color preference
   * 
   * Requirements:
   * - 8.2: Store last selected text color and restore for next log
   * - 8.5: Update localStorage on any setting change
   */
  const setTextColorPreference = useCallback((color: PastelColor | 'white') => {
    setTextColorPreferenceState(color);
    storageService.saveTextColorPreference(color);
  }, []);

  const value: EmotionContextType = {
    logs,
    creatureState,
    safetyScore,
    customization,
    microSentenceIndex,
    currentMicroSentence,
    textColorPreference,
    addLog,
    clearLogs,
    setCustomization,
    deleteLog,
    editLog,
    getNextMicroSentence,
    setTextColorPreference,
  };

  // Don't render children until initial state is loaded
  if (!isInitialized) {
    return null;
  }

  return (
    <EmotionContext.Provider value={value}>
      {children}
    </EmotionContext.Provider>
  );
}

/**
 * Hook to use the EmotionContext
 * Throws an error if used outside of EmotionProvider
 */
export function useEmotion(): EmotionContextType {
  const context = useContext(EmotionContext);
  
  if (context === undefined) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  
  return context;
}
