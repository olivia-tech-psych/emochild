/**
 * Type definitions for Emotionagotchi application
 * These types define the core data models used throughout the application
 */

/**
 * Represents the type of action taken on an emotion
 * - 'expressed': User acknowledged and processed the emotion
 * - 'suppressed': User avoided or pushed down the emotion
 */
export type EmotionAction = 'expressed' | 'suppressed';

/**
 * Represents a single emotion log entry
 * Requirements: 2.2, 2.3, 5.3
 */
export interface EmotionLog {
  /** Unique identifier (UUID v4) */
  id: string;
  
  /** Emotion description text (1-100 characters) */
  text: string;
  
  /** Action taken: expressed or suppressed */
  action: EmotionAction;
  
  /** Unix timestamp in milliseconds when the log was created */
  timestamp: number;
}

/**
 * Represents the current state of the Emotionagotchi creature
 * Requirements: 3.1, 3.2
 */
export interface CreatureState {
  /** Brightness level (0-100), affects visual glow */
  brightness: number;
  
  /** Size level (0-100), affects creature scale */
  size: number;
  
  /** Current animation state */
  animation: 'idle' | 'grow' | 'curl' | 'celebrate';
}

/**
 * Represents the complete application state
 * Requirements: 2.2, 2.3, 3.1, 3.2, 4.1
 */
export interface AppState {
  /** Array of all emotion logs */
  logs: EmotionLog[];
  
  /** Current creature state */
  creatureState: CreatureState;
  
  /** Safety score: count of expressed emotions */
  safetyScore: number;
}
