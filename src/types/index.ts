/**
 * Type definitions for EmoChild application
 * These types define the core data models used throughout the application
 */

/**
 * Represents the type of action taken on an emotion
 * - 'expressed': User acknowledged and processed the emotion
 * - 'suppressed': User avoided or pushed down the emotion
 */
export type EmotionAction = 'expressed' | 'suppressed';

/**
 * Represents the available pastel colors for creature and text customization
 * Requirements: 2.6, 4.3
 */
export type PastelColor = 
  | 'mint'      // #C9E4DE
  | 'blue'      // #a0d2eb
  | 'lavender'  // #DBCDF0
  | 'peach'     // #fcded3
  | 'pink'      // #F2C6DE
  | 'yellow'    // #ffeaa7
  | 'red'       // #f35d69
  | 'orange';   // #ff964f

/**
 * Represents the quick emotion options for faster logging
 * Requirements: 3.2
 */
export type QuickEmotion = 
  | 'stressed'
  | 'anxious'
  | 'calm'
  | 'excited'
  | 'sad'
  | 'angry'
  | 'confused'
  | 'grateful'
  | 'curious'
  | 'scared';

/**
 * Represents creature customization settings
 * Requirements: 2.6, 8.1
 */
export interface CreatureCustomization {
  /** Creature name (1-50 characters) */
  name: string;
  
  /** Selected pastel color for the creature */
  color: PastelColor;
  
  /** Whether the creature has a dark pink bow accessory */
  hasBow: boolean;
}

/**
 * Represents a single emotion log entry
 * Requirements: 2.2, 2.3, 4.3, 5.3
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
  
  /** Text color for the log entry (defaults to 'white') */
  textColor?: PastelColor | 'white';
  
  /** Quick emotion label if a quick emotion button was used */
  quickEmotion?: QuickEmotion;
}

/**
 * Represents the current state of the EmoChild creature
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
 * Requirements: 2.2, 2.3, 2.6, 3.1, 3.2, 4.1, 8.1
 */
export interface AppState {
  /** Array of all emotion logs */
  logs: EmotionLog[];
  
  /** Current creature state */
  creatureState: CreatureState;
  
  /** Safety score: count of expressed emotions */
  safetyScore: number;
  
  /** Creature customization settings */
  customization: CreatureCustomization;
  
  /** Current index for cycling through micro-sentences (0-9) */
  microSentenceIndex: number;
}
