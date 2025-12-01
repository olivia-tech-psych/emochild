/**
 * Creature Component
 * Displays the animated EmoChild creature that responds to user's emotional processing
 * Requirements: 3.1, 3.2, 3.4, 3.5, 6.1, 6.2, 6.3, 6.4, 6.5, 8.1, 8.2, 8.3, 8.4
 */

import React, { useEffect, useRef, useState } from 'react';
import { CreatureState, CreatureCustomization } from '@/types';
import { COLOR_HEX_MAP, COLOR_GLOW_MAP } from '@/utils/colorMapping';
import styles from './Creature.module.css';

export interface CreatureProps {
  /** Current state of the creature including brightness, size, and animation */
  state: CreatureState;
  /** Creature customization including color and bow accessory */
  customization: CreatureCustomization;
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
 * - Animation queuing for smooth transitions (Requirement 8.3)
 * - Custom color from user preferences (Requirement 6.1)
 * - Optional bow accessory (Requirement 6.2)
 * - Color persistence through state changes (Requirement 6.3)
 * - Color dimming and brightening while preserving hue (Requirements 6.4, 6.5)
 * 
 * Requirements: 3.1, 3.2, 3.4, 3.5, 6.1, 6.2, 6.3, 6.4, 6.5, 8.1, 8.2, 8.3, 8.4
 */
export function Creature({ state, customization }: CreatureProps) {
  const [currentAnimation, setCurrentAnimation] = useState<CreatureState['animation']>(state.animation);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousAnimationRef = useRef<CreatureState['animation']>(state.animation);

  // Requirement 8.3: Implement animation queuing for smooth transitions
  useEffect(() => {
    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // If animation changed from previous state
    if (state.animation !== previousAnimationRef.current) {
      // Immediately apply the new animation
      setCurrentAnimation(state.animation);
      previousAnimationRef.current = state.animation;

      // If it's not an idle animation, queue return to idle after animation completes
      if (state.animation !== 'idle') {
        // Animation duration is 1s (--transition-slow), add small buffer
        animationTimeoutRef.current = setTimeout(() => {
          setCurrentAnimation('idle');
        }, 1100);
      }
    }

    // Cleanup timeout on unmount
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [state.animation]);

  // Determine animation class based on current animation state
  const animationClass = {
    idle: styles.creatureIdle,
    grow: styles.creatureGrow,
    curl: styles.creatureCurl,
    celebrate: styles.creatureCelebrate,
  }[currentAnimation];

  // Calculate brightness filter (0-100 maps to 0.5-1.5)
  // Requirement 3.1, 3.2: Apply brightness filter based on creature state
  const brightnessValue = 0.5 + (state.brightness / 100);

  // Calculate scale transform (0-100 maps to 0.8-1.2)
  // Requirement 3.5: Apply scale transform based on creature size
  const scaleValue = 0.8 + (state.size / 100) * 0.4;

  // Get color values from customization
  // Requirements 6.1, 6.3: Apply customization color and maintain through state changes
  const baseColor = COLOR_HEX_MAP[customization.color];
  const glowEffect = COLOR_GLOW_MAP[customization.color];

  // Create descriptive label for screen readers
  const getAnimationDescription = () => {
    switch (currentAnimation) {
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
    <div className={styles.creatureContainer}>
      <div
        className={`${styles.creature} ${animationClass}`}
        style={{
          filter: `brightness(${brightnessValue})`,
          transform: `scale(${scaleValue})`,
          background: baseColor,
          boxShadow: glowEffect,
        }}
        role="img"
        aria-label={`${customization.name}, your EmoChild creature in ${customization.color} with ${state.brightness}% brightness, ${getAnimationDescription()}`}
        aria-live="polite"
        aria-atomic="true"
      />
      {/* Requirement 6.2: Render dark pink bow if hasBow is true */}
      {customization.hasBow && (
        <div className={styles.bow} aria-hidden="true" />
      )}
    </div>
  );
}
