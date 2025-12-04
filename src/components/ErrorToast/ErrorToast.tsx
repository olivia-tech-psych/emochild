/**
 * ErrorToast Component
 * Displays non-intrusive error notifications
 * Requirement: 5.4 - Display error messages for localStorage failures
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styles from './ErrorToast.module.css';

export interface ErrorToastProps {
  /** Error message to display */
  message: string;
  /** Whether the toast is visible */
  isVisible: boolean;
  /** Callback when toast is dismissed */
  onDismiss: () => void;
  /** Auto-dismiss duration in milliseconds (default: 5000) */
  duration?: number;
}

/**
 * ErrorToast component
 * Displays error messages with pastel styling
 * 
 * Requirement 5.4: Display appropriate error messages
 */
export function ErrorToast({ 
  message, 
  isVisible, 
  onDismiss,
  duration = 5000 
}: ErrorToastProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onDismiss();
      setIsAnimatingOut(false);
    }, 200); // Match animation duration
  }, [onDismiss]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, handleDismiss]);

  if (!isVisible && !isAnimatingOut) {
    return null;
  }

  return (
    <div 
      className={`${styles.toast} ${isAnimatingOut ? styles.fadeOut : styles.fadeIn}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.content}>
        <span className={styles.icon}>⚠️</span>
        <span className={styles.message}>{message}</span>
      </div>
      <button 
        className={styles.dismissButton}
        onClick={handleDismiss}
        aria-label="Dismiss error message"
      >
        ✕
      </button>
    </div>
  );
}
