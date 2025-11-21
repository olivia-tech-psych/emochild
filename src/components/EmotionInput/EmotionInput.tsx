/**
 * EmotionInput Component
 * Text input for logging micro-emotions with character counter
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './EmotionInput.module.css';

export interface EmotionInputProps {
  /** Current input value */
  value: string;
  /** Callback when input value changes */
  onChange: (value: string) => void;
  /** Maximum character length */
  maxLength: number;
  /** Whether the input should be disabled */
  disabled?: boolean;
}

/**
 * EmotionInput component
 * 
 * Requirements:
 * - 1.1: Display text input field with 100-character maximum
 * - 1.2: Show real-time character counter
 * - 1.3: Prevent input exceeding 100 characters
 * - 1.4: Prevent empty submission (handled by parent)
 * - 1.5: Auto-focus input on mount
 */
export function EmotionInput({ 
  value, 
  onChange, 
  maxLength,
  disabled = false 
}: EmotionInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const remainingChars = maxLength - value.length;

  // Requirement 1.5: Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  // Handle input change
  // Requirement 1.3: Prevent exceeding max length
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Prevent exceeding max length
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  // Handle keyboard events
  // Note: Enter key submission is handled by parent component via buttons
  // This prevents accidental submission while typing
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Shift+Enter for new lines, but prevent plain Enter from adding newlines
    // Users should use the Express/Suppress buttons for submission
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="emotion-input" className={styles.label}>
        How are you feeling?
      </label>
      
      <textarea
        ref={inputRef}
        id="emotion-input"
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        disabled={disabled}
        placeholder="Share a feeling..."
        rows={3}
        aria-label="Emotion log input"
        aria-describedby="char-counter"
        aria-required="true"
      />
      
      {/* Requirement 1.2: Real-time character counter */}
      <div 
        id="char-counter" 
        className={styles.charCounter}
        aria-live="polite"
        role="status"
      >
        {remainingChars}/{maxLength}
      </div>
    </div>
  );
}
