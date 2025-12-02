/**
 * SafetyBar Component
 * Displays the inner safety bar showing cumulative emotional expression progress
 * Requirements: 4.1, 4.3, 4.4
 */

import React from 'react';
import styles from './SafetyBar.module.css';

interface SafetyBarProps {
  score: number;
  maxScore?: number;
}

/**
 * SafetyBar component
 * 
 * Requirements:
 * - 4.1: Increment bar for expressed emotions
 * - 4.3: Animate bar growth smoothly
 * - 4.4: Display numeric safety score
 */
export const SafetyBar: React.FC<SafetyBarProps> = ({ score, maxScore = 100 }) => {
  const percentage = Math.min((score / maxScore) * 100, 100);

  return (
    <div className={styles.container} role="region" aria-label="Inner safety progress">
      <div 
        className={styles.label}
        id="safety-score-label"
      >
        Inner Safety Bar: {score} ✨
      </div>
      <div 
        className={styles.barBackground}
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={maxScore}
        aria-labelledby="safety-score-label"
        aria-live="polite"
        aria-atomic="true"
      >
        <div 
          className={styles.barFill} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
