/**
 * EmotionInput Component
 * Text input for logging micro-emotions with character counter
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.3, 3.4, 4.2, 4.3
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ColorPicker } from '../ColorPicker';
import type { PastelColor } from '@/types';
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
  /** Whether to show validation error for empty input */
  showEmptyError?: boolean;
  /** Initial text for quick emotion prefilling - Requirement 3.3 */
  initialText?: string;
  /** Selected text color - Requirement 4.2 */
  textColor?: PastelColor | 'white';
  /** Callback when text color changes - Requirement 4.2 */
  onTextColorChange?: (color: PastelColor | 'white') => void;
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
 * - 3.3: Accept initialText prop for quick emotion prefilling
 * - 3.4: Maintain character counter with prefilled text
 * - 4.2: Integrate ColorPicker for text color selection
 * - 4.3: Pass selected textColor to parent
 */
export function EmotionInput({ 
  value, 
  onChange, 
  maxLength,
  disabled = false,
  showEmptyError = false,
  initialText,
  textColor = 'white',
  onTextColorChange
}: EmotionInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const remainingChars = maxLength - value.length;

  // Requirement 3.3: Prefill input with initialText when provided
  useEffect(() => {
    if (initialText && initialText !== value) {
      onChange(initialText);
    }
  }, [initialText, value, onChange]);

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

      {/* Requirement 4.2: Text color picker */}
      {onTextColorChange && (
        <div className={styles.colorPickerWrapper}>
          <ColorPicker
            selectedColor={textColor}
            onColorChange={onTextColorChange}
            includeWhite={true}
            label="Text color"
          />
        </div>
      )}
      
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
        style={{ color: textColor === 'white' ? '#ffffff' : `var(--color-${textColor})` }}
      />
      
      {/* Requirement 1.2, 3.4: Real-time character counter (works with prefilled text) */}
      <div 
        id="char-counter" 
        className={styles.charCounter}
        aria-live="polite"
        role="status"
      >
        {remainingChars}/{maxLength}
      </div>

      {/* Requirement 1.4: Inline validation message for empty input */}
      {showEmptyError && value.trim().length === 0 && (
        <div 
          className={styles.validationError}
          role="alert"
          aria-live="assertive"
        >
          Share a feeling to continue
        </div>
      )}
    </div>
  );
}
