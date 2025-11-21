/**
 * Main page - Emotion Log Screen
 * Integrates all components for the primary interface
 * Requirements: 1.1, 2.1, 2.4, 10.1, 10.4, 7.5
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useEmotion } from '@/context/EmotionContext';
import { EmotionInput } from '@/components/EmotionInput';
import { ActionButtons } from '@/components/ActionButtons';
import { Creature } from '@/components/Creature';
import { SafetyBar } from '@/components/SafetyBar';
import { Navigation } from '@/components/Navigation';
import type { EmotionAction } from '@/types';
import styles from './page.module.css';

/**
 * Home page component
 * 
 * Requirements:
 * - 1.1: Display emotion log input as primary interface element
 * - 2.1: Display action buttons for expressed/suppressed
 * - 2.4: Clear input field after submission
 * - 10.1: Emotion log input is immediately accessible
 * - 10.4: Auto-focus cursor for immediate typing
 * - 7.5: Keyboard accessibility (Tab, Enter, Escape)
 */
export default function Home() {
  const { creatureState, safetyScore, addLog } = useEmotion();
  const [inputValue, setInputValue] = useState('');
  const maxLength = 100;

  // Handle action button clicks
  // Requirement 2.4: Clear input after submission
  const handleAction = (action: EmotionAction) => {
    if (inputValue.trim().length === 0) {
      return; // Prevent empty submissions
    }

    // Add log to context
    addLog(inputValue, action);

    // Requirement 2.4: Clear input field after submission
    setInputValue('');
  };

  const handleExpress = () => handleAction('expressed');
  const handleSuppress = () => handleAction('suppressed');

  // Requirement 7.5: Keyboard accessibility - Escape key clears input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inputValue.length > 0) {
        setInputValue('');
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputValue]);

  // Disable buttons when input is empty
  const isButtonDisabled = inputValue.trim().length === 0;

  return (
    <main className={styles.main}>
      {/* Skip to main content link for keyboard users - Requirement 7.5 */}
      <a href="#emotion-input" className={styles.skipLink}>
        Skip to emotion input
      </a>

      {/* Creature at top - Requirement 10.1 */}
      <section className={styles.creatureSection} aria-label="Emotionagotchi creature display">
        <Creature state={creatureState} />
      </section>

      {/* Safety bar below creature */}
      <section className={styles.safetySection}>
        <SafetyBar score={safetyScore} />
      </section>

      {/* Input in middle - Requirement 1.1, 10.1, 10.4 */}
      <section className={styles.inputSection} aria-label="Emotion logging">
        <EmotionInput
          value={inputValue}
          onChange={setInputValue}
          maxLength={maxLength}
        />
      </section>

      {/* Action buttons - Requirement 2.1 */}
      <section className={styles.actionsSection} aria-label="Choose how you processed this emotion">
        <ActionButtons
          onExpress={handleExpress}
          onSuppress={handleSuppress}
          disabled={isButtonDisabled}
        />
      </section>

      {/* Navigation to history */}
      <nav className={styles.navigationSection} aria-label="Page navigation">
        <Navigation type="toHistory" />
      </nav>
    </main>
  );
}
