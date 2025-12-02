/**
 * LandingHero Component
 * Welcoming landing page hero section
 * Requirements: 1.1, 1.2, 1.3, 1.5
 */

'use client';

import React from 'react';
import styles from './LandingHero.module.css';

export interface LandingHeroProps {
  /** Callback when Start button is clicked */
  onStart: () => void;
}

/**
 * LandingHero component
 * 
 * Requirements:
 * - 1.1: Display app name "EmoChild: Your Inner Child in Your Pocket"
 * - 1.2: Show brief explanation with pastel glow effect
 * - 1.3: Apply soft pastel glow on dark mode background
 * - 1.5: Provide "Start" button that transitions to setup flow
 */
export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Requirement 1.1: App name */}
        <h1 className={styles.title}>
          EmoChild: Your Inner Child in Your Pocket
        </h1>
        
        {/* Requirement 1.2: Explanation text with pastel glow */}
        <p className={styles.explanation}>
          A tiny creature that grows when you express your emotions in healthy ways, 
          a representation of your inner child that resides within you.
        </p>
        
        {/* Requirement 1.5: Start button with mint accent */}
        <button 
          className={styles.startButton}
          onClick={onStart}
          aria-label="Start using EmoChild"
        >
          Start
        </button>
      </div>
    </div>
  );
}
