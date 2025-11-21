/**
 * Creature Component
 * Displays the animated Emotionagotchi creature that responds to user's emotional processing
 * Requirements: 3.1, 3.2, 3.4, 3.5, 8.1, 8.4
 */

import React from 'react';
import { CreatureState } from '@/types';
import styles from './Creature.module.css';

export interface CreatureProps {
  /** Current state of the creature including brightness, size, and animation */
  state: CreatureState;
}

/**
 * Creature component that displays an animated blob representing the user's emotional state
 * 
 * Features:
 * - Idle breathing animation when no action is taken
 * - Grow animation when emotions are expressed
 * - Curl animation when emotions are suppressed
 * - Celebrate animation when maximum brightness is reached
 * - Dynamic brightness filter based on state
 * - Dynamic scale transform based on size
 * 
 * Requirements: 3.1, 3.2, 3.4, 3.5, 8.1, 8.4
 */
export function Creature({ state }: CreatureProps) {
  // Determine animation class based on current animation state
  const animationClass = {
    idle: styles.creatureIdle,
    grow: styles.creatureGrow,
    curl: styles.creatureCurl,
    celebrate: styles.creatureCelebrate,
  }[state.animation];

  // Calculate brightness filter (0-100 maps to 0.5-1.5)
  // Requirement 3.1, 3.2: Apply brightness filter based on creature state
  const brightnessValue = 0.5 + (state.brightness / 100);

  // Calculate scale transform (0-100 maps to 0.8-1.2)
  // Requirement 3.5: Apply scale transform based on creature size
  const scaleValue = 0.8 + (state.size / 100) * 0.4;

  // Create descriptive label for screen readers
  const getAnimationDescription = () => {
    switch (state.animation) {
      case 'grow':
        return 'growing happily';
      case 'curl':
        return 'curling inward';
      case 'celebrate':
        return 'celebrating at maximum brightness';
      case 'idle':
      default:
        return 'breathing gently';
    }
  };

  return (
    <div
      className={`${styles.creature} ${animationClass}`}
      style={{
        filter: `brightness(${brightnessValue})`,
        transform: `scale(${scaleValue})`,
      }}
      role="img"
      aria-label={`Emotionagotchi creature with ${state.brightness}% brightness, ${getAnimationDescription()}`}
      aria-live="polite"
      aria-atomic="true"
    />
  );
}
