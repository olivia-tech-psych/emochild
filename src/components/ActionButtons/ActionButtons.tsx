/**
 * ActionButtons Component
 * Express and Suppress action buttons for emotion logging
 * Requirements: 2.1, 2.5
 */

'use client';

import React from 'react';
import type { EmotionAction } from '@/types';
import styles from './ActionButtons.module.css';

export interface ActionButtonsProps {
  /** Callback when Express button is clicked */
  onExpress: () => void;
  /** Callback when Suppress button is clicked */
  onSuppress: () => void;
  /** Whether buttons should be disabled (e.g., when no text is entered) */
  disabled: boolean;
}

/**
 * ActionButtons component
 * 
 * Requirements:
 * - 2.1: Display two clearly labeled action buttons for "expressed" and "suppressed"
 * - 2.5: Disable both action buttons when no text is entered
 */
export function ActionButtons({ 
  onExpress, 
  onSuppress, 
  disabled 
}: ActionButtonsProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.button} ${styles.expressButton}`}
        onClick={onExpress}
        disabled={disabled}
        aria-label="Express emotion"
      >
        <span className={styles.icon}>🌱</span>
        <span className={styles.label}>Express</span>
      </button>
      
      <button
        type="button"
        className={`${styles.button} ${styles.suppressButton}`}
        onClick={onSuppress}
        disabled={disabled}
        aria-label="Suppress emotion"
      >
        <span className={styles.icon}>🌑</span>
        <span className={styles.label}>Suppress</span>
      </button>
    </div>
  );
}
